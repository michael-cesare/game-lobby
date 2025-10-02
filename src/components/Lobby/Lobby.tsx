import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import styles from './Lobby.module.scss'

import { IGame } from '@/features/game/typings';
import { loadedGames, isLoadingGames, gamesAPIError } from '@/features/lobby/actions';
import { selectFilteredGames, selectGamesAPIError, selectIsLoadingGames } from '@/features/lobby/selectors';

import { GameLi } from './GameLi';

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
      const response = await fetch(
        'https://casino.api.pikakasino.com/v1/pika/en/games?pageSize=100'
      )
      
      if (!response.ok) {
        dispatch(gamesAPIError(`HTTP error! status: ${response.status}`));
      } else {
        const data = await response.json()
        const items: IGame[] = data.items || [];
        dispatch(loadedGames(items));
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