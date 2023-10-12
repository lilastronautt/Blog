import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  usernameExists: false,
  passNotEqual: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
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
