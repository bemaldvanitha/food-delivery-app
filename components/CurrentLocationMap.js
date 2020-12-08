import React from 'react';
import {Image,StyleSheet,Text,View,Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const CurrentLocationMap = (props) => {
    const location = props.curLocation;
    console.log(location);
    const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-m-marker+ff0000(${location.lng},${location.lat})/${location.lng},${location.lat},16,0/600x500@2x?access_token=pk.eyJ1IjoiYmVtYWxkdmFuaXRoYSIsImEiOiJja2M3MmRrZmgwZ3Q5MnpwOG1mY2tyaGZyIn0.pCTpNJ9P0idzkGsYp2t8dw`
    return(
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: imageUrl}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: screenWidth * 0.9,
        height: screenHeight * 0.3
    },
    imageContainer: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: screenHeight * 0.05,
        overflow: 'hidden'
    }
});

export default CurrentLocationMap;
