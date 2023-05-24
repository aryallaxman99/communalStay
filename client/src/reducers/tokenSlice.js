import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  token: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setTokenDetails: (state, actions) => {
      const { token } = actions.payload;
      state.token = token;
    },
  },
});

export const { setTokenDetails } = tokenSlice.actions;
export default tokenSlice.reducer;
