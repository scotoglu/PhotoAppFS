import React from 'react';
import {View, ActivityIndicator, Dimensions, Text} from 'react-native';
const loading = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
const {width, height} = Dimensions.get('screen');
const Loading = () => {
  return (
    <View style={[loading, {width: width}]}>
      <ActivityIndicator color="black" size="large" />
      <Text style={{fontSize: 15, fontWeight: 'italic'}}>Yükleniyor...</Text>
    </View>
  );
};
export default Loading;
