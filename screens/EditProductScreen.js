import React,{useState} from 'react';
import {View,StyleSheet,Text,Switch,Image,Dimensions,ScrollView,FlatList,Picker} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';

import {Categories} from '../Data/dummy-data';
import PickerItem from "react-native-web/dist/exports/Picker/PickerItem";
import {Colors} from '../constants/Colors';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const EditProductScreen = (props) => {
    const editProductId = props.navigation.getParam('id');
    const currentProduct = useSelector(state => state.food.foods).find(food => food.id === editProductId);

    const [name,setName] = useState( editProductId ? currentProduct.name :'');
    const [description,setDescription] = useState(editProductId ? currentProduct.description : '');
    const [imageUrl,setImageUrl] = useState(editProductId ? currentProduct.imageUrl :
        'https://cdn.pixabay.com/photo/2015/03/26/09/39/cupcakes-690040_1280.jpg');

    const [halfPotionAvailable,setHalfPortionAvailable] = useState(false);
    const [halfPortionPrice,setHalfPortionPrice] = useState(editProductId ? currentProduct.fullPortionPrice : '');
    const [fullPortionPrice,setFullPortionPrice] = useState(editProductId ? currentProduct.halfPortionPrice : '');

    const [isVegan,setIsVegan] = useState(editProductId ? currentProduct.isVegan : false);
    const [isVegetarian,setIsVegetarian] = useState(editProductId ? currentProduct.isVegetarian : false);
    const [isSugarFree,setIsSugarFree] = useState(editProductId ? currentProduct.isSugarFree : false);
    const [categoryId,setCategoryId] = useState(editProductId ?currentProduct.catId : Categories[0].id);

    return(
        <ScrollView>
            <View style={styles.screen}>

                <View style={styles.inputContainer}>
                    <TextInput value={name} onChangeText={(text) => setName(text)} keyboardType='default' label='enter name' mode='flat'
                               underlineColor='black' />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput value={description} onChangeText={(text) => setDescription(text)} keyboardType='default' label='enter description'
                               mode='flat' underlineColor='black' multiline={true} numberOfLines={3}/>
                </View>

                <View style={styles.switchInputContainer}>
                    <Text style={styles.switchText}>is half portion available</Text>
                    <Switch value={halfPotionAvailable} onValueChange={(val) => setHalfPortionAvailable(val)} thumbColor={Colors.primaryColor}
                            trackColor={{ false: "#767577", true: '#dfb19b' }}/>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput value={fullPortionPrice} onChangeText={(text) => setFullPortionPrice(text)} keyboardType='numeric'
                               label='enter full portion price' mode='flat' underlineColor='black' />
                </View>

                {
                    halfPotionAvailable && <View style={styles.inputContainer}>
                        <TextInput value={halfPortionPrice} onChangeText={(text) => setHalfPortionPrice(text)}
                                   keyboardType='numeric' label='enter half portion price' mode='flat' underlineColor='black' />
                    </View>
                }
                <View style={styles.imageUrlContainer}>
                    <Image source={{uri: imageUrl}} style={styles.image}/>
                    <TextInput value={imageUrl} onChangeText={(text) => setImageUrl(text)} keyboardType='default' label='enter image url'
                               mode='flat' underlineColor='black' multiline={true} numberOfLines={4} style={styles.imageInput}/>
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

EditProductScreen.navigationOptions = {
    headerTitle: 'add/edit product'
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
    }
})

export default EditProductScreen;