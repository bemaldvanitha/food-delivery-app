import React from 'react';
import {View,StyleSheet,Text} from 'react-native';

const ShopCurrentOrders = (props) => {
    return(
        <View>
            <Text>current orders</Text>
        </View>
    )
}

ShopCurrentOrders.navigationOptions = {
    headerTitle: 'Current Orders',
}

const styles = StyleSheet.create({

})

export default ShopCurrentOrders;