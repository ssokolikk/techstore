import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, CartItem } from '../types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Добавление товара в корзину
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Если товар уже есть, просто увеличиваем количество
        existingItem.quantity += 1;
      } else {
        // Если товара нет, добавляем его с количеством 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Удаление товара из корзины
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;