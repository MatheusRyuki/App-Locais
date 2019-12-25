import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from "react-native";
import * as Location from "expo-location";
import * as Permission from "expo-permissions";
import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = props => {
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);

  const pickedLocation = props.navigation.getParam("pickedLocation");

  const { onLocationPicker } = props;

  useEffect(() => {
    if (pickedLocation) {
      setLocation(pickedLocation);
      props.onLocationPicker(pickedLocation);
    }
  }, [pickedLocation, onLocationPicker]);

  const verifyPermissions = async () => {
    const result = await Permission.askAsync(Permission.LOCATION);
    if (result.status !== "granted") {
      Alert.alert("Permissões insuficientes", "Você precisa dar permissão", [
        { text: "Ok" }
      ]);
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      setLoading(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      props.onLocationPicker({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch (err) {
      Alert.alert("Não foi possível pegar o local!", "Tente novamente", [
        { text: "OK" }
      ]);
    }
    setLoading(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={location}
        onPress={pickOnMapHandler}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={Colors.primary} />
        ) : (
          <Text>Nenhum Lugar escolhido!</Text>
        )}
      </MapPreview>
      <View style={styles.action}>
        <Button
          title="Localização"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Escolha no mapa"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LocationPicker;
