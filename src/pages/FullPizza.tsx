import axios from 'axios'
import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

interface IPizza {
  imageUrl: string
  title: string
  price: number
}

const FullPizza: FC = () => {
  const { id } = useParams()
  const [pizza, setPizza] = React.useState<IPizza>({
    imageUrl: '',
    title: '',
    price: 0
  } as IPizza)

  const { imageUrl, title, price } = pizza

  React.useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axios.get(`https://62ee9ce0f5521ecad578b7b7.mockapi.io/items/${id}`)
        setPizza(data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [id])

  return (
    <div className='container'>
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <h4>{price > 0 ? price : 'Загрузка...'}</h4>
    </div>
  )
}

export default FullPizza
