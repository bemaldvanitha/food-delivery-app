import {Foods} from '../../Data/dummy-data';

const initState = {
    foods: Foods
}

const FoodReducer = (state = initState,action) => {
    switch (action.type){

        default: return state;
    }
}

export default FoodReducer;