import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Block = ({title,children}) => {
  return (
    <View style={[styles,styles.khung]}>
      <Text style={styles.title}>{title}</Text>
      <View>{children}</View>
    </View>
  )
}

export default Block

const styles = StyleSheet.create({
    khung:{
        borderRadius:5,
        height:200,
        padding:10,
        backgroundColor:'#fff',
        borderRadius:20,
        marginTop:10,
        marginHorizontal:10,
        elevation: 3,
    },
    title:{
      textAlign:'center',
      fontWeight:'bold',
      fontSize:16,
      marginBottom:10,
      color:'#FF5733'
    }
})