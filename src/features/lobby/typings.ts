import { IGame } from "../game/typings"

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
   * Localized paths
   * @example
   * { "en": "/casino/most-popular", "fi": null } */
  paths: Record<string, string | null>
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
  games: IGame[];
  gameAPIError: string | null;
  /** Lobby is loading config */
  isLoadingConfig: boolean;
  config: IItems[]
  configAPIError: string | null;
}

export interface ILobbySlice {
  lobby: ILobbyState;
}
