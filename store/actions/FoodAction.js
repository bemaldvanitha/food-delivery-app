import axios from "axios";

import FoodItem from '../../models/FoodItem'
import {projectAuth} from '../../firebase/firebase';

export const ADD_FOOD = 'ADD_FOOD';
export const EDIT_FOOD = 'EDIT_FOOD';
export const DELETE_FOOD = 'DELETE_FOOD';
export const FETCH_FOODS = 'FETCH_FOODS';

export const fetchFoods = () => {
    return async (dispatch) => {
        const url = 'https://food-delivery-2dc43-default-rtdb.firebaseio.com/foods.json';
        try{
            const response = await axios.get(url);
            const resData = response.data;
            const allFoods = [];

            for(const key in resData){

                const food = new FoodItem(key,resData[key]['catId'],resData[key]['shopId'],resData[key]['name']
                    ,resData[key]['description'], resData[key]['fullPortionPrice'],
                    resData[key]['halfPortionPrice'] !== undefined ? resData[key]['halfPortionPrice'] : 0 ,
                    resData[key]['imageUrl'],resData[key]['rating'] !== undefined ? resData[key]['rating'] : 0,
                    resData[key]['ratedNumber'] !== undefined ? resData[key]['ratedNumber'] : 0,
                    resData[key]['isVegan'],resData[key]['isVegetarian'],resData[key]['isSugarFree']);

                allFoods.push(food)
            }

            dispatch({
                type: FETCH_FOODS,
                payload: {
                    allFoods: allFoods
                }
            });

        }catch (err){
            throw err;
        }
    }
}

export const addFoods = (catId,shopId,name,description,fullPortionPrice,halfPortionPrice,imageUrl,isVegan,isVegetarian,isSugarFree) => {
    return async (dispatch) => {
        const userToken = await projectAuth.currentUser.getIdTokenResult(true);
        const url = `https://food-delivery-2dc43-default-rtdb.firebaseio.com/foods.json?auth=${userToken.token}`;
        try {
            const response = await axios.post(url,{
                'catId': catId,
                'shopId': shopId,
                'name': name,
                'description': description,
                'fullPortionPrice': fullPortionPrice,
                'halfPortionPrice': halfPortionPrice,
                'imageUrl': imageUrl,
                'isVegan': isVegan,
                'isSugarFree': isSugarFree,
                'isVegetarian': isVegetarian,
            });
            const resData = response.data;

            dispatch({
                type: ADD_FOOD,
                payload: {
                    id: resData['name'],
                    catId: catId,
                    shopId: shopId,
                    name: name,
                    description: description,
                    fullPortionPrice: fullPortionPrice,
                    halfPortionPrice: halfPortionPrice,
                    imageUrl: imageUrl,
                    isVegan: isVegan,
                    isVegetarian: isVegetarian,
                    isSugarFree: isSugarFree
                }
            });
        }catch (err){
            throw err;
        }
    }
}

export const editFood = (id,catId,name,description,fullPortionPrice,halfPortionPrice,isVegan,isVegetarian,isSugarFree) => {
    console.log(description);
    return async (dispatch) => {
        const userToken = await projectAuth.currentUser.getIdTokenResult(true);
        const url = `https://food-delivery-2dc43-default-rtdb.firebaseio.com/foods/${id}.json?auth=${userToken.token}`;
        try {
            const response = await axios.patch(url,{
                'catId': catId,
                'name': name,
                'description': description,
                'fullPortionPrice': fullPortionPrice,
                'halfPortionPrice': halfPortionPrice,
                'isVegan': isVegan,
                'isVegetarian': isVegetarian,
                'isSugarFree': isSugarFree
            });

            dispatch({
                type: EDIT_FOOD,
                payload: {
                    id: id,
                    catId: catId,
                    name: name,
                    description: description,
                    fullPortionPrice: fullPortionPrice,
                    halfPortionPrice: halfPortionPrice,
                    isVegan: isVegan,
                    isVegetarian: isVegetarian,
                    isSugarFree: isSugarFree
                }
            });

        }catch (err){
            throw err;
        }
    }
}

export const deleteFood = (id) => {
    return async (dispatch) => {
        const userToken = await projectAuth.currentUser.getIdTokenResult(true);
        const url = `https://food-delivery-2dc43-default-rtdb.firebaseio.com/foods/${id}.json?auth=${userToken.token}`;
        try {
            await axios.delete(url);

            dispatch({
                type: DELETE_FOOD,
                payload: {
                    id: id
                }
            });

        }catch (err){
            throw err;
        }
    }
}