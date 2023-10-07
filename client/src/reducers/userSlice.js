import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  firstName: "",
  profilePicture: "",
  userRole: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, actions) => {
      const { firstName, profilePicture, userRole } = actions.payload;
      state.firstName = firstName;
      state.profilePicture = profilePicture;
      state.userRole = userRole;
    },
    resetUserDetails: (state) => {
      state.firstName = "";
      state.profilePicture = "";
      state.userRole = "";
    },
  },
});

export const { setUserDetails, resetUserDetails } = userSlice.actions;
export default userSlice.reducer;
