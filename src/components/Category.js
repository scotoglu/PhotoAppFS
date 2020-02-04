import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';

export default class Category extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={this.props.imageUrl}></Image>
        </View>
        <View style={styles.bottomText}>
          <Text>{this.props.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: '#dddddd',
    borderRadius: 10,
  },
  imageContainer: {flex: 2},
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomText: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
  },
});
