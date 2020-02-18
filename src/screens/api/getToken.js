import {AsyncStorage} from 'react-native';
/*
WHEN APP STARTED FETCHS IF TOKEN EXİST,TO AVOID LATENCY
*/
async function getToken() {
  try {
    const token = await AsyncStorage.getItem('validToken');
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
