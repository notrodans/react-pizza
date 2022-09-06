import React, { FC } from 'react'

import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: FC = () => (
  <div className='container'>
    <div className='content'>
      <div className={styles.root}>
        <h2>
          <span>😕</span>
          <br />
          ничего не найдено
        </h2>
        <p className={styles.description}>К сожалению данная страница не найдена</p>
      </div>
    </div>
  </div>
)

export default NotFoundBlock
