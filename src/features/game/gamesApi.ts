import { IGame } from '@/features/game/typings';
import { isEmpty } from '@/utils/primitive';

export async function fetchAPIGames(pageSize = 100, search = ''): Promise<IGame[]> {
  const searchParam = isEmpty(search) ? '' : `&search=${search}`;
  const response = await fetch(
    `https://casino.api.pikakasino.com/v1/pika/en/games?pageSize=${pageSize}${searchParam}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.items || [];
}
