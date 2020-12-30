import React,{useState} from 'react';
import {View,Text,Image,StyleSheet,Button,Dimensions,Alert} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import {Colors} from '../constants/Colors';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ImagePickers = (props) => {
    const [pickedImage,setPickedImage] = useState('');

    const grantPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL);
        if(result.status !== 'granted'){
            Alert.alert('permission error','you need to grant this permission before',[
                {text: 'ok'}
            ]);
            return false;
        }
        return true;
    }

    const takeImage = async () => {
        const hasPermission = await grantPermissions();
        if(!hasPermission){
            return;
        }
        const image = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.4,
        })
        // console.log(image);

        props.handleImage(image);
        setPickedImage(image.uri);
    }

    return(
        <View style={styles.container}>
            <View style={styles.box}>
                {!pickedImage && <Text>no picture</Text>}
                <Image source={{uri: pickedImage}} style={styles.image}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button title='get image' color={Colors.offerColor} onPress={takeImage}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    box: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'black',
        height: screenHeight * 0.15,
        width: screenWidth * 0.3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {

    }
});

export default ImagePickers;