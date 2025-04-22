import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const BASE_URL = 'http://localhost:3000/cart'

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const res = await fetch(BASE_URL)
  return await res.json()
})

export const addItem = createAsyncThunk('cart/addItem', async (item) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...item, quantity: 1 })
  })
  return await res.json()
})

export const removeItem = createAsyncThunk('cart/removeItem', async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  return id
})

export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ id, quantity }) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity })
  })
  return await res.json()
})

const initialState = {
  cartItems: [],
  isSuccess: false,
  totalQuantity: 0,
  totalAmount: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetSuccess(state) {
      state.isSuccess = false
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      // Add user to the state array
      updateTotal(state)     // ← thêm dòng này
      state.isSuccess = true
      state.cartItems = action.payload
    })
    builder.addCase(addItem.fulfilled, (state, action) => {
      // Add user to the state array
      state.isSuccess = true
      state.cartItems.push(action.payload)
      updateTotal(state)
    })
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
      updateTotal(state)
      // Add user to the state array
      state.isSuccess = true
    })
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      // Add user to the state array
      const index = state.cartItems.findIndex(i => i.id === action.payload.id)
      if (index !== -1) state.cartItems[index] = action.payload
      updateTotal(state)
      state.isSuccess = true
    })
  },
})


function updateTotal(state) {
  let qty = 0
  let total = 0
  state.cartItems.forEach(item => {
    qty += item.quantity
    total += item.quantity * item.price
  })
  state.totalQuantity = qty
  state.totalAmount = total
}
// Action creators are generated for each case reducer function
export const { resetSuccess } = cartSlice.actions

export default cartSlice.reducer