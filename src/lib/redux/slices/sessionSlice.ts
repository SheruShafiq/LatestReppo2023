import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

export type SessionType = {
  initialised: boolean;
  active: boolean;
  permissions: string[];
  csrf: string;
  expiresAt: string | null;
  user: {
    username: string;
    firstName: string;
    lastName: string;
  };
};

// redux slice for that stores session data
export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    initialised: false,
    active: false,
    permissions: [],
    csrf: "",
    expiresAt: null,
    user: {
      username: "",
      firstName: "",
      lastName: "",
    },
  } as SessionType,
  reducers: {
    login: (state, action) => {
      if (action.payload.csrf) {
        state.csrf = action.payload.csrf;
      }
      if (action.payload.permissions) {
        state.active = true;
        state.permissions = action.payload.permissions;
      }
      if (action.payload.expiresAt) {
        state.expiresAt = action.payload.expiresAt;
      }
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      state.initialised = true;
    },

    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    setSessionExpiresAt: (state, action) => {
      state.expiresAt = action.payload;
    },

    logout: (state) => {
      state.initialised = true;
      state.active = false;
      state.permissions = [];
      state.csrf = "";
      state.expiresAt = null;
      state.user = {
        username: "",
        firstName: "",
        lastName: "",
      };
     
    },
  },
});

// export actions
export const { login, logout, setPermissions, setSessionExpiresAt } =
  sessionSlice.actions;

// export selectors
export const selectSession = (state: RootState) => state.session;
export const selectSessionInitialised = (state: RootState) =>
  state.session.initialised;
export const selectSessionActive = (state: RootState) => state.session.active;
export const selectSessionPermissions = (state: RootState) =>
  state.session.permissions;
export const selectSessionCsrf = (state: RootState) => state.session.csrf;
export const selectSessionExpiresAt = (state: RootState) =>
  state.session.expiresAt;
export const selectSessionUser = (state: RootState) => state.session.user;

// export reducer
export default sessionSlice.reducer;
