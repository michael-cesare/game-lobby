import React from 'react'
import { useDispatch } from "react-redux";

import { changedPageSize, gamesAPIError, isLoadingGames, loadedGames } from '@/features/lobby/actions';
import { fetchAPIGames } from '@/features/game/gamesApi';

export const CountField = () => {
  const dispatch = useDispatch();

  // TODO: implement pagination and avoid fetching if data is already present
  // TODO: implement enhenced fetch utility for reusing together with cancellation of fetch on unmount
  async function fetchGames( pageSize: number ) {
    dispatch(isLoadingGames(true));
    // TODO: uri supporting category filter and pagination properly
    try {
      const items = await fetchAPIGames( pageSize );
      dispatch(loadedGames(items));
    } catch (err: any) {
      dispatch(gamesAPIError(err.message));
    } finally {
      dispatch(isLoadingGames(false));
    }
  }

  const handleOnChange = ( newValue: string ) => {
    const count = Number(newValue);

    // validation: only continue if valid
    if (!newValue || isNaN(count) || count < 1 || count > 300) {
      return;
    }

    dispatch(changedPageSize(count));
    fetchGames(count);
  };

  return (
    <input type="number" min="1" max="100" step="1" defaultValue="20" onBlur={(e) => handleOnChange(e.target.value)} />
  )
}