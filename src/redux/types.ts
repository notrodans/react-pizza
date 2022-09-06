export type SortType = {
  name: string
  sortProperty: 'rating' | 'price' | 'title'
}

export interface IFilterSliceState {
  categoryId: number
  currentPage: number
  currentCategory: string
  sort: SortType
  searchValue: string
}

export interface ICartItem {
  id: string
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

export interface IPizza {
  id: string
  imageUrl: string
  title: string
  types: number[]
  type?: string
  sizes: number[]
  size?: string
  price: number
  count?: number
}

export interface IPizzaAsyncOptions {
  currentPage: number
  category: string
  sort: string
  search: string
}
