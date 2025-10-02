import React from 'react'

import { TGameEvent } from '@/features/game/typings';

interface IOwnProps {
  event: TGameEvent;
}

export const GameEvent = ( props: IOwnProps ) => {
  const { event } = props;

  return <li style={{ marginBottom: "0.5rem" }}>
    {event.type}- Game ID: {event.gameId}
  </li>
}
