import * as THREE from 'three'
import { DRACOLoader, GLTFLoader } from 'three/examples/jsm/Addons.js'
import { easeOutQuint } from './utility'
import type { IObjectManager } from './ObjectManger'

    interface GrassInstanceData {
        spawnTime: number
        scale: number
        targetScale: number
        position: THREE.Vector3
        rotationY: number
    }

    export class GrassManager implements IObjectManager {
        private instancedMesh: THREE.InstancedMesh | null = null
        private count: number
        private scene: THREE.Scene
        private instanceData: GrassInstanceData[] = []
        private spawnDuration:number

        constructor(
            scene: THREE.Scene,
            N_GRASSES: number,
            spawnLen: number,
            targetScale: number,
            foliageArea: THREE.Vector2,
        ) {
            this.count = N_GRASSES
            this.scene = scene
            this.spawnDuration = spawnLen
            this.loadGrassModel(N_GRASSES, spawnLen, targetScale, foliageArea)
        }

        private loadGrassModel(
            N_GRASSES: number,
            spawnLen: number,
            targetScale: number,
            foliageArea: THREE.Vector2
        ) {
            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

            const loader = new GLTFLoader()
            loader.setDRACOLoader(dracoLoader)

            loader.load(`/models/v7/grass.glb`, (gltf) => {
                let mesh: THREE.Mesh | undefined
                gltf.scene.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        mesh = child as THREE.Mesh
                    }
                })
                if (!mesh) return

                const geometry = mesh.geometry
                const material = mesh.material

                const instancedMesh = new THREE.InstancedMesh(geometry, material, N_GRASSES)
                const dummy = new THREE.Object3D()
                const halfAreaX = foliageArea.x / 2
                const halfAreaZ = foliageArea.y / 2

                const now = performance.now() / 1000 // 秒単位
                this.instanceData = []

                for (let i = 0; i < N_GRASSES; i++) {
                    const rndx = (Math.random() * foliageArea.x) - halfAreaX
                    const rndz = (Math.random() * foliageArea.y) - halfAreaZ
                    const rotationY = Math.random() * Math.PI * 2

                    // 初期スケールは0
                    dummy.position.set(rndx, 0, rndz)
                    dummy.scale.set(0, 0, 0)
                    dummy.rotation.y = rotationY
                    dummy.updateMatrix()
                    instancedMesh.setMatrixAt(i, dummy.matrix)

                    this.instanceData.push({
                        spawnTime: now,
                        scale: 0,
                        targetScale,
                        position: new THREE.Vector3(rndx, 0, rndz),
                        rotationY,
                    })
                }
                instancedMesh.instanceMatrix.needsUpdate = true
                this.instancedMesh = instancedMesh
                this.scene.add(instancedMesh)

                dracoLoader.dispose()
            })
        }

        public tick(globalFrame: number, globalTime: number, deltaTime: number, scrollDelta: number) {
            if (!this.instancedMesh) return
            const dummy = new THREE.Object3D()
            let needsUpdate = false
            const now = performance.now() / 1000

            for (let i = 0; i < this.instanceData.length; i++) {
                const data = this.instanceData[i]
                // スポーンからの経過時間
                const t = Math.min(1, (now - data.spawnTime) / this.spawnDuration)
                // イージング(例: easeOutCubic)
                const eased = easeOutQuint(t)
                const scale = data.targetScale * eased

                dummy.position.copy(data.position)
                dummy.scale.set(scale, scale, scale)
                dummy.rotation.y = data.rotationY
                dummy.updateMatrix()
                this.instancedMesh.setMatrixAt(i, dummy.matrix)

                if (t < 1) needsUpdate = true
            }
            if (needsUpdate) {
                this.instancedMesh.instanceMatrix.needsUpdate = true
            }
        }

        public dispose(): void {
            if (this.instancedMesh) {
                this.scene.remove(this.instancedMesh)
                this.instancedMesh.geometry.dispose()
                if (Array.isArray(this.instancedMesh.material)) {
                    this.instancedMesh.material.forEach(mat => mat.dispose())
                } else {
                    this.instancedMesh.material.dispose()
                }
                this.instancedMesh = null
            }
        }
    }