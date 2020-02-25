import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Color from '../constant/Color';

const CardAppointment = props => {
  let isApproved = ['Bekliyor', 'Kabul', 'Ret'];
  let photoState = ['Çekim Bekliyor', ' Hazırlanıyor', ' Hazır'];

  const item = props.data;

  let isApprovedIndex = parseInt(item.isApproved);
  let photoStateIndex = parseInt(item.state);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.textView}>
          <Text style={styles.textTitle}>Randevu</Text>
          <Text style={styles.textContent}>{isApproved[isApprovedIndex]}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.textTitle}>Fotoğraflar</Text>
          <Text style={styles.textContent}>{photoState[photoStateIndex]}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.textTitle}>Tarih</Text>
          <Text style={styles.textContent}>
            {new Date(item.appointmentDateStart).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <View style={styles.imageView}>
        <Image style={styles.image} source={require('../assets/right.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 75,
    borderWidth: 1,
    marginVertical: 1,
    backgroundColor: '#ecf0f1',
    borderColor: Color.BORDER,
    borderRadius: 10,
  },
  row: {flexDirection: 'row'},
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#95a5a6',
  },
  textContent: {
    fontSize: 12,
  },
  textView: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  imageView: {
    alignItems: 'flex-end',
    marginLeft: 40,
  },
  image: {
    width: 50,
    height: 60,
    marginVertical: 5,
  },
});
export default CardAppointment;
