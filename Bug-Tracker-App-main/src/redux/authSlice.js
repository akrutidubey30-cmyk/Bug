import { createSlice } from "@reduxjs/toolkit";

const savedAccounts = localStorage.getItem("accounts");
const savedCurrentUser = localStorage.getItem("currentUser");

const initialState = {
  accounts: savedAccounts ? JSON.parse(savedAccounts) : [],
  currentUser: savedCurrentUser ? JSON.parse(savedCurrentUser) : null,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createAccount: (state, action) => {
      const accountExists = state.accounts.some(
        (account) => account.username === action.payload.username
      );

      if (accountExists) {
        state.error = "This username is already taken.";
        return;
      }

      state.accounts.push(action.payload);
      state.currentUser = {
        name: action.payload.name,
        username: action.payload.username,
      };
      state.error = "";
    },
    login: (state, action) => {
      const account = state.accounts.find(
        (item) =>
          item.username === action.payload.username &&
          item.password === action.payload.password
      );

      if (!account) {
        state.error = "Username or password is incorrect.";
        return;
      }

      state.currentUser = {
        name: account.name,
        username: account.username,
      };
      state.error = "";
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = "";
    },
    clearAuthError: (state) => {
      state.error = "";
    },
  },
});

export const { createAccount, login, logout, clearAuthError } =
  authSlice.actions;
export default authSlice.reducer;
