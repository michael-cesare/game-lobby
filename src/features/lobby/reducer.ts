import { createReducer } from "@reduxjs/toolkit";

import { ILobbyState } from "./typings";
import { initialState } from "./constants";
import {
    loadedConfig,
    loadedGames,
    isLoadingConfig,
    isLoadingGames,
    configAPIError,
    gamesAPIError,
} from './actions';

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
      });
  }
);
