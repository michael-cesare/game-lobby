import './Home.module.scss'

import { wrapper } from "@/redux/createStore";

import { AvailableGames } from "@/components/AvailableGames"
import { CategoryList } from "@/components/Categories"
import { Lobby } from "@/components/Lobby"
import { GameEvents } from "@/components/GameEvents"
import { SearchForm } from "@/components/SearchForm";
import { fetchAPIGames } from '@/features/game/gamesApi';
import { gamesAPIError, loadedGames } from '@/features/lobby/actions';

export const HomePage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Casino Games Lobby</h1>     
      <CategoryList style={{ marginBottom: "2rem" }} />  
      <AvailableGames />
      <Lobby />
      <SearchForm />
      <GameEvents />
    </div>
  )
}

// Preload games on server
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const games = await fetchAPIGames(100);
      store.dispatch(loadedGames(games));
    } catch (err: any) {
      store.dispatch(gamesAPIError(err.message));
    }

    return { props: {} };
  }
);

export default HomePage;