import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const CustomAlert = ({text}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 50,
      }}>
      <Icon name="exclamation-circle" size={80} />
      <Text style={{fontSize: 20, textAlign: 'center'}}>{text}</Text>
    </View>
  );
};
export default CustomAlert;
