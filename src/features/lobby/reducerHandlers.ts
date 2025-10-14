import { Draft } from "@reduxjs/toolkit";

import { ILobbyState } from "./typings";

export const filterGames = (
  state: Draft<ILobbyState>,
  category: string | undefined,
): void => {
  if (category) {
    // Assume that all games is equal to no filter since this is a FE only filter
    if (category === 'allGames') {
      state.filteredGames = state.games;
      return;
    }
    const filterGames = state.games.filter((game) => game.meta?.category.includes(category));
    // TODO - optimize filtered result to avoid unnecessary state updates and re-renders
    // TODO - store ids of games for the selected cateogy and use memoized selector to get filtered games from state.games
    state.filteredGames = filterGames;
  }
};
