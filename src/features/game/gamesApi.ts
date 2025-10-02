import { IGame } from '@/features/game/typings';

export async function fetchAPIGames(pageSize = 100): Promise<IGame[]> {
  const response = await fetch(
    `https://casino.api.pikakasino.com/v1/pika/en/games?pageSize=${pageSize}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.items || [];
}
