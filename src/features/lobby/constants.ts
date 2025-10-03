import { ILobbyState } from "./typings";

export const initialState: ILobbyState = {
    isLoadingGames: false,
    games: [],
    filteredGames: [],
    isLoadingConfig: false,
    config: [],
    gameAPIError: null,
    configAPIError: null,
    category: null,
    searchQuery: { name: '', pageSize: 100 },
};
