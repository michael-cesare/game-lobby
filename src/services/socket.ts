import { NEW_GAME, POPULARITY_UPDATE } from "@/features/game/constants"
import { IGame, TGameEvent } from "@/features/game/typings"

/**
 * A mock WebSocket that simulates receiving game events every 15 seconds.
 * In a real application, this would connect to a real WebSocket server using Socket.io.
 */
class MockSocket {
    private interval?: NodeJS.Timeout
    private listeners: ((event: TGameEvent) => void)[] = []
    /** Asserts that interval is set once */
    private isConnected = false
    games: { id: string} [] | undefined

    connect(games: { id: string }[]) {
        if (!games.length || this.isConnected) {
            return
        }

        this.games = games

        this.isConnected = true
        if ( this.games.length > 0) {
            // Emit 5 events immediately on connection as if there was some backlog
            for (let i = 0; i < 5; i++) {
                const game = this.games[Math.floor(Math.random() * this.games.length)]
                const type: TGameEvent["type"] = Math.random() > 0.5 ? NEW_GAME : POPULARITY_UPDATE
                const event: TGameEvent = { type, gameId: game.id, timestamp: Date.now() }
                this.listeners.forEach(cb => cb(event))
            }
        };
        this.startPulling()
    }

    updateGames(games: IGame[]) {
        this.games = games
    }

    private startPulling() {
        this.interval = setInterval(() => {
            if ( this.games === undefined || this.games.length === 0) return;
            const game = this.games[Math.floor(Math.random() * this.games.length)]
            const type: TGameEvent["type"] = Math.random() > 0.5 ? NEW_GAME : POPULARITY_UPDATE

            const event: TGameEvent = { type, gameId: game.id, timestamp: Date.now() }
            this.listeners.forEach(cb => cb(event))
        }, 10000)
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
