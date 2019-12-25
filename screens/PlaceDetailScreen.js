import React from "react";
import { useSelector } from "react-redux";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import MapPreview from "../components/MapPreview";
import Colors from "../constants/Colors";

const PlaceDetailScreen = props => {
  const placeId = props.navigation.getParam("placeId");
  const selectedPlace = useSelector(state =>
    state.places.places.find(place => place.id === placeId)
  );

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image style={styles.image} source={{ uri: selectedPlace.imageUrl }} />
      <View style={styles.locationContainer}>
        <View style={styles.address}>
          <Text style={styles.text}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          style={styles.map}
          location={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc"
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10
  },
  address: {
    padding: 20
  },
  text: {
    color: Colors.primary,
    textAlign: "center"
  },
  map: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle")
  };
};

export default PlaceDetailScreen;
