import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

export type LayoutType = {
  drawerOpen: boolean;
  accountMenuOpen: boolean;
};

// redux slice for that stores layout data
export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    drawerOpen: false,
    accountMenuOpen: false,
  
  } as LayoutType,
  reducers: {
    setDrawerState: (state, action) => {
      state.drawerOpen = action.payload;
    },

    setAccountMenuState: (state, action) => {
      state.accountMenuOpen = action.payload;
    },

   
  },
});

export const {
  setAccountMenuState,
  setDrawerState,
 
} = layoutSlice.actions;

export const selectDrawerState = (state: RootState) => state.layout.drawerOpen;
export const selectAccountMenuState = (state: RootState) =>
  state.layout.accountMenuOpen;


export default layoutSlice.reducer;
