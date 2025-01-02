import * as React from 'react'
import * as THR from 'three'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/Addons.js'

// TODO: use boundary object to scale object position depends on aspect ratio
class Bound {
    start: THR.Vector3 = new THR.Vector3()
    end: THR.Vector3 = new THR.Vector3()

    constructor(start: THR.Vector3, end: THR.Vector3){
        this.start = start
        this.end = end
    }
}

const initialize = (rndr: THR.WebGLRenderer, cam: THR.PerspectiveCamera) => {
    const w = window.innerWidth
    const h = window.innerHeight

    rndr.setSize(w, h)

    cam.aspect = w / h
    cam.updateProjectionMatrix()
}

const shapeSetup = (objs: THR.Group<THR.Object3DEventMap>[], scn: THR.Scene): THR.Mesh[] => {
    const result: THR.Mesh[] = []
    
    const mat = new THR.MeshToonMaterial({color: 0xffffff})

    objs.forEach((e, i) => {
        e.traverse(elem => {
            const casted = elem as THR.Mesh
            if (! casted.isMesh) return

            casted.material = mat
            scn.add(casted)

            result.push(casted)
        })
    })

    return result
}

export default () => {
    // what is this
    const canvRef = React.useRef<HTMLCanvasElement | null>(null)

    // what is this II
    React.useEffect(() => {
        if(!canvRef.current) return


        // RENDERER & CAMERA SETUP

        const rndr = new THR.WebGLRenderer({
            canvas: canvRef.current,
            alpha: true
        })
        
        // create camera with temporal aspect ratio
        const cam = new THR.PerspectiveCamera(45, 1 / 1)

        // fit size
        window.addEventListener('resize', () => initialize(rndr, cam))
        initialize(rndr, cam)
        

        // ADD OBJECTS

        const scn = new THR.Scene()

        // load mesh
        const N_MESHES = 2
        let shapes: THR.Group<THR.Object3DEventMap>[] = new Array(N_MESHES).fill(null)
        let customMeshes: THR.Mesh[] = []
        new GLTFLoader().load(
            '/models/v4/shape.glb',
            (shp) => {
                shapes = shapes.map(_ => shp.scene.clone())

                customMeshes = shapeSetup(shapes, scn)

                customMeshes.forEach((e, i) => {
                    e.position.x = (i * 2 - 1) * 2
                    e.position.y = (i * 2 - 1) * -2
                })
            },
            (prg) => console.log('loading: ' + (prg.loaded / prg.total * 100)),
            (err) => console.log('Error occured while loading custom mesh:\n' + err)
        )


        // lights
        const LDir = new THR.DirectionalLight(0xffffff, 3.)
        LDir.rotation.set(30, 30, 0)
        scn.add(LDir)

        const LAmb = new THR.AmbientLight(0xffffff, .1)
        scn.add(LAmb)

        
        // LAYOUT

        cam.position.set(0,0,10)

        let fr = 0

        const tick = () => {
            fr++

            // object rotation
            if (customMeshes[0]){
                customMeshes.forEach((e, i) => {
                    const r = e.rotation.y
                    e.rotation.y = r + Math.abs((Math.sin((fr + i*10) / 100) % 1)) / 50
                })
            }

            rndr.render(scn, cam)

            requestAnimationFrame(tick)
        }

        tick()

        // what is this III ("resource release on component unload" by chatGPT)
        return () => rndr.dispose()
    })

    return (
        <canvas id='threeCanv' ref={canvRef}></canvas>
    )
}