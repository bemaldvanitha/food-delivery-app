import React,{useState,useCallback,useEffect} from 'react';
import {View,StyleSheet,Text,Switch,Image,Dimensions,ScrollView,FlatList,Picker,Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useSelector,useDispatch} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

import {Categories} from '../Data/dummy-data';
import PickerItem from "react-native-web/dist/exports/Picker/PickerItem";
import {Colors} from '../constants/Colors';
import {editFood,addFoods} from '../store/actions/FoodAction';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const EditProductScreen = (props) => {
    const dispatch = useDispatch();
    const editProductId = props.navigation.getParam('id');
    const currentProduct = useSelector(state => state.food.foods).find(food => food.id === editProductId);

    const [name,setName] = useState( editProductId ? currentProduct.name :'');
    const [description,setDescription] = useState(editProductId ? currentProduct.description : '');
    const [imageUrl,setImageUrl] = useState(editProductId ? currentProduct.imageUrl :
        'https://cdn.pixabay.com/photo/2015/03/26/09/39/cupcakes-690040_1280.jpg');
    const [halfPotionAvailable,setHalfPortionAvailable] = useState(!!(editProductId && currentProduct.halfPortionPrice !== 0));
    const [halfPortionPrice,setHalfPortionPrice] = useState(editProductId ? currentProduct.halfPortionPrice.toString() : '');
    const [fullPortionPrice,setFullPortionPrice] = useState(editProductId ? currentProduct.fullPortionPrice.toString() : '');
    const [isVegan,setIsVegan] = useState(editProductId ? currentProduct.isVegan : false);
    const [isVegetarian,setIsVegetarian] = useState(editProductId ? currentProduct.isVegetarian : false);
    const [isSugarFree,setIsSugarFree] = useState(editProductId ? currentProduct.isSugarFree : false);
    const [categoryId,setCategoryId] = useState(editProductId ?currentProduct.catId : Categories[0].id);

    const [isNameValid,setIsNameValid] = useState(!!editProductId);
    const [isDescriptionValid,setIsDescriptionValid] = useState(!!editProductId);
    const [isImageUrlValid,setIsImageUrlValid] = useState(!!editProductId);
    const [isHalfPortionValid,setIsHalfPortionValid] = useState(!!editProductId);
    const [isFullPortionValid,setIsFullPortionValid] = useState(!!editProductId);


    useEffect(() => {
        props.navigation.setParams({'save': saveHandler})
    },[dispatch,saveHandler]);

    const saveHandler = useCallback(() => {
        if(!isNameValid || !isDescriptionValid || !isFullPortionValid || !isImageUrlValid ){
            return(
                Alert.alert('enter all fields','all field must enter before submit',[
                    {title: 'ok'}
                ])
            )
        }else {
            if(!!editProductId){

                Alert.alert('sure about edit','are you sure about edit',[
                    {text: 'no'},
                    {text: 'yes',onPress: () => {
                            dispatch(
                                editFood(editProductId,categoryId,name,description,parseFloat(fullPortionPrice),
                                    halfPotionAvailable ? parseFloat(halfPortionPrice) : 0,imageUrl,isVegan,isVegetarian,isSugarFree)
                            );
                            props.navigation.goBack();
                        }}
                ]);

            }else{
                Alert.alert('sure about add','are you sure about add product',[
                    {text: 'no'},
                    {text: 'yes',onPress: () => {
                            dispatch(
                                addFoods(categoryId,'s1',name,description,parseFloat(fullPortionPrice),
                                    halfPotionAvailable ? parseFloat(halfPortionPrice) : 0,imageUrl,isVegan,isVegetarian,isSugarFree)
                            );
                            props.navigation.goBack();
                        }}
                ]);
            }
            props.navigation.goBack();
        }

    },[dispatch,editProductId,categoryId,name,description,fullPortionPrice,halfPortionPrice,halfPotionAvailable,imageUrl,
        isVegetarian,isVegan,isSugarFree]);

    const nameValidator = (text) => {
        if(text.trim().length < 6){
            setIsNameValid(false);
        }else{
            setIsNameValid(true);
        }
        setName(text);
    }

    const descriptionValidator = (text) => {
        if(text.trim().length < 7){
            setIsDescriptionValid(false);
        }else{
            setIsDescriptionValid(true);
        }
        setDescription(text)
    }

    const imageUrlValidator = (text) => {
        if(text.trim().length > 7 && (text.includes('http') || text.includes('https') )){
            setIsImageUrlValid(true);
        }else{
            setIsImageUrlValid(false);
        }
        setImageUrl(text);
    }

    const halfPortionValidator = (text) => {
        if(text.trim().length !== 0 && !isNaN(text)){
            if(parseFloat(text) > 0){
                setIsHalfPortionValid(true);
            }else{
                setIsHalfPortionValid(false);
            }
        }else{
            setIsHalfPortionValid(false);
        }
        setHalfPortionPrice(text);
    }

    const fullPortionValidator = (text) => {
        if(text.trim().length !== 0 && !isNaN(text)){
            if(parseFloat(text) > 0){
                setIsFullPortionValid(true);
            }else{
                setIsFullPortionValid(false);
            }
        }else{
            setIsFullPortionValid(false);
        }
        setFullPortionPrice(text);
    }

    return(
        <ScrollView>
            <View style={styles.screen}>

                <View style={styles.inputContainer}>
                    <TextInput value={name} onChangeText={nameValidator} keyboardType='default' label='enter name' mode='flat'
                               underlineColor='black' />
                    {!isNameValid && <Text style={styles.errorText}>enter valid name</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput value={description} onChangeText={descriptionValidator} keyboardType='default' label='enter description'
                               mode='flat' underlineColor='black' multiline={true} numberOfLines={3}/>
                    {!isDescriptionValid && <Text style={styles.errorText}>enter description</Text>}
                </View>

                <View style={styles.switchInputContainer}>
                    <Text style={styles.switchText}>is half portion available</Text>
                    <Switch value={halfPotionAvailable} onValueChange={(val) => setHalfPortionAvailable(val)} thumbColor={Colors.primaryColor}
                            trackColor={{ false: "#767577", true: '#dfb19b' }}/>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput value={fullPortionPrice} onChangeText={fullPortionValidator} keyboardType='numeric'
                               label='enter full portion price' mode='flat' underlineColor='black' />
                    {!isFullPortionValid && <Text style={styles.errorText}>enter valid price</Text>}
                </View>

                {
                    halfPotionAvailable && <View style={styles.inputContainer}>
                        <TextInput value={halfPortionPrice} onChangeText={halfPortionValidator}
                                   keyboardType='numeric' label='enter half portion price' mode='flat' underlineColor='black' />
                        {!isHalfPortionValid && <Text style={styles.errorText}>enter valid price</Text>}
                    </View>
                }
                <View style={styles.imageUrlContainer}>
                    <Image source={{uri: imageUrl}} style={styles.image}/>
                    <View>
                        <TextInput value={imageUrl} onChangeText={imageUrlValidator} keyboardType='default' label='enter image url'
                                   mode='flat' underlineColor='black' multiline={true} numberOfLines={4} style={styles.imageInput}/>
                        {!isImageUrlValid && <Text style={styles.errorText}>enter valid image url</Text>}
                    </View>
                </View>

                <Picker style={styles.pickerContainer} mode='dropdown' selectedValue={categoryId} onValueChange={(val) => setCategoryId(val)}>
                    {
                        Categories.map(category => {
                            return(
                                <PickerItem value={category.id} label={category.name}/>
                            )
                        })
                    }
                </Picker>

                <View style={styles.switchInputContainer}>
                    <Text style={styles.switchText}>is vegan</Text>
                    <Switch value={isVegan} onValueChange={(val) => setIsVegan(val)} thumbColor={Colors.primaryColor}
                            trackColor={{ false: "#767577", true: '#dfb19b' }}/>
                </View>
                <View style={styles.switchInputContainer}>
                    <Text style={styles.switchText}>is vegetarian</Text>
                    <Switch value={isVegetarian} onValueChange={(val) => setIsVegetarian(val)} thumbColor={Colors.primaryColor}
                            trackColor={{ false: "#767577", true: '#dfb19b' }}/>
                </View>
                <View style={styles.switchInputContainer}>
                    <Text style={styles.switchText}>is sugar free</Text>
                    <Switch value={isSugarFree} onValueChange={(val) => setIsSugarFree(val)} thumbColor={Colors.primaryColor}
                            trackColor={{ false: "#767577", true: '#dfb19b' }}/>
                </View>

            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = (navData) => {
    const save = navData.navigation.getParam('save');
    return{
        headerTitle: 'add/edit product',
        headerRight: () => {
            return(
                <View style={{marginTop: 15,marginRight: 20}}>
                    <Ionicons name="ios-save" size={28} color="white" onPress={save}/>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    screen: {

    },
    inputContainer: {
        marginVertical: screenHeight * 0.008,
        marginHorizontal: screenWidth * 0.03
    },
    imageUrlContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: screenHeight * 0.005
    },
    image: {
        width: screenWidth * 0.3,
        height: screenHeight * 0.15,
        marginHorizontal: screenWidth * 0.02,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10
    },
    imageInput: {
        marginHorizontal: screenWidth * 0.02,
        width: screenWidth * 0.6
    },
    switchInputContainer: {
        flexDirection: 'row',
        marginVertical: screenHeight * 0.02,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    switchText: {
        fontFamily: 'roboto-light',
        fontSize: 14
    },
    pickerContainer: {
        marginHorizontal: screenWidth * 0.04
    },
    errorText: {
        color: Colors.primaryColor,
        paddingHorizontal: screenWidth * 0.1
    }
})

export default EditProductScreen;