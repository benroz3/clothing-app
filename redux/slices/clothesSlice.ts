import { createSlice } from "@reduxjs/toolkit";

export const clothesSlice = createSlice({
  name: "clothes",
  initialState: {
    clothes: {},
    isFetching: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    fetchSuccess: (state, action) => {
      state.clothes = action.payload;
      state.isFetching = false;
    },
    fetchFailure: (state) => {
      state.error = true;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = clothesSlice.actions;
export default clothesSlice.reducer;
