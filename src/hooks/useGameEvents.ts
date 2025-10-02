import { useEffect, useRef } from "react"
import { useSelector } from "react-redux";

import { selectFilteredGames } from "@/features/lobby/selectors";
import { useGameStore } from "@/features/game/gameStore";

/**
 * This hook connects to a mock WebSocket service to receive real-time game events.
 * It uses Zustand for state management and React-Redux to select filtered games from the Redux store.
 * When the component using this hook mounts, it sets the current filtered games in the Zustand store
 * and establishes a WebSocket connection to receive game events.
 * On unmount, it disconnects from the WebSocket to prevent memory leaks.
 * 
 * @returns An array of game events from the Zustand store.
 */
export function useGameEvents() {
    const games = useSelector(selectFilteredGames);
    const events = useGameStore((state) => state.events);
    const connectSocket = useGameStore((s) => s.connectSocket);
    const disconnectSocket = useGameStore((s) => s.disconnectSocket);
    const didConnect = useRef(false);
    useEffect(() => {
        if (games.length === 0) return;

        if (!didConnect.current) {
            connectSocket(games);
            didConnect.current = true;
        }
        return () => {
            disconnectSocket();
        };
    }, [games, connectSocket, disconnectSocket]);

    return events
}