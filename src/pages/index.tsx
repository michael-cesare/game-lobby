import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

import styles from './Home.module.scss'

import { wrapper } from "@/redux/createStore";

import { fetchAPIGames } from '@/features/game/gamesApi';
import { gamesAPIError, loadedConfig, loadedGames } from '@/features/lobby/actions';
import { fetchCategories } from '@/features/lobby/configApi';
import { selectConfigLoaded } from '@/features/lobby/selectors';

import { CategoryList } from "@/components/Categories"
import { Lobby } from "@/components/Lobby"
import { GameEvents } from "@/components/GameEvents"
import { SearchForm } from "@/components/SearchForm";
import { AvailableGames } from '@/components/AvailableGames';

/**
 * A higher order component to prevent hydration errors
 */
const GamesHOC = ({ children }: PropsWithChildren ) => {
  // ! IMPORTANT - config is way to big that it causes hydration errors!
  // just check if component is mounted on client
  // Get preloaded data from Redux
  // const gamesLoaded = useSelector(selectGamesLoaded);
  const configLoaded = useSelector(selectConfigLoaded);
  if (!configLoaded) {
    return <p>Loading...</p>;
  }
  return <>{children}</>;
};

export const HomePage = () => {
  return (
    <div className={styles.homeLobby}>
      <div className={styles.sectionPad}>
        <h1>Casino Games Lobby</h1>
      </div>
      <AvailableGames />
      <div className={styles.lobbyContent}>
        <CategoryList />  
        <Lobby />
      </div>
      <div className={styles.sectionPad}>
        <SearchForm />
        <GameEvents />
      </div>
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