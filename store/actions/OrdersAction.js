import axios from "axios";

import OrderItem from '../../models/OrderItem';
import Orders from '../../models/Orders';
import Location from '../../models/Location';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const ADD_ORDERS = 'ADD_ORDERS';
export const SHOP_ACCEPTED = 'SHOP_ACCEPTED';
export const SHOP_COMPLETED = 'SHOP_COMPLETED';
export const DELIVER_ACCEPTED = 'DELIVER_ACCEPTED';
export const DELIVER_COMPLETED = 'DELIVER_COMPLETED';

export const fetchOrders = () => {
    return async (dispatch) => {
        const url = 'https://food-delivery-2dc43-default-rtdb.firebaseio.com/orders.json';
        try {
            const response = await axios.get(url);
            const resData = response.data;
            const allOrders = [];

            for (const key in resData){
                const rawItems = resData[key]['items'];
                const orderFoods = [];

               for (const key2 in rawItems){

                   const orderFood = new OrderItem(rawItems[key2]['foodId'],rawItems[key2]['foodName'],rawItems[key2]['price'],
                       rawItems[key2]['quantity'],rawItems[key2]['size']);

                   orderFoods.push(orderFood);
               }

               const order = new Orders(key,orderFoods,resData[key]['note'],resData[key]['totalAmount'],resData[key]['userId']
                   ,resData[key]['userName'],new Location(resData[key]['userLocation']['latitude'],resData[key]['userLocation']['longitude']),
                   resData[key]['shopId'],resData[key]['shopName'],
                   new Location(resData[key]['shopLocation']['latitude'],resData[key]['shopLocation']['longitude']),
                   resData[key]['orderDate'],resData[key]['isShopAccept'],resData[key]['isShopCompleted'],
                   resData[key]['isDeliverAccept'],resData[key]['isDeliverCompleted']);

               allOrders.push(order);
            }

            dispatch({
                type: FETCH_ORDERS,
                payload: {
                    allOrders: allOrders
                }
            });

        }catch (err){
            throw err;
        }
    }
}

export const addOrders = (items,note,totalAmount,userId,userName,userLocation,shopId,shopName,shopLocation) => {
    return async (dispatch) => {
        const url = `https://food-delivery-2dc43-default-rtdb.firebaseio.com/orders.json`;
        const orderDate = new Date().toISOString();

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
                'shopLocation': shopLocation,
                'orderDate': orderDate,
                'isShopAccept': false,
                'isShopCompleted': false,
                'isDeliverAccept': false,
                'isDeliverCompleted': false,
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
                    orderDate: orderDate
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