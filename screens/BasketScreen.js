import React from 'react';
import {View,StyleSheet,Text,Image,TouchableNativeFeedback,FlatList,Dimensions} from 'react-native';
import {useSelector} from 'react-redux';

import BasketItem from "../components/BasketItem";
import {Colors} from '../constants/Colors';
import {projectAuth} from '../firebase/firebase';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const BasketScreen = (props) => {
    const userId = projectAuth.currentUser.uid;
    const basket = useSelector(state => state.basket.basket);
    const shop = useSelector(state => state.shop.shops);
    const curUser = useSelector(state => state.user.users).find(user => user.id === userId);
    let selShop = shop[0];

    if(basket.length !== 0 ){
        selShop = shop.find(shop => shop.id === basket[0].shopId);
    }

    return(
        <View style={styles.screen}>
            <View style={styles.shopContainer}>
                <Text style={styles.shopName}>{selShop.name}</Text>
                <Text style={styles.shopLocation}>{selShop.locationInString}</Text>
            </View>
            <View style={styles.locationContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: 'https://gisgeography.com/wp-content/uploads/2020/06/Washington-DC-Road-Map.jpg'}}/>
                </View>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{curUser.address}</Text>
                    {/*<TouchableNativeFeedback>
                        <Text style={styles.addNotes}>Add Notes</Text>
                    </TouchableNativeFeedback>*/}
                </View>
            </View>
            <View style={styles.ordersContainer}>
                <View style={styles.ordersDetailContainer}>
                    <Text style={styles.title}>Your Basket</Text>
                    <TouchableNativeFeedback onPress={() => {
                        props.navigation.pop();
                    }}>
                        <Text style={styles.addNotes}>Add Items</Text>
                    </TouchableNativeFeedback>
                </View>
                <FlatList data={basket} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                    return(
                        <BasketItem id={data.item.id} foodName={data.item.foodName} size={data.item.size} price={data.item.price}
                                    quantity={data.item.quantity} foodId={data.item.foodId}/>
                    )
                }}/>
            </View>

            <TouchableNativeFeedback onPress={() => {
                props.navigation.navigate({routeName: 'setAddress'})
            }}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Add Order</Text>
                </View>
            </TouchableNativeFeedback>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {

    },
    shopContainer: {
        alignItems: 'center',
        marginVertical: screenHeight * 0.02
    },
    shopName: {
        fontFamily: 'roboto-bold',
        fontSize: 26
    },
    shopLocation: {
        fontFamily: 'roboto-italic',
        fontSize: 16
    },
    locationContainer: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: 'grey',
        justifyContent: 'space-around'
    },
    imageContainer: {
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: screenHeight * 0.015
    },
    image: {
        width: screenWidth * 0.35,
        height: screenHeight * 0.18
    },
    addressContainer: {
        width: screenWidth * 0.4,
        justifyContent: 'space-around'
    },
    address: {
        fontFamily: 'cha-lanka'
    },
    addNotes: {
        fontFamily: 'san-swashed',
        color: Colors.secondaryColor,
        fontSize: 16
    },
    ordersContainer: {
        height: screenHeight * 0.35,
        marginVertical: 10
    },
    ordersDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'roboto'
    },
    buttonContainer: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight * 0.05,
        marginHorizontal: screenWidth * 0.15,
        marginVertical: screenHeight * 0.02
    },
    buttonText: {
        color: Colors.secondaryColor,
        fontFamily: 'cha-lanka',
        fontSize: 18
    }
})

export default BasketScreen;
