import { useEffect, useState } from "react"
import { mockSocket } from "../services/socket"
import { TGameEvent } from "@/features/game/typings"


// The games are hardcoded for now, but should be fetched from the API
const mockGames = [
    { id: "1", gameText: "Game 1" },
    { id: "2", gameText: "Game 2" },
    { id: "3", gameText: "Game 3" },
]

export function useGameEvents() {
    const [events, setEvents] = useState<TGameEvent[]>([])

    useEffect(() => {
        if (mockGames.length === 0) {
            return
        }

        const handleMessage = (event: TGameEvent) => {
            setEvents((prev) => [event, ...prev])
        }

        mockSocket.connect(mockGames)
        mockSocket.onMessage(handleMessage)

        return () => {
            mockSocket.removeListener(handleMessage)

            if (mockSocket['listeners'].length === 0) {
                mockSocket.disconnect()
            }
        }
    }, [])

    return events
}