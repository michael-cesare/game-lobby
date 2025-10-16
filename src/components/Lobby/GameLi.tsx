import React from 'react'
import { useSelector } from 'react-redux';
import Image from "next/image";

import styles from './GameLi.module.scss'

import { selectGame } from '@/features/lobby/reselectors';

interface IOwnProps {
  id: string; // game ID,
}

export const GameLi = ( props: IOwnProps ) => {
  const { id } = props;

  const game = useSelector(selectGame(id));
  if (!game) {
    return null;
  }

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