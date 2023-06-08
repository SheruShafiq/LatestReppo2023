import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

export type LayoutType = {
  drawerOpen: boolean;
  accountMenuOpen: boolean;
  policyDetailDrawerOpen: boolean;
  persoonsDetailDrawerOpen: boolean;
};

// redux slice for that stores layout data
export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    drawerOpen: false,
    accountMenuOpen: false,
    policyDetailDrawerOpen: false,
    persoonsDetailDrawerOpen: false,
  } as LayoutType,
  reducers: {
    setDrawerState: (state, action) => {
      state.drawerOpen = action.payload;
    },

    setAccountMenuState: (state, action) => {
      state.accountMenuOpen = action.payload;
    },

    setPolicyDetailDrawerState: (state, action) => {
      state.policyDetailDrawerOpen = action.payload;
    },
    setPersoonsDetailDrawerOpen: (state, action) => {
      state.persoonsDetailDrawerOpen = action.payload;
    },
  },
});

export const {
  setAccountMenuState,
  setDrawerState,
  setPolicyDetailDrawerState,
  setPersoonsDetailDrawerOpen,
} = layoutSlice.actions;

export const selectDrawerState = (state: RootState) => state.layout.drawerOpen;
export const selectAccountMenuState = (state: RootState) =>
  state.layout.accountMenuOpen;
export const selectPolicyDetailDrawerState = (state: RootState) =>
  state.layout.policyDetailDrawerOpen;
export const selectPersoonsDetailDrawerState = (state: RootState) =>
  state.layout.persoonsDetailDrawerOpen;

export default layoutSlice.reducer;
