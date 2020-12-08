import React from 'react';
import {View, StyleSheet,Text,Dimensions} from 'react-native';
import {useDispatch,useSelector} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

import {removeBasket} from '../store/actions/BasketAction';
import {Colors} from '../constants/Colors';

const BasketItem = (props) => {
    const dispatch = useDispatch();
    const foodItem = useSelector(state => state.food.foods).find(food => food.id === props.foodId);
    let singleItemPrice = foodItem.fullPortionPrice;

    if(props.size === 'half'){
        singleItemPrice = foodItem.halfPortionPrice;
    }

    return(
        <View style={styles.box}>
            <Text style={styles.quantity}>{props.quantity} x </Text>
            <View style={styles.detailBox}>
                <Text style={styles.foodText}>{props.foodName}</Text>
                <Text style={styles.foodText}>{props.size}</Text>
            </View>
            <Text style={styles.price}>{props.price} $</Text>
            <Ionicons name="ios-close" size={40} color="red" onPress={() => {
                dispatch(removeBasket(props.id,singleItemPrice));
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.lightColor,
        marginHorizontal: 20,
        marginVertical: 5
    },
    detailBox: {
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'roboto'
    },
    foodText: {
        fontFamily: 'roboto-light'
    },
    price: {
        fontFamily: 'roboto-italic'
    },
});

export default BasketItem;