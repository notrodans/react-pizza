import qs from 'query-string'
import React, { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'

import Categories from '../components/Categories'
import Pagination from '../components/Pagination/index'
import Skeleton from '../components/PizzaBlock/Skeleton'
import PizzaBlock from '../components/PizzaBlock/index'
import Sort, { sortOptions } from '../components/Sort'
import useDebounce from '../hooks/useDebounce'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { select, selectCategory, selectFilter, setFilters } from '../redux/slices/filter.slice'
import { fetchPizzas, selectPizza } from '../redux/slices/pizza.slice'

const Home: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  // Redux
  const { categoryId, currentCategory, sort: sortType, currentPage, searchValue } = useAppSelector(selectFilter)
  const { items, status } = useAppSelector(selectPizza)

  // Variables
  const skeleton = React.useMemo(() => [...new Array(6)].map(() => <Skeleton key={Date.now() + Math.random()} />), [])

  const pizzas = React.useMemo(
    () => items.map(obj => <PizzaBlock key={obj.id} {...obj} />), // eslint-disable-line
    [items]
  )

  const isLoading = React.useMemo(() => status, [status])
  const debounceValue = useDebounce(searchValue, 500)

  const onClickCategory = React.useCallback((index: number, category: string) => {
    dispatch(select(index))
    dispatch(selectCategory(category))
    // eslint-disable-next-line
  }, [])

  // Function for getting pizzas
  const getPizzas = React.useCallback(async () => {
    const category = categoryId ? `&category=${categoryId}` : ''
    const sort = sortType ? `&sortBy=${sortType.sortProperty}` : ''
    const search = debounceValue ? `&search=${debounceValue}` : ''

    dispatch(fetchPizzas({ currentPage, category, sort, search }))
  }, [currentPage, categoryId, debounceValue, sortType])

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortOptions.find(obj => obj.sortProperty === params.sortProperty)
      if (sort) {
        dispatch(
          setFilters({
            ...params,
            sort
          })
        )
      }

      isSearch.current = true
    }
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false
  }, [getPizzas])

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage,
        categoryId,
        sortProperty: sortType.sortProperty
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
    // eslint-disable-next-line
  }, [currentPage, categoryId, sortType])

  return (
    <div className='container'>
      <main className='content'>
        <div className='content__top'>
          <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
          <Sort />
        </div>
        <h2 className='content__title'>{currentCategory}</h2>
        <div className='content__items'>
          {/* eslint-disable no-nested-ternary */}
          {isLoading === 'pending'
            ? skeleton
            : isLoading === 'success' && pizzas && pizzas.length
            ? pizzas
            : isLoading === 'error'
            ? 'Ошибка на стороне сервера'
            : 'Ничего не найдено'}
        </div>
        <Pagination />
      </main>
    </div>
  )
}

export default memo(Home)
