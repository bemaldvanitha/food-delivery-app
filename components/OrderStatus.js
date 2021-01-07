import React from 'react';
import {Image,Text,View,StyleSheet,Dimensions} from 'react-native';

const OrderStatus = (props) => {
    console.log(props.isShopAccept);
    console.log(props.isShopCompleted);
    console.log(props.isDeliverAccept);
    console.log(props.isDeliverCompleted);

    if(props.isShopAccept && props.isShopCompleted && props.isDeliverAccept && props.isDeliverCompleted){
        return (
            <View style={styles.box}>
                <Image source={require('../assets/images/order/deliveryFinish.png')} style={styles.image}/>
                <Text style={styles.text}>Deliver Finish</Text>
            </View>
        )
    }

    if(props.isShopAccept && props.isShopCompleted && props.isDeliverAccept && !props.isDeliverCompleted){
        return (
            <View style={styles.box}>
                <Image source={require('../assets/images/order/delivering.png')} style={styles.image}/>
                <Text style={styles.text}>Delivering</Text>
            </View>
        )
    }

    if(props.isShopAccept && props.isShopCompleted && !props.isDeliverAccept && !props.isDeliverCompleted){
        return (
            <View style={styles.box}>
                <Image source={require('../assets/images/order/cookCompleted.png')} style={styles.image}/>
                <Text style={styles.text}>Cook Finish</Text>
            </View>
        )
    }

    if(props.isShopAccept && !props.isShopCompleted && !props.isDeliverAccept && !props.isDeliverCompleted){
        return (
            <View style={styles.box}>
                <Image source={require('../assets/images/order/cooking.png')} style={styles.image}/>
                <Text style={styles.text}>Cooking</Text>
            </View>
        )
    }

    return(
        <View style={styles.box}>
            <Image source={require('../assets/images/order/waiting.png')} style={styles.image}/>
            <Text style={styles.text}>Waiting</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
    },
    image: {
        width: Dimensions.get('screen').width * 0.1,
        height: Dimensions.get('screen').height * 0.05
    },
    text: {
        fontFamily: 'cha-lanka',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default OrderStatus;