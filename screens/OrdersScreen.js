import React from 'react';
import {View, StyleSheet, Text, Platform,FlatList} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useSelector} from 'react-redux';

import {Colors} from "../constants/Colors";
import UserOrder from "../components/OrderItem";

const OrderScreen = (props) => {
    const currentOrders = useSelector(state => state.order.orders);

    return(
        <View style={styles.screen}>
            <FlatList data={currentOrders} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                return(
                    <UserOrder id={data.item.id} date={data.item.date} isDeliverAccept={data.item.isDeliverAccept} isDeliverCompleted={data.item.isDeliverCompleted}
                               isShopAccept={data.item.isShopAccept} isShopCompleted={data.item.isShopCompleted} items={data.item.items} shopId={data.item.shopId}
                               totalAmount={data.item.totalAmount} onSelect={() => {
                                   props.navigation.navigate({routeName: 'orderDetail',params: {id: data.item.id}})
                    }}/>
                )
            }}/>
        </View>
    )
}

OrderScreen.navigationOptions = navData => {
    return{
        headerLeft: () => {
            return(
                <View style={{paddingLeft: 20,paddingTop: 15}}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} size={24} color={Platform.OS === 'android' ? 'white': Colors.primaryColor} onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}/>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    screen: {

    }
})

export default OrderScreen;