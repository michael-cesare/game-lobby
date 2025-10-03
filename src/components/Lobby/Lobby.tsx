import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import styles from './Lobby.module.scss'

import type { AppDispatch } from '@/redux/createStore';

import { selectFilteredGames, selectGamesAPIError, selectIsLoadingGames } from '@/features/lobby/selectors';
import { searchGames } from '@/features/game/gamesApi';
import { GameLi } from './GameLi';

export const Lobby = () => {
  const dispatch = useDispatch<AppDispatch>();
  const games = useSelector(selectFilteredGames);
  const error = useSelector(selectGamesAPIError);
  const loading = useSelector(selectIsLoadingGames);
  // initial load of games
  useEffect(() => {
    dispatch(searchGames());
  }, [dispatch]);

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