import React,{useState} from 'react';
import {StyleSheet,View,Text,ActivityIndicator,TouchableOpacity,Dimensions} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {MaterialIcons} from '@expo/vector-icons';

import {Colors} from '../constants/Colors';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const FetchLocation = (props) => {
    const [currentLocation,setCurrentLocation] = useState();
    const [isLoading,setIsLoading] = useState(false);

    const getPermission = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if(result.status !== 'granted'){
            return false;
        }
        return true;
    };

    const getLocation = async () => {
        setIsLoading(true);

        const permission = getPermission();
        if(!permission){
            return
        }
        const location = await Location.getCurrentPositionAsync({
           timeInterval: 6000
        });

        setCurrentLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });

        props.onLocation(currentLocation);
        setIsLoading(false);
    }

    return(
        <TouchableOpacity onPress={getLocation}>
            <View style={styles.button}>
                {
                    isLoading && <ActivityIndicator color='white' size='large'/>
                }
                <Text style={styles.buttonText}>Get Location</Text>
                <MaterialIcons name="location-searching" size={28} color="white" />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.offerColor,
        height: screenHeight * 0.05,
        width: screenWidth * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10
    },
    buttonText: {
        fontFamily: 'roboto-bold',
        color: 'white',
        paddingHorizontal: 10
    }
});

export default FetchLocation;
