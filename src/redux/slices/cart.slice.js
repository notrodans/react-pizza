import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /* eslint no-param-reassign: "error" */
    addToCart(state, action) {
      const findItem = state.items.find(item => item.id === action.payload.id)

      if (findItem) {
        findItem.count += 1
      } else {
        state.items.push(action.payload)
      }
      // eslint-disable-next-line no-param-reassign, no-return-assign
      state.totalPrice = state.items.reduce((prev, item) => (prev += item.price * item.count), 0)
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      // eslint-disable-next-line no-param-reassign, no-return-assign
      state.totalPrice = state.items.reduce((prev, item) => (prev += item.price * item.count), 0)
    },
    clearItems(state) {
      state.items = []
      // eslint-disable-next-line no-param-reassign, no-return-assign
      state.totalPrice = 0
    },
    incrementItem(state, action) {
      const findItem = state.items.find(item => item.id === action.payload)
      findItem.count += 1
      // eslint-disable-next-line no-param-reassign, no-return-assign
      state.totalPrice = state.items.reduce((prev, item) => (prev += item.price * item.count), 0)
    },
    decrementItem(state, action) {
      const findItem = state.items.find(item => item.id === action.payload)
      findItem.count -= 1
      // eslint-disable-next-line no-param-reassign, no-return-assign
      state.totalPrice = state.items.reduce((prev, item) => (prev += item.price * item.count), 0)
    }
  }
})

export const { addToCart, removeFromCart, clearItems, incrementItem, decrementItem } = cartSlice.actions

export default cartSlice.reducer
