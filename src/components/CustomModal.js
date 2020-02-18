import React from 'react';
import Modal from 'react-native-modal';
import {View, ActivityIndicator, Text} from 'react-native';
import Color from '../constant/Color';

const style = {
  modalStyle: {
    flex: 1,
    margin: 0,
  },
  outerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.TRANSPARENT_BACKGROUND,
  },
  innerView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.BACKGROUND_MODAL,
    width: '80%',
    height: '35%',
    borderRadius: 15,
  },
  text: {
    fontSize: 20,
    fontStyle: 'italic',
  },
};
const CustomModal = ({visible, loadingText}) => {
  return (
    <Modal visible={visible} style={style.modalStyle}>
      <View style={style.outerView}>
        <View style={style.innerView}>
          <ActivityIndicator size="large" color="black" />
          <Text style={style.text}>{loadingText}</Text>
        </View>
      </View>
    </Modal>
  );
};
export default CustomModal;
