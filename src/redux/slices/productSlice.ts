import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  count: number;
  heightHeader: number;
}

const initialState: AuthState = {
  count: 4,
  heightHeader: 0
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 2;
    },
    setHeightHeader: (state, action) => {
      state.heightHeader = action.payload;
    },
  },
});

export const { increment, setHeightHeader } = productSlice.actions;
export default productSlice.reducer;
