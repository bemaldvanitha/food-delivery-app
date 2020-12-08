import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView, ImageBackground,Text} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';


const DrawerHeader = props => {
    return(
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.imageWrap}>
                    <ImageBackground source={require('../assets/images/drawer/navigationHeader.jpg')} style={styles.realImage}>
                        <View style={styles.titleBackground}>
                            <Text style={styles.title}>Food Delivery App</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.container}>
                    <DrawerNavigatorItems {...props}/>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    imageWrap: {
        width: undefined,
    },
    realImage: {
        width: Dimensions.get('screen').width * 0.715,
        height: Dimensions.get('screen').height * 0.3,
        justifyContent: 'flex-end'
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: '800',
        marginVertical: 8,
        textAlign: 'center'
    },
    headerTitle: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    container: {
        flex: 1
    },
    titleBackground: {
        backgroundColor: 'black',
        opacity: 0.7,
        marginBottom: 20,
        marginHorizontal: 10,
        borderRadius: 20
    }
});

export default DrawerHeader;