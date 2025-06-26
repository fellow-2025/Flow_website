import * as THREE from 'three'
import { DRACOLoader, GLTFLoader } from 'three/examples/jsm/Addons.js'

import { lerpF, easeOutQuint } from './utility'

export abstract class ItHappyObj {

    public object: THREE.Group
    private isMeshReady = false

    private localTime: number

    private spawnLengthSecs: number
    private targetScale: number
    private scale: number

    private scene: THREE.Scene

    constructor(scene: THREE.Scene, modelName: string, spawnLen: number, targetScale: number) {
        this.spawnLengthSecs = spawnLen
        this.targetScale = targetScale
        this.scale = 0

        this.localTime = 0

        this.object = new THREE.Group()

        this.scene = scene

        this.loadModel(modelName, scene)
    }

    public tick(globalFrame: number, globalTime: number, deltaTime: number, scrollDelta: number) {
        if (! this.isMeshReady) return

        this.localTime += deltaTime

        if (this.localTime < this.spawnLengthSecs){
            this.spawnAnim(globalTime, deltaTime)
        } else {
            this.update(globalFrame, globalTime, deltaTime, scrollDelta)
        }
    }

    private spawnAnim(globalTime: number, deltaTime: number): void{
        const progress = this.localTime / this.spawnLengthSecs
        this.scale = lerpF(0, this.targetScale, easeOutQuint(progress))

        if (! this.object) return
        this.object.scale.set(this.scale, this.scale, this.scale)
    }

    protected abstract update(globalFrame: number, globalTime: number, deltaTime: number, scrollDelta: number): void

    private loadModel(modelName: string, scene: THREE.Scene) {
        const loader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
        loader.setDRACOLoader(dracoLoader)

        loader.load(`/models/v7/${modelName}.glb`, (gltf) => {
            const glScene = gltf.scene

            const meshes: THREE.Mesh[] = []

            glScene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh

                    meshes.push(mesh)
                }
            })

            meshes.forEach(e => this.object.add(e))
            scene.add(this.object)

            this.isMeshReady = true

            dracoLoader.dispose()
        }, undefined, (err) => {
            dracoLoader.dispose()

            console.error(`モデル読み込み失敗: ${modelName}`, err)
        })
    }

    public dispose(): void {
        if (this.object.parent) {
            this.object.parent.remove(this.object);
        }
        this.object.traverse((child: any) => {
            if (child.geometry) child.geometry.dispose?.();
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach((m: any) => {
                        // テクスチャも解放
                        if (m.map) m.map.dispose?.();
                        m.dispose?.();
                    });
                } else {
                    if (child.material.map) child.material.map.dispose?.();
                    child.material.dispose?.();
                }
            }
        });
    }
}
