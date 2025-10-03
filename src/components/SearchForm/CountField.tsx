import React, { useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from '@/redux/createStore';
import { searchGames } from '@/features/game/gamesApi';
import { selectSearchName } from '@/features/lobby/selectors';

export const CountField = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchName = useSelector(selectSearchName);

  const handleOnChange = useCallback(( newValue: string ) => {
    const count = Number(newValue);

    // validation: only continue if valid
    if (!newValue || isNaN(count) || count < 1 || count > 300) {
      return;
    }
    dispatch(searchGames(count, searchName));
  }, [dispatch, searchName]);

  return (
    <input type="number" min="1" max="500" step="1" defaultValue="100" onBlur={(e) => handleOnChange(e.target.value)} />
  )
}