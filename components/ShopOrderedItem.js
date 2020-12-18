import React from 'react';
import {View,Text,StyleSheet,Image,Dimensions} from 'react-native';

import OrderedFoodItem from "./OrderedFoodItem";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ShopOrderedItem = (props) => {
    return(
        <View style={styles.box}>
            <View style={styles.mainDetailContainer}>
                <Text style={styles.amount}>{props.totalAmount} $</Text>
                <Text style={styles.date}>{props.date.toString().substring(0,21)}</Text>
            </View>
            <View style={styles.otherDetailContainer}>
                <Text style={styles.label}>Ordered name: </Text>
                <Text style={styles.orderedName}>{props.orderName}</Text>
            </View>
            <View style={styles.otherDetailContainer}>
                <Text style={styles.label}>Notes: </Text>
                <Text style={styles.notes}>{props.notes}</Text>
            </View>
            <View>
                {
                    props.items.map(orderItem => {
                        return(
                            <OrderedFoodItem key={orderItem.foodId} quantity={orderItem.quantity} foodName={orderItem.foodName}
                                size={orderItem.size} price={orderItem.price}/>
                        )
                    })
                }
            </View>

            <View style={styles.buttonContainer}>
                <View>
                    <Image source={require('../assets/images/order/cooking.png')} style={styles.image}/>
                </View>
                <View>
                    <Image source={require('../assets/images/order/cookCompleted.png')} style={styles.image}/>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        marginVertical: screenHeight * 0.02,
        marginHorizontal: screenWidth * 0.03,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingVertical: screenHeight * 0.02,
        paddingHorizontal: screenWidth * 0.02,
        shadowOpacity: 0.26,
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOffset: {
            width: 2,
            height: 0
        },
        elevation: 5,
        backgroundColor: '#e8f7f4',
    },
    mainDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    amount: {
        fontFamily: 'roboto-bold',
        fontSize: 22
    },
    date: {
        fontFamily: 'roboto-italic',
    },
    image: {
        width: screenWidth * 0.25,
        height: screenHeight * 0.11
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: screenHeight * 0.01
    },
    otherDetailContainer: {
        marginVertical: screenHeight * 0.005,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    notes: {
        fontFamily: 'san-swashed',
        //width: screenWidth * 0.7,
        fontSize: 16
    },
    orderedName: {
        fontFamily: 'san-swashed',
        fontSize: 16
    },
    label: {
        width: screenWidth * 0.3,
        fontFamily: 'cha-lanka'
    }
});

export default ShopOrderedItem;