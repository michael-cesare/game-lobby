import React from 'react'

import styles from './GameEvents.module.scss'

import { TGameEvent } from '@/features/game/typings';

interface IOwnProps {
  event: TGameEvent;
}

export const GameEvent = ( props: IOwnProps ) => {
  const { event } = props;

  return <li className={styles.event}>
    {event.type}- Game ID: {event.gameId}
  </li>
}
