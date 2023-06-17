import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  firstName: "",
  lastName: "",
  profilePicture: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, actions) => {
      const { firstName, lastName, profilePicture } = actions.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.profilePicture = profilePicture;
    },
    resetUserDetails: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.profilePicture = "";
    },
  },
});

export const { setUserDetails, resetUserDetails } = userSlice.actions;
export default userSlice.reducer;
