import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLogin: false,
  showRegistration: false,
  showBackdrop: false,
  usernameExists: false,
  passNotEqual: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    showLoginModal(state, action) {
      console.log(action.payload);
      return { ...state, showLogin: action.payload };
    },
    showRegistrationModal(state, action) {
      console.log(action.payload);
      return { ...state, showRegistration: action.payload };
    },
    showBackdropModal(state, action) {
      return { ...state, showBackdrop: action.payload };
    },
    closeAuth(state) {
      return {
        ...state,
        showLogin: false,
        showBackdrop: false,
        showRegistration: false,
      };
    },
    usernameExists(state, action) {
      return { ...state, usernameExists: action.payload };
    },
    setPassNotEqual(state, action) {
      return { ...state, passNotEqual: action.payload };
    },
  },
});

const store = configureStore({ reducer: blogSlice.reducer });

export const blogActions = blogSlice.actions;

export default store;
