import { NEW_GAME, POPULARITY_UPDATE } from "@/features/game/constants"
import { TGameEvent } from "@/features/game/typings"

/**
 * A mock WebSocket that simulates receiving game events every 15 seconds.
 * In a real application, this would connect to a real WebSocket server using Socket.io.
 */
class MockSocket {
    private interval?: NodeJS.Timeout
    private listeners: ((event: TGameEvent) => void)[] = []
    private isConnected = false

    connect(games: { id: string }[]) {
        if (!games.length || this.isConnected) {
            return
        }

        this.isConnected = true
        this.interval = setInterval(() => {
            const game = games[Math.floor(Math.random() * games.length)]
            const type: TGameEvent["type"] = Math.random() > 0.5 ? NEW_GAME : POPULARITY_UPDATE

            const event: TGameEvent = { type, gameId: game.id, timestamp: Date.now() }
            this.listeners.forEach(cb => cb(event))
        }, 15000)
    }

    onMessage(callback: (event: TGameEvent) => void) {
        this.listeners.push(callback)
    }

    removeListener(callback: (event: TGameEvent) => void) {
        this.listeners = this.listeners.filter(cb => cb !== callback)
    }

    disconnect() {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = undefined
        }
        this.listeners = []
        this.isConnected = false
    }
}

export const mockSocket = new MockSocket()
