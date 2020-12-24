import axios from 'axios';

import User from '../../models/User';
import Location from "../../models/Location";

export const TOGGLE_FAVORITE_SHOPS = 'TOGGLE_FAVORITE_SHOPS';
export const TOGGLE_FAVORITE_FOODS = 'TOGGLE_FAVORITE_FOODS';
export const EDIT_USER = 'EDIT_USER';
export const FETCH_USERS = 'FETCH_USERS';

export const toggleFavoriteShops = (userId,shopId) => {
    return{
        type: TOGGLE_FAVORITE_SHOPS,
        payload: {
            userId: userId,
            shopId: shopId,
        }
    }
}

export const fetchUsers = () => {
    return async (dispatch) => {
        const url = 'https://food-delivery-2dc43-default-rtdb.firebaseio.com/user.json';

        try{
            const response = await axios.get(url);
            const resData = await response.data;
            const allUsers = [];

            for (const key in resData){
                const user = new User(key,resData[key]['firstName'],resData[key]['lastName'],resData[key]['address'],resData[key]['telNumber'],
                    resData[key]['email'],resData[key]['imageUrl'],resData[key]['location'],
                    new Location(0,0),[],[],resData[key]['isDeliveryMan'],resData[key]['isShopOwner']);

                allUsers.push(user);
            }

            dispatch({
               type: FETCH_USERS,
               payload: {
                   users: allUsers
               }
            });

        }catch (err){
            throw err;
        }
    }
}

export const toggleFavoriteFoods = (userId,foodId) => {
    return{
        type: TOGGLE_FAVORITE_FOODS,
        payload: {
            userId: userId,
            foodId: foodId
        }
    }
}

export const editUser = (userId,firstName,lastName,email,address,telNumber,imageUrl,location,isDeliveryMan,isShopOwner) => {
    return async (dispatch) => {
        try{
            const url = `https://food-delivery-2dc43-default-rtdb.firebaseio.com/user/${userId}.json`;

            const response = await axios.patch(url,{
                firstName: firstName,
                lastName: lastName,
                email: email,
                address: address,
                telNumber: telNumber,
                imageUrl: imageUrl,
                location: location,
                isDeliveryMan: isDeliveryMan,
                isShopOwner: isShopOwner
            });
            const resData = await response.data;

            dispatch({
                type: EDIT_USER,
                payload: {
                    userId: userId,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    address: address,
                    telNumber: telNumber,
                    imageUrl: imageUrl,
                    location: location,
                    isDeliveryMan: isDeliveryMan,
                    isShopOwner: isShopOwner
                }
            });
        }catch (err){
            throw err;
        }
    }
}