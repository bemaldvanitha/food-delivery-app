import React from 'react';
import {StyleSheet,Text,View,ImageBackground,Dimensions,TouchableNativeFeedback} from 'react-native';

const CategoryItem = (props) => {
    return(
        <TouchableNativeFeedback onPress={props.onSelect}>
            <View style={styles.box}>
                <ImageBackground source={ props.imageUrl } style={styles.image}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{props.name}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    box: {
      backgroundColor: 'white',
      marginHorizontal: 10,
      marginVertical: 10,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      overflow: 'hidden',
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowRadius: 8,
      shadowOffset: {
          width: 2,
          height: 0
      },
      elevation: 6
    },
    image: {
        width: Dimensions.get('screen').width * 0.45,
        height: Dimensions.get('screen').height * 0.18,
        justifyContent: 'flex-end',
        backgroundColor: 'black',
        opacity: 0.6,
    },
    textContainer: {
        marginVertical: Dimensions.get('screen').height * 0.08
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'roboto-bold',
        fontSize: 22
    }
});

export default CategoryItem;
