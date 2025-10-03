import React, { useCallback } from 'react'
import { useDispatch } from "react-redux";

import type { AppDispatch } from '@/redux/createStore';
import { changedPageSize } from '@/features/lobby/actions';
import { searchGames } from '@/features/game/gamesApi';

export const CountField = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleOnChange = useCallback(( newValue: string ) => {
    const count = Number(newValue);

    // validation: only continue if valid
    if (!newValue || isNaN(count) || count < 1 || count > 300) {
      return;
    }

    dispatch(changedPageSize(count));
    dispatch(searchGames(count));
  }, [dispatch]);

  return (
    <input type="number" min="1" max="100" step="1" defaultValue="20" onBlur={(e) => handleOnChange(e.target.value)} />
  )
}