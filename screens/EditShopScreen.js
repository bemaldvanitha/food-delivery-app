import React,{useState,useEffect,useCallback} from 'react';
import {View,StyleSheet,Text,ScrollView,Image,Dimensions,Platform,Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';
import {useSelector,useDispatch} from 'react-redux';

import {Colors} from '../constants/Colors';
import {editShop,addShop} from '../store/actions/ShopAction';
import Location from "../models/Location";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const EditShopScreen = (props) => {
    const dispatch = useDispatch();
    const currentShopId = props.navigation.getParam('shopId');
    const currentShop = useSelector(state => state.shop.shops).find(shop => shop.id === currentShopId);

    const [shopName,setShopName] = useState(!!currentShopId ? currentShop.name : '');
    const [shopDetail,setShopDetail] = useState(!!currentShopId ? currentShop.detail : '');
    const [shopLocation,setShopLocation] = useState(!!currentShopId ? currentShop.locationInString : '');
    const [shopImageUrl,setShopImageUrl] = useState(!!currentShopId ? currentShop.imageUrl :
        'https://cdn.pixabay.com/photo/2016/11/29/05/07/baked-goods-1867459_1280.jpg');

    const [isNameValid,setIsNameValid] = useState(!!currentShopId);
    const [isDetailValid,setIsDetailValid] = useState(!!currentShopId);
    const [isLocationValid,setIsLocationValid] = useState(!!currentShopId);
    const [isImageUrlValid,setIsImageUrlValid] = useState(!!currentShopId);

    useEffect(() => {
        props.navigation.setParams({'save': handleSubmit});
    },[dispatch,handleSubmit,shopDetail,shopName,shopLocation,shopImageUrl]);

    const handleSubmit = useCallback( () => {
        if(isNameValid && isDetailValid && isLocationValid && isImageUrlValid){
            if(!!currentShopId){
                Alert.alert('are you sure','sure about editing',[
                    {text: 'no'},
                    {text: 'yes',onPress: () => {
                            dispatch(editShop(currentShopId,shopName,shopDetail,shopLocation,shopImageUrl));
                            props.navigation.goBack();
                        }}
                ])
            }else{
                Alert.alert('are you sure','sure about adding shop',[
                    {text: 'no'},
                    {text: 'yes',onPress: () => {
                            dispatch(addShop('u1',shopName,shopDetail,shopLocation,shopImageUrl,
                                new Location(5.95401,80.554856)));
                            props.navigation.navigate({routeName: 'shop'})
                        }}
                ])
            }
        }else{
            Alert.alert('enter all fields','all fields must required',[
                {text: 'ok'}
            ]);
        }
    },[shopName,shopDetail,shopImageUrl,shopLocation,dispatch]);

    const nameValidator = (text) => {
        setShopName(text);

        if(text.length > 5){
            setIsNameValid(true);
        }else{
            setIsNameValid(false);
        }
    }

    const detailValidator = (text) => {
        setShopDetail(text);

        if(text.length > 6){
            setIsDetailValid(true);
        }else{
            setIsDetailValid(false);
        }
    }

    const locationNameValidator = (text) => {
        setShopLocation(text);

        if(text.length > 5){
            setIsLocationValid(true);
        }else{
            setIsLocationValid(false);
        }
    }

    const imageUrlValidator = (text) => {
        setShopImageUrl(text);

        if(text.length > 6 && (text.includes('http') || text.includes('https') )){
            setIsImageUrlValid(true);
        }else{
            setIsImageUrlValid(false);
        }
    }

    return(
        <ScrollView>
            <View>
                <View style={styles.inputContainer}>
                    <TextInput label='enter shop name' value={shopName} onChangeText={(text) => nameValidator(text)} mode='flat'
                               keyboardType='default'/>
                    {!isNameValid && <Text style={styles.errorText}>enter valid shop name</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput label='enter shop detail' value={shopDetail} onChangeText={(text) => detailValidator(text)} mode='flat'
                               keyboardType='default' multiline={true} numberOfLines={4}/>
                    {!isDetailValid && <Text style={styles.errorText}>enter valid shop detail</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput label='enter shop location' value={shopLocation} onChangeText={(text) => locationNameValidator(text)} mode='flat'
                               keyboardType='default' />
                    {!isLocationValid && <Text style={styles.errorText}>enter valid location</Text>}
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{uri: shopImageUrl}} style={styles.image}/>
                    <View>
                        <TextInput label='enter shop image' value={shopImageUrl} onChangeText={(text) => imageUrlValidator(text)} mode='flat'
                                   keyboardType='default' multiline={true} numberOfLines={4} style={styles.imageUrlInput}/>
                        {!isImageUrlValid && <Text style={styles.errorText}>enter valid image url</Text>}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

EditShopScreen.navigationOptions = navData => {
    const save = navData.navigation.getParam('save');
    return{
        headerTitle: 'edit/add shop',
        headerRight: () => {
            return(
                <View style={{marginTop: 15,marginRight: 20}}>
                    <Ionicons name="ios-save" size={28} color={Platform.OS === 'android' ? 'white' : Colors.primaryColor }
                              onPress={save}/>
                </View>
            )
        }
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
    },
    errorText: {
        color: Colors.primaryColor,
        marginLeft: screenWidth * 0.1
    }
});

export default EditShopScreen;