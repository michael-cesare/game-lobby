import React, { useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from '@/redux/createStore';
import { searchGames } from '@/features/game/gamesApi';
import { selectPageSize } from '@/features/lobby/selectors';

export const GameNameField = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pageSize = useSelector(selectPageSize);

  const handleOnChange = useCallback(( newValue: string ) => {
    // dispatch(changedGameName(newValue));
    dispatch(searchGames(pageSize, newValue));
  }, [pageSize, dispatch]);

  return (
  <input type="text" defaultValue="" onBlur={(e) => handleOnChange(e.target.value)} />
  )
}