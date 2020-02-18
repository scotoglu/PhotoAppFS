import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import Modal from 'react-native-modal';
import {Formik} from 'formik';
import * as Yup from 'yup';
import InputText from '../../components/InputsText';
import {Button} from 'react-native-elements';
import axios from 'axios';

//Constants
import Color from '../../constant/Color';
import Utilities from '../../constant/Utilities';

export default class _Login extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
    };
  }
  setModalVisibility = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };
  setToken = async token => {
    try {
      if (token) {
        await AsyncStorage.setItem('jwt_token');
      } else {
        console.log('Token is null..');
      }
    } catch (error) {
      console.error('Error in setToken...', error);
    }
  };
  loginRequest = values => {
    this.setModalVisibility();
    let formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }

    axios
      .post(Utilities.LOGIN_REQUEST, formData)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          this.setModalVisibility();
          console.log('Response in Login...', res.data.token);
          this.setToken(res.data.token);
        }
      })
      .catch(err => {
        this.setModalVisibility();
        console.log('Error in login..', err.response);
      });
  };
  validation = () => {
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email('Geçersiz Mail')
        .label('email')
        .required('*Zorunlu Alan'),
      password: Yup.string()
        .label('password')
        .required('*Zorunlu Alan'),
    });
    return validationSchema;
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
            style={styles.logo}
          />
        </View>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={values => {
            this.loginRequest(values);
          }}
          validationSchema={this.validation}>
          {formikProps => (
            <View style={styles.componentContainer}>
              <InputText
                value={formikProps.values.email || ''}
                formikProps={formikProps}
                formikKey="email"
                placeholder="Mail Adresiniz"
                iconName="user"
                autoCorrect={false}
                autoCapitalize={false}
                keyBoardType="email-address"
              />
              <InputText
                value={formikProps.values.password || ''}
                formikProps={formikProps}
                formikKey="password"
                placeholder="Şifreniz"
                iconName="lock"
                autoCorrect={false}
                autoCapitalize={false}
                secureTextEntry
              />

              <Button
                title="Giriş"
                type={'clear'}
                titleStyle={{color: '#1e272e'}}
                containerStyle={styles.loginButton}
                onPress={formikProps.handleSubmit}
              />
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.forgottenPassword}
                onPress={() => {
                  Actions.forgottenPassword();
                }}>
                <Text>Şifremi Unuttum</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
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
