import {Shops} from '../../Data/dummy-data';
import {CHANGE_DISCOUNT,CHANGE_OFFERED_CATEGORIES} from '../actions/ShopAction';

const initState = {
    shops: Shops
}

const ShopReducer = (state = initState,action) => {
    switch (action.type){
        case CHANGE_DISCOUNT:
            const changeOfferShopIndex = state.shops.findIndex(shop => shop.id === action.payload.shopId);
            const changeOfferShop = state.shops.find(shop => shop.id === action.payload.shopId);

            changeOfferShop.offers = action.payload.discount;
            const changeShops = [...state.shops];
            changeShops.splice(changeOfferShopIndex,1);

            return {...state,shops: changeShops.concat(changeOfferShop)}

        case CHANGE_OFFERED_CATEGORIES:
            const changeCategoryShopIndex = state.shops.findIndex(shop => shop.id === action.payload.shopId);
            const changeCategoryShop = state.shops.find(shop => shop.id === action.payload.shopId);

            changeCategoryShop.offeredCategoryIds = [...changeCategoryShop.offeredCategoryIds,action.payload.catId];
            const changeShopList = [...state.shops];
            changeShopList.splice(changeCategoryShopIndex,1);

            return {...state,shops: changeShopList.concat(changeCategoryShop)}

        default: return state;
    }
}

export default ShopReducer;