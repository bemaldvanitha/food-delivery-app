import {ADD_ORDERS,SHOP_COMPLETED,SHOP_ACCEPTED} from '../actions/OrdersAction';
import Orders from '../../models/Orders';

const initState = {
    orders: []
}

const OrderReducer = (state = initState,action) => {
    switch (action.type){
        case ADD_ORDERS:
            const order = new Orders(Math.random().toString(),action.payload.items,action.payload.note,action.payload.totalAmount,action.payload.userId,
                action.payload.userName,action.payload.userLocation,action.payload.shopId,action.payload.shopName,action.payload.shopLocation,
                new Date(),false,false,false,false);
            return {...state,orders: state.orders.concat(order)}

        case SHOP_ACCEPTED:
            const acceptedOrderId = state.orders.findIndex(order => order.id === action.payload.orderId);
            const acceptedOrder = state.orders.find(order => order.id === action.payload.orderId);

            acceptedOrder.isShopAccept = true;
            const updatedOrders = [...state.orders];
            updatedOrders.splice(acceptedOrderId,1);

            return {...state,orders: updatedOrders.concat(acceptedOrder)}

        case SHOP_COMPLETED:
            const finishedOrderId = state.orders.findIndex(order => order.id === action.payload.orderId);
            const finishedOrder = state.orders.find(order => order.id === action.payload.orderId);

            finishedOrder.isShopCompleted = true;
            const updateOrders = [...state.orders];
            updateOrders.splice(finishedOrderId,1);

            return {...state,orders: updateOrders.concat(finishedOrder)}

        default: return state;
    }
}

export default OrderReducer;
