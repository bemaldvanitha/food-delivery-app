import React from 'react';
import {View,StyleSheet,Text,ImageBackground,Dimensions,TouchableNativeFeedback} from 'react-native';
import {useSelector} from 'react-redux';

import OrderedFoodItem from "./OrderedFoodItem";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const UserOrder = (props) => {
    const orderedShop = useSelector(state => state.shop.shops).find(shop => shop.id === props.shopId);
    return(
        <TouchableNativeFeedback onPress={props.onSelect}>
            <View style={styles.container}>
                <View style={styles.box}>
                    <ImageBackground style={styles.imageBackground} source={{uri: orderedShop.imageUrl}}>
                        <Text style={styles.shopName}>{orderedShop.name}</Text>
                    </ImageBackground>
                </View>
                <View style={styles.mainDetailContainer}>
                    <Text style={styles.price}>{props.totalAmount} $</Text>
                    <Text style={styles.date}>{props.date.toString().substring(3,25)}</Text>
                </View>
                <View style={styles.subDetailContainer}>
                    {
                        !props.isShopAccept && <View style={styles.otherTextContainer}>
                            <Text style={styles.otherText}>Shop Accepted</Text>
                            <Text style={styles.otherText2}> { props.isShopAccept ? 'yes' : 'no' }</Text>
                        </View>
                    }
                    {
                        props.isShopAccept && <View style={styles.otherTextContainer}>
                            <Text style={styles.otherText}>Shop Completed</Text>
                            <Text style={styles.otherText2}>  { props.isShopCompleted ? 'yes' : 'no' }</Text>
                        </View>
                    }
                    {
                        !props.isDeliverAccept && <View style={styles.otherTextContainer}>
                            <Text style={styles.otherText}>Rider Accepted</Text>
                            <Text style={styles.otherText2}>  { props.isDeliverAccept ? 'yes' : 'no' }</Text>
                        </View>
                    }
                    {
                        props.isDeliverAccept && <View style={styles.otherTextContainer}>
                            <Text style={styles.otherText}>Rider Completed</Text>
                            <Text style={styles.otherText2}>  { props.isDeliverCompleted ? 'yes' : 'no' }</Text>
                        </View>
                    }
                </View>
                <View>
                    {
                        props.items.map(orderedItem => {
                          return(
                              <OrderedFoodItem key={orderedItem.foodId} id={orderedItem.foodId} foodName={orderedItem.foodName}
                                               price={orderedItem.price} quantity={orderedItem.quantity} size={orderedItem.size}/>
                          )
                        })
                    }
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: screenHeight * 0.02,
        marginHorizontal: screenWidth * 0.01,
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 0
        },
        shadowOpacity: 0.26,
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: '#fff2de'
    },
    box: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    imageBackground: {
        width: screenWidth * 0.95,
        height: screenHeight * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: screenHeight * 0.005,
        backgroundColor: 'black',
        borderRadius: 10,
        overflow: 'hidden'
    },
    shopName: {
        fontFamily: 'roboto-bold',
        fontSize: 22,
        color: 'white',
        letterSpacing: 2
    },
    mainDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 5
    },
    price: {
        fontFamily: 'roboto-bold',
        fontSize: 18
    },
    date: {
        fontFamily: 'roboto-italic',
    },
    subDetailContainer: {
        marginVertical: 5
    },
    otherText: {
        fontFamily: 'cha-lanka',
        fontSize: 16,
    },
    otherText2: {
        fontFamily: 'san-swashed',
        fontSize: 16
    },
    otherTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
});

export default UserOrder;