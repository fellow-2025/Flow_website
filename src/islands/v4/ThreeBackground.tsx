import * as React from 'react'
import * as THR from 'three'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/Addons.js'

class Bound {
    start: THR.Vector3 = new THR.Vector3()
    end: THR.Vector3 = new THR.Vector3()

    constructor(start?: THR.Vector3, end?: THR.Vector3){
        this.start = start ? start : new THR.Vector3()
        this.end = end ? end : new THR.Vector3()
    }
}

const initialize = (rndr: THR.WebGLRenderer, cam: THR.PerspectiveCamera) => {
    const vv = window.visualViewport

    const w = vv ? vv.width : window.innerWidth
    const h = vv ? vv.height : window.innerHeight

    rndr.setSize(w, h)

    cam.aspect = w / h
    cam.updateProjectionMatrix()
}

// TODO: scale object position depends on aspect ratio
const getRenderRegion = (cam: THR.PerspectiveCamera): Bound => {
    const vfov = cam.fov
    const hfov = vfov * cam.aspect

    // placehold
    return new Bound()
}

const shapeSetup = (objs: THR.Group<THR.Object3DEventMap>[], scn: THR.Scene): THR.Mesh[] => {
    const result: THR.Mesh[] = []
    
    const mat = new THR.MeshToonMaterial({color: 0x8bcda2})

    const firstAng = 0

    objs.forEach((e, i) => {
        e.traverse(elem => {
            const casted = elem as THR.Mesh
            if (! casted.isMesh) return

            casted.material = mat
            scn.add(casted)

            casted.rotation.y = firstAng + (i * 70)

            result.push(casted)
        })
    })

    return result
}

const lerp = (a: number, b: number, t: number): number => {
    if(b == a) return a;
    return a + t * (b - a);
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

        let rndrArea = new Bound()

        // fit size
        let resizeTimeout = NaN

        const resize = () => {
            if (resizeTimeout) cancelAnimationFrame(resizeTimeout)

            resizeTimeout = requestAnimationFrame(_ => initialize(rndr, cam))
        }

        {
            const vv = window.visualViewport
            if (vv){
                vv.addEventListener("resize", _ => initialize(rndr, cam))
            }else{
                window.addEventListener('resize', _ => initialize(rndr, cam))
            }
        }
        
        initialize(rndr, cam)
        

        // ADD OBJECTS

        const scn = new THR.Scene()

        // load mesh
        const N_MESHES = 4
        let shapes: THR.Group<THR.Object3DEventMap>[] = new Array(N_MESHES).fill(null)
        let customMeshes: THR.Mesh[] = []
        new GLTFLoader().load(
            '/models/v4/shape.glb',
            (shp) => {
                shapes = shapes.map(_ => shp.scene.clone())

                customMeshes = shapeSetup(shapes, scn)

                const rx = 6
                const ry = 2

                const l = customMeshes.length

                customMeshes.forEach((e, i) => {
                    e.position.x = -rx + (2 * rx / (l - 1)) * i
                    e.position.y = ((i % 2) * 2 - 1) * ry
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


        // RENDER LOOP

        let fr = 0
        const tick = () => {
            fr++

            // object rotation
            if (customMeshes[0]){
                customMeshes.forEach((e, i) => {
                    const r = e.rotation.y
                    e.rotation.y = window.scrollY * .001 * ((i % 2) * 2 - 1)
                    e.rotation.x = window.scrollY * .0002 * ((i % 3) * 2 - 1)

                    e.position.y += ((i % 2) * 2 - 1) * Math.sin(fr / 1000) * .0007
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
        <canvas id='threeCanv' ref={canvRef} className='fixed -z-10'></canvas>
    )
}