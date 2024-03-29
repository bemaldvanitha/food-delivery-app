import React,{useState,useCallback,useEffect} from 'react';
import {View,StyleSheet,Text,Image,ScrollView,Switch,Dimensions,Alert,Platform,ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';
import {useSelector,useDispatch} from 'react-redux';

import {Colors} from '../constants/Colors';
import {editUser,addUser} from '../store/actions/UsersAction';
import ImagePickers from "../components/ImagePicker";
import {projectStorage} from '../firebase/firebase';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const EditUserScreen = (props) => {
    const dispatch = useDispatch();
    const curUserId = props.navigation.getParam('userId');
    const curUser = useSelector(state => state.user.users).find(user => user.id === curUserId);

    const [firstName,setFirstName] = useState(!!curUserId ? curUser.firstName :'');
    const [lastName,setLastName] = useState(!!curUserId ? curUser.lastName :'');
    const [email,setEmail] = useState(!!curUserId ? curUser.email : '');
    const [address,setAddress] = useState(!!curUserId ? curUser.address : '');
    const [telNumber,setTelNumber] = useState(!!curUserId ? curUser.telNumber : '');
    const [imageUrl,setImageUrl] = useState(!!curUserId? curUser.imageUrl :
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    const [location,setLocation] = useState(!!curUserId ? curUser.locationName : '');
    const [isDeliveryMan,setIsDeliveryMan] = useState(!!curUserId ? curUser.isDeliverMan : false);
    const [isShopOwner,setIsShopOwner] = useState(!!curUserId ? curUser.isShopOwner : false);

    const [image,setImage] = useState();
    const [loading,setLoading] = useState(false);

    const [isFirstNameValid,setIsFirstNameValid] = useState(!!curUserId);
    const [isLastNameValid,setIsLastNameValid] = useState(!!curUserId);
    const [isEmailValid,setIsEmailValid] = useState(!!curUserId);
    const [isAddressValid,setIsAddressValid] = useState(!!curUserId);
    const [isImageUrlValid,setIsImageUrlValid] = useState(!!curUserId);
    const [isTelNumberValid,setIsTelNumberValid] = useState(!!curUserId);
    const [isLocationValid,setIsLocationValid] = useState(!!curUserId);

    let url = '';

    const saveHandler = useCallback(() => {
        if(!isFirstNameValid || !isLastNameValid || !isEmailValid || !isAddressValid || !isTelNumberValid ||
            !isLocationValid){
            Alert.alert('enter all fields','enter all fields',[
                {title: 'ok'}
            ]);
            return;
        }else{
            if(!!curUserId){
                Alert.alert('are you sure','sure about editing',[
                    {title: 'no'},
                    {title: 'yes',onPress: () => {
                            dispatch(
                                editUser(curUserId,firstName,lastName,email,address,telNumber,location,isDeliveryMan,isShopOwner)
                            );
                        }},
                ]);
            }else{
                Alert.alert('are you sure','sure about details',[
                    {title: 'no'},
                    {title: 'yes',onPress: async () => {
                            setLoading(true);
                            await handleUpload();

                            setTimeout(() => {
                                dispatch(
                                    addUser(firstName,lastName,email,address,telNumber,url,location,isDeliveryMan,isShopOwner)
                                );
                                setLoading(false);
                                props.navigation.navigate({routeName: 'Main'});
                            },8000);
                        }},
                ]);
            }
        }
    },[curUserId,firstName,lastName,email,address,telNumber,imageUrl,location,isDeliveryMan,isShopOwner,curUser]);

    const handleUpload = async () => {
        try{
            const imageUrl = image.uri;
            const imageName = imageUrl.split('/').pop();
            const response = await fetch(imageUrl);
            const uploadImage = await response.blob();

            const ref = projectStorage.ref().child('user').child(imageName);
            await ref.put(uploadImage);
            const downloadUrl = await ref.getDownloadURL();

            url = downloadUrl;

        }catch (err){
            console.log(err);
            throw err;
        }
    }

    console.log(url);

    useEffect(() => {
        props.navigation.setParams({'save': saveHandler});
    },[saveHandler,dispatch]);

    const firstNameValidate = (text) => {
        if(text.length > 4){
            setIsFirstNameValid(true);
        }else{
            setIsFirstNameValid(false);
        }
        setFirstName(text);
    }

    const lastNameValidate = (text) => {
        if(text.length > 4){
            setIsLastNameValid(true);
        }else{
            setIsLastNameValid(false);
        }
        setLastName(text);
    }

    const emailValidate = (text) => {
        if(text.length > 8 && text.includes('@') && text.includes('.com')){
            setIsEmailValid(true);
        }else{
            setIsEmailValid(false);
        }
        setEmail(text);
    }

    const addressValidate = (text) => {
        if(text.length > 8){
            setIsAddressValid(true);
        }else{
            setIsAddressValid(false);
        }
        setAddress(text);
    }

    const telPhoneNumberValidate = (text) => {
        if(text.length === 10){
            setIsTelNumberValid(true);
        }else{
            setIsTelNumberValid(false);
        }
        setTelNumber(text);
    }

    const locationValidate = (text) => {
        if(text.length > 5){
            setIsLocationValid(true);
        }else{
            setIsLocationValid(false);
        }
        setLocation(text);
    }

    const handleImage = (image) => {
        setImage(image);
        console.log(image);
    }


    return(
        <ScrollView>
            <View>
                {loading && <ActivityIndicator size='large' color={Colors.offerColor}/> }
                <View style={styles.inputContainer}>
                    <TextInput value={firstName} onChangeText={(text) => firstNameValidate(text)} label='enter first name'/>
                    {!isFirstNameValid && <Text style={styles.errorText}>enter valid first name</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput value={lastName} onChangeText={(text) => lastNameValidate(text)} label='enter last name'/>
                    {!isLastNameValid && <Text style={styles.errorText}>enter valid last name</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput value={email} onChangeText={(text) => emailValidate(text)} label='enter email'/>
                    {!isEmailValid && <Text style={styles.errorText}>enter valid email</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput value={address} onChangeText={(text) => addressValidate(text)} label='enter address' multiline={true} numberOfLines={3}/>
                    {!isAddressValid && <Text style={styles.errorText}>enter valid address</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput value={telNumber} onChangeText={(text) => telPhoneNumberValidate(text)} label='enter telephone number'/>
                    {!isTelNumberValid && <Text style={styles.errorText}>enter valid phone number</Text>}
                </View>
                {
                    curUserId === null && <ImagePickers handleImage={handleImage}/>
                }
                <View style={styles.inputContainer}>
                    <TextInput value={location} onChangeText={(text) => locationValidate(text)} label='enter location'/>
                    {!isLocationValid && <Text style={styles.errorText}>enter valid location</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <Text>Is Delivery Man</Text>
                    <Switch value={isDeliveryMan} onValueChange={(val) => setIsDeliveryMan(val)}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text>Is Shop Owner</Text>
                    <Switch value={isShopOwner} onValueChange={(val) => setIsShopOwner(val)}/>
                </View>
            </View>
        </ScrollView>
    )
}

EditUserScreen.navigationOptions = navData => {
    const savePress = navData.navigation.getParam('save');
    return{
        headerTitle: 'Edit User',
        headerRight: () => {
            return(
                <View style={{marginTop: 10,marginRight: 15}}>
                    <Ionicons name='ios-save' size={24} color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
                              onPress={savePress}/>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    image: {
        height: screenHeight * 0.15,
        width: screenWidth * 0.3,
        borderWidth: 1,
        borderColor: Colors.accentColor,
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageUrlInput: {
        width: screenWidth * 0.6
    },
    inputContainer: {
        margin: screenHeight * 0.005
    },
    imageInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    errorText: {
        color: 'red',
        marginLeft: screenWidth * 0.1,
        fontFamily: 'cha-lanka',
        marginTop: screenHeight * 0.002
    }
});

export default EditUserScreen;
