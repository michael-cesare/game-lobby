import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

import { selectTotalGames } from '@/features/lobby/reselectors';

export const AvailableGames = () => {
  const totalGames = useSelector(selectTotalGames);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <h2>Available Games  <span>{totalGames}</span></h2>
  )
}