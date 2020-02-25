import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator, Image, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import Axios from 'axios';
import {Dropdown} from 'react-native-material-dropdown';
//Components
import HeaderBar from '../../components/HeaderBar';
//Constant
import Images from '../../constant/Images';
import Utilities from '../../constant/Utilities';
export default class Samples extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: [],
      sampleType: '',
      photoShootTypes: [],
    };
    this.getPhotoShootTypes();
  }
  componentDidMount() {
    this.whichImagesSample(this.props.data);
  }
  getPhotoShootTypes = () => {
    Axios.get(Utilities.GET_PHOTO_SHOOT_TYPES)
      .then(res => {
        let tmp = [];
        for (let index = 0; index < res.data.length; index++) {
          tmp.push({value: res.data[index].name});
        }

        this.setState({
          photoShootTypes: tmp,
        });
      })
      .catch(err => {
        console.log(err, 'in getPhottShootTypes');
      });
  };
  whichImagesSample = sampleType => {
    console.log('whichImageSample');
    console.log(this.props.data);
    switch (sampleType) {
      case 'Aile':
        this.setState({samples: Images.AILE});
        break;
      case 'Yeni Doğan':
        this.setState({samples: Images.YENIDOGAN});
        break;
      case 'Çocuk':
        this.setState({samples: Images.COCUKLAR});
        break;
      case 'Anne':
        this.setState({samples: Images.ANNEYENIDOGAN});
        break;
      default:
        this.setState({samples: Images.AILE});
        break;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <HeaderBar />

        <View style={styles.topTextView}>
          <Dropdown
            value={this.props.data}
            dropdownOffset={{top: 12, left: 12}}
            dropdownPosition={-5.2}
            containerStyle={{width: '70%'}}
            data={this.state.photoShootTypes}
            placeholder={'Örnek Seçiniz'}
            style={{textAlign: 'center'}}
            onChangeText={value => {
              this.whichImagesSample(value);
            }}
          />
        </View>
        {this.state.samples.length <= 0 ? (
          <View style={styles.loadingConatainer}>
            <ActivityIndicator size="large" color="#95a5a6" />
          </View>
        ) : (
          <View style={styles.SwiperContainer}>
            <Swiper showsButtons={true} autoplay={true} style={styles.wrapper}>
              {this.state.samples.map(url => (
                <View key={parseInt(url.id)} style={styles.swiperImagesView}>
                  <Image style={styles.swiperImages} source={url.value} />
                </View>
              ))}
            </Swiper>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  loadingConatainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '100%',
    marginTop: 30,
  },
  SwiperContainer: {
    flexDirection: 'row',
    height: '77%',
    backgroundColor: 'white',
  },

  swiperImagesView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperImages: {
    height: '100%',
    width: '100%',
  },
  topTextView: {
    //padding: 5,
    alignItems: 'center',
  },
  topText: {
    padding: 5,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '300',
  },
});
