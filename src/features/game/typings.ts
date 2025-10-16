export type TGameEventType = "NEW_GAME" | "POPULARITY_UPDATE"

export type TGameEvent = {
    /**
     * Type of event whether it's a new game as in TRENDING or a popularity update HOT/POPULAR
     */
    type: TGameEventType
    gameId: string
    timestamp: number
}

export interface IMetaGame {
  name: string,
  title: string,
  description: string,
  category: string,
  collections: string[],
}

export interface IGame {
  id: string
  meta: IMetaGame
  media: {
    thumbnail: {
      thumbnail: {
        src: string
      }
    }
  }
}

/**
 * Search game payload
 */
export interface ISearchGame {
  name: string
  pageSize?: number
}

export interface GameState {
  games: IGame[];
  events: TGameEvent[];
  socketConnected: boolean;
  setGames: (games: IGame[]) => void;
  addEvent: (event: TGameEvent) => void;
  resetEvents: () => void;
  /**
   * Establishes a WebSocket connection to receive real-time game events.
   * If already connected or if there are no games, it does nothing.
   * On receiving a game event, it adds the event to the state using the addEvent method.
   * @returns void
   */
  connectSocket: (games: IGame[]) => void;
  /**
   *  Disconnects from the WebSocket and cleans up any listeners to prevent memory leaks.
   *  If not connected, it does nothing.
   * @returns void
   */
  disconnectSocket: () => void;
}