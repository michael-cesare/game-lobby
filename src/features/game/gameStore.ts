import create from "zustand";
import { TGameEvent, IGame } from "@/features/game/typings";
import { mockSocket } from "@/services/socket";

interface GameState {
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
  connectSocket: () => void;
  /**
   *  Disconnects from the WebSocket and cleans up any listeners to prevent memory leaks.
   *  If not connected, it does nothing.
   * @returns void
   */
  disconnectSocket: () => void;
}

/**
 * Zustand store for managing game state and real-time game events.
 * It includes methods to set games, add events, reset events,
 * and manage WebSocket connections for receiving game events. 
 */
export const useGameStore = create<GameState>((set, get) => ({
  games: [],
  events: [],
  socketConnected: false,
  setGames: (games) => set({ games }),
  addEvent: (event) => set((state) => {
    const updated = [event, ...state.events];
    return { events: updated.slice(0, 20) }; // ✅ limit to 20 as not to grow indefinitely
  }),
  resetEvents: () => set({ events: [] }),
  
  connectSocket: () => {
    const { socketConnected, games, addEvent } = get();
    if (socketConnected || games.length === 0) return;

    const handleMessage = (event: TGameEvent) => {
      addEvent(event);
    };

    mockSocket.connect(games);
    mockSocket.onMessage(handleMessage);

    (mockSocket as any)._zustandHandler = handleMessage;
    set({ socketConnected: true });
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
