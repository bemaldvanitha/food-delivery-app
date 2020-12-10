export const TOGGLE_FAVORITE_SHOPS = 'TOGGLE_FAVORITE_SHOPS';
export const TOGGLE_FAVORITE_FOODS = 'TOGGLE_FAVORITE_FOODS';
export const EDIT_USER = 'EDIT_USER';

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

export const editUser = (userId,firstName,lastName,email,address,telNumber,imageUrl,location,isDeliveryMan,isShopOwner) => {
    console.log(firstName);
    return{
        type: EDIT_USER,
        payload: {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            telNumber: telNumber,
            imageUrl: imageUrl,
            location: location,
            isDeliveryMan: isDeliveryMan,
            isShopOwner: isShopOwner
        }
    }
}