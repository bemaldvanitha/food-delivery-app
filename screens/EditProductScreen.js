import React,{useState,useCallback,useEffect} from 'react';
import {View,StyleSheet,Text,Switch,Image,Dimensions,ScrollView,FlatList,Picker,Alert,ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useSelector,useDispatch} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

import {Categories} from '../Data/dummy-data';
import ImagePickers from "../components/ImagePicker";
import {Colors} from '../constants/Colors';
import {editFood,addFoods} from '../store/actions/FoodAction';
import {projectStorage,projectAuth} from '../firebase/firebase';

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

    const [image,setImage] = useState();
    const [isLoading,setIsLoading] = useState(false);

    let url = '';

    useEffect(() => {
        props.navigation.setParams({'save': saveHandler})
    },[dispatch,editProductId,categoryId,name,description,fullPortionPrice,halfPortionPrice,halfPotionAvailable,imageUrl,
        isVegetarian,isVegan,isSugarFree,saveHandler]);

    const saveHandler = useCallback(() => {
        // console.log(isNameValid,isDescriptionValid,isFullPortionValid,isImageUrlValid)
        if(!isNameValid || !isDescriptionValid || !isFullPortionValid ){
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
                    {text: 'yes',onPress: async () => {
                            setIsLoading(true);
                            await handleUpload();

                            setTimeout(() => {

                                dispatch(
                                    addFoods(categoryId,'s1',name,description,parseFloat(fullPortionPrice),
                                        halfPotionAvailable ? parseFloat(halfPortionPrice) : 0,imageUrl,isVegan,isVegetarian,isSugarFree)
                                );
                                setIsLoading(false);
                                props.navigation.goBack();

                            },6000);
                        }}
                ]);
            }
        }

    },[dispatch,editProductId,categoryId,name,description,fullPortionPrice,halfPortionPrice,halfPotionAvailable,imageUrl,
        isVegetarian,isVegan,isSugarFree]);

    const handleUpload = async () => {
        try {
            const imageUrl = image.uri;
            const imageName = imageUrl.split('/').pop();
            const response = await fetch(imageUrl);
            const uploadImage = await response.blob();

            const ref = projectStorage.ref().child('products').child(imageName);
            await ref.put(uploadImage);
            const downloadUrl = ref.getDownloadURL();

            url = downloadUrl;

        }catch (err){
            throw err;
        }
    }

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

    const handleImage = (image) => {
        setImage(image);
    }

    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.offerColor}/>
            </View>
        )
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
                {/*<View style={styles.imageUrlContainer}>
                    <Image source={{uri: imageUrl}} style={styles.image}/>
                    <View>
                        <TextInput value={imageUrl} onChangeText={imageUrlValidator} keyboardType='default' label='enter image url'
                                   mode='flat' underlineColor='black' multiline={true} numberOfLines={4} style={styles.imageInput}/>
                        {!isImageUrlValid && <Text style={styles.errorText}>enter valid image url</Text>}
                    </View>
                </View>*/}
                <ImagePickers handleImage={handleImage}/>

                <Picker style={styles.pickerContainer} mode='dropdown' selectedValue={categoryId} onValueChange={(val) => setCategoryId(val)}>
                    {
                        Categories.map(category => {
                            return(
                                <Picker.Item value={category.id} label={category.name} key={category.id}/>
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
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default EditProductScreen;