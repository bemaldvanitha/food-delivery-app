import React,{useState} from 'react';
import {View,StyleSheet,Text,Button,ScrollView,Modal,TouchableNativeFeedback,Dimensions} from 'react-native';
import {useDispatch,useSelector} from 'react-redux';

import {addOrders} from '../store/actions/OrdersAction';
import {clearBasket} from '../store/actions/BasketAction';
import FetchLocation from '../components/FetchLocation';
import CurrentLocationMap from "../components/CurrentLocationMap";
import AddNotes from "../components/AddNotesModal";
import OrderItem from '../models/OrderItem';
import Location from "../models/Location";
import {projectAuth} from '../firebase/firebase';

import {Colors} from '../constants/Colors';

const SetDeliveryAddressScreen = (props) => {
    const userId = projectAuth.currentUser.uid;
    const currentUser = useSelector(state => state.user.users).find(user => user.id === userId);
    const currentBasket = useSelector(state => state.basket.basket);
    const orderShop = useSelector(state => state.shop.shops).find(shop => shop.id === currentBasket[0].shopId);
    const dispatch = useDispatch();

    const [location,setLocation] = useState();
    const [showModal,setShowModal] = useState(false);
    const [extraNotes,setExtraNotes] = useState('');
    const orderItems = [];
    let totalAmount = 0;

    currentBasket.map(basketItem => {
        totalAmount += basketItem.quantity * basketItem.price;
       const orderItem = new OrderItem(basketItem.foodId,basketItem.foodName,basketItem.price,basketItem.quantity,basketItem.size);
       orderItems.push(orderItem);
    });

    const setCurrentLocation = (loc) => {
        setLocation(loc);
    }

    const cancelOrder = () => {
        dispatch(clearBasket());
        props.navigation.navigate({routeName: 'home'});
    }

    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    }

    const setNotes = (text) => {
        setExtraNotes(text);
    }

    const addOrder = () => {
        const finalLocation = new Location(location.lat,location.lng);
        dispatch(
            addOrders(orderItems,extraNotes,totalAmount,currentUser.id,currentUser.firstName,
                finalLocation,orderShop.id,orderShop.name,orderShop.locationInLatLng)
        );
        props.navigation.navigate({routeName: 'home'});
    }

    return(
        <ScrollView>

            <Modal visible={showModal} animationType='slide'>
                <AddNotes cancelModal={toggleModal} setNotes={setNotes}/>
            </Modal>


            <View style={styles.screen}>

                <View style={styles.locationContainer}>
                    <FetchLocation onLocation={setCurrentLocation}/>
                    {
                        location && <CurrentLocationMap curLocation={location}/>
                    }
                </View>

                <TouchableNativeFeedback onPress={toggleModal}>
                    <Text style={styles.addNotes}>Add Notes</Text>
                </TouchableNativeFeedback>

                <View style={styles.buttonContainer}>
                    <Button title='place-order' onPress={addOrder} color={Colors.primaryColor} style={styles.button}/>
                    <Button title='cancel' onPress={cancelOrder} color={Colors.bannerColor} style={styles.button}/>
                </View>

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    locationContainer: {
        justifyContent: 'space-between'
    },
    buttonContainer: {
        width: '80%',
    },
    button: {
        marginVertical: 10
    },
    addNotes: {
        fontFamily: 'san-swashed',
        color: Colors.secondaryColor,
        fontSize: 16,
        paddingVertical: 10
    },
})

export default SetDeliveryAddressScreen;
