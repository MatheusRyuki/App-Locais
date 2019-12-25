import React, { useState, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Button
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as PlacesActions from "../store/actions/places";
import ImgPicker from "../components/ImageSelector";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = props => {
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [location, setLocation] = useState();
  const dispatch = useDispatch();

  const titleHandlerChange = text => {
    setTitle(text);
  };

  const imageTakenHandler = url => {
    setImage(url);
  };

  const locationPickerHandler = useCallback(location => {
    setLocation(location);
  }, []);

  const savePlaceHandler = async () => {
    await dispatch(PlacesActions.addPlace(title, image, location));
    props.navigation.navigate("Places");
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleHandlerChange}
          value={title}
        />
        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicker={locationPickerHandler}
        />
        <Button
          title="Salvar local"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;
