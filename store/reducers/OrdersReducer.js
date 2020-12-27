import {ADD_ORDERS,SHOP_COMPLETED,SHOP_ACCEPTED,DELIVER_COMPLETED,DELIVER_ACCEPTED} from '../actions/OrdersAction';
import Orders from '../../models/Orders';

const initState = {
    orders: []
}

const OrderReducer = (state = initState,action) => {
    switch (action.type){
        case ADD_ORDERS:
            const order = new Orders(action.payload.id,action.payload.items,action.payload.note,action.payload.totalAmount,action.payload.userId,
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

        case DELIVER_ACCEPTED:
            const acceptedOrderDeliveryId = state.orders.findIndex(order => order.id === action.payload.orderId);
            const acceptedOrderDelivery = state.orders.find(order => order.id === action.payload.orderId);

            acceptedOrderDelivery.isDeliverAccept = true;
            const updatedDeliveryOrder = [...state.orders];
            updatedDeliveryOrder.splice(acceptedOrderDeliveryId,1);

            return {...state,orders: updatedDeliveryOrder.concat(acceptedOrderDelivery)}

        case DELIVER_COMPLETED:
            const finishedDeliveryOrderId = state.orders.findIndex(order => order.id === action.payload.orderId);
            const finishedDeliveryOrder = state.orders.find(order => order.id === action.payload.orderId);

            finishedDeliveryOrder.isDeliverCompleted = true;
            const updateDeliveryOrder = [...state.orders];
            updateDeliveryOrder.splice(finishedDeliveryOrderId,1);

            return {...state,orders: updateDeliveryOrder.concat(finishedDeliveryOrder)}

        default: return state;
    }
}

export default OrderReducer;
