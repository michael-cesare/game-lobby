import { createReducer, Draft } from "@reduxjs/toolkit";

import { ILobbyState } from "./typings";
import { initialState } from "./constants";
import {
    loadedConfig,
    loadedGames,
    isLoadingConfig,
    isLoadingGames,
    configAPIError,
    gamesAPIError,
    changeFilter,
} from './actions';

export const filterGames = (
  state: Draft<ILobbyState>,
  category: string | undefined,
): void => {
  if (category) {
    const filterGames = state.games.filter((game) => game.meta?.category.includes(category));
    // TODO - optimize filtered result to avoid unnecessary state updates and re-renders
    state.games = filterGames;
  }
};

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
      .addCase(isLoadingGames, (state, { payload }) => {
        state.isLoadingGames = payload;
        if (payload) {
            state.gameAPIError = null;
        }
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
        }
      })
      .addCase(changeFilter, (state, { payload }) => {
        state.category = payload;
        filterGames(state, payload);
      }); 
  }
);
