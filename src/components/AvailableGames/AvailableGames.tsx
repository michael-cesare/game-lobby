import React from 'react'
import { useSelector, shallowEqual } from "react-redux";

import styles from './AvailableGames.module.scss'

import { selectTotalGames } from '@/features/lobby/reselectors';
import { selectCategory } from '@/features/lobby/selectors';

export const AvailableGames = () => {
  const totalGames = useSelector(selectTotalGames);
  const selectedCategory = useSelector(selectCategory, shallowEqual);
  const categoryText = selectedCategory && selectedCategory !== 'allGames'
    ? <span>{`Games in "${selectedCategory}": `}</span> : 'Games: ';

  return (
    <div className={styles.availableGames}>
      <h2>{categoryText}<span>{totalGames}</span></h2>
    </div>
  )
}