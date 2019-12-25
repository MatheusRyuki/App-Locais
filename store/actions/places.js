import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";
import ENV from "../../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
  return async dispatch => {
    const response = await fetch(
      `http://www.mapquestapi.com/geocoding/v1/reverse?key=${ENV.ApiKey}&location=${location.lat},${location.lng}`
    );

    if (!response.ok) {
      throw new Error("Algo saiu errado");
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("Algo saiu errado");
    }

    const address = resData.results[0].locations[0];

    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address.street,
        location.lat,
        location.lng
      );
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.inserId,
          title,
          image: newPath,
          address: address.street,
          coords: {
            lat: location.lat,
            lng: location.lng
          }
        }
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResults = await fetchPlaces();
      dispatch({
        type: SET_PLACES,
        places: dbResults.rows._array
      });
    } catch (err) {
      throw err;
    }
  };
};
