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
//Components
import HeaderBar from '../../components/HeaderBar';
//Constants
import Color from '../../constant/Color';
import Utilities from '../../constant/Utilities';

import InputText from '../../components/InputsText';
import CustomDropDown from '../../components/CustomDropdown';
import CustomDatePicker from '../../components/CustomDatePicker';

export default class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      photoTypes: [],
      photoType: '',
      selectedPhotoTypeID: '',
      date: '',
    };
  }
  componentDidMount() {
    this.getPhotoTypes();
    console.log('SSSS', this.state.photoTypes);
  }
  getSelectedDate = (event, date) => {
    // this.setState({date: text});
    // if (this.state.photoType != '' && this.state.date != '') {
    //   this.getAvaliableTimes();
    // } else {
    //   Alert.alert(
    //     'Uyarı',
    //     'Çekim Türü ve Çekim Tarihi alanlarını boş bırakmayınız.',
    //     [{text: 'Tamam'}],
    //   );
    // }
    console.log('GetDate Active...');
  };
  handleTime = (text, index, data) => {
    let startH = text.split('-')[0];
    let endH = text.split('-')[1];
    let id = data[index].id;

    this.setState({
      time: text,
      avaliableTimeID: id,
      startHour: startH,
      endHour: endH,
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
    let url = Utilities.BASE_URL + 'GetAvailableAppointmentDates';

    //send get request
    axios
      .get(url, {
        params: {
          start: this.state.date,
          photoShootType: this.state.selectedPhotoTypeID,
        },
        headers: {
          Authorization: 'Bearer ' + this.state.userToken,
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
      })
      .catch(err => {
        console.log('Get Availablel Times...', err.response);
      });
  };
  onButtonPress = () => {
    this.setEmpty();
    if (
      this.state.name != '' &&
      this.state.phone != '' &&
      this.state.photoType != '' &&
      this.state.date != '' &&
      this.state.time != '' &&
      this.state.mail != '' &&
      this.state.message != ''
    ) {
      this.sendUserRequest();
    } else {
      Alert.alert('Randevu Talebi', 'Tüm alanlar eksiksiz doldurulmalıdır.', [
        {text: 'Tamam'},
      ]);
    }
  };
  setEmpty = () => {
    //clear the textinput after the axios success
    this.textInputName.clear();
    this.textInputPhone.clear();
    this.textInputMail.clear();
    this.textInputMessage.clear();
    this.setState({
      time: '',
      photoType: '',
      date: '',
    });
  };
  setModalVisibility = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  sendUserRequest = () => {
    let url = Utilities.BASE_URL + 'AddAppointmentRequest';
    const formData = new FormData();
    formData.append('Name', this.state.name);
    formData.append('Phone', this.state.phone);
    formData.append('Email', this.state.mail);
    formData.append('Message', this.state.message);
    formData.append('ScheduleId', this.state.avaliableTimeID);
    formData.append('ShootTypeId', this.state.selectedPhotoTypeID);

    this.setModalVisibility();

    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + this.state.userToken,
        },
      })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          Alert.alert(
            'Randevu Talebi',
            'Randevu Talebiniz Alınmıştır.Randevunuz Onaylanınca Tarafınıza Mail Gelicektir',
            [{text: 'Tamam'}],
          );
          this.setModalVisibility();
          this.setEmpty();
        }
      })
      .catch(err => {
        console.log('Send User Request...', err.response);
        Alert.alert('Hata', 'Hata! Tekrar Deneyin...', [{text: 'Tamam'}]);
      });
  };
  getPhotoTypes = () => {
    axios
      .get(Utilities.BASE_URL + 'GetPhotoShootTypes', {})
      .then(res => {
        console.log(res.data);
        let tmpTypes = [];
        for (let index = 0; index < res.data.length; index++) {
          tmpTypes.push({id: res.data[index].id, value: res.data[index].name});
        }
        this.setState({
          photoTypes: tmpTypes,
        });
        console.log('Types..', tmpTypes);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
        style={styles.container}>
        <ScrollView
          enabled
          contentContainerStyle={{justifyContent: 'flex-end'}}>
          <HeaderBar />
          <View style={styles.componentContainer}>
            <Text h4 style={styles.title}>
              Randevu Talebi
            </Text>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                aspectRatio: 1 / 1.3,
              }}>
              <Formik
                initialValues={{
                  name: '',
                  phone: '',
                  email: '',
                  message: '',
                  date: '',
                }}
                onSubmit={values => {
                  // alert(JSON.stringify(values));
                  alert('......');
                }}>
                {formikProps => (
                  <React.Fragment>
                    <InputText
                      iconName="user"
                      formikKey="name"
                      formikProps={formikProps}
                      placeholder="Adınız ve Soyadınız"
                    />
                    <InputText
                      iconName="phone"
                      formikKey="phone"
                      formikProps={formikProps}
                      placeholder="Telefon Numaranız"
                    />
                    <InputText
                      iconName="at"
                      formikKey="email"
                      formikProps={formikProps}
                      placeholder="Mail Adresiniz"
                    />
                    <InputText
                      iconName="envelope"
                      formikKey="message"
                      formikProps={formikProps}
                      placeholder="Mesajınız"
                    />

                    <CustomDropDown
                      formikProps={formikProps}
                      placeholder="Çekim Türü"
                      data={this.state.photoTypes}
                      onChangeText={this.getSelectedItem}
                    />
                    <CustomDatePicker />
                    <CustomDropDown
                      placeholder="Uygun Saatler"
                      // data={this.state.photoTypes}
                    />

                    <Button
                      title="Gönder"
                      containerStyle={styles.loginButton}
                      titleStyle={{color: '#1e272e'}}
                      onPress={formikProps.handleSubmit}
                    />
                  </React.Fragment>
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
});
