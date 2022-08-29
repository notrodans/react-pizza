import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  currentPage: 1,
  currentCategory: 'Все',
  sort: { name: 'популярности', sortProperty: 'rating' }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    /* eslint no-param-reassign: "error" */
    select(state, action) {
      state.categoryId = action.payload
    },
    selectCategory(state, action) {
      state.currentCategory = action.payload
    },
    selectSort(state, action) {
      state.sort = action.payload
    },
    setPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage)
        state.categoryId = Number(action.payload.categoryId)
        state.sort = action.payload.sort
      } else {
        state.categoryId = 0
        state.currentPage = 1
        state.sort = { name: 'популярности', sortProperty: 'rating' }
      }
    }
  }
})

export const { select, selectCategory, selectSort, setPage, setFilters } = filterSlice.actions

export default filterSlice.reducer
