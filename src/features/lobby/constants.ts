import { ILobbyState } from "./typings";

export const initialState: ILobbyState = {
    isLoadingGames: false,
    games: [],
    isLoadingConfig: false,
    config: [],
    gameAPIError: null,
    configAPIError: null
};
