import React from 'react';
import {Text, StyleSheet,View,ImageBackground,Dimensions} from 'react-native';

import {Colors} from '../constants/Colors';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const DeliveryItem = (props) => {
    return(
        <View style={styles.card}>
            <ImageBackground source={require('../assets/images/order/order-background.png')} style={styles.image}>

                    <View>
                        <Text style={styles.cardTitle}>{props.shopName}</Text>
                    </View>
                    <View style={styles.deliveryContainer}>
                        <Text style={styles.otherText}>Delivery To: </Text>
                        <Text style={styles.otherSubText}>{props.userName}</Text>
                    </View>
                    <View style={styles.otherDetailContainer}>
                        <Text style={styles.otherSubText}>{props.totalAmount.toString()} $ </Text>
                        <Text style={styles.otherSubText}>{props.date.toString().substring(0,21)}</Text>
                    </View>
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badge}>
                            {props.isShopCompleted ? 'finished' : 'cooking'}
                        </Text>
                    </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
      width: screenWidth * 0.7,
      height: screenHeight * 0.3,
      marginTop: screenHeight * 0.01,
        paddingHorizontal: screenWidth * 0.05,
        backgroundColor: 'black',
        opacity: 0.7,
    },
    card: {
        paddingHorizontal: screenWidth * 0.03,
        marginHorizontal: screenWidth * 0.12,
    },
    cardTitle: {
        fontFamily: 'roboto-bold',
        fontSize: 28,
        textAlign: 'center',
        paddingVertical: screenHeight * 0.03,
        color: 'white'
    },
    deliveryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    otherDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    otherText: {
        fontFamily: 'roboto-italic',
        color: 'white'
    },
    otherSubText: {
        fontFamily: 'cha-lanka',
        color: 'white'
    },
    badge: {
        fontFamily: 'san-swashed',
        fontSize: 20,
        color: 'white'
    },
    badgeContainer: {
        marginVertical: 10,
        marginHorizontal: screenWidth * 0.15,
        backgroundColor: Colors.primaryColor,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default DeliveryItem;