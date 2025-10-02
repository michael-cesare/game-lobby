import './Home.module.scss'

import { CategoryList } from "@/components/Categories"
import { Lobby } from "@/components/Lobby"
import { GameEvents } from "@/components/GameEvents"

export default function HomePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Casino Games Lobby</h1>     
      <CategoryList style={{ marginBottom: "2rem" }} />  
      <h2>Available Games</h2>
      <Lobby />
      <GameEvents />
    </div>
  )
}