import React, {Component} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Alert,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import {Text} from 'react-native-elements';
import axios from 'axios';
import {Formik} from 'formik';
import {Button} from 'react-native-elements';
import * as Yup from 'yup';
//Components
import HeaderBar from '../../components/HeaderBar';
//Constants
import Color from '../../constant/Color';
import Utilities from '../../constant/Utilities';

import InputText from '../../components/InputsText';
import CustomDropDown from '../../components/CustomDropdown';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomModal from '../../components/CustomModal';

export default class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      photoTypes: [],
      photoType: '', //for clearing dropdown after submit
      selectedPhotoTypeID: '',
      date: '',
      avaliableTimes: [],
      avaliableTimeID: '',
      availableTime: '', //for clearing dropdown after submit
    };
  }
  componentDidMount() {
    this.getPhotoTypes();
  }
  getSelectedDate = text => {
    this.setState({date: text});
    if (this.state.photoType !== '' && this.state.date !== '') {
      this.getAvaliableTimes();
    } else {
      Alert.alert(
        'Uyarı',
        'Çekim Türü ve Çekim Tarihi alanlarını boş bırakmayınız.',
        [{text: 'Tamam'}],
      );
    }
  };
  getSelectedTime = (text, index, data) => {
    console.log('getSelectedTime active..');
    let id = data[index].id;
    this.setState({
      avaliableTimeID: id,
    });
  };
  getSelectedItem = (text, index, data) => {
    console.log('getSelectedItem Active...');
    this.setState({
      photoType: text,
      selectedPhotoTypeID: data[index].id,
    });
  };
  getAvaliableTimes = () => {
    this.setModalVisibility();
    axios
      .get(Utilities.GETAVAILABLETIMES, {
        params: {
          start: this.state.date,
          photoShootType: this.state.selectedPhotoTypeID,
        },
      })
      .then(res => {
        let tmpData = [];
        if (res.data.length <= 0) {
          Alert.alert(
            'Uygun Tarih Bulunamadı',
            'Seçtiğiniz tarih için uygun bir saat bulunmamaktadır.Farklı bir tarih seçin.',
            [{text: 'Tamam'}],
          );
        } else {
          for (let index = 0; index < res.data.length; index++) {
            tmpData.push({
              id: res.data[index].id,
              value: res.data[index].startHour + '-' + res.data[index].endHour,
            });
          }
        }
        this.setState({
          avaliableTimes: tmpData,
        });
        this.setModalVisibility();
      })
      .catch(err => {
        console.log('Get Availablel Times...', err.response);
        this.setModalVisibility();
      });
  };
  setEmpty = () => {
    //clear the textinput after the axios success

    this.setState({
      availableTime: '',
      photoType: '',
      date: '',
    });
  };
  setModalVisibility = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  sendUserRequest = values => {
    let formData = new FormData();
    formData.append('Name', values.name);
    formData.append('Phone', values.phone);
    formData.append('Email', values.email);
    formData.append('Message', values.message);
    formData.append('ScheduleId', this.state.avaliableTimeID);
    formData.append('ShootTypeId', this.state.selectedPhotoTypeID);
    console.log('FormData: ', formData);

    this.setModalVisibility();
    axios
      .post(Utilities.APPOINTMET_REQUEST, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          Alert.alert(
            'Randevu Talebi',
            'Randevu Talebiniz Alınmıştır.Randevunuz Onaylanınca Tarafınıza Mail Gelicektir',
            [{text: 'Tamam'}],
          );
          this.setEmpty();
          this.setModalVisibility();
        }
      })
      .catch(err => {
        this.setModalVisibility();
        console.log('Send User Request...', err.response);
        Alert.alert('Hata', 'Hata! Tekrar Deneyin...', [{text: 'Tamam'}]);
      });
  };
  getPhotoTypes = () => {
    axios
      .get(Utilities.GET_PHOTO_SHOOT_TYPES)
      .then(res => {
        let tmpTypes = [];
        for (let index = 0; index < res.data.length; index++) {
          tmpTypes.push({id: res.data[index].id, value: res.data[index].name});
        }
        this.setState({
          photoTypes: tmpTypes,
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  validation = () => {
    const validationSchema = Yup.object().shape({
      name: Yup.string()
        .label('name')
        .required('*Zorunlu Alan'),
      phone: Yup.string()
        .label('phone')
        .required('*Zorunlu Alan'),
      email: Yup.string()
        .email('Geçersiz Mail')
        .label('email')
        .required('*Zorunlu Alan'),
      message: Yup.string()
        .label('message')
        .required('*Zorunlu Alan'),
    });
    return validationSchema;
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
        style={styles.container}>
        <CustomModal
          visible={this.state.isModalVisible}
          // loadingText="Talebiniz Gönderiliyor..."
        />
        <ScrollView
          enabled
          contentContainerStyle={styles.scrollContentContainer}>
          <HeaderBar />
          <View style={styles.componentContainer}>
            <Text h4 style={styles.title}>
              Randevu Talebi
            </Text>
            <View style={styles.FormikView}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: '',
                  phone: '',
                  email: '',
                  message: '',
                  date: '',
                  photoTypes: '',
                  availableTimes: '',
                }}
                validationSchema={this.validation()}
                onSubmit={(values, actions) => {
                  this.sendUserRequest(values);
                  actions.resetForm({
                    name: '',
                    phone: '',
                    email: '',
                    message: '',
                    date: '',
                    photoTypes: '',
                    availableTimes: '',
                  });
                }}>
                {formikProps => (
                  <>
                    <InputText
                      value={formikProps.values.name || ''}
                      iconName="user"
                      formikKey="name"
                      formikProps={formikProps}
                      placeholder="Adınız ve Soyadınız"
                    />
                    <InputText
                      value={formikProps.values.phone || ''}
                      keyboardType="numeric"
                      iconName="phone"
                      formikKey="phone"
                      formikProps={formikProps}
                      placeholder="Telefon Numaranız"
                    />
                    <InputText
                      value={formikProps.values.email || ''}
                      iconName="at"
                      formikKey="email"
                      formikProps={formikProps}
                      placeholder="Mail Adresiniz"
                      keyboardType="email-address"
                    />
                    <InputText
                      value={formikProps.values.message || ''}
                      iconName="envelope"
                      formikKey="message"
                      formikProps={formikProps}
                      placeholder="Mesajınız"
                    />

                    <CustomDropDown
                      value={this.state.photoType || ''}
                      formikProps={formikProps}
                      formikKey="photoTypes"
                      placeholder="Çekim Türü"
                      data={this.state.photoTypes}
                      onChangeText={this.getSelectedItem}
                    />
                    <CustomDatePicker
                      placeholder="Tarih Seçin"
                      date={this.state.date}
                      formikProps={formikProps}
                      formikKey="date"
                      mode="date"
                      onDateChange={this.getSelectedDate}
                      // date={this.state.date}
                    />
                    <CustomDropDown
                      value={this.state.availableTime || ''}
                      formikProps={formikProps}
                      formikKey="availableTimes"
                      placeholder="Uygun Saatler"
                      data={this.state.avaliableTimes}
                      onChangeText={this.getSelectedTime}
                      dropdownPosition={-2}
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
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const {height, width} = Dimensions.get('window');
/*------------------------------------------------------------------------------------------------ */
const styles = StyleSheet.create({
  container: {backgroundColor: 'white', height: height, width: width, flex: 1},

  componentContainer: {
    paddingHorizontal: 20,
    //marginTop: 10,
    alignItems: 'center',
  },
  inputStyle: {
    marginLeft: 5,
    padding: 0,
  },

  loginButton: {
    marginTop: 10,
    width: '50%',
    borderWidth: 2,
    borderColor: Color.BORDER,
    opacity: 0.7,
  },
  FormikView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1 / 1.3,
  },
  buttonTitleStyle: {
    color: '#1e272e',
  },
  scrollContentContainer: {
    justifyContent: 'flex-end',
  },
});
