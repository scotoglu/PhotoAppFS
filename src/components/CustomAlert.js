import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const CustomAlert = () => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 50,
      }}>
      <Icon name="exclamation-circle" size={80} />
      <Text style={{fontSize: 20, textAlign: 'center'}}>
        İnternet Bağlantısı Yok
      </Text>
    </View>
  );
};
export default CustomAlert;
