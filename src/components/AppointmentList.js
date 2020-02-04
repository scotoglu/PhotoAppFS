import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modal';
import axios from 'axios';
//components
import CardAppointment from '../components/AppointmentCard';
import HeaderBar from './HeaderBar';
//Constants
import Color from '../constant/Color';

export default class AppointmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      isVisible: false,
    };
  }
  componentDidMount() {
    this.getAppointments();
  }
  emptyAppointmentsList = () => {
    return (
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
  getAppointments = () => {
    this.setModalVisibility();

    let url = 'http://test.sinemkobaner.com/api/GetAppointments';
    axios
      .get(url, {
        params: {
          customerId: '300c18fb-0191-4e95-8e37-60e73b74801c',
        },
      })
      .then(res => {
        let tempData = [];
        for (let index = 0; index < res.data.length; index++) {
          tempData.push(res.data[index]);
          console.log('------------------------------------');
          console.log(res.data[index].state);
        }
        this.setState({
          appointments: tempData,
        });
        this.setModalVisibility();
        console.log(this.state.appointments[0].name);
      })
      .catch(err => {
        console.log(err.response);
      });
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
                      console.log('id:', item.state);
                      console.log('İtems', item.name);
                      if (item.state < 2) {
                        Alert.alert('', 'Henüz Hazır Değil', [{text: 'Tamam'}]);
                      } else {
                        Actions.profile({
                          appointmentId: item.id,
                          customer: item.name,
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
