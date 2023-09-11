import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type PageData = {
  heading: string;
  subHeading: string[];
  url: string;
};

export type LayoutType = {
  drawerOpen: boolean;
  accountMenuOpen: boolean;
  recentlyViewed: PageData[];
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    drawerOpen: false,
    accountMenuOpen: false,
    recentlyViewed: []
  } as LayoutType,
  reducers: {
    setDrawerState: (state, action) => {
      state.drawerOpen = action.payload;
    },
    setAccountMenuState: (state, action) => {
      state.accountMenuOpen = action.payload;
    },
    setRecentlyViewed: (state, action: PayloadAction<PageData>) => {
      const pageIndex = state.recentlyViewed.findIndex(page => page.url === action.payload.url);
      
      // If the page doesn't exist in the array
      if (pageIndex === -1) {
        state.recentlyViewed.unshift(action.payload);
      } 
      // If the page exists but isn't at the top
      else if (pageIndex !== 0) {
        const [existingPage] = state.recentlyViewed.splice(pageIndex, 1);
        state.recentlyViewed.unshift(existingPage);
      }
      // If the page is already at the top, do nothing
    
      // Ensure the array doesn't exceed the maximum length
      const MAX_LENGTH = 6;
      if (state.recentlyViewed.length > MAX_LENGTH) {
        state.recentlyViewed.length = MAX_LENGTH;
      }
    }
    
  },
});

export const {
  setRecentlyViewed,
  setAccountMenuState,
  setDrawerState,
} = layoutSlice.actions;

export const selectRecentlyViewed = (state: RootState) => state.layout.recentlyViewed;
export const selectDrawerState = (state: RootState) => state.layout.drawerOpen;
export const selectAccountMenuState = (state: RootState) => state.layout.accountMenuOpen;
export default layoutSlice.reducer;
