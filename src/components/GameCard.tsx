import React, { useEffect, useState } from 'react'
import Image from "next/image";

import styles from './EventFeed.module.scss'

interface Game {
  id: string
  meta: {
    name: string
  }
  media: {
    thumbnail: {
      thumbnail: {
        src: string
      }
    }
  }
}

export const GameCard = () => {
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
          {games.map((game) => (
            <li key={game.id} className={styles.eventItem}>
              <div className={styles.gameCard}>
                <Image 
                  src={game.media.thumbnail.thumbnail.src} 
                  alt={game.meta.name}
                  className={styles.gameImage}
                  width={200}
                  height={200}
                />
                <span className={styles.eventMessage}>{game.meta.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}