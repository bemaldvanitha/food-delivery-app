import {Users} from '../../Data/dummy-data';
import User from '../../models/User';
import Location from "../../models/Location";
import {TOGGLE_FAVORITE_FOODS,TOGGLE_FAVORITE_SHOPS,EDIT_USER,FETCH_USERS,ADD_USER} from '../actions/UsersAction'

const initState = {
    users: Users
}

const UsersReducer = (state = initState,action) => {
    switch (action.type){
        case TOGGLE_FAVORITE_SHOPS:

            const favIndex = state.users.find(user => user.id === action.payload.userId).favoriteShopIds.findIndex(favId => favId === action.payload.shopId);
            const user = state.users.find(user => user.id === action.payload.userId);
            const userIndex = state.users.findIndex(user => user.id === action.payload.userId);
            if(favIndex === -1){

                user.favoriteShopIds.push(action.payload.shopId);
                const users = state.users.splice(userIndex,1);
                return {...state,users: users.concat(user)}
            }else{

                user.favoriteShopIds.splice(favIndex,1);
                const users = [...state.users];
                users.splice(userIndex,1);
                return {...state,users: users.concat(user)}
            }

        case TOGGLE_FAVORITE_FOODS:

            const favoIndex = state.users.find(user => user.id === action.payload.userId).favoriteFoodIds.findIndex(favId => favId === action.payload.foodId);
            const curUser = state.users.find(user => user.id === action.payload.userId);
            const curUserIndex = state.users.findIndex(user => user.id === action.payload.userId);
            if(favoIndex === -1){

                curUser.favoriteFoodIds.push(action.payload.foodId);
                const users = state.users.splice(curUserIndex,1);
                return {...state,users: users.concat(curUser)}
            }else{

                curUser.favoriteFoodIds.splice(favoIndex,1);
                const users = [...state.users];
                users.splice(curUserIndex,1);
                return {...state,users: users.concat(curUser)}
            }

        case EDIT_USER:
            const editUserIndex = state.users.findIndex(user => user.id === action.payload.userId);
            const editUser = state.users.find(user => user.id === action.payload.userId);

            const updatedUser = new User(editUser.id,action.payload.firstName,action.payload.lastName,action.payload.address,
                action.payload.telNumber,action.payload.email,action.payload.imageUrl,action.payload.location,editUser.locationLatLng,
                editUser.favoriteFoodIds,editUser.favoriteShopIds,action.payload.isDeliveryMan,action.payload.isShopOwner);

            const updatedList = [...state.users];
            updatedList.splice(editUserIndex,1);
            return {...state,users: updatedList.concat(updatedUser)}

        case FETCH_USERS:
            return {...state,users: action.payload.users}

        case ADD_USER:
            const newUser = new User(action.payload.id,action.payload.firstName,action.payload.lastName,action.payload.address,
                action.payload.telNumber,action.payload.email,action.payload.imageUrl,action.payload.location,new Location(0,0),
                [],[],action.payload.isDeliverMan,action.payload.isShopOwner);

            return {...state,users: action.payload.users.concat(newUser)}

        default: return state;
    }
}

export default UsersReducer;
