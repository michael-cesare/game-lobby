import { IGame, ISearchGame } from "../game/typings"

/**
 * Lobby items from configuration API
 */
export interface IItems {
  id: string
  image: {
    alt: string
  }
  /**
   * Localized names
   * @example
   * { "en": "Popular", "fi": "Pelatuimmat" } */
  name: Record<string, string>
  /**
   * Type of filter, e.g. "categoryFilter", "liveCategoryRows"
   */
  type: string
  /**
   * Category filter, e.g. "top", "new", "slots", "table", "jackpot", "live"
   */
  categoryFilter?: string
}

export interface IConfigLobby {
  items: IItems[]
}

export interface ILobbyState {
  /** Lobby is loading game list */
  isLoadingGames: boolean;
  /** List of games loaded in lobby */
  games: IGame[];
  /** List of games after applying filter on FE side */
  filteredGames: IGame[];
  gameAPIError: string | null;
  /** Lobby is loading config */
  isLoadingConfig: boolean;
  config: IItems[]
  configAPIError: string | null;
  category: string | null;
  searchQuery: ISearchGame | null;
}

export interface ILobbySlice {
  lobby: ILobbyState;
}
