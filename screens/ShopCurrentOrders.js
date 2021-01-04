import React from 'react';
import {View,StyleSheet,FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {projectAuth} from '../firebase/firebase';
import ShopOrderedItem from "../components/ShopOrderedItem";

const ShopCurrentOrders = (props) => {
    const userId = projectAuth.currentUser.uid;
    const ownedShopId = useSelector(state => state.shop.shops).find(shop => shop.uId === userId).id;
    const shopOrders = useSelector(state => state.order.orders).filter((order => order.shopId === ownedShopId));

    return(
        <View>
            <FlatList data={shopOrders} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                return(
                    <ShopOrderedItem id={data.item.id} orderName={data.item.userName} date={data.item.date}
                                     isShopAccept={data.item.isShopAccept} isShopCompleted={data.item.isShopCompleted}
                                     items={data.item.items} notes={data.item.notes} shopName={data.item.shopName}
                                     totalAmount={data.item.totalAmount}/>
                )
            }}/>
        </View>
    )
}

ShopCurrentOrders.navigationOptions = {
    headerTitle: 'Current Orders',
}

const styles = StyleSheet.create({

})

export default ShopCurrentOrders;