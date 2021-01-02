import axios from 'axios';

import {projectAuth} from '../../firebase/firebase';
import User from '../../models/User';
import Location from "../../models/Location";


export const TOGGLE_FAVORITE_SHOPS = 'TOGGLE_FAVORITE_SHOPS';
export const TOGGLE_FAVORITE_FOODS = 'TOGGLE_FAVORITE_FOODS';
export const EDIT_USER = 'EDIT_USER';
export const FETCH_USERS = 'FETCH_USERS';
export const ADD_USER = 'ADD_USER';

export const toggleFavoriteShops = (userId,shopId,allFav,isFav) => {
    return async (dispatch) => {
        const url = `https://food-delivery-2dc43-default-rtdb.firebaseio.com/user/${userId}.json`;

        if(isFav){
            const removedFav = allFav.filter(id => id !== shopId);

            const response = await axios.patch(url,{
                'favoriteShopIds': removedFav
            });

        }else {

            const response = await axios.patch(url,{
                'favoriteShopIds': [...allFav,shopId]
            });

        }

        dispatch({
            type: TOGGLE_FAVORITE_SHOPS,
            payload: {
                userId: userId,
                shopId: shopId,
            }
        });

    }
}

export const toggleFavoriteFoods = (userId,foodId,allFav,isFav) => {
    return async (dispatch) => {
        const url = `https://food-delivery-2dc43-default-rtdb.firebaseio.com/user/${userId}.json`;

        try {
            if(isFav){
                const removedFav = allFav.filter(id => id !== foodId);

                const response = await axios.patch(url,{
                    'favoriteFoodIds': removedFav
                });

            }else{
                const response = await axios.patch(url,{
                    'favoriteFoodIds': [...allFav,foodId]
                });

            }

            dispatch({
                type: TOGGLE_FAVORITE_FOODS,
                payload: {
                    userId: userId,
                    foodId: foodId
                }
            });

        }catch (err){
            throw err;
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
                if(resData[key]['favoriteFoodIds'] === undefined){
                    console.log('fuck')
                }else{
                    console.log(resData[key]['favoriteFoodIds'])
                }
                const user = new User(key,resData[key]['firstName'],resData[key]['lastName'],resData[key]['address'],resData[key]['telNumber'],
                    resData[key]['email'],resData[key]['imageUrl'],resData[key]['location'], new Location(0,0),
                    resData[key]['favoriteFoodIds'] === undefined ? [] : resData[key]['favoriteFoodIds']
                    ,resData[key]['favoriteShopIds'] === undefined ? [] : resData[key]['favoriteShopIds']
                    ,resData[key]['isDeliveryMan'],resData[key]['isShopOwner']);

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

export const addUser = (firstName,lastName,email,address,telNumber,imageUrl,location,isDeliveryMan,isShopOwner) => {
    return async (dispatch) => {
        const currentUserId = projectAuth.currentUser.uid;
        const url = `https://food-delivery-2dc43-default-rtdb.firebaseio.com/user/${currentUserId}.json`;

        try{
            const response = await axios.patch(url,{
               'firstName': firstName,
               'lastName': lastName,
               'email': email,
               'address': address,
               'telNumber': telNumber,
               'imageUrl': imageUrl,
               'location': location,
               'isDeliveryMan': isDeliveryMan,
               'isShopOwner': isShopOwner
            });

            const resData = response.data;

            dispatch({
                type: ADD_USER,
                payload: {
                    id: currentUserId,
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