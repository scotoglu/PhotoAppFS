import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  AsyncStorage,
  StyleSheet,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
//components
import CardAppointment from '../components/AppointmentCard';
import HeaderBar from './HeaderBar';
//Constants
import Color from '../constant/Color';
import Utilies from '../constant/Utilities';
import CustomModal from './CustomModal';

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
      const token = await AsyncStorage.getItem('validToken');
      this.setState({
        userToken: token,
      });
    } catch (error) {
      console.log(error);
    }

    axios
      .get(Utilies.GETAPPOINTMENTS, {
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
        console.log('Error in getAppointment...', err.response);
        this.setModalVisibility();
      });
  };

  signOut = async () => {
    console.log('Clicked....');

    try {
      await AsyncStorage.removeItem('validToken');
      Actions.popTo('login');
    } catch (error) {}
  };

  render() {
    return (
      <>
        <HeaderBar />
        <View style={style.container}>
          <View style={style.mainView}>
            <Text style={style.randevuText}>Randevular</Text>
            <TouchableOpacity style={{marginLeft: 20}} onPress={this.signOut}>
              <Icon name="times-circle" size={25}></Icon>
            </TouchableOpacity>
          </View>
          <CustomModal visible={this.state.isVisible} />
          <ScrollView contentContainerStyle={style.scrollContent}>
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

const style = StyleSheet.create({
  container: {width: '100%', height: '100%', justifyContent: 'center'},
  mainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: Color.BORDER,
    marginTop: 2,
    marginBottom: 5,
  },
  randevuText: {fontSize: 20, fontWeight: '900', color: Color.TEXT},
  scrollContent: {justifyContent: 'center', marginHorizontal: 15},
});
