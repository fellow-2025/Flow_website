import * as THR from 'three'

import { ItHappyObj } from "./ObjectBase"
import { d2r } from './utility'

class PropObj extends ItHappyObj {
    public setPos(px: number, pz: number) {
        this.object.position.set(px, 0, pz)
    }

    public setRotDeg(rx: number, ry: number, rz: number) {
        this.object.rotation.set(d2r(rx), d2r(ry), d2r(rz))
    }

    constructor (scene: THR.Scene, modelName: string, spawnLen: number, targetScale: number) {
        super(scene, modelName, spawnLen, targetScale)
    }

    protected update(globalFrame: number, globalTime: number, deltaTime: number): void {
        
    }
}

export class PropObjManager {
    private objects: PropObj[] = []
    private scene: THR.Scene
    private spawnLen: number

    constructor (scene: THR.Scene, spawnLen: number){
        this.scene = scene
        this.spawnLen = spawnLen

        const houseObj = this.so("house", .4);
        houseObj.setPos(1, -2);
        houseObj.setRotDeg(0, -90, 0)
        this.objects.push(houseObj)

        this.objects.push(this.so("barrel", .4))
        this.objects.push(this.so("big_fabulous_tree", .4))
        this.objects.push(this.so("box_0", .4))
        this.objects.push(this.so("box_1", .4))
        this.objects.push(this.so("cart", .4))
        this.objects.push(this.so("fabulous_mushroom", .4))
        this.objects.push(this.so("fir", .4))
        this.objects.push(this.so("grass", .4))
        this.objects.push(this.so("holder", .4))
        this.objects.push(this.so("plate", .4))
        this.objects.push(this.so("pointer", .4))
        this.objects.push(this.so("tree", .4))
    }

    private pos (obj: PropObj, ) {
        obj.object.position.set
    }
    private so (name: string, size: number) {
        return new PropObj(this.scene, name, this.spawnLen, size)
    }

    public tick (globalFrame: number, globalTime: number, deltaTime: number) {
        this.objects.forEach(e => e.tick(globalFrame, globalTime, deltaTime))
    }
}