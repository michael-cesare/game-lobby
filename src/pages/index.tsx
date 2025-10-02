import { Provider } from "react-redux";

import './Home.module.scss'

import { store } from "@/redux/createStore";

import { CategoryList } from "@/components/Categories"
import { Lobby } from "@/components/Lobby"
import { GameEvents } from "@/components/GameEvents"

export default function HomePage() {
  return (
    <Provider store={store}>
      <div style={{ padding: "2rem" }}>
        <h1>Casino Games Lobby</h1>     
        <CategoryList style={{ marginBottom: "2rem" }} />  
        <h2>Available Games</h2>
        <Lobby />
        <GameEvents />
      </div>
    </Provider>
  )
}