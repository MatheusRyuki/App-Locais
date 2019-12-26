import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import ENV from "../env";

const MapPreview = props => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:C%7C${props.location.lat},${props.location.lng}
&key=${ENV.ApiKey}`;
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
