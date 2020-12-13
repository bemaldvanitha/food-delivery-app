import React from 'react';
import {View, StyleSheet, Text, Platform,Dimensions,ImageBackground,FlatList} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {FAB,Chip,Button,Avatar,Divider,IconButton} from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import {useSelector} from 'react-redux';

import {Colors} from "../constants/Colors";
import {Categories} from '../Data/dummy-data';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ShopOwnerScreen = (props) => {
    const currentShop = useSelector(state => state.shop.shops).find(shop => shop.id === 's1');
    const shopFoods = useSelector(state => state.food.foods).filter(food => food.shopId === 's1');

    const selectedCategories  = [];
    currentShop.offeredCategoryIds.map(id => {
        const category = Categories.find(cat => cat.id === id);
        selectedCategories.push(category);
    });

    return(
        <View style={styles.screen}>
            <ImageBackground source={{uri: currentShop.imageUrl}} style={styles.image}>
                <Text style={styles.name}>{currentShop.name}</Text>
            </ImageBackground>
            <View style={styles.detailContainer}>
                <Text style={styles.detailText}>{currentShop.detail}</Text>
            </View>
            <Divider/>
            <View style={styles.ratingContainer}>
                <StarRating disabled={true} rating={currentShop.rating} maxStars={5} fullStarColor='gold' starSize={32}/>
                <Text>({currentShop.ratedNumber})</Text>
            </View>
            <Divider/>
            <View style={styles.discountContainer}>
                <Text style={styles.discountText}>{currentShop.offers}</Text>
                <Button style={styles.discountButton} icon='pencil' mode='contained' color={Colors.primaryColor}>change</Button>
            </View>
            <Divider/>
            <View style={styles.offeredFoodContainer}>
                <FlatList data={selectedCategories} keyExtractor={(item,index) => item.id} numColumns={2} renderItem={(data) => {
                    return(
                        <Chip style={styles.offeredFoodChip} mode='outlined'
                              avatar={<Avatar.Image source={data.item.imageUrl} size={28}/>}>
                            <Text style={styles.offeredFoodText}>{data.item.name}</Text>
                        </Chip>
                    )
                }}/>
            </View>

            <FAB style={styles.fab} large icon='settings' onPress={() => {}}/>
        </View>
    )
}

ShopOwnerScreen.navigationOptions = (navData) => {
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
    fab: {
        position: 'absolute',
        margin: 0,
        right: screenWidth * 0.08,
        top: screenHeight * 0.7,
        backgroundColor: Colors.primaryColor,
    },
    image: {
        width: '100%',
        height: screenHeight * 0.3,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    name: {
        marginBottom: screenHeight * 0.02,
        backgroundColor: 'black',
        opacity: 0.7,
        paddingVertical: screenHeight * 0.015,
        paddingHorizontal: screenWidth * 0.08 ,
        fontFamily: 'roboto-bold',
        fontSize: 25,
        color: 'white',
        borderRadius: 10
    },
    detailContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: screenHeight * 0.01
    },
    detailText: {
        fontFamily: 'roboto-light',
        fontSize: 18
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: screenHeight * 0.02
    },
    discountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: screenHeight * 0.01
    },
    discountText: {
        width: '50%',
        fontFamily: 'san-swashed',
        fontSize: 16,
        textAlign: 'center',
    },
    discountButton: {
        width: '40%',
        padding: 10
    },
    offeredFoodContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    offeredFoodChip: {
        width: screenWidth * 0.4,
        marginVertical: screenHeight * 0.005,
        marginHorizontal: screenWidth * 0.008,
        backgroundColor: '#eee3dd'
    },
    offeredFoodText: {
        fontFamily: 'roboto-black-italic'
    }
})

export default ShopOwnerScreen;