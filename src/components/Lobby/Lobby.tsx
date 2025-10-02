import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import styles from './Lobby.module.scss'

import { loadedGames, isLoadingGames, gamesAPIError } from '@/features/lobby/actions';
import { selectFilteredGames, selectGamesAPIError, selectIsLoadingGames } from '@/features/lobby/selectors';

import { GameLi } from './GameLi';
import { fetchAPIGames } from '@/features/game/gamesApi';

export const Lobby = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectFilteredGames);
  const error = useSelector(selectGamesAPIError);
  const loading = useSelector(selectIsLoadingGames);
  
  useEffect(() => {
    // TODO: implement pagination and avoid fetching if data is already present
    // TODO: implement enhenced fetch utility for reusing together with cancellation of fetch on unmount
    async function fetchGames() {
      dispatch(isLoadingGames(true));
      // TODO: uri supporting category filter and pagination properly
      try {
        const items = await fetchAPIGames();
        dispatch(loadedGames(items));
      } catch (err: any) {
        dispatch(gamesAPIError(err.message));
      } finally {
        dispatch(isLoadingGames(false));
      }
    }
    fetchGames()
  }, [])

  return (
    <div className={styles.eventFeed}>
      <h3>Game Cards</h3>
      {loading ? (
        <p>Loading games...</p>
      ) : error ? (
        <p>Error loading games: {error}</p>
      ) : games.length === 0 ? (
        <p>No games available</p>
      ) : (
        <ul className={styles.eventList}>
          {games.map((game) => <GameLi
            game={game}
            key={game.id}
          /> )}
        </ul>
      )}
    </div>
  )
}