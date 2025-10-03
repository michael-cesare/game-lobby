import { IGame } from '@/features/game/typings';
import { isEmpty } from '@/utils/primitive';
import { gamesAPIError, queryGames, loadedGames } from '@/features/lobby/actions';
import type { AppDispatch } from '@/redux/createStore';

const API_BASE = 'https://casino.api.pikakasino.com/v1/pika';

/**
 * Fetch games from the API with optional pagination and search term.
 * @param pageSize - max number of games to fetch
 * @param search - text to search in game names and attributes
 * @returns items from API
 */
export async function fetchAPIGames(pageSize = 100, search = ''): Promise<IGame[]> {
  const pageSizeParam =`?pageSize=${encodeURIComponent(pageSize)}`;
  const searchParam = isEmpty(search) ? '' : `&search=${encodeURIComponent(search)}`;
  const lang = 'en';
  // TODO - once the app grows further, make fetch/axios Helper and instance with base url and headers
  // including auth token if needed to be reused across the app
  // and support cancellation of fetch on unmount of component
  // also support query params properly
  // e.g. const api = axios.create({ baseURL: API_BASE, headers: { 'Authorization
  const response = await fetch(
    `${API_BASE}/${lang}/games${pageSizeParam}${searchParam}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  // Slim game objects to IGame only
  const slimGames: IGame[] = (data.items || []).map((item: any) => ({
    id: item.id,
    meta: {
      name: item.meta?.name || "",
      title: item.meta?.title || "",
      description: item.meta?.description || "",
      category: item.meta?.category || "",
      collections: item.meta?.collections || [],
    },
    media: {
      thumbnail: {
        thumbnail: {
          src: item.media?.thumbnail?.thumbnail?.src || "",
        },
      },
    },
  }));

  return slimGames;
}

/**
 * Action creator for searching games with pagination and search term.
 * @param pageSize - max number of games to fetch
 * @param search - text to search in game names and attributes
 * @returns - thunk action
 */
export const searchGames = (pageSize: number = 100, search: string = "") =>
  async (dispatch: AppDispatch) => {
    dispatch(queryGames({ name: search, pageSize }));

    try {
      const items = await fetchAPIGames(pageSize, search);
      dispatch(loadedGames(items));
    } catch (error: any) {
      dispatch(gamesAPIError(error.message));
    }
  };
