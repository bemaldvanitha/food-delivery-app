import React from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "../constants/Colors";

const OrderScreen = (props) => {
    return(
        <View style={styles.screen}>
            <Text>Order Screen</Text>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrderScreen;