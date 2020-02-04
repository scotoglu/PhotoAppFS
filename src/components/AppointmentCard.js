import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Color from '../constant/Color';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CardAppointment = props => {
  isApproved = ['Bekliyor', 'Kabul', 'Ret'];
  photoState = ['Çekim Bekliyor', ' Hazırlanıyor', ' Hazır'];

  const item = props.data;

  let itemID = item.id;
  let isApprovedIndex = parseInt(item.isApproved);
  let photoStateIndex = parseInt(item.state);

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 75,
        borderWidth: 1,
        marginVertical: 1,

        backgroundColor: '#ecf0f1',
        borderColor: Color.BORDER,
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{alignItems: 'center', justifyContent: 'center', margin: 5}}>
          <Text style={styles.textTitle}>Randevu</Text>
          <Text style={styles.textContent}>{isApproved[isApprovedIndex]}</Text>
        </View>
        <View
          style={{alignItems: 'center', justifyContent: 'center', margin: 5}}>
          <Text style={styles.textTitle}>Fotoğraflar</Text>
          <Text style={styles.textContent}>{photoState[photoStateIndex]}</Text>
        </View>
        <View
          style={{alignItems: 'center', justifyContent: 'center', margin: 5}}>
          <Text style={styles.textTitle}>Tarih</Text>
          <Text style={styles.textContent}>
            {new Date(item.appointmentDateStart).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <View style={{alignItems: 'flex-end', marginLeft: 40}}>
        <Image
          style={{
            width: 50,
            height: 60,
            marginVertical: 5,
          }}
          source={require('../assets/right.png')}></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#95a5a6',
  },
  textContent: {
    fontSize: 12,
  },
});
export default CardAppointment;
