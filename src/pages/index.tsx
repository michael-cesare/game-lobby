import { CategoryList } from "@/components/CategoryList"
import { GameCard } from "@/components/GameCard"
import { useGameEvents } from "@/hooks/useGameEvents"

import './Home.module.scss'

export default function HomePage() {
  const gameEvents = useGameEvents()

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Casino Games Lobby</h1>     
      <CategoryList style={{ marginBottom: "2rem" }} />  
      <h2>Available Games</h2>
      <GameCard />
      
      <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
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
    </div>
  )
}