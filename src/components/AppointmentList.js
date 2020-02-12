import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Image,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modal';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

//components
import CardAppointment from '../components/AppointmentCard';
import HeaderBar from './HeaderBar';
//Constants
import Color from '../constant/Color';
import Utilies from '../constant/Utilities';

export default class AppointmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      isVisible: false,
      userToken: '',
    };
  }
  componentDidMount() {
    this.getAppointments();
  }
  emptyAppointmentsList = () => {
    return this.state.isVisible ? (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text>Yükleniyor</Text>
      </View>
    ) : (
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 25}}>Randevu bulunamadı.</Text>
      </View>
    );
  };
  setModalVisibility = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };
  getAppointments = async () => {
    console.log('getAppointments Active...');

    this.setModalVisibility();
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      console.log('Token', token);
      this.setState({
        userToken: token,
      });
    } catch (error) {
      console.log(error);
    }
    let url = Utilies.BASE_URL + 'GetAppointments';
    axios
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + this.state.userToken,
        },
      })
      .then(res => {
        let tempData = [];
        for (let index = 0; index < res.data.length; index++) {
          tempData.push(res.data[index]);
        }
        this.setState({
          appointments: tempData,
        });
        this.setModalVisibility();
      })
      .catch(err => {
        console.log('E......', err.response);
        this.setModalVisibility();
      });
  };

  signOut = async () => {
    console.log('Clicked....');

    try {
      await AsyncStorage.removeItem('jwt_token');
      Actions.login();
    } catch (error) {}
  };

  render() {
    return (
      <>
        <HeaderBar />
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 2,
              borderTopWidth: 2,
              borderColor: Color.BORDER,
              marginTop: 2,
              marginBottom: 5,
            }}>
            <Text style={{fontSize: 20, fontWeight: '900', color: Color.TEXT}}>
              Randevular
            </Text>
            <TouchableOpacity style={{marginLeft: 20}} onPress={this.signOut}>
              <Icon name="times-circle" size={25}></Icon>
            </TouchableOpacity>
          </View>
          <Modal
            style={{margin: 0}}
            visible={this.state.isVisible}
            onRequestClose={() => console.log('Close Request...')}
            onBackButtonPress={() => {
              this.setModalVisibility();
            }}>
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
            contentContainerStyle={{
              justifyContent: 'center',
              marginHorizontal: 15,
            }}>
            {this.state.appointments.length <= 0
              ? this.emptyAppointmentsList()
              : this.state.appointments.map((item, i) => (
                  <TouchableOpacity
                    activeOpacity={0.3}
                    key={i}
                    onPress={() => {
                      if (item.state < 2) {
                        Alert.alert('', 'Henüz Hazır Değil', [{text: 'Tamam'}]);
                      } else {
                        Actions.profile({
                          appointmentId: item.id,
                          customer: item.name,
                          token: this.state.userToken,
                        });
                      }
                    }}>
                    <CardAppointment data={item} />
                  </TouchableOpacity>
                ))}
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  itemStyle: {
    marginHorizontal: 7,
  },
});
