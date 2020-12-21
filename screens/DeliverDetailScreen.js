import React,{useState} from 'react';
import {View,StyleSheet,Text,Button,ScrollView,Image,Dimensions,TouchableNativeFeedback} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

import DeliveryMap from "../components/DeliveryMap";
import FetchLocation from "../components/FetchLocation";
import {deliveryAccept,deliveryFinish} from '../store/actions/OrdersAction';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const DeliveryDetailScreen = (props) => {
    const dispatch = useDispatch();
    const orderId = props.navigation.getParam('orderId');
    const currentOrder = useSelector(state => state.order.orders).find(order => order.id === orderId);

    const [currentLocation,setCurrentLocation] = useState();

    console.log(currentOrder);

    const setLocation = (loc) => {
        setCurrentLocation(loc);
    }

    const acceptDeliver = () => {
        console.log('accept')
        dispatch(deliveryAccept(orderId));
    }

    const finishDeliver = () => {
        console.log('finish')
        dispatch(deliveryFinish(orderId));
    }

    return(
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.mainDetailContainer}>
                    <Text style={styles.shopName}>{currentOrder.shopName}</Text>
                </View>
                <View style={styles.mainDetailContainer}>
                    <Text style={styles.userName}>{currentOrder.userName}</Text>
                </View>
                <View style={styles.shopContainer}>
                    <Text style={styles.amount}>{currentOrder.totalAmount.toString()} $</Text>
                    <Text style={styles.date}>{currentOrder.date.toString().substring(0,21)}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <TouchableNativeFeedback onPress={acceptDeliver}>
                        <Image source={require('../assets/images/order/delivering.png')}
                               style={currentOrder.isDeliverAccept ? styles.image : styles.shadeImage}/>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={finishDeliver}>
                        <Image source={require('../assets/images/order/deliveryFinish.png')}
                               style={currentOrder.isDeliverCompleted ? styles.image: styles.shadeImage}/>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.locationContainer}>
                    <FetchLocation onLocation={setLocation}/>
                </View>
                {
                    currentOrder.isDeliverAccept && currentLocation && <View style={styles.maps}>
                        <DeliveryMap location={currentLocation} type='shop' toLocation={currentOrder.shopLocation}/>
                        <DeliveryMap location={currentLocation} type='home' toLocation={currentOrder.userLocation}/>
                    </View>
                }
            </View>
        </ScrollView>
    )
}

DeliveryDetailScreen.navigationOptions = {
    headerTitle: 'Deliver detail'
}

const styles = StyleSheet.create({
    screen: {

    },
    shopContainer: {
        flexDirection: 'row',
        marginVertical: screenHeight * 0.04,
        justifyContent: 'space-around'
    },
    amount: {
        fontFamily: 'roboto-black-italic',
        fontSize: 22
    },
    date: {
        fontFamily: 'roboto-light'
    },
    mainDetailContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: screenHeight * 0.01
    },
    shopName: {
        fontFamily: 'roboto-bold',
        fontSize: 32,
    },
    userName: {
        fontFamily: 'roboto-italic',
        fontSize: 22,
        color: 'grey'
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    shadeImage: {
      opacity: 0.5,
        width: screenWidth * 0.3,
        height: screenHeight * 0.15
    },
    image: {
        width: screenWidth * 0.3,
        height: screenHeight * 0.15
    },
    locationContainer: {
        alignItems: 'center',
        marginVertical: screenHeight * 0.02
    },
    maps: {

    }
})

export default DeliveryDetailScreen;