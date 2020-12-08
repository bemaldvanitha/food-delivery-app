export const TOGGLE_FAVORITE_SHOPS = 'TOGGLE_FAVORITE_SHOPS';
export const TOGGLE_FAVORITE_FOODS = 'TOGGLE_FAVORITE_FOODS';

export const toggleFavoriteShops = (userId,shopId) => {
    return{
        type: TOGGLE_FAVORITE_SHOPS,
        payload: {
            userId: userId,
            shopId: shopId,
        }
    }
}

export const toggleFavoriteFoods = (userId,foodId) => {
    return{
        type: TOGGLE_FAVORITE_FOODS,
        payload: {
            userId: userId,
            foodId: foodId
        }
    }
}
