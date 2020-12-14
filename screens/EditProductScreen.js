import React,{useState} from 'react';
import {View,StyleSheet,Text,Switch,Image,Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const EditProductScreen = (props) => {
    const editProductId = props.navigation.getParam('id');
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [imageUrl,setImageUrl] = useState('https://cdn.pixabay.com/photo/2015/03/26/09/39/cupcakes-690040_1280.jpg');
    const [halfPotionAvailable,setHalfPortionAvailable] = useState('');
    const [halfPortionPrice,setHalfPortionPrice] = useState(0);
    const [fullPortionPrice,setFullPortionPrice] = useState(0);
    const [isVegan,setIsVegan] = useState(false);
    const [isVegetarian,setIsVegetarian] = useState(false);
    const [isSugarFree,setIsSugarFree] = useState(false);
    const [categoryId,setCategoryId] = useState('');

    return(
        <View style={styles.screen}>
            <View style={styles.inputContainer}>
                <TextInput value={name} onChangeText={(text) => setName(text)} keyboardType='default' label='enter name' mode='flat'
                           underlineColor='black' />
            </View>
            <View style={styles.inputContainer}>
                <TextInput value={description} onChangeText={(text) => setDescription(text)} keyboardType='default' label='enter description'
                           mode='flat' underlineColor='black' multiline={true} numberOfLines={3}/>
            </View>
            <View>
                <Text>is half portion available</Text>
                <Switch value={halfPotionAvailable} onValueChange={(val) => setHalfPortionAvailable(val)}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput value={fullPortionPrice} onChangeText={(text) => setFullPortionPrice(parseFloat(text))} keyboardType='numeric'
                           label='enter full portion price' mode='flat' underlineColor='black' />
            </View>
            {
                halfPotionAvailable && <View style={styles.inputContainer}>
                    <TextInput value={halfPortionPrice} onChangeText={(text) => setHalfPortionPrice(parseFloat(text))}
                               keyboardType='numeric' label='enter half portion price' mode='flat' underlineColor='black' />
                </View>
            }
            <View style={styles.imageUrlContainer}>
                <Image source={{uri: imageUrl}} style={styles.image}/>
                <TextInput value={imageUrl} onChangeText={(text) => setImageUrl(text)} keyboardType='default' label='enter image url'
                           mode='flat' underlineColor='black' multiline={true} numberOfLines={4} style={styles.imageInput}/>
            </View>
            <View>
                <Text>is vegan</Text>
                <Switch value={isVegan} onValueChange={(val) => setIsVegan(val)}/>
            </View>
            <View>
                <Text>is vegetarian</Text>
                <Switch value={isVegetarian} onValueChange={(val) => setIsVegetarian(val)}/>
            </View>
            <View>
                <Text>is sugar free</Text>
                <Switch value={isSugarFree} onValueChange={(val) => setIsSugarFree(val)}/>
            </View>

        </View>
    )
}

EditProductScreen.navigationOptions = {
    headerTitle: 'add/edit product'
}

const styles = StyleSheet.create({
    screen: {

    },
    inputContainer: {

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
})

export default EditProductScreen;