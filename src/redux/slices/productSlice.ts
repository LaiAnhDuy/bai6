import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  count: number;
}

const initialState: AuthState = {
  count: 4,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 2;
    },
  },
});

export const { increment } = productSlice.actions;
export default productSlice.reducer;
