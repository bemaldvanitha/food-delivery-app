import React,{useState} from 'react';
import {StyleSheet,Text,TextInput,Button,Dimensions,View} from 'react-native';
import {Portal,Modal} from 'react-native-paper';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ChangePlaceModal = (props) => {
    const [address,setAddress] = useState('');
    return(
        <Portal>
            <Modal visible={props.visibility} onDismiss={props.closeModal} contentContainerStyle={style.modalStyle}>
                <View style={style.inputContainer}>
                    <Text style={style.label}>Enter New Address</Text>
                    <TextInput value={address} onChangeText={(text) => setAddress(text)} style={style.input} placeholder='address'
                               keyboardType='default'/>
                </View>
                <Button title='edit Address' color='coral'/>
            </Modal>
        </Portal>
    )
}

const style = StyleSheet.create({
    modalStyle: {
        backgroundColor: 'white',
        height: screenHeight * 0.4,
        marginHorizontal: screenWidth * 0.05,
        paddingHorizontal: screenWidth * 0.05,
        borderRadius: 15,
    },
    inputContainer: {
        paddingVertical: screenHeight * 0.05
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        height: screenHeight * 0.05
    },
    label: {
        fontFamily: 'roboto-italic',
        fontSize: 16
    }
});

export default ChangePlaceModal;
