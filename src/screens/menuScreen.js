import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SPACING, FONTSIZE, COLORS, FONTFAMILY } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import Auth from '../services/auth';

const LIGHT_THEME = {
  background: '#ffffff',
  text: '#000000',
  buttonBackground: COLORS.primaryOrangeHex,
  buttonText: '#000000',
};

const DARK_THEME = {
  background: '#18191a',
  text: '#ffffff',
  infoBlock:'#30363d',
  buttonBackground: '#bdbdbd',
  buttonText: '#000000',
};

const MenuScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();

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
            // Thực hiện đăng xuất ở đây
            Auth.signOut();
            console.log("Đăng xuất");
          }
        }
      ]
    );
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  }

  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;

  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      padding: SPACING.space_15,
      backgroundColor: theme.background,
    },
    TextSetting: {
      fontSize: FONTSIZE.size_28,
      color: theme.text,
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
      color: theme.text,
    },
    infoBlock: {
      backgroundColor: theme.infoBlock,
      padding: SPACING.space_10,

      borderRadius: 8,
    },
    button: {
      backgroundColor: theme.buttonBackground,
      paddingVertical: SPACING.space_10,
      paddingHorizontal: SPACING.space_20,
      borderRadius: 8,
      marginBottom: SPACING.space_10,
      alignItems: 'center',
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: FONTSIZE.size_16,
      fontFamily: FONTFAMILY.poppins_semibold,
    },
    text:{
      color: theme.text
    }
  });

  return (
    <View style={styles.Container}>
        <View style={{ margin: 16 }}>
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
              <Text style={styles.text}>Họ và tên: Nguyễn Phương Nam</Text>
              <Text style={styles.text}>Mã sinh viên: PH35329</Text>
              <Text style={styles.text}>Lớp: MD18306</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin điện thoại</Text>
            <View style={styles.infoBlock}>
              <Text style={styles.text}>Loại điện thoại: Samsung Note 20</Text>
              <Text style={styles.text}>Cấu hình: CPU SnapDragon 865, RAM 8Gb, Bộ nhớ trong 256Gb</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thiết lập riêng</Text>
            <View style={styles.infoBlock}>
              <TouchableOpacity onPress={() => toggleTheme()} style={styles.button}>
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
    </View>
  );
};

export default MenuScreen;
