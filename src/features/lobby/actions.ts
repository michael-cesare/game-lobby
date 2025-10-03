import { createAction } from "@reduxjs/toolkit";

import { IGame, ISearchGame } from '@/features/game/typings';
import { IItems } from "./typings";

export const loadedGames = createAction<IGame[]>("lobby/loadedGames");
export const gamesAPIError = createAction<string>("lobby/gamesAPIError");
export const queryGames = createAction<ISearchGame>("lobby/queryGames");

export const loadedConfig = createAction<IItems[]>("lobby/loadedConfig");
export const configAPIError = createAction<string>("lobby/configAPIError");
export const isLoadingConfig = createAction<boolean>("lobby/isLoadingConfig");

export const changeFilter = createAction<string>("lobby/changeFilter");
