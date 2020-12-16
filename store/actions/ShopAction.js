export const CHANGE_DISCOUNT = 'CHANGE_DISCOUNT';
export const CHANGE_OFFERED_CATEGORIES = 'CHANGE_OFFERED_CATEGORIES';

export const changeDiscount = (shopId,discount) => {
    return{
        type: CHANGE_DISCOUNT,
        payload: {
            shopId: shopId,
            discount: discount
        }
    }
}

export const changeOfferedCategories = (shopId,catId) => {
    return{
        type: CHANGE_OFFERED_CATEGORIES,
        payload: {
            shopId: shopId,
            catId: catId
        }
    }
}