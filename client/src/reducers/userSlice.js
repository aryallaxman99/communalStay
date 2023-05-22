import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, actions) => {
      const { email, firstName, lastName, _id } = actions.payload;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.id = _id;
    },
    resetUserDetails: (state) => {
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.id = "";
    },
  },
});

export const { setUserDetails, resetUserDetails } = userSlice.actions;
export default userSlice.reducer;
