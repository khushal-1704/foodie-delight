import { configureStore } from "@reduxjs/toolkit";
import restaurantsSlice from "./slices/restaurantsSlice";


export const store = configureStore({
  reducer: {
    restaurants: restaurantsSlice,
  },
});
