import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  AsyncStorage,
  InteractionManager,
  BackHandler,
} from 'react-native';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
//Components
import HeaderBar from '../../components/HeaderBar';
import Utilities from '../../constant/Utilities';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      images: [],
      modalVisible: false,
      modalImageId: '',
      userToken: '',
    };
  }
  componentDidMount() {
    console.log('Props token...', this.props.token);
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('Back Pressed...');
    });
    this.setState({
      name: this.props.customer,
      userToken: this.props.token,
    });
    //  this.getTokenLocal();
    this.getPhotos();
  }
  getPhotos = async () => {
    console.log('getPhotos Active... Profile.js');
    this.setModalVisible();

    // let token = this.getTokenLocal();
    // console.log('aaaaaa......', token);

    console.log('State Token...', this.state.userToken);

    let url = Utilities.BASE_URL + 'getphotos';
    axios
      .get(url, {
        params: {
          appointmentId: this.props.appointmentId,
        },
        headers: {
          Authorization: 'Bearer ' + this.props.token,
        },
      })
      .then(res => {
        console.log('Res Data...', res.data);

        let tmpImages = [];
        for (let index = 0; index < res.data.length; index++) {
          tmpImages.push({
            id: res.data[index].id,
            path: res.data[index].thumbnailPath,
          });
        }
        this.setState({
          images: tmpImages,
        });
        this.setModalVisible();
      })
      .catch(err => {
        this.setModalVisible();
        console.log('GetPhotos axios catch...', err.response);
      });
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  //open and start modal swiper from selected image as image id.
  itemClicked = (visible, imageİd) => {
    this.setState({modalVisible: visible});
    this.setState({
      modalImageId: imageİd - this.state.images[0].id,
    });
  };

  //if flatlist data not fill yet,then func will work from FlatList > ListEmptyComponent.
  listEmpty = () => {
    return (
      <View style={styles.activityIndicatorView}>
        <ActivityIndicator size="large" color="#95a5a6" />
        <Text>Yükleniyor</Text>
      </View>
    );
  };

  signOut = async () => {
    try {
      await AsyncStorage.removeItem('validToken');
      Actions.login();
    } catch (error) {}
  };
  render() {
    return (
      <>
        <HeaderBar />
        <View>
          <View style={styles.TopLeftSide}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.UserInfo}>Sayın {this.state.name}</Text>
              <TouchableOpacity style={styles.ExitIcon} onPress={this.signOut}>
                <Icon name="times-circle" size={25} />
              </TouchableOpacity>
            </View>
            <Text style={styles.WebAdress}>
              Fotoğraflarınızı, web sitemizi ziyaret ederek indirebilirsiniz.
            </Text>
          </View>
        </View>
        <View style={styles.ImageDisplayContainer}>
          {/**Modal for image slide */}
          <Modal
            coverScreen={true}
            isVisible={this.state.modalVisible}
            onBackButtonPress={() => this.setModalVisible(false)}>
            <View style={styles.swipeContainer}>
              <Swiper
                showsButtons={false}
                autoplay={false}
                index={this.state.modalImageId}>
                {this.state.images.map(url => (
                  <View key={url.id} style={styles.swiperImagesView}>
                    <Image
                      style={styles.swiperImages}
                      source={{uri: url.path}}
                    />
                  </View>
                ))}
              </Swiper>
            </View>
          </Modal>
          {/**FlatList */}
          <SafeAreaView
            style={{
              alignItems: 'center',
              padding: 10,
              backgroundColor: 'white',
            }}>
            <FlatList
              ListEmptyComponent={() => this.listEmpty()}
              contentContainerStyle={{
                paddingBottom: '35%',
              }}
              data={this.state.images}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => this.itemClicked(true, item.id)}>
                  <View style={styles.flatListImageView}>
                    <Image
                      resizeMethod="scale"
                      style={styles.flatListImage}
                      source={{uri: item.path}}
                    />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </SafeAreaView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  TopLeftSide: {
    width: '100%',
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ExitIcon: {
    marginLeft: 40,
  },

  UserInfo: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: '300',
    textAlign: 'center',
  },
  ImageDisplayContainer: {
    alignItems: 'center',
    borderWidth: 0,
  },
  flatListImageView: {
    margin: 1,
  },
  flatListImage: {
    height: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width / 2 - 10,
    borderRadius: 20,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeContainer: {
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  WebAdress: {
    fontSize: 12,
    fontWeight: '300',
    margin: 2,
    textAlign: 'center',
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
  activityIndicatorView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '100%',
    marginTop: 30,
  },

  stepsOfPhotoView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: null,
  },
  activeStep: {
    fontSize: 20,
    fontWeight: '400',
    color: 'green',
  },
  inactiveSteps: {
    fontSize: 15,
    fontWeight: '400',
    color: 'red',
  },
});
