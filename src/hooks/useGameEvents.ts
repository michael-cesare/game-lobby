import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

import { mockSocket } from "../services/socket"
import { TGameEvent } from "@/features/game/typings"
import { selectFilteredGames } from "@/features/lobby/selectors";
import { useGameStore } from "@/features/game/gameStore";

export function useGameEvents() {
    const games = useSelector(selectFilteredGames);
    const addEvent = useGameStore((state) => state.addEvent);
    const events = useGameStore((state) => state.events);

    useEffect(() => {
        if (games.length === 0) {
            return
        }

        const handleMessage = (event: TGameEvent) => {
            addEvent(event);
        }

        mockSocket.connect(games)
        mockSocket.onMessage(handleMessage)

        return () => {
            mockSocket.removeListener(handleMessage)

            if (mockSocket['listeners'].length === 0) {
                mockSocket.disconnect()
            }
        }
    }, [games, addEvent]);

    return events
}