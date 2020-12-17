import {Shops} from '../../Data/dummy-data';
import {CHANGE_DISCOUNT,CHANGE_OFFERED_CATEGORIES,EDIT_SHOP} from '../actions/ShopAction';
import Shop from '../../models/Shop';

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

        case EDIT_SHOP:
            const editShopIndex = state.shops.findIndex(shop => shop.id === action.payload.shopId);
            const editShop = state.shops.find(shop => shop.id === action.payload.shopId);

            editShop.name = action.payload.name;
            editShop.detail = action.payload.detail;
            editShop.locationName = action.payload.locationName;
            editShop.imageUrl = action.payload.imageUrl;

            const updatedShopList = [...state.shops];
            updatedShopList.splice(editShopIndex,1);

            return {...state,shops: updatedShopList.concat(editShop)}

        default: return state;
    }
}

export default ShopReducer;