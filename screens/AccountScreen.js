import React from 'react';
import {View, StyleSheet, Text, Platform, Image,Dimensions,TouchableNativeFeedback} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "../constants/Colors";
import {useSelector} from 'react-redux';
import {Avatar,Divider} from 'react-native-paper';

import {projectAuth} from '../firebase/firebase';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const AccountScreen = (props) => {
    const currentUserId = projectAuth.currentUser.uid;
    const curUser = useSelector(state => state.user.users).find(user => user.id === currentUserId);

    return(
        <View style={styles.screen}>
            <View style={styles.userDetailContainer}>
                <Avatar.Image source={{uri: curUser.imageUrl}} size={100}/>
                <Text style={styles.name}>{curUser.firstName} {curUser.lastName}</Text>
            </View>
            <Divider/>
            <TouchableNativeFeedback onPress={() => {
                props.navigation.navigate({routeName: 'favorite'})
            }}>
                <View style={styles.sectionContainer}>
                    <Image style={styles.image} source={require('../assets/images/account/favorite.png')}/>
                    <Text style={styles.sectionText}>Favorites</Text>
                </View>
            </TouchableNativeFeedback>
            <Divider/>
            <TouchableNativeFeedback onPress={() => {
                props.navigation.navigate({routeName: 'promotion'})
            }}>
                <View style={styles.sectionContainer}>
                    <Image style={styles.image} source={require('../assets/images/account/promotion.png')}/>
                    <Text style={styles.sectionText}>Promotion</Text>
                </View>
            </TouchableNativeFeedback>
            <Divider/>
            <TouchableNativeFeedback onPress={() => {
                props.navigation.navigate({routeName: 'about'})
            }}>
                <View style={styles.sectionContainer}>
                    <Image style={styles.image} source={require('../assets/images/account/about.png')}/>
                    <Text style={styles.sectionText}>About</Text>
                </View>
            </TouchableNativeFeedback>
            <Divider/>
            <TouchableNativeFeedback onPress={() => {
                props.navigation.navigate({routeName: 'settings'})
            }}>
                <View style={styles.sectionContainer}>
                    <Image style={styles.image} source={require('../assets/images/account/settings.png')}/>
                    <Text style={styles.sectionText}>Settings</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

AccountScreen.navigationOptions = (navData) => {
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

    },
    image: {
        width: screenWidth * 0.18,
        height: screenHeight * 0.08,
        marginHorizontal: screenWidth * 0.06
    },
    sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: screenHeight *0.01
    },
    sectionText: {
        fontFamily: 'roboto-black-italic',
        marginHorizontal: screenWidth * 0.2,
        fontSize: 16
    },
    userDetailContainer: {
        flexDirection: 'row',
        paddingHorizontal: screenWidth * 0.1,
        alignItems: 'center',
        marginVertical: screenHeight * 0.01
    },
    name: {
        fontFamily: 'roboto-bold',
        fontSize: 20,
        paddingHorizontal: 20,
    }
})

export default AccountScreen;
