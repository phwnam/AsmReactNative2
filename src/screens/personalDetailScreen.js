import { Button,TouchableOpacity, StyleSheet, Text, TextInput, View, Image, ScrollView } from 'react-native'
import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../theme/theme';

const PersonalScreen = (props) => {
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{backgroundColor:'white'}}>
      <View style={{ flexDirection: 'row',paddingHorizontal: 10,paddingTop: 20, }}>
        <TouchableOpacity style={{ justifyContent: 'center', marginBottom: 10 }} onPress={() => props.navigation.navigate('Menu')}>
          <Icon1 style={{ alignItems: 'center' }} name='menu' color={COLORS.primaryOrangeHex} size={25} />
        </TouchableOpacity>
        <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, fontWeight: 'bold' }}>Thông tin giao hàng</Text>
      </View>

        <Image
        style={{ width:200,height:200, alignSelf: 'center', margin:20 }}
        source={require('../img/avata.png')}
      />
      
      <TextInput style={st.txtInput} placeholder='Nhập họ tên' />      
      <TextInput style={st.txtInput} placeholder='Nhập số điện thoại' />
      <TextInput style={st.txtInput} placeholder='Nhập địa chỉ' />
      <TouchableOpacity style={st.button}>
        <Text style={st.buttonText}>Lưu</Text>
      </TouchableOpacity>
      
    </ScrollView>
    </SafeAreaView>
  )
}

export default PersonalScreen

const st = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    justifyContent:'center',
    textAlign:'center',
    backgroundColor:'white',
  },
  logo: {
    width:400,
    height: 400
  },
  welcome: {
    textAlign:'center',
    margin: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  txtInput: {
    borderWidth:1,
    borderColor: 'black',
    borderRadius: 8,
    marginTop: 12 ,
    marginLeft:12,
    marginRight: 12,
    padding:10
  },
  bigBtn: {
    backgroundColor: '#FACF23',
    borderWidth:1,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#FACF23', 
    padding: 15,
    marginTop: 12 ,
    marginLeft:12,
    marginRight: 12,
    borderRadius: 12,
  },
  button1: {
    backgroundColor: 'white', 
    padding: 15,
    marginTop: 12 ,
    marginLeft:12,
    marginRight: 12,
    borderWidth:1,
    borderColor:'black',
    borderRadius: 12,
  },
  button2: {
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 12,
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    textAlign:'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonText1: {
    color: 'black',
    textAlign:'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: '#FACF23',
    fontSize: 14,
    fontWeight: 'bold',
  },




})