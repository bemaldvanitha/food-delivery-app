import {Shops} from '../../Data/dummy-data';

const initState = {
    shops: Shops
}

const ShopReducer = (state = initState,action) => {
    switch (action.type){

        default: return state;
    }
}

export default ShopReducer;