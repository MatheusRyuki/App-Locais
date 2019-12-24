import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import placesReducer from "./store/reducers/places.js";
import PlacesNavigator from "./navigation/PlacesNavigator";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("Banco de dados iniciado");
  })
  .catch(err => {
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
