import { createAction } from "@reduxjs/toolkit";

import { IGame } from '@/features/game/typings';
import { IItems } from "./typings";

export const loadedGames = createAction<IGame[]>("lobby/loadedGames");
export const gamesAPIError = createAction<string>("lobby/gamesAPIError");
export const isLoadingGames = createAction<boolean>("lobby/isLoadingGames");

export const loadedConfig = createAction<IItems[]>("lobby/loadedConfig");
export const configAPIError = createAction<string>("lobby/configAPIError");
export const isLoadingConfig = createAction<boolean>("lobby/isLoadingConfig");

export const changeFilter = createAction<string>("lobby/changeFilter");

export const changedPageSize = createAction<number>("lobby/changedPageSize");
