import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

import './Home.module.scss'

import { wrapper } from "@/redux/createStore";

import { AvailableGames } from "@/components/AvailableGames"
import { CategoryList } from "@/components/Categories"
import { Lobby } from "@/components/Lobby"
import { GameEvents } from "@/components/GameEvents"
import { SearchForm } from "@/components/SearchForm";
import { fetchAPIGames } from '@/features/game/gamesApi';
import { gamesAPIError, loadedConfig, loadedGames } from '@/features/lobby/actions';
import { fetchCategories } from '@/features/lobby/configApi';
import { selectConfigLoaded, selectGamesLoaded } from '@/features/lobby/selectors';

/**
 * A higher order component to prevent hydration errors
 */
const GamesHOC = ({ children }: PropsWithChildren ) => {
  // Get preloaded data from Redux
  const gamesLoaded = useSelector(selectGamesLoaded);
  const configLoaded = useSelector(selectConfigLoaded);
  // Render only when both games and config are loaded
  if (!gamesLoaded || !configLoaded) {
    return <p>Loading...</p>;
  }
  return <>{children}</>;
};

export const HomePage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <GamesHOC>
        <h1>Casino Games Lobby</h1>     
        <CategoryList style={{ marginBottom: "2rem" }} />  
        <AvailableGames />
        <Lobby />
        <SearchForm />
        <GameEvents />
      </GamesHOC>
    </div>
  )
}

// Preload games on server
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    // 1. Fetch categories
    try {
      const lobbyCategories = await fetchCategories();
      await store.dispatch(loadedConfig(lobbyCategories));
    } catch (error: any) {
      await store.dispatch(gamesAPIError(error.message));
    }
    // 2. Fetch games
    try {
      const games = await fetchAPIGames(100);
      await store.dispatch(loadedGames(games));
    } catch (err: any) {
      await store.dispatch(gamesAPIError(err.message));
    }

    return { props: {} };
  }
);

export default HomePage;