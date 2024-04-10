import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNav from './src/navigation/stack'
import { store } from './src/redux/store'
import { Provider } from 'react-redux'
import AppContainer from './src/navigation'

const App = () => {
  return (
    <Provider store={store}>
      <>
      <AppContainer/>
    </>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})