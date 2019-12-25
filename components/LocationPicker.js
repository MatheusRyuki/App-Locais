import React, { useState } from "react";
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
      setLocation(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch (err) {
      Alert.alert("Não foi possível pegar o local!", "Tente novamente", [
        { text: "OK" }
      ]);
    }
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={location}>
        {loading ? (
          <ActivityIndicator size={"large"} color={Colors.primary} />
        ) : (
          <Text>Nenhum Lugar escolhido!</Text>
        )}
      </MapPreview>
      <View style={styles.mapPreview}>
        {loading ? (
          <ActivityIndicator size={"large"} color={Colors.primary} />
        ) : (
          <Text>Nenhum Lugar escolhido!</Text>
        )}
      </View>
      <Button
        title="Localização"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
