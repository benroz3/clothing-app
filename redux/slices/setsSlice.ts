import { createSlice } from "@reduxjs/toolkit";
import { SetsStateType } from "../../utils/types";

const initialState: SetsStateType = {
  setsArray: [],
  currentShirt: null,
  currentPants: null,
  currentShoes: null,
  status: 0,
};

const setsSlice = createSlice({
  name: "sets",
  initialState,
  reducers: {
    addSet: (state, action) => { // Adding a set to the array and resetting clothes to default
      if (state.status === 3) {
        state.setsArray.push(action.payload);
        state.currentShirt = null;
        state.currentPants = null;
        state.currentShoes = null;
        state.status = 0;
      }
    },
    setCurrentShirt: (state, action) => {
      if (!state.currentShirt) state.status += 1;
      state.currentShirt = action.payload;
    },
    setCurrentPants: (state, action) => {
      if (!state.currentPants) state.status += 1;
      state.currentPants = action.payload;
    },
    setCurrentShoes: (state, action) => {
      if (!state.currentShoes) state.status += 1;
      state.currentShoes = action.payload;
    },
  },
});

export const { addSet, setCurrentShirt, setCurrentPants, setCurrentShoes } =
  setsSlice.actions;

export default setsSlice.reducer;
