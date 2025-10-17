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

  const { media, meta, provider } = game;

  return (
    <li key={id} className={styles.gameLi}>
      <div className={styles.gameCard}>
        <Image 
          src={media.thumbnail.thumbnail.src} 
          alt={meta.name}
          className={styles.gameImage}
          width={440}
          height={440}
        />
        <div className={styles.gameInfo}>
          <div>
            <span className={styles.name}>{meta.name}</span>
          </div>
          <div>
            <span>{`${provider} - ${game.meta.category}`}</span>
          </div>
        </div>
      </div>
    </li>
  )
}