import { createReducer } from "@reduxjs/toolkit";

import { ILobbyState } from "./typings";
import { initialState } from "./constants";
import {
    loadedConfig,
    loadedGames,
    isLoadingConfig,
    queryGames,
    configAPIError,
    gamesAPIError,
    changeFilter,
} from './actions';
import { filterGames } from "./reducerHandlers";

export const lobby = createReducer<ILobbyState>(
  initialState,
  (builder) => {
    builder
      .addCase(isLoadingConfig, (state, { payload }) => {
        state.isLoadingConfig = payload;
        if (payload) {
            state.configAPIError = null;
        }
      })
      .addCase(configAPIError, (state, { payload }) => {
        state.configAPIError = payload;
        state.isLoadingConfig = false;
      })
      .addCase(loadedConfig, (state, { payload }) => {
        state.config = payload;
        state.isLoadingConfig = false;
      })
      .addCase(queryGames, (state, { payload }) => {
        state.isLoadingGames = true;
        state.gameAPIError = null;
        state.searchQuery = payload;
      })
      .addCase(gamesAPIError, (state, { payload }) => {
        state.gameAPIError = payload;
        state.isLoadingGames = false;
      })
      .addCase(loadedGames, (state, { payload }) => {
        state.games = payload;
        state.isLoadingGames = false;
        // TODO - send Category in games API properly as to Apply filter from BE side
        if (state.category) {
          filterGames(state, state.category);
        } else {
          state.filteredGames = payload;
        }
      })
      .addCase(changeFilter, (state, { payload }) => {
        state.category = payload;
        filterGames(state, payload);
      }); 
  }
);
