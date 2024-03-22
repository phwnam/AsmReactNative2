import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,ToastAndroid, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/theme';

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const validate = async () => {
    if (!username || !password || !confirmPassword || !email) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Mật khẩu xác nhận không khớp.');
      return;
    }

    // Kiểm tra định dạng email
    if (!validateEmail(email)) {
      Alert.alert('Nhập đúng định dạng email');
      return;
    }

    try {
      const usernameResponse = await fetch(`https://65d02e84ab7beba3d5e2daa0.mockapi.io/users?username=${username}`);
      const emailResponse = await fetch(`https://65d02e84ab7beba3d5e2daa0.mockapi.io/users?email=${email}`);
      
      const usernameData = await usernameResponse.json();
      const emailData = await emailResponse.json();

      if (username == usernameData) {
        Alert.alert('Tên đăng nhập đã tồn tại.');
        return;
      }

      if (email == emailData) {
        Alert.alert('Email đã được sử dụng.');
        return;
      }

      const user ={
        username: username,
        password: password,
        email: email,
      }

      await fetch(`https://65d02e84ab7beba3d5e2daa0.mockapi.io/users`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        
      });
      ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Đã xảy ra lỗi khi đăng ký.');
    }

  };

  const handleRegister= async()  => {
    const user ={
      username: username,
      password: password,
      email: email,
    }
    if(!validate){
      await fetch(`https://65d02e84ab7beba3d5e2daa0.mockapi.io/users`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        
      });
    }else{
      
      ToastAndroid.show('Đăng ký lỗi', ToastAndroid.SHORT);
      return;
    }
      
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <Image
          style={{ width: 200, alignSelf: 'center', marginTop: 50 }}
          source={require('../img/PhwNamShoplogo.png')}
        />
        <Text style={st.welcome}>Kính chào quý khách !</Text>
        <Text style={{ textAlign: 'center', fontSize: 12, marginBottom: 20 }}>Đăng ký để tiếp tục</Text>
        <TextInput style={st.txtInput} placeholder='Nhập tên đăng nhập' value={username} onChangeText={(txt) => {setUsername(txt)}} />
        <TextInput style={st.txtInput} secureTextEntry={true} placeholder='Nhập mật khẩu' value={password} onChangeText={(txt) => {setPassword(txt)}} />
        <TextInput style={st.txtInput} secureTextEntry={true} placeholder='Nhập lại mật khẩu' value={confirmPassword} onChangeText={(txt) => {setConfirmPassword(txt)}}/>
        <TextInput style={st.txtInput} placeholder='Nhập email' value={email} onChangeText={(txt) => {setEmail(txt)}} />
        <TouchableOpacity style={st.button} onPress={validate}>
          <Text style={st.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
          <Text style={{ color: '#828282', fontWeight: 'bold', fontSize: 12 }}>Đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: COLORS.primaryOrangeHex, fontWeight: 'bold', fontSize: 12 }}> Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const st = StyleSheet.create({
  welcome: {
    textAlign: 'center',
    margin: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  txtInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    padding: 10
  },
  button: {
    backgroundColor: '#FACF23',
    padding: 15,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
