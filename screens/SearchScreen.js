import React,{useState} from 'react';
import {View, StyleSheet, Text, Platform,TextInput,FlatList} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

import {Colors} from "../constants/Colors";
import {Categories} from '../Data/dummy-data';
import CategoryItem from "../components/CategoryItem";

const SearchScreen = (props) => {
    const [search,setSearch] = useState('');
    return(
        <View style={styles.screen}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchText} value={search} onChangeText={(text) => setSearch(text)} placeholder='enter search keyword' keyboardType='default'/>
            </View>
            <FlatList data={Categories} keyExtractor={(item,index) => item.id} numColumns={2} renderItem={(data) =>{
                return(
                    <CategoryItem id={data.item.id} name={data.item.name} imageUrl={data.item.imageUrl} onSelect={() => {
                        props.navigation.navigate({routeName: 'selCat',params: {id: data.item.id}})
                    }}/>
                )
            }}/>
        </View>
    )
}

SearchScreen.navigationOptions = (navData) => {
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
    searchContainer: {
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 15,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5
    },
    searchText: {
        fontSize: 18,
    }
})

export default SearchScreen;
