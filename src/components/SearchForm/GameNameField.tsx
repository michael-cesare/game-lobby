import React, { useEffect, useMemo  } from 'react'
import { useDispatch, useSelector } from "react-redux";
import throttle from "lodash.throttle";

import type { AppDispatch } from '@/redux/createStore';
import { searchGames } from '@/features/game/gamesApi';
import { selectPageSize } from '@/features/lobby/selectors';

export const GameNameField = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pageSize = useSelector(selectPageSize);

  // Create a throttled version of the search function
  const throttledSearch = useMemo(
    () =>
      throttle((value: string) => {
        dispatch(searchGames(pageSize, value));
      }, 500, 
      {
        leading: false, trailing: true,
      }), // 500ms throttle window (tweak as needed)
    [dispatch, pageSize]
  );

  useEffect(() => {
    return () => throttledSearch.cancel();
  }, [throttledSearch]);

  return (
   <input
      type="text"
      defaultValue=""
      placeholder="Search games..."
      onChange={(e) => throttledSearch(e.target.value)}
    />
  )
}