import React,{useState} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Dimensions} from 'react-native';
import {Avatar,Provider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

import {Colors} from '../constants/Colors';
import ChangePlaceModal from "../components/ChangePlaceModal";
import {projectAuth} from '../firebase/firebase';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const SettingsScreen = (props) => {
    const userId = projectAuth.currentUser.uid;
    const curUser = useSelector(state => state.user.users).find(user => user.id === userId);
    const [visibleModal,setVisibleModal] = useState(false);

    const showModal = () => {
        setVisibleModal(true);
    }

    const closeModal = () => {
        setVisibleModal(false);
    }

    return(
        <Provider>
        <View>
            <ChangePlaceModal closeModal={closeModal} visibility={visibleModal}/>
            <View style={styles.userDetail}>
                <Avatar.Image size={140} source={{uri: curUser.imageUrl}}/>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate({routeName: 'edituser',params: {userId: curUser.id}})
                }}>
                    <View style={styles.customButton}>
                        <Text style={styles.customButtonText}>Edit Account</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.name}>{curUser.firstName} {curUser.lastName}</Text>
                <Text style={styles.useDetailText}>email: {curUser.email}</Text>
                <Text style={styles.useDetailText}>number: {curUser.telNumber}</Text>
            </View>
            <View style={styles.userPlaceContainer}>
                <Text style={styles.placeTitle}>Places</Text>
                <View style={styles.userPlace}>
                    <Ionicons name="ios-home" size={50} color="black" onPress={showModal}/>
                    <View style={styles.yourPlace}>
                        <Text style={styles.otherText}>Home</Text>
                        <Text style={styles.otherText}>{curUser.address}</Text>
                    </View>
                </View>
            </View>
        </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    userDetail: {
        alignItems: 'center',
        marginTop: screenHeight * 0.06
    },
    name: {
        fontFamily: 'san-swashed',
        fontSize: 24,
        marginVertical: screenHeight * 0.01
    },
    useDetailText: {
        fontFamily: 'cha-lanka',
        paddingVertical: screenHeight * 0.002
    },
    userPlaceContainer: {
        marginHorizontal: screenWidth * 0.08,
        marginVertical: screenHeight * 0.02
    },
    placeTitle: {
        textAlign: 'center',
        paddingVertical: screenHeight * 0.02,
        fontFamily: 'roboto-bold',
        fontSize: 18
    },
    userPlace: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    yourPlace: {
        width: screenWidth * 0.5
    },
    otherText: {
        fontFamily: 'roboto'
    },
    customButton: {
        marginVertical: screenHeight * 0.01
    },
    customButtonText: {
        fontFamily: 'cha-lanka',
        color: Colors.secondaryColor,
        fontSize: 18
    }
})

export default SettingsScreen;
