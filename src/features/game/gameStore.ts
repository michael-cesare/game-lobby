import create from "zustand";
import { TGameEvent, IGame } from "@/features/game/typings";

interface GameState {
  games: IGame[];
  events: TGameEvent[];
  setGames: (games: IGame[]) => void;
  addEvent: (event: TGameEvent) => void;
  resetEvents: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  games: [],
  events: [],
  setGames: (games) => set({ games }),
  addEvent: (event) => set((state) => ({ events: [event, ...state.events] })),
  resetEvents: () => set({ events: [] }),
}));
