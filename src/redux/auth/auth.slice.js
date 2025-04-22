import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const BASE_URL = 'http://localhost:3000/users'

// Async login
export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  const res = await fetch(`${BASE_URL}?username=${username}&password=${password}`)
  const data = await res.json()
  if (data.length === 0) {
    return thunkAPI.rejectWithValue('Tài khoản hoặc mật khẩu sai!')
  }
  return data[0]
})

const initialState = {
  user: null,
  isLoggedIn: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.isLoggedIn = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoggedIn = true
        state.isLoading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
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
export const { logout } = authSlice.actions

export default authSlice.reducer