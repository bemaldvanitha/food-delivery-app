import React,{useState} from 'react';
import {StyleSheet,Text,Dimensions,View} from 'react-native';
import {Modal,Portal,TextInput,Button} from 'react-native-paper';

import {Colors} from "../constants/Colors";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ChangeDiscountModal = (props) => {
    const [discount,setDiscount] = useState('');
    return(
        <Portal>
            <Modal visible={props.show} onDismiss={props.onDismiss} contentContainerStyle={styles.containerStyle}>
                <View>
                    <TextInput value={discount} onChangeText={(text) => setDiscount(text)} keyboardType='default'
                               mode='outlined' label='enter discount'/>
                    <Button icon='pen' mode='contained' color={Colors.primaryColor} >
                        save
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        height: screenHeight * 0.4,
        marginHorizontal: screenWidth * 0.05
    }
});

export default ChangeDiscountModal;