
// import { StyleSheet, Text, View,Image } from 'react-native'
// import React from 'react'
// import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
// import HomeScreen from '../screens/homeScreen';
// import PersonalScreen from '../screens/personalDetailScreen';


// // const Drawerdemo = createDrawerNavigator();

// const Drawer = createDrawerNavigator();
// const CustomDrawerContent = (props) => {
//   return(
//     <DrawerContentScrollView {...props}>
//       <View style={{padding:20,backgroundColor:"#e4f1ff", justifyContent:'center',alignItems:'center'}}>
//         <Image source={{
//           uri:'https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/393730907_1701801136969131_7175229309307837434_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHSAe0eG7bw7ihFJBFcFgUHjGJDmwi2Vg-MYkObCLZWD4T_ZgwEXBZeBxD42eU9jWr8H6b4HxeZXt7bX_YtD-AY&_nc_ohc=oqpB-etr-bMAX_mf4jB&_nc_ht=scontent.fhan18-1.fna&cb_e2o_trans=q&oh=00_AfDKwFNn5cy_Zi1KBq2Gy9-8cmS4Nnbex88_GpA-lDavzQ&oe=65BE56F1'
//         }} style={{width:80, height:80, borderRadius:40}}
//         />
//         <Text style={{fontSize:17, marginTop:10, fontWeight:'bold'}}>Nguyễn Phương Nam</Text>
//       </View>
//       <DrawerItemList{...props}/>
//       {/* <DrawerItem label="Phần tử thêm" onPress={() => {
//         Alert.alert('Bạn click vào phần tử thêm')
//         props.navigation.closeDrawer();
//       }}/> */}
//     </DrawerContentScrollView>
//   );
// }

// const MyDrawer = () => {
//   return (
//     // <Drawerdemo.Navigator initialRouteName="Home">
//     //     <Drawerdemo.Screen name="Home" component={Trangchudemo}/>
//     //     <Drawerdemo.Screen name="About" component={GioiThieudemo}/>
//     // </Drawerdemo.Navigator>

//     <Drawer.Navigator initialRouteName='Home'
//       drawerContent={(props) => <CustomDrawerContent{...props}/>}
//     >
//       <Drawer.Screen name='Home' component={HomeScreen} options={{headerShown:true}}/>
//       <Drawer.Screen name='Personal' component={PersonalScreen} options={{headerShown:false}}/>
//     </Drawer.Navigator>
//   )
// }

// export default MyDrawer

// const styles = StyleSheet.create({})