import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {View, Text} from 'native-base'
import {Platform} from 'react-native'

class App extends Component {
  render() {
    return (
      <View>
        <Text>{Platform.OS} {Platform.Version}</Text>
      </View>
    );
  }
}

export default App;
