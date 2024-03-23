import { Image, StyleSheet,View } from 'react-native'
import React from 'react'

const Banner = ({uri_img}) => {
  return (
    <View style={styles.banner}>
      <Image source={{uri: uri_img}} style={styles.anh}/>
    </View>
  );
};

export default Banner

const styles = StyleSheet.create({
  banner: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    height: 200,
  },
    anh:{
        width: 100,
        height: 100,
    },
})