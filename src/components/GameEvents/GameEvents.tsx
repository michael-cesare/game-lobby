import React from 'react'

import { useGameEvents } from "@/hooks/useGameEvents"
import { GameEvent } from './GameEvent'

export const GameEvents = () => {
  const gameEvents = useGameEvents()

  const ownStyles = {
    marginTop: "2rem",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px"
  }

  return <div style={ownStyles}>
    <h3>Live Game Events ({gameEvents.length})</h3>
    {gameEvents.length === 0 ? (
      <p>No events yet</p>
    ) : (
      <ul>
        {gameEvents.map((event) => <GameEvent
          key={`${event.gameId}-${event.timestamp}-${Math.random().toString(36).substring(2, 15)}`} 
          event={event}
        />)}
      </ul>
    )}
  </div>
} 
