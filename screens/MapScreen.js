import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = props => {
  const [location, setLocation] = useState();

  const mapRegion = {
    latitude: 37.2,
    longitude: 35.3,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectHandler = event => {
    setLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  let markerCoordinates;

  if (location) {
    markerCoordinates = {
      latitude: location.lat,
      longitude: location.lng
    };
  }

  return (
    <MapView style={styles.map} region={mapRegion} onPress={selectHandler}>
      {markerCoordinates && (
        <Marker title="Lugar escolhido" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

export default MapScreen;
