import React from 'react';
import {View,StyleSheet,Text} from 'react-native';

const EditProductScreen = (props) => {
    return(
        <View style={styles.screen}>
            <Text>Edit Product Screen</Text>
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

export default EditProductScreen;