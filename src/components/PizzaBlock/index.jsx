import cn from 'classnames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addToCart } from '../../redux/slices/cart.slice'

const typeNames = ['тонкое', 'традиционное']
const sizeNames = [26, 30, 40]

const PizzaBlock = obj => {
  const [activeType, setActiveType] = React.useState(0)
  const [activeSize, setActiveSize] = React.useState(0)

  const dispatch = useDispatch()
  const countItem = useSelector(state => state.cart.items.find(item => item.id === obj.id))

  const onClickAdd = object => {
    const item = {
      ...object,
      type: typeNames[activeType],
      size: sizeNames[activeSize],
      count: 1
    }

    dispatch(addToCart(item))
  }

  return (
    <div className='pizza-block'>
      <img className='pizza-block__image' src={obj.imageUrl} alt='Pizza' />
      <h4 className='pizza-block__title'>{obj.title}</h4>
      <div className='pizza-block__selector'>
        <ul>
          {obj.types.map(typeId => (
            <li
              key={typeId}
              className={cn({
                active: activeType === typeId
              })}
              onClick={() => setActiveType(typeId)}>
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {obj.sizes.map((size, index) => {
            const onClickSize = () => setActiveSize(index)
            return (
              <li key={size} onClick={onClickSize} className={cn({ active: activeSize === index })}>
                {size} см.
              </li>
            )
          })}
        </ul>
      </div>
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>от {obj.price} ₽</div>
        <button type='button' onClick={() => onClickAdd(obj)} className='button button--outline button--add'>
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Добавить</span>
          {countItem && <i>{countItem?.count || 0}</i>}
        </button>
      </div>
    </div>
  )
}

export default PizzaBlock
