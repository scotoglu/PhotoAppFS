import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, Platform} from 'react-native';
import {Header, Icon} from 'react-native-elements';

class CustomHeader extends Component {
  render() {
    return (
      <Image
        source={require('../assets/logo/logov3.jpg')}
        style={{
          width: 70,
          height: 50,
          borderRadius: 5,
          marginVertical: 2,
        }}></Image>
    );
  }
}

export default class HeaderBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Header
        barStyle="dark-content"
        statusBarProps={{translucent: true, backgroundColor: 'transparent'}}
        containerStyle={{
          backgroundColor: '#fff',
          borderWidth: 2,
          borderColor: '#ecf0f1',
        }}
        centerContainerStyle={{}}
        centerComponent={<CustomHeader />}
      />
    );
  }
}

const styles = StyleSheet.create({});
/*{
          text: "Sinem Kobaner",
          style: {
            fontFamily: "sans-serif",
            color: "#fff",
            fontStyle: "italic",
            fontSize: 20,
            fontWeight: "300"
          }
        } */
