import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import styles from './Lobby.module.scss'

import { AppDispatch } from '@/redux/createStore';
import { searchGames } from '@/features/game/gamesApi';
import { selectFilteredGameIds, selectGamesAPIError, selectIsLoadingGames } from '@/features/lobby/selectors';

import { GameLi } from './GameLi';

export const Lobby = () => {
  const games = useSelector(selectFilteredGameIds);
  const error = useSelector(selectGamesAPIError);
  const loading = useSelector(selectIsLoadingGames);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // SSR Hydration issue workaround - fetch config on client as data is too big to handle hydration
    if (games.length === 0) {
      dispatch(searchGames());
    }
  }, [games, dispatch]);

  return (
    <div className={styles.lobby}>
      {loading ? (
        <p>Loading games...</p>
      ) : error ? (
        <p>Error loading games: {error}</p>
      ) : games.length === 0 ? (
        <p>No games available</p>
      ) : (
        <ul className={styles.lobby_games}>
          {games.map((game) => <GameLi
            id={game}
            key={game}
          /> )}
        </ul>
      )}
    </div>
  )
}