import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrdersState {
  orders: any[];
  currentOrder: any | null;
  orderHistory: any[];
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  orderHistory: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<any[]>) => {
      state.orders = action.payload;
    },
    setCurrentOrder: (state, action: PayloadAction<any | null>) => {
      state.currentOrder = action.payload;
    },
    addOrder: (state, action: PayloadAction<any>) => {
      state.orders.push(action.payload);
    },
    setOrderHistory: (state, action: PayloadAction<any[]>) => {
      state.orderHistory = action.payload;
    },
  },
});

export const { setOrders, setCurrentOrder, addOrder, setOrderHistory } = ordersSlice.actions;
export default ordersSlice.reducer;