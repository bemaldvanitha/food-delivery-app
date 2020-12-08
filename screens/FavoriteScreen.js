import React,{useState} from 'react';
import {View,StyleSheet,Text,FlatList,Dimensions,TouchableNativeFeedback} from 'react-native';
import {useSelector} from 'react-redux';

import ShopItem from "../components/ShopItem";
import Food from "../components/Food";
import {Colors} from '../constants/Colors';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const FavoriteScreen = (props) => {
    const [selectIndex,setSelectIndex] = useState(0);
    const favoriteFoodIds = useSelector(state => state.user.users).find(user => user.id === 'u1').favoriteFoodIds;
    const favoriteShopIds = useSelector(state => state.user.users).find(user => user.id === 'u1').favoriteShopIds;
    const foods = useSelector(state => state.food.foods);
    const shops = useSelector(state => state.shop.shops);

    const favFoods = foods.filter(food => {
        const isContained = favoriteFoodIds.findIndex(favId => favId === food.id);
        if(isContained === -1){
            return false;
        }
        return true;
    });

    const favShops = shops.filter(shop => {
        const isContained = favoriteShopIds.findIndex(favId => favId === shop.id);
        if(isContained === -1){
            return false;
        }
        return true
    });

    const changeSegment = (index) => {
        setSelectIndex(index);
    }

    return(
        <View style={styles.screen}>
            <View style={styles.segmentContainer}>
                <TouchableNativeFeedback onPress={() => changeSegment(0)}>
                    <View style={selectIndex === 0 ? styles.activeSegmentTab : styles.segmentTab}>
                        <Text style={styles.segmentText}>Fav Foods</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => changeSegment(1)}>
                    <View style={selectIndex === 1 ? styles.activeSegmentTab : styles.segmentTab}>
                        <Text style={styles.segmentText}>Fav Shops</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
            {
                selectIndex === 0 && <FlatList data={favShops} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                        return(
                            <ShopItem id={data.item.id} name={data.item.name} rating={data.item.rating} ratedNumber={data.item.ratedNumber}
                                      imageUrl={data.item.imageUrl} offers={data.item.offers} locationInString={data.item.locationInString}
                                      offeredCategoryIds={data.item.offeredCategoryIds} onSelect={() => {
                                props.navigation.navigate({routeName: 'shop',params: {'id': data.item.id}})
                            }}/>
                        )
                    }}/>

            }
            {
                selectIndex === 1 && <FlatList data={favFoods} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                        return(
                            <Food id={data.item.id} name={data.item.name} fullPortionPrice={data.item.fullPortionPrice} imageUrl={data.item.imageUrl}
                                  description={data.item.description} onSelect={() => {
                                props.navigation.navigate({routeName: 'food',params: {id: data.item.id}})
                            }}/>
                        )
                    }}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {

    },
    segmentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: screenWidth * 0.05
    },
    segmentTab: {
       borderWidth: 1,
        borderColor: Colors.primaryColor,
        paddingVertical: screenHeight * 0.01,
       width: screenWidth * 0.45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    segmentText: {
        fontFamily: 'roboto-italic'
    },
    activeSegmentTab: {
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        paddingVertical: screenHeight * 0.01,
        width: screenWidth * 0.45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        opacity: 0.5
    }
})

export default FavoriteScreen;
