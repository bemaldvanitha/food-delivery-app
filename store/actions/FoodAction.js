import axios from "axios";

export const ADD_FOOD = 'ADD_FOOD';
export const EDIT_FOOD = 'EDIT_FOOD';
export const DELETE_FOOD = 'DELETE_FOOD';

export const addFoods = (catId,shopId,name,description,fullPortionPrice,halfPortionPrice,imageUrl,isVegan,isVegetarian,isSugarFree) => {
    return async (dispatch) => {
        const url = `https://food-delivery-2dc43-default-rtdb.firebaseio.com/foods.json`;
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

export const editFood = (id,catId,name,description,fullPortionPrice,halfPortionPrice,imageUrl,isVegan,isVegetarian,isSugarFree) => {
    console.log(description);
    return{
        type: EDIT_FOOD,
        payload: {
            id: id,
            catId: catId,
            name: name,
            description: description,
            fullPortionPrice: fullPortionPrice,
            halfPortionPrice: halfPortionPrice,
            imageUrl: imageUrl,
            isVegan: isVegan,
            isVegetarian: isVegetarian,
            isSugarFree: isSugarFree
        }
    }
}

export const deleteFood = (id) => {
    return{
        type: DELETE_FOOD,
        payload: {
            id: id
        }
    }
}