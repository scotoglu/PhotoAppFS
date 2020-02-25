import React from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Color from '../constant/Color';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = {
  datePickerView: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: Color.BORDER,
    width: '80%',
  },
  datepicker: {
    placeholderText: {
      fontSize: 16,
      color: 'grey',
      fontWeight: '200',
      margin: 0,
    },
    dateIcon: {
      // position: "absolute",
      // left: 0,
      // top: 4,
      // marginLeft: 0
      width: 0,
      height: 0,
    },
    dateInput: {
      padding: 0,
      paddingRight: 10,
      borderWidth: 0,
    },
    dateText: {
      textAlign: 'left',
      fontWeight: '200',
      fontSize: 17,
      marginRight: 10,
      paddingLeft: 0,
    },
  },
  iconStyle: {marginVertical: 10, marginRight: 10},
  datePickerStyle: {width: '50%', padding: 0},
};

const CustomDatePicker = ({placeholder, formikProps, formikKey, ...rest}) => {
  return (
    <View style={styles.datePickerView}>
      <Icon name="calendar" size={24} style={styles.iconStyle} />
      <DatePicker
        style={styles.datePickerStyle}
        placeholder={placeholder}
        format="DD.MM.YYYY"
        confirmBtnText="Onayla"
        cancelBtnText="İptal"
        customStyles={styles.datepicker}
        onDateChange={date => {
          this.getSelectedDate(date);
          formikProps.handleChange(formikKey);
        }}
        {...rest}
      />
    </View>
  );
};
export default CustomDatePicker;
