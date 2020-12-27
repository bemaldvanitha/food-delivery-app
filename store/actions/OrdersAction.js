import axios from "axios";

export const ADD_ORDERS = 'ADD_ORDERS';
export const SHOP_ACCEPTED = 'SHOP_ACCEPTED';
export const SHOP_COMPLETED = 'SHOP_COMPLETED';
export const DELIVER_ACCEPTED = 'DELIVER_ACCEPTED';
export const DELIVER_COMPLETED = 'DELIVER_COMPLETED';

export const addOrders = (items,note,totalAmount,userId,userName,userLocation,shopId,shopName,shopLocation) => {
    return async (dispatch) => {
        const url = `https://food-delivery-2dc43-default-rtdb.firebaseio.com/orders.json`;
        try {
            const response = await axios.post(url,{
                'items': items,
                'note': note,
                'totalAmount': totalAmount,
                'userId': userId,
                'userName': userName,
                'userLocation': userLocation,
                'shopId': shopId,
                'shopName': shopName,
                'shopLocation': shopLocation
            });
            const resData = await response.data;

            dispatch({
                type: ADD_ORDERS,
                payload: {
                    id: resData['name'],
                    items: items,
                    note: note,
                    totalAmount: totalAmount,
                    userId: userId,
                    userName: userName,
                    userLocation: userLocation,
                    shopId: shopId,
                    shopName: shopName,
                    shopLocation: shopLocation,
                }
            });

        }catch (err){
            throw err;
        }
    }
}

export const shopAccepted = (orderId) => {
    return{
        type: SHOP_ACCEPTED,
        payload: {
            orderId: orderId
        }
    }
}

export const shopCompleted = (orderId) => {
    return{
        type: SHOP_COMPLETED,
        payload: {
            orderId: orderId
        }
    }
}


export const deliveryAccept = (orderId) => {
    return{
        type: DELIVER_ACCEPTED,
        payload: {
            orderId: orderId
        }
    }
}

export const deliveryFinish = (orderId) => {
    return{
        type: DELIVER_COMPLETED,
        payload: {
            orderId: orderId
        }
    }
}