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
  Alert,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import Color from '../../constant/Color';
import getToken from '../api/getToken';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMail: '',
      userPassword: '',
      token: '',
      isModalVisible: false,
    };
  }
  componentDidMount() {
    console.log('Login Screen');
    const token = getToken();
    if (token) {
      console.log('Login token is not null.');
      this.userAlreadyLogin();
    } else {
      console.log('Login token null.');
    }
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

  getToken = async () => {
    console.log('getToken Active...');
    this.setModalVisibility();
    let url = 'http://api.sinemkobaner.com/Api/Login';
    let formData = new FormData();
    formData.append('Email', this.state.userMail);
    formData.append('Password', this.state.userPassword);
    axios
      .post(url, formData)
      .then(res => {
        let tmpToken = '';
        if (res.status >= 200) {
          tmpToken = res.data;
          this.setToken(tmpToken);
          this.setModalVisibility();
          Actions.appointmentList();
        }
      })
      .catch(err => {
        console.log(err);
        this.setModalVisibility();
        Alert.alert('Hata', 'Yanlış Mail Adresi ya da Şifre');
      });
  };
  setToken = async token => {
    console.log('SetToken Active...');

    try {
      await AsyncStorage.setItem('jwt_token', token);
    } catch (error) {
      console.log(error);
    }
  };
  setModalVisibility = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };
  //checks if user already login
  userAlreadyLogin = async () => {
    console.log('userAlreadyLogin Active...');
    const userToken = getToken();
    if (userToken != null) {
      Actions.appointmentList();
    } else {
      console.log('Token is null in UserAlreadyLogin');
    }
  };

  login = async () => {
    console.log('Login Active Login.js...');
    if (this.state.userMail === '' && this.state.userPassword === '') {
      Alert.alert('Uyarı', 'Mail adresi ya da Şifre alanlanları boş olamaz');
    } else {
      this.getToken();
    }
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.Container} enabled>
        <Modal
          style={{
            flex: 1,
            margin: 0,
          }}
          visible={this.state.isModalVisible}
          onRequestClose={() => console.log('Close Pressed...')}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#rgba(0, 0, 0 ,0.6 )', //set transparent background
            }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        </Modal>
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
          {/* <TouchableOpacity
            activeOpacity={0.6}
            style={styles.forgottenPassword}
            onPress={() => {
              Actions.home({text: 'sfgsfhr'});
            }}>
            <Text>Anasayfa</Text>
          </TouchableOpacity> */}
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
