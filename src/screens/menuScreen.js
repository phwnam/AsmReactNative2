import { StyleSheet, Text, View , TouchableOpacity,Alert} from 'react-native'
import React from 'react'
import { COLORS } from '../theme/theme';

const MenuScreen = ({navigation}) => {
  const Logout = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        {
          text: "Huỷ",
          onPress: () => console.log("Huỷ"),
          style: "cancel"
        },
        {
          text: "Đăng xuất",
          onPress: () => {
            navigation.navigate('Login');
          }
        }
      ]
    );
  }

  return (
    <View>
        <TouchableOpacity onPress={() => navigation.navigate('Home1')}>
            <Text style={{color: COLORS.primaryOrangeHex, fontWeight: 'bold', fontSize: 12}}> Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Person')}>
            <Text style={{color: COLORS.primaryOrangeHex, fontWeight: 'bold', fontSize: 12}}> Liên hệ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Logout() }>
            <Text style={{color: COLORS.primaryOrangeHex, fontWeight: 'bold', fontSize: 12}}> Đăng xuất</Text>
        </TouchableOpacity>
    </View>
  )
}

export default MenuScreen

const styles = StyleSheet.create({})