import { gamesAPIError, isLoadingConfig, loadedConfig } from '@/features/lobby/actions';
import type { AppDispatch } from '@/redux/createStore';
import { IItems } from './typings';

const API_BASE = 'https://casino.api.pikakasino.com/v1/pika';

export async function fetchCategories(): Promise<IItems[]> {
  const response = await fetch(
    `${API_BASE}/config`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const lobbyCategories: IItems[] = data.menu?.lobby?.items || [];
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
