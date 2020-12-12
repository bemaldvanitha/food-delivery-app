import React from 'react';
import {View,StyleSheet,Text,Image,Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const OrderMap = (props) => {
    const userLocation = props.userLocation;
    const shopLocation = props.shopLocation;
    const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-shop+fa0000(${shopLocation.longitude},${shopLocation.latitude}),pin-s-star+05bd11(${userLocation.longitude},${userLocation.latitude})/${shopLocation.longitude},${shopLocation.latitude},15,0/600x500@2x?access_token=pk.eyJ1IjoiYmVtYWxkdmFuaXRoYSIsImEiOiJja2M3MmRrZmgwZ3Q5MnpwOG1mY2tyaGZyIn0.pCTpNJ9P0idzkGsYp2t8dw`

    return(
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: url}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: screenHeight * 0.01,
        marginHorizontal: screenWidth * 0.03
    },
    image: {
        height: screenHeight * 0.3,
        width: screenWidth * 0.95
    }
});

export default OrderMap;