import React,{useState} from 'react';
import {StyleSheet,Text,View,Button,Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';

import {Colors} from '../constants/Colors';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const AuthenticationScreen = (props) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [reEnteredPassword,setReEnteredPassword] = useState('');
    const [isSignUp,setIsSignUp] = useState(false);

    const toggleButton = () => {
        setIsSignUp(prevState => !prevState);
    }

    const authentication = () => {

    }

    return(
        <View style={styles.screen}>
            <View style={styles.inputContainer}>
                <TextInput value={email} onChangeText={(text) => setEmail(text)} mode='flat' label='enter email'
                           keyboardType='email-address' style={styles.input}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput value={password} onChangeText={(text) => setPassword(text)} label='enter password' mode='flat'
                           keyboardType='default' secureTextEntry={true} style={styles.input}/>
            </View>
            {
                isSignUp && <View style={styles.inputContainer}>
                    <TextInput value={reEnteredPassword} onChangeText={(text) => setReEnteredPassword(text)} label='enter password again'
                               keyboardType='default' secureTextEntry={true} mode='flat' style={styles.input}/>
                </View>
            }
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title={isSignUp ? 'sign up' : 'sign in'} color={Colors.offerColor} onPress={authentication}/>
                </View>
                <View style={styles.button}>
                    <Button title={isSignUp ? 'set is sign in' : 'set is sign up'} color={Colors.offerColor} onPress={toggleButton}/>
                </View>
            </View>
        </View>
    )
}

AuthenticationScreen.navigationOptions = {
    headerTitle: 'Authentication'
}

const styles= StyleSheet.create({
    screen: {
        marginVertical: screenHeight * 0.05,
        marginHorizontal: screenWidth * 0.04,
        paddingVertical: screenHeight * 0.05,
        backgroundColor: '#efc0fe',
        borderRadius: 20,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 2,
            height: 0
        },
        elevation: 6
    },
    inputContainer: {
        marginVertical: screenHeight * 0.01,
        marginHorizontal: screenWidth * 0.06,
    },
    input: {

    },
    buttonContainer: {
        marginVertical: screenHeight * 0.04,
        marginHorizontal: screenWidth * 0.06,
        justifyContent: 'space-around'
    },
    button: {
        marginVertical: screenHeight * 0.01,
    }
});

export default AuthenticationScreen;