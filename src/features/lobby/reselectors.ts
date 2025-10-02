import { createSelector } from "@reduxjs/toolkit";

import { selectFilteredGames, selectGames } from "./selectors";

export const selectTotalGames = createSelector( [
  selectGames, selectFilteredGames,
],
( games, filteredGames ) => {
  const total = games.length || 0;
  const filtered = filteredGames.length || 0;
  return `${filtered} from ${total}`;
});