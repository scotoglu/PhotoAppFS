import axios from 'axios';
let baseURL = 'http://test.sinemkobaner.com/api';

class AppAPI {
  constructor({endpoint}) {
    this.endpoint = endpoint;
  }

  getAvailableAppoinmentTimes = ({selectedDate, photoType}) => {
    return axios
      .get(baseURL, {
        params: {
          start: selectedDate,
          photoShootType: photoType,
        },
      })
      .then(res => {
        res.data;
      })
      .catch(err);
  };
}
export default AppAPI;
