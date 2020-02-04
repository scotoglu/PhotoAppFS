import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

class ForgottenPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
    };
    this.handleMail = this.handleMail.bind(this);
  }
  checkMail = () => {};
  handleMail = text => {
    this.setState({
      mail: text,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.componentContainer}>
          <Text style={{textAlign: 'center'}}>
            Mail adresiniz sisteme kayıtlı ise, 6 haneli kod gelicektir.
          </Text>
          <Input
            onChangeText={this.handleMail}
            placeholder="Mail Adresiniz"
            keyboardType="email-address"
            containerStyle={{marginBottom: 20}}
          />
          <Button
            title="Gönder"
            style={{marginTop: 20, width: '70%'}}
            onPress={this.checkMail}
          />
        </View>
      </View>
    );
  }
}

export default ForgottenPassword;

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  componentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
    height: height,
  },
});
