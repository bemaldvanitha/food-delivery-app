import React from 'react';
import {Platform,Image} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';

import {Colors} from '../constants/Colors';

import AboutScreen from "../screens/AboutScreen";
import AccountScreen from "../screens/AccountScreen";
import BasketScreen from "../screens/BasketScreen";
import CategoryItemScreen from "../screens/CategoryItemScreen";
import DeliverScreen from "../screens/DeliverScreen";
import DeliveryDetailScreen from "../screens/DeliverDetailScreen";
import EditProductScreen from "../screens/EditProductScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import FoodItemScreen from "../screens/FoodItemScreen";
import HomeScreen from "../screens/HomeScreen";
import OrderScreen from "../screens/OrdersScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import PromotionScreen from "../screens/PromotionsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SetDeliveryAddressScreen from "../screens/SetDeliveryAddressScreen";
import SearchScreen from "../screens/SearchScreen";
import ShopOwnerScreen from "../screens/ShopOwnerScreen";
import ShopScreen from "../screens/ShopScreen";
import EditUserScreen from "../screens/EditUserScreen";
import EditShopScreen from "../screens/EditShopScreen";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import ShopCurrentOrders from "../screens/ShopCurrentOrders";
import NavigationHeader from '../components/NavigationHeader';
import DrawerHeader from "../components/NavigationHeader";

const headerCustomStyles = {
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitleStyle: {
        fontFamily: 'roboto-bold',
        fontSize: 22
    },
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    },
    headerTitleAlign: 'center'
}

const HomeNavigator = createStackNavigator({
    home: {
        screen: HomeScreen
    },
    shop: {
        screen: ShopScreen,
    },
    food: {
        screen: FoodItemScreen
    },
    basket: {
        screen: BasketScreen
    },
    setAddress: {
        screen: SetDeliveryAddressScreen
    }
},{
    defaultNavigationOptions: headerCustomStyles
});

const SearchNavigator = createStackNavigator({
    search: {
        screen: SearchScreen,
    },
    selCat: {
        screen: CategoryItemScreen
    },
    shop: {
        screen: ShopScreen
    }
},{
    defaultNavigationOptions: headerCustomStyles
});

const OrdersNavigator = createStackNavigator({
    orders: {
        screen: OrderScreen
    },
    orderDetail: {
        screen: OrderDetailScreen
    }
},{
    defaultNavigationOptions: headerCustomStyles
});

const AccountNavigator = createStackNavigator({
    account: {
        screen: AccountScreen
    },
    about: {
        screen: AboutScreen
    },
    promotion: {
        screen: PromotionScreen
    },
    favorite: {
        screen: FavoriteScreen
    },
    settings: {
        screen: SettingsScreen
    },
    edituser: {
        screen: EditUserScreen
    }
},{
    defaultNavigationOptions: headerCustomStyles
});

const DeliverNavigator = createStackNavigator({
    deliver: {
        screen: DeliverScreen
    },
    deliverDetail: {
        screen: DeliveryDetailScreen
    }
},{
    defaultNavigationOptions: headerCustomStyles,
    navigationOptions: {
        drawerIcon: drawerOption => {
            return(
                <Image source={require('../assets/images/drawer/icons/delivery-truck.png')} style={{width: 30,height: 30}}/>
            )
        },
        drawerLabel: 'Deliver'
    }
});

const ShopNavigator = createStackNavigator({
    shop: {
        screen: ShopOwnerScreen
    },
    shopDetail: {
        screen: EditProductScreen
    },
    editShop: {
        screen: EditShopScreen,
    },
    currentOrders: {
        screen: ShopCurrentOrders
    }
},{
    defaultNavigationOptions: headerCustomStyles,
    navigationOptions: {
        drawerIcon: drawerOption => {
            return(
                <Image source={require('../assets/images/drawer/icons/shop.png')} style={{width: 30,height: 30}}/>
            )
        },
        drawerLabel: 'Shop Owner',
    }
});

const TabNavigator = createBottomTabNavigator({
    homeNav: {
        screen: HomeNavigator,
        navigationOptions: {
            tabBarIcon: tabBarOption => {
                return(
                    <Image source={require('../assets/images/tabbar/icon/home.png')} style={{width: 30,height: 30}}/>
                )
            },
            tabBarLabel: 'Home'
        }
    },
    searchNav: {
        screen: SearchNavigator,
        navigationOptions: {
            tabBarIcon: tabBarOption => {
                return(
                    <Image source={require('../assets/images/tabbar/icon/search.png')} style={{width: 30,height: 30,marginTop: 5}}/>
                )
            },
            tabBarLabel: 'Search'
        }
    },
    orderNav: {
        screen: OrdersNavigator,
        navigationOptions: {
            tabBarIcon: tabBarOption => {
                return(
                    <Image source={require('../assets/images/tabbar/icon/orders.png')} style={{width: 30,height: 30,marginTop: 5}}/>
                )
            },
            tabBarLabel: 'Orders'
        }
    },
    accountNav: {
        screen: AccountNavigator,
        navigationOptions: {
            tabBarIcon: tabBarOption => {
                return(
                    <Image source={require('../assets/images/tabbar/icon/account.png')} style={{width: 30,height: 30,marginTop: 5}}/>
                )
            },
            tabBarLabel: 'Account'
        }
    }
},{
    tabBarOptions: {
        activeTintColor: Colors.secondaryColor,
        labelStyle: {
            fontFamily: 'roboto',
            fontSize: 12
        },
        allowFontScaling: true,
    },
    navigationOptions: {
        drawerIcon: drawerOption => {
            return(
                <Image source={require('../assets/images/drawer/icons/home.png')} style={{width: 30,height: 30}}/>
            )
        },
        drawerLabel: 'Home'
    }
});

const MainNavigator = createDrawerNavigator({
    userNav: {
        screen: TabNavigator,
    },
    shopNav: {
        screen: ShopNavigator
    },
    deliverNav: {
        screen: DeliverNavigator
    }
},{
    contentOptions: {
        activeTintColor: Colors.secondaryColor,
        labelStyle: {
            fontSize: 24,
            fontFamily: 'roboto',
        },
    },
    contentComponent: (props) => <DrawerHeader {...props}/>
});

const AuthNavigator = createStackNavigator({
    auth: {
        screen: AuthenticationScreen
    }
},{
    defaultNavigationOptions: headerCustomStyles
});

const AddUserNavigator = createStackNavigator({
    adduser: {
        screen: EditUserScreen
    }
},{
    defaultNavigationOptions: headerCustomStyles
});


const FinalNavigator = createSwitchNavigator({
   Auth: AuthNavigator,
   AddUser: AddUserNavigator,
   Main: MainNavigator,
});

export default createAppContainer(FinalNavigator);
