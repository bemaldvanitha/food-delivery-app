import React from 'react';
import {View, StyleSheet, Text, Platform,FlatList} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useSelector} from 'react-redux';

import {Colors} from "../constants/Colors";
import DeliveryItem from "../components/DeliveryItem";

const DeliverScreen = (props) => {
    const currentNonDeliveredOrders = useSelector(state => state.order.orders).filter((order) => {
        if(order.isDeliverAccept === false && order.isShopAccept){
         return true;
        }
    });

    return(
        <View style={styles.screen}>
            <FlatList data={currentNonDeliveredOrders} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                return(
                    <DeliveryItem id={data.item.id} userName={data.item.userName} shopName={data.item.shopName}
                                  totalAmount={data.item.totalAmount} date={data.item.date} isShopCompleted={data.item.isShopCompleted}
                        onSelect={() => {
                            props.navigation.navigate({routeName: 'deliverDetail',params: {orderId: data.item.id}})
                        }}/>
                )
            }}/>
        </View>
    )
}

DeliverScreen.navigationOptions = navData => {
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

export default DeliverScreen;