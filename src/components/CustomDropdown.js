import React from 'react';
import {Dropdown} from 'react-native-material-dropdown';
import Color from '../constant/Color';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const dropdownView = {
  flexDirection: 'row',
  borderBottomWidth: 2,
  borderColor: Color.BORDER,
  width: '80%',
};
const pickerIcon = {
  marginRight: 10,
  marginTop: 10,
};

const CustomDropDown = ({formikProps, formikKey, placeholder, ...rest}) => {
  console.log({...rest});

  return (
    <View style={dropdownView}>
      <Icon name="chevron-down" size={30} style={pickerIcon} />
      <Dropdown
        value={''}
        style={{textAlign: 'left'}}
        placeholder={placeholder}
        containerStyle={{width: '80%'}}
        dropdownOffset={{top: 12, left: 12}}
        dropdownPosition={-4}
        rippleCentered={true}
        onChangeText={(value, index, data) => {
          this.getSelectedItem(value, index, data);
          formikProps.handleChange(formikKey);
        }}
        {...rest}
      />
    </View>
  );
};
export default CustomDropDown;
