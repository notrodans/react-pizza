import cn from 'classnames'
import React, { FC, memo } from 'react'

const categories = ['Все', 'Мясные', 'Вегетерианская', 'Гриль', 'Острые', 'Закрытые']

interface ICategoriesProps {
  categoryId: number
  onClickCategory: (index: number, category: string) => void
}

const Categories: FC<ICategoriesProps> = ({ categoryId, onClickCategory }) => (
  <div className='categories'>
    <ul>
      {categories.map((category, index) => (
        <button
          type='button'
          key={category}
          className={cn({
            active: categoryId + 1 === index + 1
          })}
          onClick={() => onClickCategory(index, category)}>
          {category}
        </button>
      ))}
    </ul>
  </div>
)

export default memo(Categories)
