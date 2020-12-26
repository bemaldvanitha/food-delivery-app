import React,{useState} from 'react';
import {Dimensions,StyleSheet,View,Picker,Text} from 'react-native';
import {Modal,Portal,Button,Divider} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {Colors} from "../constants/Colors";
import {Categories} from '../Data/dummy-data';
import {changeOfferedCategories} from '../store/actions/ShopAction';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ChangeOfferedCategoryModal = (props) => {
    const [selectedCategoryId,setSelectedCategoryId] = useState(Categories[0].id);
    const dispatch = useDispatch();

    const changeOfferedCategoryList = () => {
        dispatch(changeOfferedCategories(props.shopId,selectedCategoryId,props.allOfferedCateGories));
        props.onDismiss();
    }

    return(
        <Portal>
            <Modal visible={props.show} onDismiss={props.onDismiss} contentContainerStyle={styles.containerStyle}>

                <Picker selectedValue={selectedCategoryId} mode='dropdown' onValueChange={(val) => setSelectedCategoryId(val)}>
                    {
                        Categories.map(cate => {
                            return(
                                <Picker.Item key={cate.id} value={cate.id} label={cate.name}/>
                            )
                        })
                    }
                </Picker>

                <Button icon='pen' mode='contained' color={Colors.primaryColor} style={styles.button}
                        onPress={changeOfferedCategoryList}>
                    change
                </Button>

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

export default ChangeOfferedCategoryModal;