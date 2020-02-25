import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Samples extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('Data from Home', this.props.data);
    console.log('Data from: ', this.props.from);

    console.log('Current Scene: ', Actions.currentScene);
    console.log('Previous Scene: ', Actions.prevScene);
  }
  componentWillUnmount() {
    console.log('Unmounting...');
    if (this.props.from === 'home') {
      Actions.reset('home');
      console.log('if active');
    }
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
