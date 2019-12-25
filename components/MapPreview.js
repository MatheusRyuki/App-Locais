import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import ENV from "../env";

const MapPreview = props => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${ENV.ApiKey}&locations=${props.location.lat},${props.location.lng}|marker-ff0000&center=${props.location.lat},${props.location.lng}&zoom=14&size=400,200`;
  }
  return (
    <TouchableOpacity
      style={{ ...props.style, ...styles.mapPreview }}
      onPress={props.onPress}
    >
      {props.location ? (
        <Image style={styles.image} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default MapPreview;
