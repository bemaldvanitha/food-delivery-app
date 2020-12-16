import React,{useState} from 'react';
import {View,StyleSheet,Text,ScrollView,Image,Dimensions,Platform} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';

import {Colors} from '../constants/Colors';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const EditShopScreen = (props) => {
    const currentShopId = props.navigation.getParam('shopId');

    const [shopName,setShopName] = useState('');
    const [shopDetail,setShopDetail] = useState('');
    const [shopLocation,setShopLocation] = useState('');
    const [shopImageUrl,setShopImageUrl] = useState('https://cdn.pixabay.com/photo/2016/11/29/05/07/baked-goods-1867459_1280.jpg');

    return(
        <ScrollView>
            <View>
                <View style={styles.inputContainer}>
                    <TextInput label='enter shop name' value={shopName} onChangeText={(text) => setShopName(text)} mode='flat'
                               keyboardType='default'/>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput label='enter shop detail' value={shopDetail} onChangeText={(text) => setShopDetail(text)} mode='flat'
                               keyboardType='default' multiline={true} numberOfLines={4}/>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput label='enter shop location' value={shopLocation} onChangeText={(text) => setShopLocation(text)} mode='flat'
                               keyboardType='default' />
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{uri: shopImageUrl}} style={styles.image}/>
                    <TextInput label='enter shop image' value={shopImageUrl} onChangeText={(text) => setShopImageUrl(text)} mode='flat'
                               keyboardType='default' multiline={true} numberOfLines={4} style={styles.imageUrlInput}/>
                </View>
            </View>
        </ScrollView>
    )
}

EditShopScreen.navigationOptions = {
    headerTitle: 'edit shop',
    headerRight: () => {
        return(
            <View style={{marginTop: 15,marginRight: 20}}>
                <Ionicons name="ios-save" size={28} color={Platform.OS === 'android' ? 'white' : Colors.primaryColor } onPress={() => {

                }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: screenWidth * 0.3,
        height: screenHeight * 0.15,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: screenHeight * 0.02
    },
    imageUrlInput: {
        width: screenWidth * 0.6,
    },
    inputContainer: {
        marginVertical: screenHeight * 0.01,
        marginHorizontal: screenWidth * 0.04
    }
});

export default EditShopScreen;