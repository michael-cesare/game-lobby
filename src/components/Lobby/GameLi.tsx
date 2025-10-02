import React from 'react'
import Image from "next/image";

import styles from './GameLi.module.scss'

import { Game } from '@/features/game/typings';

interface IOwnProps {
  game: Game,
}

export const GameLi = ( props: IOwnProps ) => {
  const { game } = props;

  return (
    <li key={game.id} className={styles.gameLi}>
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
  )
}