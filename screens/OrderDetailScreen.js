import React from 'react';
import {View,StyleSheet,Text,Dimensions,ScrollView,ImageBackground,Image} from 'react-native';
import {useSelector} from 'react-redux';

import OrderedFoodItem from "../components/OrderedFoodItem";
import {Colors} from '../constants/Colors';
import OrderStatus from "../components/OrderStatus";
import OrderMap from "../components/OrderMap";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const OrderDetailScreen = (props) => {
    const orderId = props.navigation.getParam('id');
    const currentOrder = useSelector(state => state.order.orders).find(order => order.id === orderId);
    const currentOrderedShop = useSelector(state => state.shop.shops).find(shop => shop.id === currentOrder.shopId);

    return(
        <ScrollView>
            <View style={styles.screen}>
                <ImageBackground style={styles.imageBackground} source={{uri: currentOrderedShop.imageUrl}}>
                    <Text style={styles.name}>{currentOrderedShop.name}</Text>
                </ImageBackground>
            </View>
            <View style={styles.mainDetailContainer}>
                <Text style={styles.price}>{currentOrder.totalAmount} $</Text>
                <Text style={styles.date}>{currentOrder.date.toString().substring(3,25)}</Text>
            </View>
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>Status:</Text>
                <OrderStatus isShopAccept={currentOrder.isShopAccept} isShopCompleted={currentOrder.isShopCompleted}
                             isDeliverAccept={currentOrder.isDeliverAccept} isDeliverCompleted={props.isDeliverCompleted}/>
            </View>
            <OrderMap userLocation={currentOrder.userLocation} shopLocation={currentOrder.shopLocation}/>
            <View>
                {
                    currentOrder.items.map(orderedItem => {
                        return(
                            <OrderedFoodItem key={orderedItem.foodId} id={orderedItem.foodId} foodName={orderedItem.foodName}
                                             price={orderedItem.price} quantity={orderedItem.quantity} size={orderedItem.size}/>
                                             )
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {

    },
    imageBackground: {
        width: screenWidth * 0.95,
        height: screenHeight * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: screenWidth * 0.02,
        marginVertical: screenHeight * 0.005
    },
    name: {
        color: 'white',
        fontFamily: 'roboto-bold',
        fontSize: 24,
        backgroundColor: 'grey',
        opacity: 0.8,
        paddingHorizontal: screenWidth * 0.03
    },
    mainDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 5
    },
    price: {
        fontFamily: 'roboto-bold',
        fontSize: 18,
        color: Colors.primaryColor
    },
    date: {
        fontFamily: 'roboto-italic',
        color: Colors.offerColor
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: screenHeight * 0.02,
        alignItems: 'center'
    },
    statusText: {
        fontFamily: 'roboto-black',
        fontSize: 18
    }
});

export default OrderDetailScreen;