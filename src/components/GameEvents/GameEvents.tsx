import React from 'react'

import { useGameEvents } from "@/hooks/useGameEvents"

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
        {gameEvents.map((event, index) => (
          <li key={index} style={{ marginBottom: "0.5rem" }}>
            {event.type}- Game ID: {event.gameId}
          </li>
        ))}
      </ul>
    )}
  </div>
}
