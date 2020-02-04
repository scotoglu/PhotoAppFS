import Modal from 'react-native-modal';
import {View, ActivityIndicator} from 'react-native';
import React from 'react';

const ModalComponent = props => {
  const isVisible = props;
  return (
    <Modal
      visible={isVisible.isVisible}
      onRequestClose={() => console.log('Close Request...')}
      onBackButtonPress={() => {
        isVisible.onBackButtonPress();
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
  );
};
export default ModalComponent;
