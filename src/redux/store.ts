import { configureStore } from '@reduxjs/toolkit'

import cart from './slices/cart.slice'
import filter from './slices/filter.slice'
import pizza from './slices/pizza.slice'

const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
