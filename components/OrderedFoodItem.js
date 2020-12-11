import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {Colors} from '../constants/Colors';

const OrderedFoodItem = (props) => {
    return(
        <View style={styles.box}>
            <Text style={styles.quantity}>x {props.quantity}</Text>
            <Text style={styles.foodName}>{props.foodName}</Text>
            <MaterialCommunityIcons name={props.size === 'full' ? "circle-slice-8" : "circle-slice-4"} size={32} color='gold' />
            <Text style={styles.price}>{props.price} $</Text>
        </View>
    )
}

const styles =  StyleSheet.create({
    box: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 8,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingVertical: 5,
        marginHorizontal: 10
    },
    quantity: {
        fontFamily: 'roboto-bold'
    },
    foodName: {
        fontFamily: 'san-swashed',
        color: 'grey',
        fontSize: 16,
        width: '60%',
        textAlign: 'center'
    },
    price: {
        fontFamily: 'roboto-italic'
    }
});

export default OrderedFoodItem;