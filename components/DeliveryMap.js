import React from 'react';
import {StyleSheet,Text,View,Image,Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const DeliveryMap = (props) => {
    const location = props.location;
    const toLocation = props.toLocation;
    const type = props.type;

    const imageUrl1 = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/pin-s-bicycle+46f67b(${location.lng},${location.lat}),pin-s-restaurant+fb5050(${toLocation.longitude},${toLocation.latitude})/${location.lng},${location.lat},13,0/600x300@2x?access_token=pk.eyJ1IjoiYmVtYWxkdmFuaXRoYSIsImEiOiJja2M3MmRrZmgwZ3Q5MnpwOG1mY2tyaGZyIn0.pCTpNJ9P0idzkGsYp2t8dw`;

    const imageUrl2 = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/pin-l-bicycle+d90d0d(${location.lng},${location.lat}),pin-l-village+43d676(${toLocation.longitude},${toLocation.latitude})/${location.lng},${location.lat},12,0/600x500@2x?access_token=pk.eyJ1IjoiYmVtYWxkdmFuaXRoYSIsImEiOiJja2M3MmRrZmgwZ3Q5MnpwOG1mY2tyaGZyIn0.pCTpNJ9P0idzkGsYp2t8dw`;

    return(
        <View style={styles.imageContainer}>
            {<Image style={styles.image} source={{uri: type === 'shop' ? imageUrl1 : imageUrl2}}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: screenWidth * 0.9,
        height: screenHeight * 0.3
    },
    imageContainer: {
        marginHorizontal: screenWidth * 0.03,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: screenHeight * 0.05,
        overflow: 'hidden'
    }
});

export default DeliveryMap;