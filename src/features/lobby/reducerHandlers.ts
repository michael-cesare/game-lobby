import { Draft } from "@reduxjs/toolkit";

import { ILobbyState } from "./typings";

export const filterGames = (
  state: Draft<ILobbyState>,
  category: string | undefined,
): void => {
  if (!category) return;
  // Case: "allGames" means no filter
  // Assume that all games is equal to no filter since this is a FE only filter

  // Case: "allGames" means no filter
  const nextFilteredGames =
    category === "allGames"
      ? state.games
      : state.games.filter((game) => game.meta?.category.includes(category));

  const nextFilteredGameIds = nextFilteredGames.map((g) => g.id);

  // 🧠 Optimization: Only update if IDs differ
  const sameLength = nextFilteredGameIds.length === state.filteredGameIds.length;
  const isSame =
    sameLength &&
    state.filteredGameIds.every((id, idx) => id === nextFilteredGameIds[idx]);

  if (!isSame) {
    state.filteredGames = nextFilteredGames;
    state.filteredGameIds = nextFilteredGameIds;
  }

  // Optional: update the selected category in state
  state.category = category;
};
