import { configureStore } from '@reduxjs/toolkit'

import cart from './slices/cart.slice'
import filter from './slices/filter.slice'

const store = configureStore({
  reducer: {
    filter,
    cart
  }
})

export default store
