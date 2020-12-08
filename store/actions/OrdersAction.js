export const ADD_ORDERS = 'ADD_ORDERS';
export const SHOP_ACCEPTED = 'SHOP_ACCEPTED';
export const SHOP_COMPLETED = 'SHOP_COMPLETED';
export const DELIVER_ACCEPTED = 'DELIVER_ACCEPTED';
export const DELIVER_COMPLETED = 'DELIVER_COMPLETED';

export const addOrders = (items,note,totalAmount,userId,userName,userLocation,shopId,shopName,shopLocation) => {
    return{
        type: ADD_ORDERS,
        payload: {
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
    }
}

export const shopAccepted = () => {
    return{
        type: SHOP_ACCEPTED
    }
}
