import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  firstName: "",
  lastName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, actions) => {
      const { firstName, lastName } = actions.payload;
      state.firstName = firstName;
      state.lastName = lastName;
    },
    resetUserDetails: (state) => {
      state.firstName = "";
      state.lastName = "";
    },
  },
});

export const { setUserDetails, resetUserDetails } = userSlice.actions;
export default userSlice.reducer;
