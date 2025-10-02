import { ILobbySlice } from "./typings";

export const selectGames = (state: ILobbySlice) => state.lobby.games;
export const selectGamesAPIError = (state: ILobbySlice) => state.lobby.gameAPIError;
export const selectIsLoadingGames = (state: ILobbySlice) =>
  state.lobby.isLoadingGames === true;

export const selectConfig = (state: ILobbySlice) => state.lobby.config;
export const selectConfigAPIError = (state: ILobbySlice) => state.lobby.configAPIError;
export const selectIsLoadingConfig = (state: ILobbySlice) =>
  state.lobby.isLoadingConfig === true;
