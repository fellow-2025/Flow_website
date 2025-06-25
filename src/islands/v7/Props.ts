import { ItHappyObj } from "./ObjectBase";

import { d2r } from "./utility";

export class Props3d extends ItHappyObj{
    protected update(globalFrame: number, globalTime: number, deltaTime: number): void {
        this.object.rotateY(d2r(.1))
    }
}