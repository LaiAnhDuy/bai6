import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductProps {
  image: string;
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  id: number;
}

interface CartState {
  [userEmail: string]: ProductProps[];
}

const initialState: CartState = {
  ["duy@gmail.com"]: [],
  ["long@gmail.com"]: [],
  ["test@gmail.com"]: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{ userEmail: string; product: ProductProps }>
    ) => {
      const { userEmail, product } = action.payload;
      if (!state[userEmail]) {
        state[userEmail] = [];
      }
      state[userEmail].push(product);
    },

    incrementQuantity: (
      state,
      action: PayloadAction<{ userEmail: string; id: number }>
    ) => {
      const { userEmail, id } = action.payload;
      state[userEmail][id].quantity += 1;
    },

    reduceQuantity: (
      state,
      action: PayloadAction<{ userEmail: string; id: number }>
    ) => {
      const { userEmail, id } = action.payload;
      state[userEmail][id].quantity -= 1;
    },

    removeProduct: (
      state,
      action: PayloadAction<{ userEmail: string; id: number }>
    ) => {
      const { userEmail, id } = action.payload;
      if (state[userEmail]) {
        state[userEmail] = state[userEmail].filter((_, index) => index !== id);
      }
    },
  },
});

export const { addProduct, incrementQuantity, reduceQuantity, removeProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
