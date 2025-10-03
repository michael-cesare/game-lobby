export type TGameEventType = "NEW_GAME" | "POPULARITY_UPDATE"

export type TGameEvent = {
    /**
     * Type of event whether it's a new game as in TRENDING or a popularity update HOT/POPULAR
     */
    type: TGameEventType
    gameId: string
    timestamp: number
}

export interface IGame {
  id: string
  meta: {
    name: string,
    title: string,
    description: string,
    slug: string,
    category: string,
    collections: string[],
    isNew: boolean,
    isLiveGame: boolean,
  }
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