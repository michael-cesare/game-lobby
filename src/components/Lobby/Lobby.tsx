import React, { useEffect, useState } from 'react'

import styles from './Lobby.module.scss'

import { Game } from '@/features/game/typings';
import { GameLi } from './GameLi';

export const Lobby = () => {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchGames() {
      setLoading(true)
      const res = await fetch(
        'https://casino.api.pikakasino.com/v1/pika/en/games?pageSize=100'
      )
      const data = await res.json()
      setGames(data?.items || [])
      setLoading(false)
    }
    fetchGames()
  }, [])

  return (
    <div className={styles.eventFeed}>
      <h3>Game Cards</h3>
      {loading ? (
        <p>Loading games...</p>
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