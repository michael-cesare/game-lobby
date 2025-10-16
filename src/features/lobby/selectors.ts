import { ILobbySlice } from "./typings";

export const selectGames = (state: ILobbySlice) => state.lobby.games;
export const selectGamesLoaded = (state: ILobbySlice) => state.lobby.games.length > 0;
export const selectFilteredGames = (state: ILobbySlice) => state.lobby.filteredGames;
export const selectFilteredGameIds = (state: ILobbySlice) => state.lobby.filteredGameIds;
export const selectGamesAPIError = (state: ILobbySlice) => state.lobby.gameAPIError;
export const selectIsLoadingGames = (state: ILobbySlice) =>
  state.lobby.isLoadingGames === true;

export const selectConfig = (state: ILobbySlice) => state.lobby.config;
export const selectConfigLoaded = (state: ILobbySlice) => state.lobby.config.length > 0;
export const selectConfigAPIError = (state: ILobbySlice) => state.lobby.configAPIError;
export const selectIsLoadingConfig = (state: ILobbySlice) =>
  state.lobby.isLoadingConfig === true;

export const selectPageSize = (state: ILobbySlice) => state.lobby.searchQuery?.pageSize || 100;
export const selectSearchName = (state: ILobbySlice) => state.lobby.searchQuery?.name || '';

export const selectCategory = (state: ILobbySlice) => state.lobby.category;