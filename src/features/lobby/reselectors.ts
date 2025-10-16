import { createSelector } from "@reduxjs/toolkit";

import { selectFilteredGames, selectGames } from "./selectors";

export const selectResultCount = createSelector(
  [selectGames],
  ( games ) => games.length || 0
);

export const selectTotalGames = createSelector(
  [ selectGames, selectFilteredGames],
  ( games, filteredGames ) => {
    const total = games.length || 0;
    const filtered = filteredGames.length || 0;
    return `${filtered} from ${total}`;
  }
);

// Addvanced query selector - gets a game by ID
export const selectGame = ( gameId: string ) => createSelector(
  [selectGames],
  ( games ) => games.find( g => g.id === gameId )
);
