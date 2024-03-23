import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  const pages = [
    {
      index:1,
      title: 'Nguyễn Phương Nam _ PH35329',
      image: require('../img/PhwNamShoplogo.png'),
    },
    {
      index:2,
      title: 'Khám phá các tính năng mới',
      image: require('../img/PhwNamShoplogo.png'),
    },
    {
      index:3,
      title: 'Bắt đầu trải nghiệm ngay bây giờ',
      image: require('../img/PhwNamShoplogo.png'),
    },
  ];

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {pages.map((page, index) => (
          <View key={index} style={styles.pageContainer}>
            <Image source={page.image} style={styles.image} />
            <Text style={styles.title}>{page.title}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
        <Text style={styles.getStartedButtonText}>Bắt đầu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  getStartedButton: {
    backgroundColor: '#FACF23',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 40,
    alignSelf: 'center',
  },
  getStartedButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
