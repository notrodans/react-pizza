import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header.jsx'
import SearchContext from './context/Context.jsx'
import Cart from './pages/Cart.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import './scss/app.scss'

const App = () => {
  const [searchValue, setSearchValue] = React.useState('')
  return (
    <div className='wrapper'>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </SearchContext.Provider>
    </div>
  )
}

export default App
