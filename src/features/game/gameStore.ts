import create from "zustand";

import { TGameEvent, GameState } from "@/features/game/typings";
import { mockSocket } from "@/services/socket";

/**
 * Zustand store for managing game state and real-time game events.
 * It includes methods to set games, add events, reset events,
 * and manage WebSocket connections for receiving game events. 
 */
export const useGameStore = create<GameState>((set, get) => ({
  games: [],
  events: [],
  socketConnected: false,
  setGames: (games) => set(() => {
    mockSocket.updateGames(games);
    return { games };
  }),
  addEvent: (event) => set((state) => {
    const updated = [event, ...state.events];
    return { events: updated.slice(0, 20) }; // ✅ limit to 20 as not to grow indefinitely
  }),
  resetEvents: () => set({ events: [] }),
  
  connectSocket: (games) => {
    const { socketConnected, addEvent } = get();
    if (socketConnected || games.length === 0) return;

    const handleMessage = (event: TGameEvent) => {
      addEvent(event);
    };

    mockSocket.onMessage(handleMessage);
    mockSocket.connect(games);

    (mockSocket as any)._zustandHandler = handleMessage;
    set({ socketConnected: true, games });
  },

  disconnectSocket: () => {
    const handler = (mockSocket as any)._zustandHandler;
    if (handler) {
      mockSocket.removeListener(handler);
      delete (mockSocket as any)._zustandHandler;
    }
    mockSocket.disconnect();
    set({ socketConnected: false });
  },
}));
