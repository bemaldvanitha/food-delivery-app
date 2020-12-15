import {Foods} from '../../Data/dummy-data';
import {DELETE_FOOD,EDIT_FOOD,ADD_FOOD} from '../actions/FoodAction';
import FoodItem from '../../models/FoodItem';

const initState = {
    foods: Foods
}

const FoodReducer = (state = initState,action) => {
    switch (action.type){
        case EDIT_FOOD:
            const editIndex = state.foods.findIndex(food => food.id === action.payload.id);
            const editFood = state.foods.find(food => food.id === action.payload.id);

            const updatedFood = new FoodItem(editFood.id,action.payload.catId,editFood.shopId,action.payload.name,action.payload.description,
                action.payload.fullPortionPrice,action.payload.halfPortionPrice,action.payload.imageUrl,editFood.rating,editFood.ratedNumber,
                action.payload.isVegan,action.payload.isVegetarian,action.payload.isSugarFree);

            const newFoodList = [...state.foods];
            newFoodList.splice(editIndex,1);
            return {...state,foods: newFoodList.concat(updatedFood)}

        case ADD_FOOD:
            const newFood = new FoodItem(Math.random().toString(),action.payload.catId,action.payload.shopId,action.payload.name,
                action.payload.description,action.payload.fullPortionPrice,action.payload.halfPortionPrice,action.payload.imageUrl,0,0,
                action.payload.isVegan,action.payload.isVegetarian,action.payload.isSugarFree);
            return {...state,foods: state.foods.concat(newFood)}

        case DELETE_FOOD:
            const deleteIndex = state.foods.findIndex(food => food.id === action.payload.id);

            const newFoodsList = [...state.foods];
            newFoodsList.splice(deleteIndex,1);
            return {...state,foods: newFoodsList}

        default: return state;
    }
}

export default FoodReducer;