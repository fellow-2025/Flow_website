import * as THR from 'three'

import { ItHappyObj } from "./ObjectBase"
import { d2r } from './utility'
import { type IObjectManager } from './ObjectManger'

const v3R = new THR.Vector3(1, 0, 0)

class PropObj extends ItHappyObj {
    public setPos(px: number, pz: number, py: number = -1) {
        this.object.position.set(px, Math.max(0, py), pz)
    }

    public setRotDeg(rx: number, ry: number, rz: number) {
        this.object.rotation.set(d2r(rx), d2r(ry), d2r(rz))
    }

    constructor (scene: THR.Scene, modelName: string, spawnLen: number, targetScale: number) {
        super(scene, modelName, spawnLen, targetScale)
    }

    protected override update(globalFrame: number, globalTime: number, deltaTime: number, scrollDelta: number): void {
        const clamped = Math.max(-10, Math.min(10, scrollDelta))
        this.object.rotation.x = d2r(clamped);
    }
}

const v2 = (x: number, y: number) => new THR.Vector2(x, y)
const v3 = (x: number, y: number, z: number) => new THR.Vector3(x, y, z)

export class PropObjManager implements IObjectManager {
    private objects: PropObj[] = []
    private scene: THR.Scene
    private spawnLen: number

    constructor (scene: THR.Scene, spawnLen: number){
        this.scene = scene
        this.spawnLen = spawnLen

        this.layout(
            "house",
            .4,
            v2(2, -2),
            v3(0, -130, 0)
        )

        this.layout(
            "house",
            .6,
            v2(-4, -2),
            v3(0, -70, 0)
        )

        this.layout(
            "big_fabulous_tree",
            .3,
            v2(-1, -2),
            v3(0, 0, 0)
        )

        this.layout(
            "tree",
            .4,
            v2(1, -4),
            v3(0, 90, 0)
        )
        this.layout(
            "tree",
            .2,
            v2(-1.5, 3),
            v3(0, 50, 0)
        )

        this.layout(
            "fir",
            .2,
            v2(-.7, 4),
            v3(0, 40, 0)
        )
        this.layout(
            "fir",
            .2,
            v2(-2, 2),
            v3(0, 40, 0)
        )

        this.layout(
            "cart",
            .4,
            v2(-.2, -1.5),
            v3(0, 60, -10)
        )

        this.layout(
            "fabulous_mushroom",
             1,
            v2(-1.6, -1),
            v3(0, -110, 0)
        )

        this.layout(
            "barrel",
            .5,
            v2(-1, 1.2),
            v3(0, 0, 0)
        )

        this.layout(
            "box_0",
            .8,
            v2(-.4, 1.7),
            v3(0, 30, 0)
        )
        this.layout(
            "box_1",
            .6,
            v2(-.4, 1.7),
            v3(0, 45, 0),
            .45
        )

        this.layout(
            "holder",
            .3,
            v2(-.1, 2.3),
            v3(0, -80, 0)
        )

        this.layout(
            "pointer",
            .7,
            v2(.2, -.7),
            v3(0, -90, 0)
        )

        this.layout(
            "penguin",
            .8,
            v2(-.6, .3),
            v3(0, -120, 0)
        )

        this.layout(
            "deer",
            .6,
            v2(.8, 1.7),
            v3(0, 60, 0)
        )

        this.layout(
            "dog",
            .8,
            v2(1, -.6),
            v3(0, 120, 0)
        )

        this.layout(
            "barrel",
            .6,
            v2(3.6, 3),
            v3(0, 0, 0)
        )
        this.layout(
            "penguin",
            .5,
            v2(3.6, 3),
            v3(0, 130, 0),
            .45
        )

        this.layout(
            "tree",
            .4,
            v2(4, 0),
            v3(0, 60, 0)
        )

        this.layout(
            "fir",
            .4,
            v2(-4, 2),
            v3(0, 40, 0)
        )

        this.layout(
            "fabulous_mushroom",
            2,
            v2(2.3, 3.3),
            v3(0, 30, 0)
        )
    }

    private layout (name: string, scale: number, pos: THR.Vector2, rot: THR.Vector3, height: number = -1) {
        const obj = this.so(name, scale)

        obj.setPos(pos.x, pos.y, height)
        obj.setRotDeg(rot.x, rot.y, rot.z)

        this.add(obj)
    }

    private add = (obj: PropObj) => this.objects.push(obj)
    private so = (name: string, size: number) => new PropObj(this.scene, name, this.spawnLen, size)

    public tick (globalFrame: number, globalTime: number, deltaTime: number, scrollDelta: number) {
        this.objects.forEach(e => e.tick(globalFrame, globalTime, deltaTime, scrollDelta))
    }

    public dispose(): void {
        this.objects.forEach(e => {
            e.dispose()
        })

        this.objects = []
    }
}