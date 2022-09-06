import React, { FC, memo } from 'react'
import ReactPaginate from 'react-paginate'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectFilter, setPage } from '../../redux/slices/filter.slice'

import styles from './Pagination.module.scss'

const Pagination: FC = () => {
  const dispatch = useAppDispatch()
  const { currentPage } = useAppSelector(selectFilter)

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
    />
  )
}

export default memo(Pagination)
