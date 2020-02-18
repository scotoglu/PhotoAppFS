import React from 'react';
import axios from 'axios';
import getToken from './getToken';
import Utilities from '../../constant/Utilities';
const checkAuth = () => {
  console.log('CheckAuth Active...');
  try {
    const token = getToken();
    if (token != null) {
      axios
        .get(Utilities.CHECKAUTH, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then(res => {
          console.log('Res in checkAuth: ', res);

          if (res.data.success) {
            console.log(res.data.success);
            return true;
          }
        })
        .catch(err => {
          return false;
        });
    }
  } catch (error) {
    console.error('Error in chekhAuth: ', error);
  }
};
export default checkAuth;
