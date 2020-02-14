import {AsyncStorage} from 'react-native';

async function getToken() {
  try {
    const token = await AsyncStorage.getItem('jwt_token');
    if (token === null) {
      console.log('Token null!! in GetToken.');
      return null;
    } else {
      console.log('Token not null!! in GetToken.');
      return token;
    }
  } catch (error) {
    console.log('Error in GetToken.', error);
  }
}
export default getToken;
