import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {combineReducers,createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import Thunk from 'redux-thunk';

import FoodDeliveryNavigator from './navigation/foodDeliveryNavigator';
import ShopReducer from "./store/reducers/ShopReducer";
import FoodReducer from './store/reducers/FoodReducer';
import BasketReducer from "./store/reducers/BasketReducer";
import UsersReducer from "./store/reducers/UsersReducer";
import OrderReducer from "./store/reducers/OrdersReducer";

const rootReducer = combineReducers({
  shop: ShopReducer,
  food: FoodReducer,
  basket: BasketReducer,
  user: UsersReducer,
  order: OrderReducer
});

const store = createStore(rootReducer,applyMiddleware(Thunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
    'roboto-black': require('./assets/fonts/Roboto-Black.ttf'),
    'roboto-black-italic': require('./assets/fonts/Roboto-BlackItalic.ttf'),
    'roboto-thin': require('./assets/fonts/Roboto-Thin.ttf'),
    'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'cha-lanka': require('./assets/fonts/Chilanka-Regular.ttf'),
    'san-swashed': require('./assets/fonts/SansitaSwashed-VariableFont_wght.ttf'),
  });
}

export default function App() {
  const [isLoaded,setIsLoaded] = useState(false);
    if(!isLoaded){
      return (
          <AppLoading startAsync={fetchFonts} onFinish={() => setIsLoaded(true)}/>
      )
    }
    return (
      <Provider store={store}>
        <FoodDeliveryNavigator/>
      </Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'san-swashed'
  }
});
