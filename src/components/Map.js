import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
export default class Maps extends Component {
  constructor() {
    super();
    this.state = {
      latLng: {
        latitude: 37.0526809,
        longitude: 35.2977791,
      },
    };
  }

  render() {
    return (
      <View style={styles.Maps}>
        <MapView
          pitchEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          style={styles.mapView}
          initialRegion={{
            latitude: 37.0526809,
            longitude: 35.2977791,
            latitudeDelta: 0.02, //0'a yaklaştıkça zoom artar.
            longitudeDelta: 0.02,
          }}>
          <Marker coordinate={this.state.latLng} />
        </MapView>
      </View>
    );
  }
}
const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  mapView: {
    height: 200,
    width: width - 54,
  },
});
/**
 * pitchEnabled={false} camera angle
 * scrollEnabled={false} regions
 * rotateEnabled={false} rotate or pinch
 * zoomEnabled={false}
 *
 * all of them disable to user interaction with maps
 *
 */
