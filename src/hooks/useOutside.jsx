import React from 'react'

const useOutside = inititalIsVisible => {
  const [isShow, setIsShow] = React.useState(inititalIsVisible)
  const ref = React.useRef(null)

  const handleClickOutside = event => {
    if (ref.current && !event.target.closest('.sort')) setIsShow(false)
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [])

  return { ref, isShow, setIsShow }
}

export default useOutside
