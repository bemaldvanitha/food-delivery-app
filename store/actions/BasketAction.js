export const ADD_BASKET = 'ADD_BASKET';
export const REMOVE_BASKET = 'REMOVE_BASKET';
export const CLEAR_BASKET = 'CLEAR_BASKET'

export const addBasket = (foodId,foodName,shopId,size,price,quantity) => {
    return {
        type: ADD_BASKET,
        payload: {
            foodId: foodId,
            foodName: foodName,
            shopId: shopId,
            size: size,
            price: price,
            quantity: quantity,
        }
    }
}

export const removeBasket = (id,price) => {
    return{
        type: REMOVE_BASKET,
        payload: {
            id: id,
            price: price
        }
    }
}

export const clearBasket = () => {
    return{
        type: CLEAR_BASKET,
    }
}
