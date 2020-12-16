import React,{useState} from 'react';
import {StyleSheet,Dimensions,View} from 'react-native';
import {Modal,Portal,TextInput,Button,Divider} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {changeDiscount} from '../store/actions/ShopAction';
import {Colors} from "../constants/Colors";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ChangeDiscountModal = (props) => {
    const dispatch = useDispatch();
    const [discount,setDiscount] = useState('');

    const changeOfferHandler = () => {
        dispatch(changeDiscount(props.shopId,discount));
        props.onDismiss();
    }

    return(
        <Portal>
            <Modal visible={props.show} onDismiss={props.onDismiss} contentContainerStyle={styles.containerStyle}>
                <View>
                    <TextInput value={discount} onChangeText={(text) => setDiscount(text)} mode='outlined'
                               label='enter discount' multiline={true} numberOfLines={3}/>
                    <Divider/>
                    <Button icon='pen' mode='contained' color={Colors.primaryColor} style={styles.button}
                            onPress={changeOfferHandler}>
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
    },
    button: {
        marginVertical: screenHeight * 0.05
    }
});

export default ChangeDiscountModal;