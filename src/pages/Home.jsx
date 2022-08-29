import axios from 'axios'
import qs from 'query-string'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Categories from '../components/Categories.jsx'
import Pagination from '../components/Pagination/index.jsx'
import Skeleton from '../components/PizzaBlock/Skeleton.jsx'
import PizzaBlock from '../components/PizzaBlock/index.jsx'
import Sort, { sortOptions } from '../components/Sort.jsx'
import SearchContext from '../context/Context.jsx'
import useDebounce from '../hooks/useDebounce.jsx'
import { setFilters } from '../redux/slices/filter.slice'

const Home = () => {
  const { searchValue } = React.useContext(SearchContext)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const debounceValue = useDebounce(searchValue, 500)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  // Redux
  const { categoryId, currentCategory, sort: sortType, currentPage } = useSelector(state => state.filter)

  // Variables
  const skeleton = React.useMemo(() => [...new Array(6)].map((_, index) => <Skeleton key={index} />), [])
  const pizzas = React.useMemo(() => items.map(obj => <PizzaBlock key={obj.id} {...obj} />), [items])

  // Функция фетчинга пицц
  const fetchPizzas = React.useCallback(() => {
    const category = categoryId ? `&category=${categoryId}` : ''
    const sort = sortType ? `&sortBy=${sortType.sortProperty}` : ''
    const search = debounceValue ? `&search=${debounceValue}` : ''

    setIsLoading(true)
    axios
      .get(
        `https://62ee9ce0f5521ecad578b7b7.mockapi.io/items?page=${currentPage}&limit=4${category}${sort}&order=desc${search}`
      )
      .then(res => {
        setItems(res.data)
        setIsLoading(false)
      })
  }, [currentPage, categoryId, debounceValue, sortType])

  // Если был первый рендер, то проверяем URL-parameters и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortOptions.find(obj => obj.sortProperty === params.sortProperty)
      dispatch(
        setFilters({
          ...params,
          sort
        })
      )

      isSearch.current = true
    }
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas()
    }

    isSearch.current = false
  }, [fetchPizzas])

  // Если isMounted === true, тогда вшиваем URL-parameters в адресс
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
          <Categories />
          <Sort />
        </div>
        <h2 className='content__title'>{currentCategory}</h2>
        <div className='content__items'>
          {/* eslint-disable-next-line */}
          {isLoading ? skeleton : pizzas.length && pizzas ? pizzas : 'Ничего не найдено'}
        </div>
        <Pagination />
      </main>
    </div>
  )
}

export default React.memo(Home)
