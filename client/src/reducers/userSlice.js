import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  firstName: "",
  profilePicture: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, actions) => {
      const { firstName, profilePicture } = actions.payload;
      state.firstName = firstName;
      state.profilePicture = profilePicture;
    },
    resetUserDetails: (state) => {
      state.firstName = "";
      state.profilePicture = "";
    },
  },
});

export const { setUserDetails, resetUserDetails } = userSlice.actions;
export default userSlice.reducer;
