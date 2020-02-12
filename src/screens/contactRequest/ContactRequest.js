import React, {Component} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Alert,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
//Components
import HeaderBar from '../../components/HeaderBar';
import axios from 'axios';
import Utilities from '../../constant/Utilities';
import AppApi from '../../../Api';
export default class ContactRequest extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      phone: '',
      mail: '',
      subject: '',
      message: '',
      isModalVisible: false,
      userToken: '',
    };
  }
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      console.log('Token...', token);
      this.setState({
        userToken: token,
      });
    } catch (error) {
      console.log(error);
    }
  }
  handleName = text => {
    this.setState({name: text});
  };
  handlePhone = text => {
    this.setState({phone: text});
  };
  handleMail = text => {
    this.setState({mail: text});
  };
  handleMessage = text => {
    this.setState({message: text});
  };
  handleSubject = text => {
    this.setState({subject: text});
  };
  setModalVisibility = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  onButtonPress = () => {
    console.log('State Token...', this.state.userToken);

    if (
      this.state.name != '' &&
      this.state.phone != '' &&
      this.state.mail != '' &&
      this.state.message != '' &&
      this.state.subject != ''
    ) {
      this.sendUserRequest();
      this.setState({
        name: '',
        phone: '',
        mail: '',
        message: '',
        subject: '',
        date: '',
      });
    } else {
      Alert.alert('İletişim Talebi', 'Tüm alanlar eksiksiz doldurulmalıdır.', [
        {text: 'Tamam'},
      ]);
    }
  };

  sendUserRequest = () => {
    let url = Utilities.BASE_URL + 'AddContactRequest';
    let formData = new FormData();
    formData.append('Name', this.state.name);
    formData.append('Email', this.state.mail);
    formData.append('Phone', this.state.phone);
    formData.append('Subject', this.state.subject);
    formData.append('Message', this.state.message);
    this.setModalVisibility();
    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + this.state.userToken.toString(),
        },
      })
      .then(res => {
        console.log('Res ', res.status);
        this.setModalVisibility();
        if (res.status >= 200 && res.status < 300) {
          Alert.alert(
            'İletişim Talebi',
            'Talebiniz başarıyla iletilmiştir. En kısa sürede tarafınıza dönüş yapılacaktır',
            [{text: 'Tamam'}],
          );
        }
      })
      .catch(err => {
        console.log('Error Response...', err.response);
        Alert.alert('Hata', 'Tekrar Deneyin.', [{text: 'Tamam'}]);
        this.setModalVisibility();
      });
  };

  render() {
    const {height, width} = Dimensions.get('window');
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        // enabled
        style={{
          flex: 1,
          backgroundColor: 'white',
          height: height,
          width: width,
        }}>
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
              backgroundColor: '#rgba(0, 0, 0 ,0.6 )', //sets transparent black background of modal
            }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        </Modal>
        <ScrollView contentContainerStyle={{justifyContent: 'flex-end'}}>
          <HeaderBar />
          <View style={styles.container}>
            <Text h4 style={styles.title}>
              İletişim Talebi
            </Text>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                //backgroundColor: 'green',
                aspectRatio: 1 / 1.3,
              }}>
              <Input
                value={this.state.name}
                onChangeText={this.handleName}
                autoCorrect={true}
                inputStyle={styles.inputStyle}
                inputContainerStyle={[styles.inputContainerStyle]}
                placeholder="Adınız ve Soyadınız"
                leftIcon={
                  <Icon
                    name="user"
                    size={24}
                    color="black"
                    style={styles.inputIcon}
                  />
                }
                returnKeyType={'next'}
                onSubmitEditing={() => this.phoneInput.focus()}
                blurOnSubmit={false}
              />
              <Input
                ref={input => {
                  this.phoneInput = input;
                }}
                value={this.state.phone}
                onChangeText={this.handlePhone}
                keyboardType="numeric"
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                placeholder="Telefon Numaranız"
                leftIcon={
                  <Icon
                    name="phone"
                    size={24}
                    color="black"
                    style={styles.inputIcon}
                  />
                }
                returnKeyType={'next'}
                onSubmitEditing={() => this.mailInput.focus()}
                blurOnSubmit={false}
              />
              <Input
                ref={input => {
                  this.mailInput = input;
                }}
                autoCapitalize="none"
                value={this.state.mail}
                onChangeText={this.handleMail}
                keyboardType="email-address"
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                placeholder="Mail Adresiniz"
                leftIcon={
                  <Icon
                    name="at"
                    size={24}
                    color="black"
                    style={styles.inputIcon}
                  />
                }
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.messageInput.focus();
                }}
                blurOnSubmit={false}
              />

              <Input
                ref={input => {
                  this.messageInput = input;
                }}
                blurOnSubmit={true}
                value={this.state.subject}
                onChangeText={this.handleSubject}
                autoCorrect={true}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                placeholder="Ne hakkında"
                leftIcon={
                  <Icon
                    name="envelope"
                    size={24}
                    color="black"
                    style={styles.inputIcon}
                  />
                }
                returnKeyType={'send'}
              />
              <Input
                ref={input => {
                  this.messageInput = input;
                }}
                blurOnSubmit={true}
                value={this.state.message}
                onChangeText={this.handleMessage}
                autoCorrect={true}
                multiline={true}
                numberOfLines={3}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                placeholder="Özel Mesajınız"
                leftIcon={
                  <Icon
                    name="envelope"
                    size={24}
                    color="black"
                    style={styles.inputIcon}
                  />
                }
                returnKeyType={'send'}
              />
              <Button
                buttonStyle={styles.buttonStyle}
                title="Gönder"
                onPress={() => this.onButtonPress()}
              />
              <View style={{marginTop: 15}}>
                <Text style={{fontStyle: 'italic', fontWeight: '500'}}>
                  İletişim talebinize 24 saat içinde cevap verilecektir
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    flex: 1,
  },
  inputContainerStyle: {
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  inputStyle: {
    padding: 0,
  },
  buttonStyle: {
    width: 100,
    marginTop: 20,
  },
  title: {
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  inputIcon: {
    marginRight: 5,
  },
});
