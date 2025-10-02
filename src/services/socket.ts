export type GameEvent = {
    type: "NEW_GAME" | "POPULARITY_UPDATE"
    gameId: string
    timestamp: number
}

class MockSocket {
    private interval?: NodeJS.Timeout
    private listeners: ((event: GameEvent) => void)[] = []
    private isConnected = false

    connect(games: { id: string }[]) {
        if (!games.length || this.isConnected) {
            return
        }

        this.isConnected = true
        this.interval = setInterval(() => {
            const game = games[Math.floor(Math.random() * games.length)]
            const type: GameEvent["type"] = Math.random() > 0.5 ? "NEW_GAME" : "POPULARITY_UPDATE"

            const event: GameEvent = { type, gameId: game.id, timestamp: Date.now() }
            this.listeners.forEach(cb => cb(event))
        }, 15000)
    }

    onMessage(callback: (event: GameEvent) => void) {
        this.listeners.push(callback)
    }

    removeListener(callback: (event: GameEvent) => void) {
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
