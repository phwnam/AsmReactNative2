import { StyleSheet, Text, View, TouchableOpacity, ImageBackground,Alert } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Auth from '../services/auth';


const MenuScreen = ({ navigation }) => {
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
            Auth.signOut();
          }
        }
      ]
    );
  }

  return (
    <View >
      <ImageBackground source={require('../img/background.png')} style={{height:'100%'}}>
        <View style={{margin:16}}>
        <TouchableOpacity onPress={() => navigation.navigate('Home1')}>
          <Icon style={{ alignItems: 'center' }}
            name="angle-left"
            size={30}
            color={COLORS.primaryOrangeHex}

          />
        </TouchableOpacity>
        <Text style={styles.TextSetting}>Setting</Text>

        {/* Thông tin cá nhân */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
          <View style={styles.infoBlock}>
            <Text>Họ và tên: Nguyễn Phương Nam</Text>
            <Text>Mã sinh viên: PH35329</Text>
            <Text>Lớp: MD18306</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin điện thoại</Text>
          <View style={styles.infoBlock}>
            <Text>Loại điện thoại: Samsung Note 20</Text>
            <Text>Cấu hình: CPU SnapDragon 865, RAM 8Gb, Bộ nhớ trong 256Gb</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thiết lập riêng</Text>
          <View style={styles.infoBlock}>
            <TouchableOpacity onPress={() => console.log("Chuyển sang đổi theme")} style={styles.button}>
              <Text style={styles.buttonText}>Đổi theme</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Logout()} style={styles.button}>
              <Text style={styles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Chuyển sang đổi mật khẩu")} style={styles.button}>
              <Text style={styles.buttonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </ImageBackground>

    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: SPACING.space_15,
  },
  TextSetting: {
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryBlackHex,
    textAlign: 'center',
    marginTop: SPACING.space_15,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  section: {
    marginTop: SPACING.space_20,
    marginBottom: SPACING.space_15,
  },
  sectionTitle: {
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
    marginBottom: SPACING.space_10,
  },
  infoBlock: {
    backgroundColor: '#dbdbdb',
    padding: SPACING.space_10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#FACF23',
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_20,
    borderRadius: 8,
    marginBottom: SPACING.space_10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});



// import { StyleSheet, Text, View , TouchableOpacity,Alert} from 'react-native'
// import React from 'react'
// import { COLORS } from '../theme/theme';

// const MenuScreen = ({navigation}) => {
//   const Logout = () => {
//     Alert.alert(
//       "Xác nhận",
//       "Bạn có chắc chắn muốn đăng xuất?",
//       [
//         {
//           text: "Huỷ",
//           onPress: () => console.log("Huỷ"),
//           style: "cancel"
//         },
//         {
//           text: "Đăng xuất",
//           onPress: () => {
//             navigation.navigate('Login');
//           }
//         }
//       ]
//     );
//   }

//   return (
//     <View>
//         <TouchableOpacity onPress={() => navigation.navigate('Home1')}>
//             <Text style={{color: COLORS.primaryOrangeHex, fontWeight: 'bold', fontSize: 12}}> Trang chủ</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Person')}>
//             <Text style={{color: COLORS.primaryOrangeHex, fontWeight: 'bold', fontSize: 12}}> Liên hệ</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => Logout() }>
//             <Text style={{color: COLORS.primaryOrangeHex, fontWeight: 'bold', fontSize: 12}}> Đăng xuất</Text>
//         </TouchableOpacity>
//     </View>
//   )
// }

// export default MenuScreen

// const styles = StyleSheet.create({})