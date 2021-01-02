import React,{useEffect,useState} from 'react';
import {View,StyleSheet,Text,Image,ScrollView,Dimensions,TouchableOpacity,ImageBackground,TouchableNativeFeedback} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {RadioButton} from 'react-native-paper';
import {Ionicons,AntDesign} from '@expo/vector-icons';

import {Colors} from '../constants/Colors';
import {addBasket} from '../store/actions/BasketAction';
import {toggleFavoriteFoods} from '../store/actions/UsersAction';
import {projectAuth} from '../firebase/firebase';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const FoodItemScreen = (props) => {
    const userId = projectAuth.currentUser.uid;
    const foodId = props.navigation.getParam('id');
    const selFood = useSelector(state => state.food.foods).find(food => food.id === foodId);
    const [selectedSize,setSelectedSize] = useState('full');
    const [price,setPrice] = useState(selFood.fullPortionPrice);
    const [quantity,setQuantity] = useState(1);

    const dispatch = useDispatch();
    const allFav = useSelector(state => state.user.users).find(user => user.id === userId).favoriteFoodIds;
    const isFav = allFav.findIndex(fav => fav === foodId);

    useEffect(() => {
        props.navigation.setParams({name: selFood.name});

        if(selectedSize === 'full'){
            setPrice(selFood.fullPortionPrice);
        }else{
            setPrice(selFood.halfPortionPrice);
        }

    },[selFood,selectedSize]);

    const addToBasket = () => {
        dispatch(addBasket(selFood.id,selFood.name,selFood.shopId,selectedSize,price * quantity,quantity));
        props.navigation.navigate({routeName: 'basket'});
    }

    const toggleFavoriteFood = () => {
        dispatch(toggleFavoriteFoods(userId,foodId,allFav,isFav !== -1));
    }

    return(
        <ScrollView>
            <View>
                <View>
                    <ImageBackground style={styles.image} source={{uri: selFood.imageUrl}}>
                        <TouchableNativeFeedback onPress={toggleFavoriteFood} style={styles.iconBackground}>
                            <Ionicons name={isFav === -1 ? 'ios-heart-empty': 'ios-heart'} size={45} color={Colors.primaryColor} />
                        </TouchableNativeFeedback>
                    </ImageBackground>
                </View>
                <View style={styles.mainDetailContainer}>
                    <Text style={styles.title}>{selFood.name}</Text>
                    <Text style={styles.description}>{selFood.description}</Text>
                </View>
                {
                    selFood.halfPortionPrice !== 0 && <View style={styles.sizeContainer}>
                        <View style={styles.sizeBox}>
                            <Text style={styles.sizeSelText}>Select Size</Text>
                        </View>
                        <View>
                            <RadioButton.Group value={selectedSize} onValueChange={(size) => setSelectedSize(size)}>
                                <View style={styles.radioButton}>
                                    <RadioButton value='full'/>
                                    <Text style={styles.radioButtonText}>Full Portion {selFood.fullPortionPrice} $</Text>
                                </View>
                                <View style={styles.radioButton}>
                                    <RadioButton value='half'/>
                                    <Text style={styles.radioButtonText}>Half Portion {selFood.halfPortionPrice} $</Text>
                                </View>
                            </RadioButton.Group>
                        </View>
                    </View>
                }

                <View style={styles.quantityContainer}>
                    <View style={styles.quantityButton}>
                        <AntDesign name="minus" size={40} color="black" onPress={() => {
                            if(quantity >= 2){
                                let number = quantity - 1
                                setQuantity(number);
                            }
                        }}/>
                    </View>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <View style={styles.quantityButton}>
                        <Ionicons name="ios-add" size={40} color="black" onPress={() => {
                            let number = quantity + 1
                            setQuantity(number);
                        }}/>
                    </View>
                </View>

                <TouchableOpacity onPress={addToBasket}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Add To Basket {price * quantity} $</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

FoodItemScreen.navigationOptions = navData => {
    const foodName = navData.navigation.getParam('name');
    return{
        headerTitle: foodName
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: screenHeight * 0.35,
        alignItems: 'flex-end'
    },
    iconBackground: {
        backgroundColor: Colors.accentColor,
        margin: 20,
    },
    mainDetailContainer: {
        marginVertical: screenHeight * 0.015
    },
    title: {
        fontFamily: 'roboto-bold',
        fontSize: 25,
        textAlign: 'center'
    },
    description: {
        fontFamily: 'roboto',
        textAlign: 'center',
        fontSize: 18,
        color: 'grey'
    },
    button: {
        backgroundColor: 'black',
        marginHorizontal: screenWidth * 0.1,
        height: screenHeight * 0.06,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: Colors.secondaryColor,
        fontFamily: 'roboto',
        fontSize: 18
    },
    sizeContainer: {
        marginHorizontal: screenWidth * 0.1,
        marginVertical: screenHeight * 0.02,
    },
    sizeBox: {
        backgroundColor: 'grey',
        marginHorizontal: screenWidth * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight * 0.05,
        borderRadius: 10
    },
    sizeSelText: {
        color: 'white',
        fontFamily: 'roboto-black'
    },
    radioButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    radioButtonText: {
        fontFamily: 'cha-lanka'
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    quantityButton: {
        borderWidth: 1,
        width: screenWidth * 0.15,
        height: screenHeight * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
        marginHorizontal: 10
    },
    quantityText: {
        fontFamily: 'roboto-bold',
        fontSize: 24
    }
});

export default FoodItemScreen;
