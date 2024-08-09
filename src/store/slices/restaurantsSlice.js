import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  searchQuery: "",
};

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    addRestaurant: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.list = [...state.list, action.payload];
    },
    addList: (state, action) => {
      state.list = [...action.payload];
    },
    deleteRestaurant: (state, action) => {
      const newList = state.list.filter((res) => res.id !== action.payload);
      state.list = newList;
    },
    addSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    updateRestroDetail: (state, action) => {
      state.list = state.list.map((res) => res.id === action.payload.id ? { ...res, ...action.payload } : res)
    }
  },
});

export const { addList, addRestaurant, addSearchQuery, deleteRestaurant, updateRestroDetail } = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
