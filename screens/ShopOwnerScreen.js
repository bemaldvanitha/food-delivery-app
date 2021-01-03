import React,{useState} from 'react';
import {View, StyleSheet, Text, Platform,Dimensions,ImageBackground,FlatList,ScrollView,Image,TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {FAB,Chip,Button,Avatar,Divider,IconButton,Card,Provider} from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import {useSelector,useDispatch} from 'react-redux';

import {Colors} from "../constants/Colors";
import {Categories} from '../Data/dummy-data';
import {deleteFood} from '../store/actions/FoodAction'
import CardActions from "react-native-paper/src/components/Card/CardActions";
import ChangeDiscountModal from "../components/ChangeDiscountModal";
import ChangeOfferedCategoryModal from "../components/ChangeOfferedCategoryModal";
import {projectAuth} from '../firebase/firebase';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ShopOwnerScreen = (props) => {
    const userId = projectAuth.currentUser.uid;
    const dispatch = useDispatch();
    const [isModalShow,setIsModalShow] = useState(false);
    const [isOfferedModalShow,setIsOfferedModalShow] = useState(false);

    const currentUser = useSelector(state => state.user.users).find(user => user.id === userId);
    const isCurrentUserShopOwner = currentUser.isShopOwner;

    if(!isCurrentUserShopOwner){

        return (
            <View style={styles.centered}>
                <Text style={styles.otherText}>this screen only for shop owners</Text>
            </View>
        )

    }else{

        const isCurrentUserOwnsShop = useSelector(state => state.shop.shops).findIndex(shop => shop.uId === userId);

        if(isCurrentUserOwnsShop === -1){

            return (
                <View style={styles.centered}>
                    <Ionicons name="md-add" size={50} color="red" onPress={() => {
                        props.navigation.navigate({routeName: 'editShop'})
                    }}/>
                    <Text style={styles.otherText}>Add Shop</Text>
                </View>
            )

        } else {

            const currentShop = useSelector(state => state.shop.shops).find(shop => shop.uId === userId);
            const shopFoods = useSelector(state => state.food.foods).filter(food => food.shopId === currentShop.id);

            const selectedCategories  = [];
            currentShop.offeredCategoryIds.map(id => {
                const category = Categories.find(cat => cat.id === id);
                selectedCategories.push(category);
            });

            const editProductHandler = (id) => {
                props.navigation.navigate({routeName: 'shopDetail',params: {id: id}});
            }

            const addProductHandler = () => {
                props.navigation.navigate({routeName: 'shopDetail'});
            }

            const deleteProductHandler = (id) => {
                dispatch(deleteFood(id));
            }

            const toggleModal = () => {
                setIsModalShow(prevState => !prevState);
            }

            const toggleOfferedModal = () => {
                setIsOfferedModalShow(prevState => !prevState);
            }

            const editShopDetail = () => {
                props.navigation.navigate({routeName: 'editShop',params: {shopId: 's1'}})
            }

            return(
                <ScrollView>
                    <Provider>
                        <View style={styles.screen}>
                            <ChangeDiscountModal show={isModalShow} onDismiss={toggleModal} shopId={currentShop.id}/>

                            <ChangeOfferedCategoryModal show={isOfferedModalShow} onDismiss={toggleOfferedModal} shopId={currentShop.id}
                                                        allOfferedCateGories={currentShop.offeredCategoryIds}/>

                            <ImageBackground source={{uri: currentShop.imageUrl}} style={styles.image}>
                                <TouchableOpacity onPress={editShopDetail}>
                                    <Text style={styles.name}>{currentShop.name}</Text>
                                </TouchableOpacity>
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
                                <Button style={styles.discountButton} icon='pencil' mode='contained' color={Colors.primaryColor} onPress={toggleModal}>
                                    change
                                </Button>
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
                                <IconButton icon='pencil' size={28} color={Colors.primaryColor} onPress={toggleOfferedModal} animated={true}/>
                            </View>

                            <Divider/>
                            <View>
                                <FlatList data={shopFoods} horizontal={true} renderItem={(data) => {
                                    return(
                                        <Card elevation={5} style={styles.card}>
                                            <Card.Title title={data.item.name} subtitle={data.item.description}/>
                                            <Card.Content>
                                                <Image style={styles.categoryImage} source={{uri: data.item.imageUrl}}/>
                                            </Card.Content>
                                            <CardActions style={styles.cardAction}>
                                                <IconButton icon='delete' size={28} color={Colors.primaryColor}
                                                            onPress={() => deleteProductHandler(data.item.id)} animated={true}/>
                                                <IconButton icon='pencil' size={28} color={Colors.primaryColor}
                                                            onPress={() => editProductHandler(data.item.id)} animated={true}/>
                                            </CardActions>
                                        </Card>
                                    )
                                }}/>
                            </View>

                            <FAB style={styles.fab} large icon='settings' onPress={addProductHandler}/>
                        </View>
                    </Provider>
                </ScrollView>
            )
        }
    }
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
        },
        headerRight: () => {
            return(
                <View style={{paddingRight: 20,paddingTop: 15,flexDirection: 'row'}}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-add' : 'ios-add'} size={24} color={Platform.OS === 'android' ? 'white': Colors.primaryColor} onPress={() => {
                        navData.navigation.navigate({routeName: 'shopDetail'})
                    }}/>
                    <Ionicons name="ios-basket" size={24} style={{marginLeft: 20}} color={Platform.OS === 'android' ? 'white': Colors.primaryColor} onPress={() => {
                        navData.navigation.navigate({routeName: 'currentOrders'})
                    }} />
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
        height: screenHeight * 0.25,
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
    },
    categoryImage: {
        width: 100,
        height: 100
    },
    card: {
        marginHorizontal: screenWidth * 0.02,
        marginVertical: screenHeight  * 0.008,
        padding: screenHeight * 0.01,
    },
    cardAction: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    otherText: {
        fontFamily: 'roboto-black',
        fontSize: 18
    }
})

export default ShopOwnerScreen;