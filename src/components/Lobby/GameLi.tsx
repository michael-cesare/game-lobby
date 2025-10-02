import React from 'react'
import Image from "next/image";

import styles from './GameLi.module.scss'

import { IGame } from '@/features/game/typings';

interface IOwnProps {
  game: IGame,
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
        <span>{game.meta.category}</span>
      </div>
    </li>
  )
}