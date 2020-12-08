import {REMOVE_BASKET,ADD_BASKET,CLEAR_BASKET} from '../actions/BasketAction';
import Basket from '../../models/Basket';

const initState = {
    basket: []
}

const BasketReducer = (state = initState,action) => {
    switch (action.type){
        case ADD_BASKET:
            const isAlreadyIn = state.basket.findIndex(bask => bask.foodId === action.payload.foodId);

            if(isAlreadyIn === -1){
                const basketItem = new Basket(Math.random().toString(),action.payload.foodId,action.payload.foodName,action.payload.shopId
                    ,action.payload.size, action.payload.price,action.payload.quantity, new Date());
                return {...state,basket: state.basket.concat(basketItem)}
            }else{
                const basketItem = state.basket.find(bask => bask.foodId === action.payload.foodId);

                if(basketItem.size !== action.payload.size){
                    const basketItem = new Basket(Math.random().toString(),action.payload.foodId,action.payload.foodName,action.payload.shopId
                        ,action.payload.size, action.payload.price,action.payload.quantity, new Date());
                    return {...state,basket: state.basket.concat(basketItem)}
                }else{
                    basketItem.quantity++
                    const updatedBasket = [...state.basket];
                    updatedBasket.splice(isAlreadyIn,1);
                    updatedBasket.push(basketItem);
                    return {...state,basket: updatedBasket}
                }

            }

        case REMOVE_BASKET:
            const removeItem = state.basket.find(basketItem => basketItem.id === action.payload.id);
            const removeIndex = state.basket.findIndex(basketItem => basketItem.id === action.payload.id);

            if(removeItem.quantity === 1){
                const updateBasket = [...state.basket];
                updateBasket.splice(removeIndex,1);
                return {...state,basket: updateBasket}
            }else{
                removeItem.quantity--;
                removeItem.price = removeItem.price - action.payload.price

                const updateBasket = [...state.basket];
                updateBasket.splice(removeIndex,1);
                updateBasket.push(removeItem);
                return {...state,basket: updateBasket}
            }
        case CLEAR_BASKET:
            return {...state,basket: []}
        default: return state;
    }
}

export default BasketReducer;
