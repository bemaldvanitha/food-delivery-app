import React,{useState} from 'react';
import {View,StyleSheet,Text,Image,ScrollView,Switch,Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';

import {Colors} from '../constants/Colors';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const EditUserScreen = (props) => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [address,setAddress] = useState('');
    const [telNumber,setTelNumber] = useState('');
    const [imageUrl,setImageUrl] = useState('https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg');
    const [location,setLocation] = useState('');
    const [isDeliveryMan,setIsDeliveryMan] = useState(false);
    const [isShopOwner,setIsShopOwner] = useState(false);

    return(
        <ScrollView>
            <View>
                <View>
                    <TextInput value={firstName} onChangeText={(text) => setFirstName(text)} label='enter first name'/>
                </View>
                <View>
                    <TextInput value={lastName} onChangeText={(text) => setLastName(text)} label='enter last name'/>
                </View>
                <View>
                    <TextInput value={email} onChnageText={(text) => setEmail(text)} label='enter email'/>
                </View>
                <View>
                    <TextInput value={address} onChageText={(text) => setAddress(text)} label='enter address' multiline={true} numberOfLines={3}/>
                </View>
                <View>
                    <TextInput value={telNumber} onChangeText={(text) => setTelNumber(text)} label='enter telephone number'/>
                </View>
                <View style={styles.imageInputContainer}>
                    <Image source={{uri: imageUrl}} style={styles.image}/>
                    <TextInput style={styles.imageUrlInput} value={imageUrl} onChangeText={(text) => setImageUrl(text)} label='enter image url' multiline={true} numberOfLines={4}/>
                </View>
                <View>
                    <TextInput value={location} onChangeText={(text) => setLocation(text)} label='enter location'/>
                </View>
                <View>
                    <Text>Is Delivery Man</Text>
                    <Switch value={isDeliveryMan} onValueChange={(val) => setIsDeliveryMan(val)}/>
                </View>
                <View>
                    <Text>Is Shop Owner</Text>
                    <Switch value={isShopOwner} onValueChange={(val) => setIsShopOwner(val)}/>
                </View>
            </View>
        </ScrollView>
    )
}

EditUserScreen.navigationOptions = {
    headerTitle: 'Edit User'
}

const styles = StyleSheet.create({
    image: {
        height: screenHeight * 0.15,
        width: screenWidth * 0.3
    },
    imageUrlInput: {
        width: screenWidth * 0.7
    },
    inputContainer: {

    },
    imageInputContainer: {
        flexDirection: 'row'
    }
});

export default EditUserScreen;
