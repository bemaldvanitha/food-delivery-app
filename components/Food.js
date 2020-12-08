import React from 'react';
import {View,StyleSheet,Text,Image,Dimensions,TouchableNativeFeedback} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const Food = (props) => {
    return(
        <TouchableNativeFeedback onPress={props.onSelect}>
            <View style={styles.box}>
                <View style={styles.detailContainer}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.otherDetail}>{props.description}</Text>
                    <Text style={styles.price}>$ {props.fullPortionPrice.toString()}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{uri: props.imageUrl}} style={styles.image}/>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    box : {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: screenHeight * 0.015,
      borderBottomWidth: 0.5
    },
    image: {
        width: screenWidth * 0.3,
        height: screenHeight * 0.14,
    },
    imageContainer: {
        marginHorizontal: screenWidth * 0.05,
        marginVertical: screenHeight * 0.01,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden'
    },
    detailContainer: {
        paddingHorizontal: screenWidth * 0.08,
        justifyContent: 'space-around',
        width: screenWidth * 0.6
    },
    name: {
        fontFamily: 'roboto-bold',
        fontSize: 16
    },
    otherDetail: {
        fontFamily: 'san-swashed'
    },
    price: {
        fontFamily: 'roboto-italic',
    }
});

export default Food;
