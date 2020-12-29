import React,{useState,useEffect} from 'react';
import {StyleSheet,Text,View,Button,Dimensions,Alert,ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-paper';

import {projectAuth} from '../firebase/firebase';
import {Colors} from '../constants/Colors';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const AuthenticationScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isReEnteredPasswordValid, setIsReEnteredPasswordValid] = useState(false);
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    const emailValidator = (text) => {

        if (text.trim().length > 6) {

            const re = /\S+@\S+\.\S+/;

            if (re.test(email.toString())) {
                setIsEmailValid(true);
            } else {
                setIsEmailValid(false);
            }

        } else {
            setIsEmailValid(false)
        }

        setEmail(text);
    }

    const passwordValidator = (text) => {
        if (text.trim().length > 6) {
            setIsPasswordValid(true);
        } else {
            setIsPasswordValid(false);
        }
        setPassword(text);
    }

    const reEnteredPasswordValidator = (text) => {
        if (text.trim().length > 6 && text.trim() === password) {
            setIsReEnteredPasswordValid(true);
        } else {
            setIsReEnteredPasswordValid(false);
        }
        setReEnteredPassword(text)
    }

    const toggleButton = () => {
        setIsSignUp(prevState => !prevState);
    }

    useEffect(() => {
        if(error){
            Alert.alert('auth error',error,[
                {text: 'ok'}
            ])
        }
    },[error]);

    const authentication = async () => {
        setError(null);
        setIsLoading(true);

        if(isSignUp){
            if(isEmailValid && isPasswordValid && isReEnteredPasswordValid){

                try {

                    await projectAuth.createUserWithEmailAndPassword(email,password);

                    props.navigation.navigate({routeName: 'AddUser'});

                }catch (err){
                    console.log(err.message);
                    setError(err.message);
                }

            }else{
                Alert.alert('fill all fields','all fields must fill',[
                    {text: 'ok'}
                ]);
            }
        }else{
            if(isEmailValid && isPasswordValid){

                try {

                    await projectAuth.signInWithEmailAndPassword(email,password);

                    props.navigation.navigate({routeName: 'Main'});

                }catch (err){
                    console.log(err.message);
                    setError(err.message);
                }

            }else {
                Alert.alert('fill all fields','all fields must fill',[
                    {text: 'ok'}
                ]);
            }
        }
        setIsLoading(false);
    }

    return (
        <View style={styles.screen}>

            {
                isLoading && <ActivityIndicator size='large' color={Colors.offerColor}/>
            }

            <View style={styles.inputContainer}>
                <TextInput value={email} onChangeText={(text) => emailValidator(text)} mode='flat' label='enter email'
                           keyboardType='email-address' style={styles.input}/>
                {!isEmailValid && <Text style={styles.errorText}>enter valid email</Text>}
            </View>

            <View style={styles.inputContainer}>
                <TextInput value={password} onChangeText={(text) => passwordValidator(text)} label='enter password'
                           mode='flat' keyboardType='default' secureTextEntry={true} style={styles.input}/>
                {!isPasswordValid && <Text style={styles.errorText}>enter valid password</Text>}
            </View>

            {
                isSignUp && <View style={styles.inputContainer}>
                    <TextInput value={reEnteredPassword} onChangeText={(text) => reEnteredPasswordValidator(text)}
                               label='enter password again'
                               keyboardType='default' secureTextEntry={true} mode='flat' style={styles.input}/>
                    {!isReEnteredPasswordValid && <Text style={styles.errorText}>enter same password agein</Text>}
                </View>
            }

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title={isSignUp ? 'sign up' : 'sign in'} color={Colors.offerColor}
                            onPress={authentication}/>
                </View>
                <View style={styles.button}>
                    <Button title={isSignUp ? 'set is sign in' : 'set is sign up'} color={Colors.offerColor}
                            onPress={toggleButton}/>
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
    },
    errorText: {
        color: 'red'
    }
});

export default AuthenticationScreen;