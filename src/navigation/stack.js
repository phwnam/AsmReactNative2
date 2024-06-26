import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import SplashScreen from '../screens/splashScreen';
import Tabs from './tabs';
import MenuScreen from '../screens/menuScreen';
import PersonalScreen from '../screens/personalDetailScreen';
import SeenProduct from '../screens/seenProduct';


const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Home1">
      <Stack.Screen name="Home1" component={Tabs} options={{headerShown:false}}/>
      <Stack.Screen name="Menu" component={MenuScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Person" component={PersonalScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Seen" component={SeenProduct} options={{headerShown:false}}/>
      {/* <Stack.Screen name="Tab" component={Tabs} options={{headerShown:false}}/> */}
    </Stack.Navigator>
  );
}

export default StackNav

const styles = StyleSheet.create({})