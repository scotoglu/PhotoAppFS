import React from 'react';
import {Input} from 'react-native-elements';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const InputText = ({formikProps, formikKey, iconName, ...rest}) => {
  const inputContainerStyle = {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  };
  const inputStyle = {padding: 0};
  const iconStyle = {marginRight: 5};

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputContainerStyle.borderColor = 'red';
  }

  return (
    <>
      <Input
        inputStyle={[inputStyle, {margin: 0}]}
        inputContainerStyle={[inputContainerStyle]}
        leftIcon={
          <Icon name={iconName} size={24} color="black" style={iconStyle} />
        }
        onChangeText={formikProps.handleChange(formikKey)}
        {...rest}
        rightIcon={
          <Text style={{color: 'red', fontSize: 8}}>
            {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
          </Text>
        }
      />
    </>
  );
};
export default InputText;
{
  /* <Text style={{color: 'red'}}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </Text> */
}
