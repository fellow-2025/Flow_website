import * as THR from 'three'

import { ItHappyObj } from "./ObjectBase"

class Grass extends ItHappyObj {
    constructor (scene: THR.Scene, spawnLen: number, targetScale: number) {
        super(scene, 'grass', spawnLen, targetScale)
    }

    protected update(globalFrame: number, globalTime: number, deltaTime: number): void {
        
    }
}

export class GrassManager {
    private foliage: Grass[] = []

    constructor (scene: THR.Scene, N_GRASSES: number, spawnLen: number, targetScale: number, foliageArea: THR.Vector2){
        const halfAreaX = foliageArea.x / 2
        const halfAreaZ = foliageArea.y / 2 

        for (let i = 0; i < N_GRASSES; i++) {
            const grass = new Grass(scene, spawnLen, targetScale)
            
            const rndx = (Math.random() * foliageArea.x) - halfAreaX
            const rndz = (Math.random() * foliageArea.y) - halfAreaZ

            // y座標は0に固定
            grass.object.position.set(rndx, 0, rndz)

            // 生成したGrassインスタンスをfoliage配列に追加
            this.foliage.push(grass)
        }
    }

    public tick (globalFrame: number, globalTime: number, deltaTime: number) {
        this.foliage.forEach(e => e.tick(globalFrame, globalTime, deltaTime))
    }
}