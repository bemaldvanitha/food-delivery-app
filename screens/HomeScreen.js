import React,{useEffect} from 'react';
import {View,StyleSheet,Text,Platform,FlatList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useSelector,useDispatch} from 'react-redux';

import {Colors} from '../constants/Colors';
import ShopItem from "../components/ShopItem";
import {fetchUsers} from '../store/actions/UsersAction';
import {fetchShops} from '../store/actions/ShopAction';

const HomeScreen = (props) => {
    const shops = useSelector(state => state.shop.shops);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchShops());
    },[dispatch])

    return(
        <View style={styles.screen}>
            <FlatList data={shops} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                return(
                    <ShopItem id={data.item.id} name={data.item.name} rating={data.item.rating} ratedNumber={data.item.ratedNumber}
                              imageUrl={data.item.imageUrl} offers={data.item.offers} locationInString={data.item.locationInString}
                              offeredCategoryIds={data.item.offeredCategoryIds} onSelect={() => {
                                  props.navigation.navigate({routeName: 'shop',params: {'id': data.item.id}})
                    }}/>
                )
            }}/>
        </View>
    )
}

HomeScreen.navigationOptions = navData => {
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

    }
})

export default HomeScreen;