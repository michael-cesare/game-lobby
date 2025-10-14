import { gamesAPIError, isLoadingConfig, loadedConfig } from '@/features/lobby/actions';
import type { AppDispatch } from '@/redux/createStore';
import { IItems } from './typings';
import { API_BASE } from './constants';

export async function fetchCategories(): Promise<IItems[]> {
  const response = await fetch(
    `${API_BASE}/config`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const rawItems: IItems[] = data.menu?.lobby?.items || [];
  
  // slim version, mapped to IItems only as to reduce hydration on client side
  // we don't need all the data from the config for categories
  const lobbyCategories: IItems[] = rawItems.map((item: any) => ({
    id: item.id,
    image: {
      alt: item.image?.alt || "", // only alt, not the whole image object
    },
    name: item.name || {},
    type: item.type || "",
    categoryFilter: item.categoryFilter || '',
  }));
  return lobbyCategories;
}

export const getConfig = () =>
  async (dispatch: AppDispatch) => {
    dispatch(isLoadingConfig(true));

    try {
      const lobbyCategories = await fetchCategories();
      dispatch(loadedConfig(lobbyCategories));
    } catch (error: any) {
      dispatch(gamesAPIError(error.message));
    }
  };
