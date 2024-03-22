import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/homeScreen';
import CartScreen from '../screens/cartScreen';
import FavouriteScreen from '../screens/favouriteScreen';
import OrderHistoryScreen from '../screens/orderHistoryScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard:true,
            headerShown: false,
            tabBarShowLabel:false,
            tabBarStyle: st.tarBarStyle,
        }}>
        <Tab.Screen 
          name='Trang chủ' 
          component={HomeScreen}
          options={{
            tabBarIcon:({focused, color, size})=>(
              <Icon 
                name='home'
                size={25}
                color={focused ? '#FACF23': '#fffffd'
                }
              />
            ),
          }}></Tab.Screen>
        <Tab.Screen name='Giỏ hàng' component={CartScreen} options={{
            tabBarIcon:({focused, color, size})=>(
              <Icon 
                name='shopping-cart'
                size={25}
                color={focused ? '#FACF23': '#fffffd'
                }
              />
            ),
          }}/>
        <Tab.Screen name='Yêu thích' component={FavouriteScreen} options={{
            tabBarIcon:({focused, color, size})=>(
              <Icon 
                name='heart'
                size={25}
                color={focused ? '#FACF23': '#fffffd'
                }
              />
            ),
          }}/>
        <Tab.Screen name='Đơn hàng'component={OrderHistoryScreen} options={{
            tabBarIcon:({focused, color, size})=>(
              <Icon 
                name='bell'
                size={25}
                color={focused ? '#FACF23': '#fffffd'
                }
              />
            ),
          }}/>
          

      </Tab.Navigator>
  );
};
const st = StyleSheet.create({
  tarBarStyle:{
    height:80,
    position:'absolute',
    backgroundColor: '#dddddd',
    borderTopWidth:0,
    elevation:0,
    borderTopColor:'transparent',
  },
  BlurViewStyle:{
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
  },
})


export default Tabs;