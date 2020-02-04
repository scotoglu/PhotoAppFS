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
} from 'react-native';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
//Components
import HeaderBar from '../../components/HeaderBar';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      images: [],
      modalVisible: false,
      modalImageId: '',
    };
  }
  componentDidMount() {
    this.getPhotos();
    this.setState({
      name: this.props.customer,
    });
    this.userAlreadylogin();
  }
  getPhotos = () => {
    let url = 'http://test.sinemkobaner.com/api/getphotos';
    axios
      .get(url, {
        params: {
          appointmentId: this.props.appointmentId,
          customerId: '300c18fb-0191-4e95-8e37-60e73b74801c',
        },
      })
      .then(res => {
        let tmpImages = [];
        for (let index = 0; index < res.data.length; index++) {
          tmpImages.push({id: res.data[index].id, path: res.data[index].path});
        }
        this.setState({
          images: tmpImages,
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  userAlreadylogin = async () => {
    //I'll check with jwt token after the api request
    try {
      // console.log('Profile userAlreadyLogin Ok...');

      const logKey = await AsyncStorage.getItem('mail');
      if (logKey != null) {
        return null;
      } else {
        Actions.login();
      }
    } catch (error) {
      console.log('Profile userAlreadyLogin() control  ' + error);
    }
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
        <ActivityIndicator size="large" color="#95a5a6"></ActivityIndicator>
        <Text>Yükleniyor</Text>
      </View>
    );
  };

  signOut = async () => {
    console.log('Clicked....');

    try {
      await AsyncStorage.removeItem('mail');
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
                <Icon name="times-circle" size={25}></Icon>
              </TouchableOpacity>
            </View>
            <Text style={styles.WebAdress}>
              Fotoğraflarınızı, web sitemizi ziyaret ederek indirebilirsiniz.
            </Text>
          </View>
        </View>
        <View style={styles.ImageDisplayContainer}>
          {/**Modal */}
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
                      source={{uri: item.path}}></Image>
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
