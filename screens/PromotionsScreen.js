import React from 'react';
import {View,StyleSheet,Text,FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import ShopItem from "../components/ShopItem";

const PromotionScreen = (props) => {
    const promotionShops = useSelector(state => state.shop.shops).filter(shop => shop.offers !== '');

    return(
        <View style={styles.screen}>
            <FlatList data={promotionShops} keyExtractor={(item,index) => item.id} renderItem={(data) => {
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

const styles = StyleSheet.create({
    screen: {

    }
})

export default PromotionScreen;
