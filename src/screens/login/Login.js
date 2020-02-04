import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import Color from '../../constant/Color';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMail: '',
      userPassword: '',
    };
    this.handleUserMail = this.handleUserMail.bind(this);
    this.handleUserPassword = this.handleUserPassword.bind(this);
    this.login = this.login.bind(this);
    this.userAlreadyLogin = this.userAlreadyLogin.bind(this);
  }
  componentDidMount() {
    this.userAlreadyLogin();
  }
  handleUserMail = text => {
    if (text != '') {
      this.setState({
        userMail: text,
      });
    }
  };
  handleUserPassword = text => {
    if (text != '') {
      this.setState({
        userPassword: text,
      });
    }
  };
  //checks if user already login
  userAlreadyLogin = async () => {
    const logKey = await AsyncStorage.getItem('mail');
    try {
      if (logKey != null) {
        Actions.appointmentList();
      }
      return null;
    } catch (error) {
      console.log('Login userAlreadyLogin control.  ' + error);
    }
  };

  login = async () => {
    const logKey = await AsyncStorage.getItem('mail');
    try {
      if (this.state.userMail === logKey) {
        Actions.appointmentList();
      } else {
        alert('Wrong user...');
        if (logKey === null) {
          await AsyncStorage.setItem('mail', this.state.userMail);
        }
      }

      return null;
    } catch (error) {
      console.log('Login userAlreadyLogin control.  ' + error);
    }
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.Container} enabled>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo/logov3.jpg')}
            style={styles.logo}></Image>
        </View>
        <View style={styles.componentContainer}>
          <Input
            autoCorrect={false}
            autoCapitalize={false}
            keyboardType="email-address"
            onChangeText={this.handleUserMail}
            inputStyle={{marginLeft: 5, textAlign: 'center'}}
            placeholder="Mail Adresiniz"
            leftIcon={<Icon name="user" size={24} />}
            returnKeyType={'next'}
            onSubmitEditing={() => this.mailInput.focus()}
            blurOnSubmit={false}
          />

          <Input
            ref={input => {
              this.mailInput = input;
            }}
            secureTextEntry
            onChangeText={this.handleUserPassword}
            inputStyle={{marginLeft: 5, textAlign: 'center'}}
            placeholder="Şifreniz"
            leftIcon={<Icon name="lock" size={24} />}
            returnKeyType={'next'}
            onSubmitEditing={() => this.login()}
            blurOnSubmit={false}
          />

          <Button
            title="Giriş"
            type={'clear'}
            titleStyle={{color: '#1e272e'}}
            containerStyle={styles.loginButton}
            onPress={this.login}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.forgottenPassword}
            onPress={() => {
              Actions.forgottenPassword();
            }}>
            <Text>Şifremi Unuttum</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.forgottenPassword}
            onPress={() => {
              Actions.home({text: 'sfgsfhr'});
            }}>
            <Text>Anasayfa</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '40%',
  },
  logo: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 150,
    height: 150,
  },
  componentContainer: {
    alignItems: 'center',
    //  justifyContent: 'flex-start',
    width: '80%',
    height: '50%',
  },
  loginButton: {
    marginTop: 10,
    width: '90%',
    borderWidth: 2,
    borderColor: Color.BORDER,
    opacity: 0.7,
  },
  forgottenPassword: {
    fontSize: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 20,
  },
});
