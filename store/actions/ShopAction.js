import axios from "axios";

import Shop from '../../models/Shop';
import Location from "../../models/Location";

export const CHANGE_DISCOUNT = 'CHANGE_DISCOUNT';
export const CHANGE_OFFERED_CATEGORIES = 'CHANGE_OFFERED_CATEGORIES';
export const EDIT_SHOP = 'EDIT_SHOP';
export const ADD_SHOP = 'ADD_SHOP';
export const FETCH_SHOPS = 'FETCH_SHOPS';

export const fetchShops = () => {
    return async (dispatch) => {
        const url = 'https://food-delivery-2dc43-default-rtdb.firebaseio.com/shops.json';
        try {
            const response = await axios.get(url);
            const resData = await response.data;

            const allShops = [];

            for (const key in resData){
                const shop = new Shop(key,resData[key]['uId'],resData[key]['name'],resData[key]['rating'],resData[key]['ratedNumber'],
                    resData[key]['imageUrl'],resData[key]['detail'],resData[key]['offers'],resData[key]['locationName'],
                        new Location(resData[key]['locationInLatLng']['latitude'],resData[key]['locationInLatLng']['longitude']),
                        resData[key]['offeredCategoryIds'] === undefined ? [] : resData[key]['offeredCategoryIds']
                    );
                allShops.push(shop);
            }

            dispatch({
                type: FETCH_SHOPS,
                payload: {
                    allShops: allShops
                }
            })

        }catch (err){
            throw err;
        }
    }
}

export const changeDiscount = (shopId,discount) => {
    return{
        type: CHANGE_DISCOUNT,
        payload: {
            shopId: shopId,
            discount: discount
        }
    }
}

export const changeOfferedCategories = (shopId,catId) => {
    return{
        type: CHANGE_OFFERED_CATEGORIES,
        payload: {
            shopId: shopId,
            catId: catId
        }
    }
}

export const editShop = (shopId,name,detail,locationName,imageUrl) => {
    return async (dispatch) => {
        const url = `https://food-delivery-2dc43-default-rtdb.firebaseio.com/shops/${shopId}.json`;
        try{
            const response = await axios.patch(url,{
                'name': name,
                'detail': detail,
                'locationName': locationName,
                'imageUrl': imageUrl
            })
            const resData = await response.data;

            dispatch({
                type: EDIT_SHOP,
                payload: {
                    shopId: shopId,
                    name: name,
                    detail: detail,
                    locationName: locationName,
                    imageUrl: imageUrl
                }
            });

        }catch (err){
            throw err;
        }
    }
}

export const addShop = (uId,name,detail,locationName,imageUrl,locationInLatLng) => {
    return async (dispatch) => {
        const url = 'https://food-delivery-2dc43-default-rtdb.firebaseio.com/shops.json';

        try{
            const response = await axios.post(url,{
                'uId': uId,
                'name': name,
                'detail': detail,
                'locationName': locationName,
                'imageUrl': imageUrl,
                'locationInLatLng': locationInLatLng,
                'rating': 0,
                'ratedNumber': 0,
                'offers': '',
            });
            const resData = await response.data;

            dispatch({
                type: ADD_SHOP,
                payload: {
                    id: resData['name'],
                    uId: uId,
                    name: name,
                    detail: detail,
                    locationName: locationName,
                    imageUrl: imageUrl,
                    locationInLatLng: locationInLatLng
                }
            });

        }catch (err){
            throw err;
        }
    }
}