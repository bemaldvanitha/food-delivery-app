import React,{useState} from 'react';
import {View, Text ,TextInput ,Button ,StyleSheet, Dimensions} from 'react-native';

import {Colors} from '../constants/Colors';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const AddNotes = (props) => {
    const [note,setNote] = useState('');

    return(
        <View style={styles.modal}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Add Note</Text>
                <TextInput style={styles.input} value={note} onChangeText={(text) => setNote(text)} placeholder='add note' keyboardType='default'/>
            </View>
            <View style={styles.buttonContainer}>
                <Button title='OK' onPress={() => {props.setNotes(note)}} color={Colors.bannerColor} style={styles.button}/>
                <Button title='Cancel' onPress={props.cancelModal} color={Colors.primaryColor} style={styles.button}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginVertical: screenHeight * 0.08,
        marginHorizontal: screenWidth * 0.05
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        height: screenHeight * 0.1,
        width: screenWidth * 0.8
    },
    label: {
        fontFamily: 'roboto',
        textAlign: 'center'
    },
    buttonContainer: {
        width: screenWidth * 0.8,
        justifyContent: 'center'
    },
    button: {
        marginTop: 10
    }
})

export default AddNotes;
