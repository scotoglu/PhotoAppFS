import React, {Component} from 'react';
import {YellowBox} from 'react-native';

/*Ekranda çıkan uyarıları gizler.Kod uyarıları!!! */
/*--------------------------------- */
YellowBox.ignoreWarnings(['Warning: ...']);
console.disableYellowBox = true;
/*--------------------------------- */

//Copmponents
import Home from './src/screens/home/Home';
import Login from './src/screens/login/Login';
import Appointment from './src/screens/appointment/Appointment';
import ContactRequest from './src/screens/contactRequest/ContactRequest';
import Works from './src/screens/works/Work';
import Profile from './src/screens/Account/Profile';
import ForgottenPassword from './src/screens/login/ForgottenPassword';

//Packages
import {Router, Stack, Tabs, Scene, Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppointmentList from './src/components/AppointmentList';
Icon.loadFont();

class App extends Component {
  render() {
    const scenes = Actions.create(
      <Stack key="root" hideNavBar>
        <Tabs showLabel={true} swipeEnabled={true}>
          <Scene
            initial
            key="home"
            tabBarLabel="Anasayfa"
            component={Home}
            hideNavBar
            icon={({tintColor}) => (
              <Icon name="home" color={tintColor} size={24} />
            )}>
            <Scene tabs={true} hideNavBar key="works" component={Works} />
          </Scene>

          <Scene
            tabs={true}
            hideNavBar
            key="contact"
            component={ContactRequest}
            tabBarLabel="İletişim"
            icon={({tintColor}) => (
              <Icon name="calendar" color={tintColor} size={24} />
            )}
          />
          <Scene
            tabs={true}
            hideNavBar
            key="appointment"
            component={Appointment}
            tabBarLabel="Randevu"
            icon={({tintColor}) => (
              <Icon name="phone-square" color={tintColor} size={24} />
            )}
          />
          <Scene
            tabBarLabel="Hesabım"
            icon={({tintColor}) => (
              <Icon name="user" color={tintColor} size={24} />
            )}>
            <Scene tabs={true} key="profile" component={Profile} hideNavBar />
            <Scene tabs={true} hideNavBar key="login" component={Login} clone />
            <Scene
              tabs={true}
              hideNavBar
              key="appointmentList"
              component={AppointmentList}
              type="replace"
            />
            <Scene
              tabs={true}
              hideNavBar
              key="forgottenPassword"
              component={ForgottenPassword}
              type="replace"
            />
          </Scene>
          <Scene
            tabs={true}
            key="works"
            component={Works}
            hideNavBar
            tabBarLabel="Örnekler"
            icon={({tintColor}) => (
              <Icon name="camera-retro" color={tintColor} size={24} />
            )}
          />
        </Tabs>
      </Stack>,
    );
    return <Router scenes={scenes} />;
  }
}

export default App;
