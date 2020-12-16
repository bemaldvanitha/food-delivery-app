import {Shops} from '../../Data/dummy-data';
import {CHANGE_DISCOUNT} from '../actions/ShopAction';

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

        default: return state;
    }
}

export default ShopReducer;