import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground} from 'react-native';

const SplashScreen1 = ({ navigation }) => {
  useEffect(() => {
    // Thực hiện các công việc cần thiết, như kiểm tra trạng thái đăng nhập,
    // tải dữ liệu, và chuyển hướng đến màn hình khác sau một khoảng thời gian nhất định.
    // Ví dụ:
    setTimeout(() => {
      // Chuyển hướng đến màn hình khác
      navigation.navigate('Login');
    }, 3000); // Chuyển hướng sau 2 giây
  }, []);

  return (
    <ImageBackground source={require('../img/background.png')} style={{flex:1}}>

    <View style={styles.container}>

      <Image
        source={require('../img/PhwNamShoplogo.png')} // Thay đổi đường dẫn đến hình ảnh logo của ứng dụng
        style={styles.logo}
      />
      
      <Text style={styles.text}>Đây là 1 sản phẩm của </Text>
      <Text style={styles.text}>Nguyễn Phương Nam _ PH35329 </Text>

      <View style={{flexDirection:'row', justifyContent:'space-between', width:'80%', marginTop:100}}> 
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Splash')}>
          <Text>Về trước</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    color: '#333333', // Màu chữ của văn bản chào mừng
  },
  button:{
    margin:10,
    backgroundColor:'#FACF23',
    padding:10,
    borderRadius:10
  }
});

export default SplashScreen1;
