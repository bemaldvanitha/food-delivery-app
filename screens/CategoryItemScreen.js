import React from 'react';
import {View,StyleSheet,Text,FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {Categories} from '../Data/dummy-data';
import ShopItem from "../components/ShopItem";

const CategoryItemScreen = (props) => {
    const cateId = props.navigation.getParam('id');
    const shops = useSelector(state => state.shop.shops);

    const filteredShops = shops.filter(shop => {
        const isContains = shop.offeredCategoryIds.findIndex(id => id === cateId);
        if(isContains === -1){
            return false;
        }
        return true;
    });

    if(filteredShops.length === 0){
        return (
            <View style={styles.noItemContainer}>
                <Text style={styles.noItemText}>No Items In Container</Text>
            </View>
        )
    }

    return(
        <View style={styles.screen}>
            <FlatList data={filteredShops} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                return(
                    <ShopItem id={data.item.id} name={data.item.name} rating={data.item.rating} ratedNumber={data.item.ratedNumber}
                              imageUrl={data.item.imageUrl} offers={data.item.offers} locationInString={data.item.locationInString}
                              offeredCategoryIds={data.item.offeredCategoryIds} onSelect={() => {
                        props.navigation.navigate({routeName: 'shop',params: {'id': data.item.id}})
                    }}/>
                )
            }}/>
        </View>
    )
}

CategoryItemScreen.navigationOptions = navData => {
    const catId = navData.navigation.getParam('id');
    const cateName = Categories.find(cat => cat.id === catId).name;
    return{
        headerTitle: cateName
    }
}

const styles = StyleSheet.create({
    screen: {

    },
    noItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noItemText: {
        fontFamily: 'roboto-bold',
        fontSize: 20
    }
})

export default CategoryItemScreen;
