import React from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'

import { setPage } from '../../redux/slices/filter.slice'

import styles from './Pagination.module.scss'

const Pagination = () => {
  const dispatch = useDispatch()
  const { currentPage } = useSelector(state => state.filter)

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      previousLabel='<'
      onPageChange={e => dispatch(setPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  )
}

export default React.memo(Pagination)
