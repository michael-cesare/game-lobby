import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from "react-redux";
import throttle from "lodash.throttle";

import type { AppDispatch } from '@/redux/createStore';
import { searchGames } from '@/features/game/gamesApi';
import { selectSearchName } from '@/features/lobby/selectors';

export const CountField = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchName = useSelector(selectSearchName);

  // Create a throttled version of the search function
  const throttledSearch = useMemo(
    () =>
      throttle((newValue: string) => {
        const count = Number(newValue);

        // validation: only continue if valid
        if (!newValue || isNaN(count) || count < 1 || count > 300) {
          return;
        }
        dispatch(searchGames(count, searchName));
      }, 500, 
      {
        leading: false, trailing: true,
      }), // 500ms throttle window (tweak as needed)
    [dispatch, searchName]
  );
  
  useEffect(() => {
    return () => throttledSearch.cancel();
  }, [throttledSearch]);

  return (
    <input
      type="number"
      id="countField"
      min="1"
      max="500"
      step="1"
      defaultValue="100"
      onBlur={(e) => throttledSearch(e.target.value)}
    />
  )
}