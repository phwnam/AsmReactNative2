import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNav from './src/navigation/stack'

const App = () => {
  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})