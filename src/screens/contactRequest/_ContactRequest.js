import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Button} from 'react-native-elements';
import axios from 'axios';

//Components
import HeaderBar from '../../components/HeaderBar';
import InputText from '../../components/InputsText';
//Constants
import Utilities from '../../constant/Utilities';
import CustomModal from '../../components/CustomModal';
import Color from '../../constant/Color';
export default class _ContactRequest extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
    };
  }

  validation = () => {
    const validationSchema = yup.object().shape({
      name: yup
        .string()
        .label('name')
        .required('*Zorunlu Alan'),
      phone: yup
        .string()
        .label('phone')
        .required('*Zorunlu Alan'),
      email: yup
        .string()
        .label('email')
        .email('Geçersiz Mail')
        .required('*Zorunlu Alan'),
      subject: yup
        .string()
        .required('*Zorunlu Alan')
        .label('subject'),
      message: yup
        .string()
        .label('message')
        .required('*Zorunlu Alan'),
    });
    return validationSchema;
  };
  setModalVisibility = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };
  sendContactRequest = values => {
    this.setModalVisibility();

    /*Values not proper format for sending request,
    converts json to form data with FormData.*/
    let formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    console.log('FormData...', formData);

    /**Sending post request */
    axios
      .post(Utilities.CONTACT_REQUEST, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
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
    return (
      <KeyboardAvoidingView style={styles.topContainer}>
        <CustomModal
          visible={this.state.isModalVisible}
          loadingText="Talebiniz Gönderiliyor..."
        />
        <ScrollView contentContainerStyle={{justifyContent: 'flex-end'}}>
          <HeaderBar />
          <View style={styles.container}>
            <Text h4 style={styles.title}>
              İletişim Talebi
            </Text>
            <View style={styles.formikView}>
              <Formik
                initialValues={{
                  name: '',
                  phone: '',
                  email: '',
                  subject: '',
                  message: '',
                }}
                onSubmit={(values, actions) => {
                  this.sendContactRequest(values);
                  actions.resetForm({
                    //after the submit reset fields
                    name: '',
                    phone: '',
                    email: '',
                    subject: '',
                    message: '',
                  });
                }}
                validationSchema={this.validation()}>
                {formikProps => (
                  <>
                    <InputText
                      value={formikProps.values.name || ''} //After submit, reset the value
                      formikProps={formikProps}
                      formikKey="name"
                      iconName="user"
                      placeholder="Adınız ve Soyadınız"
                    />
                    <InputText
                      value={formikProps.values.phone || ''}
                      keyboardType="numeric"
                      formikProps={formikProps}
                      formikKey="phone"
                      iconName="phone"
                      placeholder="Telefon Numaranız"
                    />
                    <InputText
                      value={formikProps.values.email || ''}
                      keyboardType="email-address"
                      formikProps={formikProps}
                      formikKey="email"
                      iconName="at"
                      placeholder="Mail Adresiniz"
                    />
                    <InputText
                      value={formikProps.values.subject || ''}
                      formikProps={formikProps}
                      formikKey="subject"
                      iconName="envelope"
                      placeholder="Ne Hakkında"
                      autoCorrect={true}
                    />
                    <InputText
                      value={formikProps.values.message || ''}
                      formikProps={formikProps}
                      formikKey="message"
                      iconName="envelope"
                      placeholder="Mesajınız"
                      autoCorrect={true}
                      multiline={true}
                      numberOfLines={3}
                      // eslint-disable-next-line react/jsx-no-duplicate-props
                      autoCorrect={true}
                    />
                    <Button
                      title="Gönder"
                      containerStyle={styles.loginButton}
                      titleStyle={styles.buttonTitleStyle}
                      onPress={formikProps.handleSubmit}
                    />
                  </>
                )}
              </Formik>
              <View style={styles.bottomTextView}>
                <Text style={styles.bottomText}>
                  İletişim talebinize en kısa sürede cevap verilecektir
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: 'white',
    height: height,
    width: width,
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    flex: 1,
  },
  buttonStyle: {
    width: 100,
    marginTop: 20,
  },
  title: {
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  loginButton: {
    marginTop: 10,
    width: '50%',
    borderWidth: 2,
    borderColor: Color.BORDER,
    opacity: 0.7,
  },
  formikView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1 / 1.3,
  },
  bottomTextView: {marginTop: 15},
  bottomText: {
    fontStyle: 'italic',
    fontWeight: '500',
  },
  buttonTitleStyle: {color: '#1e272e'},
});
