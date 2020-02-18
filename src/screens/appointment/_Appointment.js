import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button} from 'react-native-elements';

export default class _Appointment extends Component {
  render() {
    return (
      <KeyboardAvoidingView>
        <Modal
          style={{
            flex: 1,
            margin: 0,
          }}
          visible={this.state.isModalVisible}
          onRequestClose={() => console.log('Close Pressed...')}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#rgba(0, 0, 0 ,0.6 )', //sets transparent black background of modal
            }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        </Modal>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({});
