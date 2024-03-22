import React, {useEffect}from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, []);
  return (
    <View style={st.container}>
      <Image style={st.logo} source={require('../img/PhwNamShoplogo.png')} />
    </View>
  );
};

const st = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    height: 150
  }

});

export default SplashScreen;