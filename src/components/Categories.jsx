import cn from 'classnames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { select, selectCategory } from '../redux/slices/filter.slice'

const Categories = () => {
  const categories = React.useMemo(() => ['Все', 'Мясные', 'Вегетерианская', 'Гриль', 'Острые', 'Закрытые'], [])
  const categoryId = useSelector(state => state.filter.categoryId)

  const dispatch = useDispatch()

  const onClickCategory = (index, category) => {
    dispatch(select(index))
    dispatch(selectCategory(category))
  }

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={cn({
              active: categoryId + 1 === index + 1
            })}
            onClick={() => onClickCategory(index, category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default React.memo(Categories)
