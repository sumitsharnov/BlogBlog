import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "linear-gradient(to bottom right, var(--orange-500), var(--blue-500))"
};

// Define slice to manage state and actions
const homeSlice = createSlice({
  name: "cardStack",
  initialState,
  reducers: {
    setColor(state, action) {
      state.color = action.payload;
    },
    setDefaultColor(state) {
      state.color = "linear-gradient(to bottom right, var(--orange-500), var(--blue-500))";
    },
  },
});

export const { setColor, setDefaultColor } = homeSlice.actions;
export default homeSlice.reducer;
