import React from 'react';
import {View,StyleSheet,Text} from 'react-native';

const DeliveryDetailScreen = (props) => {
    return(
        <View style={styles.screen}>
            <Text>Delivery Detail Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default DeliveryDetailScreen;