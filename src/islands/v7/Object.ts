import * as THREE from 'three'
import { DRACOLoader, GLTFLoader } from 'three/examples/jsm/Addons.js'

export default class ItHappyObj {
    static material: THREE.MeshToonMaterial
    static texture: THREE.Texture
    static initialized = false

    public mesh: THREE.Object3D | null = null

    constructor(modelName: string) {
        if (!ItHappyObj.initialized) {
            ItHappyObj.initSharedResources()
        }
        this.loadModel(modelName)
    }

    static initSharedResources() {
        // 共通テクスチャとマテリアルの初期化
        ItHappyObj.texture = new THREE.TextureLoader().load('images/textures/ithappy.png')
        ItHappyObj.material = new THREE.MeshToonMaterial({
            map: ItHappyObj.texture,
        })
        ItHappyObj.initialized = true
    }

    private loadModel(modelName: string) {
        const loader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/') // 必要に応じて変更
        loader.setDRACOLoader(dracoLoader)

        loader.load(`models/${modelName}.glb`, (gltf) => {
            this.mesh = gltf.scene

            // マテリアルの置き換え
            this.mesh.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh
                    mesh.material = ItHappyObj.material
                }
            })
        }, undefined, (err) => {
            console.error(`モデル読み込み失敗: ${modelName}`, err)
        })
    }
}
