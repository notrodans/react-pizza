import React from 'react'

const useOutside = (inititalIsVisible: boolean) => {
  const [isShow, setIsShow] = React.useState<boolean>(inititalIsVisible)
  const ref = React.useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: any) => {
    if (ref.current && !event.target.closest('.sort')) setIsShow(false)
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [])

  return { ref, isShow, setIsShow }
}

export default useOutside
