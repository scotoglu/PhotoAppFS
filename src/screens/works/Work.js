import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator, Image, Text} from 'react-native';
import Swiper from 'react-native-swiper';
//Components
import HeaderBar from '../../components/HeaderBar';
//Constant
import Images from '../../constant/Images';
import {Dropdown} from 'react-native-material-dropdown';
export default class Samples extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: [],
      sampleType: '',
    };

    // this.createDatas = this.createDatas.bind(this);
    this.whichImagesSample = this.whichImagesSample.bind(this);
  }
  componentDidMount() {
    this.whichImagesSample();
    console.log('Coming from home:  ', this.props.text);

    // this.createDatas();
  }

  // createDatas = () => {
  //   tempData = [];
  //   for (let index = 0; index < 20; index++) {
  //     tempData.push({
  //       id: index,
  //       value: require('../../../assets/1.jpg'),
  //     });
  //   }

  //   this.setState({
  //     samples: tempData,
  //   });
  // };

  whichImagesSample = sampleType => {
    console.log('whichImageSample');
    console.log(this.props.text);
    switch (sampleType) {
      case 'Aile':
        this.setState({samples: Images.AILE});

        break;
      case 'Yeni Doğan':
        this.setState({samples: Images.YENIDOGAN});

        break;

      case 'Çocuklar':
        this.setState({samples: Images.COCUKLAR});
        break;

      case 'Anne-Yeni Doğan':
        this.setState({samples: Images.ANNEYENIDOGAN});
        break;

      default:
        this.setState({samples: Images.AILE});
        break;
    }
  };
  render() {
    let dropdownData = [
      {value: 'Aile'},
      {value: 'Yeni Doğan'},
      {value: 'Çocuklar'},
      {value: 'Anne-Yeni Doğan'},
    ];
    return (
      <View style={styles.container}>
        <HeaderBar />

        <View
          style={
            ([styles.topTextView],
            {
              alignItems: 'center',
            })
          }>
          <Dropdown
            dropdownOffset={{top: 12, left: 12}}
            dropdownPosition={-5.2}
            containerStyle={{width: '70%'}}
            data={dropdownData}
            placeholder={'Örnek Seçiniz'}
            style={{textAlign: 'center'}}
            onChangeText={value => {
              this.whichImagesSample(value);
            }}
          />
        </View>
        {this.state.samples.length <= 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '50%',
              width: '100%',
              marginTop: 30,
            }}>
            <ActivityIndicator size="large" color="#95a5a6"></ActivityIndicator>
          </View>
        ) : (
          <View style={styles.SwiperContainer}>
            <Swiper showsButtons={true} autoplay={true} style={styles.wrapper}>
              {/*this.state.images.map()... buraya bastırılacak. 
            <View>
                <Image></Image>
            </View
              */}
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
  },
  topText: {
    padding: 5,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '300',
  },
});
