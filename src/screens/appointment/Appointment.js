import React, {Component} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Dropdown} from 'react-native-material-dropdown';
import {Input, Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Modal from 'react-native-modal';
//Components
import HeaderBar from '../../components/HeaderBar';
//Constants
import Color from '../../constant/Color';
import Utilities from '../../constant/Utilities';
export default class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      phone: '',
      mail: '',
      message: '',
      date: '',
      time: '',
      photoType: '',
      avaliableTimes: [],
      avaliableTimeID: '',
      startHour: '',
      endHour: '',
      photoTypes: [],
      selectedPhotoTypeID: '',
      isModalVisible: false,
      userToken: '',
    };
  }
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      this.setState({
        userToken: token,
      });
    } catch (error) {}
    this.getPhotoTypes();
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
  handleDate = text => {
    this.setState({date: text});
    if (this.state.photoType != '' && this.state.date != '') {
      this.getAvaliableTimes();
    } else {
      Alert.alert(
        'Uyarı',
        'Çekim Türü ve Çekim Tarihi alanlarını boş bırakmayınız.',
        [{text: 'Tamam'}],
      );
    }
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
  handlePhotoType = (text, index, data) => {
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
    console.log('SendUserRequest...');

    let url = Utilities.BASE_URL + 'AddAppointmentRequest';
    const formData = new FormData();
    formData.append('Name', this.state.name);
    formData.append('Phone', this.state.phone);
    formData.append('Email', this.state.mail);
    formData.append('Message', this.state.message);
    formData.append('ScheduleId', this.state.avaliableTimeID);
    formData.append('ShootTypeId', this.state.selectedPhotoTypeID);
    console.log(formData);

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
      .get(Utilities.BASE_URL + 'GetPhotoShootTypes', {
        headers: {
          Authorization: 'Bearer ' + this.state.userToken,
        },
      })
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
        {/**When sending data to wait until response getting. */}
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
              backgroundColor: '#rgba(0, 0, 0 ,0.6 )',
            }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        </Modal>
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
              <Input
                ref={input => {
                  this.textInputName = input;
                }}
                onChangeText={this.handleName}
                autoCorrect={true}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                placeholder="Adınız ve Soyadınız"
                leftIcon={
                  <View>
                    <Icon name="user" size={24} color="black" />
                  </View>
                }
              />
              <Input
                ref={input => {
                  this.textInputPhone = input;
                }}
                onChangeText={this.handlePhone}
                keyboardType="numeric"
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                placeholder="Telefon Numaranız"
                leftIcon={
                  <View>
                    <Icon name="phone" size={24} color="black" />
                  </View>
                }
              />
              <Input
                ref={input => {
                  this.textInputMail = input;
                }}
                autoCapitalize="none"
                onChangeText={this.handleMail}
                keyboardType="email-address"
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                placeholder="Mail Adresiniz"
                leftIcon={
                  <View>
                    <Icon name="at" size={24} color="black" />
                  </View>
                }
              />
              {/*Textarea */}
              <Input
                ref={input => {
                  this.textInputMessage = input;
                }}
                blurOnSubmit={true}
                value={this.state.message}
                onChangeText={this.handleMessage}
                autoCorrect={true}
                multiline={true}
                numberOfLines={3}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                placeholder="Özel Mesajınız "
                leftIcon={
                  <View>
                    <Icon
                      name="envelope"
                      size={24}
                      color="black"
                      // style={styles.inputIcons}
                    />
                  </View>
                }
              />
              {/**Dropdown  */}
              <View style={styles.dropdownView}>
                <Icon name="chevron-down" size={30} style={styles.pickerIcon} />
                <Dropdown
                  value={this.state.photoType || ''}
                  style={{textAlign: 'left'}}
                  placeholder={'Çekim Türü'}
                  containerStyle={{width: '80%'}}
                  dropdownOffset={{top: 12, left: 12}}
                  dropdownPosition={-4}
                  data={this.state.photoTypes}
                  rippleCentered={true}
                  onChangeText={(value, index, data) => {
                    this.handlePhotoType(value, index, data);
                  }}
                />
              </View>

              {/**DatePicker */}
              <View style={styles.datePickerView}>
                <Icon
                  name="calendar"
                  size={24}
                  style={{marginVertical: 10, marginRight: 10}}
                />
                <DatePicker
                  style={{width: '50%', padding: 0}}
                  date={this.state.date} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="Randevu Tarihi"
                  format="DD.MM.YYYY"
                  confirmBtnText="Onayla"
                  cancelBtnText="İptal"
                  customStyles={{
                    placeholderText: {
                      fontSize: 16,
                      color: 'grey',
                      fontWeight: '200',
                      margin: 0,
                    },
                    dateIcon: {
                      // position: "absolute",
                      // left: 0,
                      // top: 4,
                      // marginLeft: 0
                      width: 0,
                      height: 0,
                    },
                    dateInput: {
                      padding: 0,
                      borderWidth: 0,
                    },
                    dateText: {
                      textAlign: 'left',
                      fontWeight: '200',
                      fontSize: 17,
                      marginRight: 10,
                      paddingLeft: 0,
                    },
                  }}
                  onDateChange={date => {
                    this.handleDate(date);
                  }}
                />
              </View>

              {/**Available times */}
              <View style={styles.avaliableTimesView}>
                <Icon name="clock-o" size={30} style={styles.pickerIcon} />
                <Dropdown
                  value={this.state.time || ''}
                  style={{textAlign: 'left'}}
                  placeholder={'Uygun Saatler'}
                  containerStyle={{width: '80%', marginLeft: 5}}
                  dropdownOffset={{top: 12, left: 12}}
                  dropdownPosition={1}
                  data={this.state.avaliableTimes}
                  onChangeText={(value, index, data) => {
                    this.handleTime(value, index, data);
                  }}
                />
              </View>
              {/*Button */}
              <Button
                buttonStyle={styles.buttonStyle}
                title="Randevu Al"
                onPress={() => this.onButtonPress()}
              />
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

  inputContainerStyle: {
    //  marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderColor: Color.BORDER,
    borderBottomWidth: 2,
  },
  inputStyle: {
    //textAlign: 'center',
    //backgroundColor: 'red',
    marginLeft: 5,
    padding: 0,
  },
  buttonStyle: {
    marginTop: 10,
  },

  dropdownView: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: Color.BORDER,
    width: '80%',
  },

  pickerIcon: {
    marginRight: 10,
    marginTop: 10,
  },
  datePickerView: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: Color.BORDER,
    width: '80%',
  },
  iconView: {
    marginTop: 10,
    marginRight: 30,
  },
  avaliableTimesView: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: Color.BORDER,
    width: '80%',
  },
  inputIcons: {
    marginRight: 5,
  },
});
