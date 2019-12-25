import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = props => {
  const initialLocation = props.navigation.getParam("initialLocation");
  const readonly = props.navigation.getParam("readonly");

  const [location, setLocation] = useState(initialLocation);
  const mapRegion = {
    latitude: initialLocation.lat,
    longitude: initialLocation.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectHandler = event => {
    if (readonly) {
      return;
    }
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

  useEffect(() => {
    props.navigation.setParams({ saveLocation: saveHandler });
  }, [saveHandler, location]);

  const saveHandler = useCallback(() => {
    if (!location) {
      return;
    }
    props.navigation.navigate("NewPlace", { pickedLocation: location });
  }, [location]);

  return (
    <MapView style={styles.map} region={mapRegion} onPress={selectHandler}>
      {markerCoordinates && (
        <Marker title="Lugar escolhido" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = navData => {
  const saveFn = navData.navigation.getParam("saveLocation");
  const readonly = navData.navigation.getParam("readonly");

  if (readonly) {
    return {};
  }

  return {
    headerRight: (
      <TouchableOpacity style={styles.header} onPress={saveFn}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  header: {
    marginHorizontal: 20
  },
  buttonText: {
    fontSize: 16,
    color: "white"
  }
});

export default MapScreen;
