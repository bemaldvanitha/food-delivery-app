import React,{useEffect} from 'react';
import {View,StyleSheet,Text,FlatList,ImageBackground,Dimensions,ScrollView,TouchableNativeFeedback} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {Ionicons,AntDesign} from '@expo/vector-icons';

import {Categories} from '../Data/dummy-data';
import Food from "../components/Food";
import {toggleFavoriteShops} from "../store/actions/UsersAction";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ShopScreen = (props) => {
    const dispatch = useDispatch();
    const allFav = useSelector(state => state.user.users).find(user => user.id === 'u1').favoriteShopIds;
    const isFav = allFav.findIndex(fav => fav === props.id);

    const shopId = props.navigation.getParam('id');
    const selShop = useSelector(state => state.shop.shops).find(shop => shop.id === shopId);
    const shopFoods = useSelector(state => state.food.foods).filter(food => food.shopId === shopId);
    const offeredCategoryNames = [];

    selShop.offeredCategoryIds.map(catId => {
        offeredCategoryNames.push(Categories.find(cate => cate.id === catId).name);
    });

    useEffect(() => {
        props.navigation.setParams({name: selShop.name});
    },[selShop]);

    const toggleFavorite = () => {
        dispatch(toggleFavoriteShops('u1',props.id,allFav,isFav !== -1));
    }

    return(
        <ScrollView>
            <View>
                <View style={styles.mainInfoContainer}>
                    <ImageBackground style={styles.backgroundImage} source={{uri: selShop.imageUrl}}>
                        <TouchableNativeFeedback onPress={toggleFavorite}>
                            <Ionicons name={isFav === -1 ? 'ios-heart-empty' : 'ios-heart'} size={50} color="red" style={styles.iconStyle}/>
                        </TouchableNativeFeedback>
                    </ImageBackground>
                    <Text style={styles.title}>{selShop.name}</Text>
                    <ScrollView horizontal={true} style={styles.offeredCategoryContainer}>
                        {
                            offeredCategoryNames.map(category => {
                                return(
                                    <Text style={styles.offeredText} key={category}>.{category}</Text>
                                )
                            })
                        }
                    </ScrollView>
                    <View style={styles.deliveryInfoContainer}>
                        <View style={styles.deliveryTimeCContainer}>
                            <AntDesign name="clockcircleo" size={24} color="black" />
                            <Text style={styles.time}>25-30 mins</Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>{selShop.rating}</Text>
                            <AntDesign name="star" size={24} color="coral" />
                            <Text style={styles.rating}>({selShop.ratedNumber})</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.subInfoContainer}>
                    <Text style={styles.subInfoTitle}>Restaurant info</Text>
                    <Text style={styles.subInfoText}>{selShop.detail}</Text>
                </View>
                <View>
                    <Text style={styles.subInfoTitle}>Menu</Text>
                    <FlatList data={shopFoods} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                        return(
                            <Food id={data.item.id} name={data.item.name} fullPortionPrice={data.item.fullPortionPrice} imageUrl={data.item.imageUrl}
                                  description={data.item.description} onSelect={() => {
                                      props.navigation.navigate({routeName: 'food',params: {id: data.item.id}})
                            }}/>
                        )
                    }}/>
                </View>
            </View>
        </ScrollView>
    )
}

ShopScreen.navigationOptions = navData => {
    const title = navData.navigation.getParam('name');
    return{
        headerTitle: title
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: screenHeight * 0.3,
        alignItems: 'flex-end',
    },
    iconStyle: {
        margin: 20
    },
    mainInfoContainer: {

    },
    subInfoContainer: {
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 10,
        paddingVertical: 5
    },
    title: {
        fontFamily: 'roboto-bold',
        fontSize: 25,
        textAlign: 'center'
    },
    offeredCategoryContainer: {
        flexDirection: 'row',
        paddingHorizontal: screenWidth * 0.2,
        paddingVertical: 5
    },
    deliveryInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    deliveryTimeCContainer: {
        flexDirection: 'row'
    },
    ratingContainer: {
        flexDirection: 'row'
    },
    rating: {
        fontFamily: 'roboto-italic',
    },
    time: {
        fontFamily: 'roboto-italic'
    },
    subInfoTitle: {
        fontFamily: 'roboto-bold',
        textAlign: 'center'
    },
    subInfoText: {
        textAlign: 'left',
        fontFamily: 'roboto',
        paddingVertical: 5,
        paddingHorizontal: screenWidth * 0.15
    },
    offeredText: {
        paddingHorizontal: 5,
        fontFamily: 'roboto',
        fontSize: 14
    },
    scrollContainer: {
        height: screenHeight * 0.3
    }
})

export default ShopScreen;
