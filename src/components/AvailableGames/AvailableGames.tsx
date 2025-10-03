import React from 'react'
import { useSelector } from "react-redux";

import { selectTotalGames } from '@/features/lobby/reselectors';

export const AvailableGames = () => {
  const totalGames = useSelector(selectTotalGames);

  return (
    <h2>Available Games  <span>{totalGames}</span></h2>
  )
}