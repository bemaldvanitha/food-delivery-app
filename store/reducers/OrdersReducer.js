import {ADD_ORDERS} from '../actions/OrdersAction';
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
        default: return state;
    }
}

export default OrderReducer;
