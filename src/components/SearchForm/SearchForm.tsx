import React from 'react'

import styles from './SearchForm.module.scss'

import { TotalSize } from './TotalSize';
import { CountField } from './CountField';
import { GameNameField } from './GameNameField';

export const SearchForm = () => {
  return (
    <>
      <h2>Search Results: <TotalSize/></h2>
      <div className={styles.searchForm}>
        <div>Game: <GameNameField/></div>
        <div>Page Size: <CountField/></div>
      </div>
    </>
  )
}