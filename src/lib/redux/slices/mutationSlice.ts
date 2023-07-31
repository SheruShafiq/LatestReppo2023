import { NumericalString } from "@/components/DrawerComponent";
import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
export type MutationType = {
 drawerState: boolean;
 drawerWidth: NumericalString;
 inFlow: boolean;
 warningActive: boolean;
 oldData: any;
 reset: boolean;
};

// redux slice for that stores layout data
export const mutationSlice = createSlice({
  name: "mutation",
  initialState: {
    reset: false,
    oldData: {},
    drawerState: false,
    drawerWidth: "0",
    inFlow: false,
    warningActive: false,
  } as MutationType,
  reducers: {
    setReset:(state, action) => {
      state.reset = action.payload;
    },
setWarningActive: (state, action) => {
      state.warningActive = action.payload;
    },
    setOldData: (state, action) => {
      state.oldData = action.payload;
    },

    setDrawerState: (state, action) => {
      state.drawerState = action.payload;
    },

    setDrawerWidth: (state, action) => {
      state.drawerWidth = action.payload;
    },

    setInFlow: (state, action) => {
      state.inFlow = action.payload;
    },
  },
});

export const {
  setReset,
    setOldData,
    setWarningActive,
    setDrawerState,
    setDrawerWidth,
    setInFlow,
} = mutationSlice.actions;

export const selectReset = (state: RootState) => state.mutation.reset;
export const selectOldData = (state: RootState) => state.mutation.oldData;
export const selectWarningActive = (state: RootState) =>
  state.mutation.warningActive;
export const selectDrawerState = (state: RootState) => state.mutation.drawerState;
export const selectDrawerWidth = (state: RootState) =>
  state.mutation.drawerWidth;
export const selectInFlow = (state: RootState) =>
  state.mutation.inFlow;

export default mutationSlice.reducer;
