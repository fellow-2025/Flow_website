export interface IObjectManager {
    dispose(): void
    tick(globalFrame: number, globalTime: number, deltaTime: number, scrollDelta: number): void
}