import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  weather: {},
  city: "Tashkent",
  key: "0dbf7aacee3945c235261bca89fc6354",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
  userInput: "",
};

const city = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    },
    setWeather(state, action) {
      state.weather = action.payload;
    },
    setUserInput(state, action) {
      state.userInput = action.payload;
    },
  },
});

const store = configureStore({
  reducer: city.reducer,
});

export const cityActions = city.actions;

export default store;
