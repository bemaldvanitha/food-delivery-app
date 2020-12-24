import React from 'react';
import {View,Text,StyleSheet,ImageBackground,Dimensions,ScrollView,TouchableOpacity,TouchableNativeFeedback} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

import {Categories} from '../Data/dummy-data';
import {Ionicons} from '@expo/vector-icons';
import {Colors} from '../constants/Colors';
import {toggleFavoriteShops} from '../store/actions/UsersAction';

const ShopItem = (props) => {
    const allFav = useSelector(state => state.user.users).find(user => user.id === 'u1').favoriteShopIds;
    const isFav = allFav.findIndex(fav => fav === props.id);
    const dispatch = useDispatch();
    const offeredCategoryNames = [];

    props.offeredCategoryIds.map((catId) => {
        offeredCategoryNames.push(Categories.find(cat => cat.id === catId).name);
    })

    const toggleFavorite = () => {
        dispatch(toggleFavoriteShops('u1',props.id,allFav,isFav !== -1));
    }

    return(
        <TouchableOpacity onPress={props.onSelect}>
            <View style={styles.box}>
                <View style={styles.imageContainer}>
                    <ImageBackground style={styles.imageStyle} source={{uri: props.imageUrl}}>
                        <View style={styles.offersContainer}>
                            <Text style={styles.offersText}>{props.offers}</Text>
                        </View>
                        <TouchableNativeFeedback onPress={toggleFavorite}>
                            <Ionicons name={isFav === -1 ? 'ios-heart-empty' : 'ios-heart'} size={45} color={Colors.primaryColor} style={styles.icon}/>
                        </TouchableNativeFeedback>
                    </ImageBackground>
                </View>
                <View>
                    <View>
                        <Text style={styles.name}>{props.name}</Text>
                    </View>
                    <ScrollView horizontal={true}>
                        <View style={styles.offeredCategoryContainer}>
                            {
                                offeredCategoryNames.map(offeredCat => {
                                    return(
                                        <View style={styles.offeredCategoryView} key={offeredCat}>
                                            <Text style={styles.offeredCategoryText}>{offeredCat}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                    <View style={styles.extraDetailContainer}>
                        <Text style={styles.location}>{props.locationInString}</Text>
                        <View style={styles.ratedContainer}>
                            <Text style={styles.rating}>{props.rating}</Text>
                            <Ionicons name="ios-star" size={24} color="coral" />
                            <Text style={styles.rating}>({props.ratedNumber})</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    box: {
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 8,
        shadowOffset: {
            width: 2,
            height: 0
        },
        elevation: 6,
        backgroundColor: 'white'
    },
    imageStyle: {
        width: '100%',
        height: Dimensions.get('screen').height * 0.25,
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    offersContainer: {
        backgroundColor: Colors.offerColor,
        opacity: 0.8,
        width: '50%',
        marginRight: 20,
        marginTop: 10,
        borderRadius: 10,
        padding: 5
    },
    offersText: {
        color: 'white',
        fontFamily: 'roboto',
        fontSize: 14
    },
    icon: {
      marginRight: 20,
      marginBottom: 15
    },
    name: {
        fontFamily: 'roboto-bold',
        fontSize: 25,
        textAlign: 'center'
    },
    extraDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    location: {
        fontFamily: 'roboto-light',
        fontSize: 16
    },
    ratedContainer: {
        flexDirection: 'row',
    },
    rating: {
        paddingHorizontal: 10
    },
    offeredCategoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    offeredCategoryView: {
        marginHorizontal: 20,
        backgroundColor: 'black',
        opacity: 0.4,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 15
    },
    offeredCategoryText: {
        color: 'white',
        fontSize: 15
    },
    imageContainer: {
        marginHorizontal: 10,
        marginVertical: 10
    }
});

export default ShopItem;
