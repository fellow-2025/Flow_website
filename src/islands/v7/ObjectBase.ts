import * as THREE from 'three'
import { DRACOLoader, GLTFLoader } from 'three/examples/jsm/Addons.js'

import { lerpF, easeOutQuint } from './utility'

export abstract class ItHappyObj {
    static material: THREE.Material
    static texture: THREE.Texture
    static isSharedResourceReady = false

    public object: THREE.Group
    private isMeshReady = false

    private localTime: number

    private spawnLengthSecs: number
    private targetScale: number
    private scale: number

    constructor(scene: THREE.Scene, modelName: string, spawnLen: number, targetScale: number) {
        this.spawnLengthSecs = spawnLen
        this.targetScale = targetScale
        this.scale = 0

        this.localTime = 0

        this.object = new THREE.Group()

        if (!ItHappyObj.isSharedResourceReady) {
            ItHappyObj.initSharedResources()
        }
        this.loadModel(modelName, scene)
    }

    public tick(globalFrame: number, globalTime: number, deltaTime: number) {
        if (! this.isMeshReady) return

        this.localTime += deltaTime

        if (this.localTime < this.spawnLengthSecs){
            // console.log('spawn')
            this.spawnAnim(globalTime, deltaTime)
        } else {
            // console.log('visible')
            this.update(globalFrame, globalTime, deltaTime)
        }
    }

    private spawnAnim(globalTime: number, deltaTime: number): void{
        const progress = this.localTime / this.spawnLengthSecs
        this.scale = lerpF(0, this.targetScale, easeOutQuint(progress))

        if (! this.object) return
        this.object.scale.set(this.scale, this.scale, this.scale)
    }

    protected abstract update(globalFrame: number, globalTime: number, deltaTime: number): void

    static async initSharedResources() {
        // 共通テクスチャとマテリアルの初期化
        const tex = new THREE.TextureLoader().load('/images/textures/ithappy.png')
        tex.flipY = false
        ItHappyObj.texture = tex
        ItHappyObj.material = new THREE.MeshToonMaterial({
            map: ItHappyObj.texture,
            color: 0xffffff
        })
        ItHappyObj.isSharedResourceReady = true
    }

    private loadModel(modelName: string, scene: THREE.Scene) {
        const loader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/lib/draco/')
        loader.setDRACOLoader(dracoLoader)

        loader.load(`/models/v7/${modelName}.glb`, (gltf) => {
            const glScene = gltf.scene

            const meshes: THREE.Mesh[] = []

            // マテリアルの置き換え
            glScene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    console.log('mesh')
                    const mesh = child as THREE.Mesh
                    // mesh.material = ItHappyObj.material

                    meshes.push(mesh)
                }
            })

            meshes.forEach(e => {e.rotateX(90 * (Math.PI / 180)); this.object.add(e)})
            scene.add(this.object)

            this.isMeshReady = true
        }, undefined, (err) => {
            console.error(`モデル読み込み失敗: ${modelName}`, err)
        })
    }
}
