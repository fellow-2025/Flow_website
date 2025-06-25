import * as React from 'react'
import * as THR from 'three'

import initScene from './InitScene'
import { Props3d } from './Props'
import { GrassManager } from './Grass'
import { d2r } from './utility'

// const initialize = (rndr: THR.WebGLRenderer, cam: THR.OrthographicCamera) => {
//     const vv = window.visualViewport

//     const w = vv ? vv.width : window.innerWidth
//     const h = vv ? vv.height : window.innerHeight

//     rndr.setSize(w, h)

//     cam.left =      -w/2
//     cam.right =      w/2
//     cam.top =       -h/2
//     cam.bottom =     h/2
//     cam.updateProjectionMatrix()
// }

const initialize = (rndr: THR.WebGLRenderer, cam: THR.PerspectiveCamera) => {
    const vv = window.visualViewport

    const w = vv ? vv.width : window.innerWidth
    const h = vv ? vv.height : window.innerHeight

    rndr.setSize(w, h)

    cam.aspect = w / h
    cam.updateProjectionMatrix()
}

export const ThreeBackground = () => {
    // what is this
    const canvRef = React.useRef<HTMLCanvasElement | null>(null)

    // what is this II
    React.useEffect(() => {
        if(!canvRef.current) return


        //  RENDERER & CAMERA SETUP
        // ----------------------------------
        const rndr = new THR.WebGLRenderer({
            canvas: canvRef.current,
        })
        
        // create camera with temporal aspect ratio
        // const cam = new THR.OrthographicCamera()
        const cam = new THR.PerspectiveCamera(45, 1 / 1)
        cam.position.set(0, 0, 10)
        // setup and rotate camera parent
        const camParent = new THR.Group().add(cam)
        camParent.position.set(0, 0, 0)
        camParent.rotateY(d2r(45))
        camParent.rotateX(d2r(-30))

        const camOrigin = new THR.Group()
        camOrigin.add(camParent)

        // resize support
        {
            const vv = window.visualViewport
            if (vv){
                vv.addEventListener("resize", _ => initialize(rndr, cam))
            }else{
                window.addEventListener('resize', _ => initialize(rndr, cam))
            }
        }
        
        // fit camera size
        initialize(rndr, cam)
        

        //  SCENE SETUP
        // ----------------------
        const scn = new THR.Scene()
        initScene(scn) // background color etc.

        scn.add(camOrigin)

        const grassMgr = new GrassManager(scn, 30, 3, .2, new THR.Vector2(10, 10))

        const axesHelper = new THR.AxesHelper( 1000 );
        scn.add( axesHelper );

        //  RENDER LOOP
        // ----------------------
        const startedAt = Date.now() / 1000
        let lastTime = 0

        let fr = 0
        const tick = () => {
            const globalTime = (Date.now() / 1000) - startedAt
            const deltaTime = globalTime - lastTime
            lastTime = globalTime

            grassMgr.tick(fr, globalTime, deltaTime)

            rndr.render(scn, cam)

            fr++
            requestAnimationFrame(tick)
        }

        tick()

        // Xx_what is this_xX ("resource release on component unload" by chatGPT)
        return () => rndr.dispose()
    })

    return (
        <canvas id='threeCanv' ref={canvRef} className='fixed -z-10'></canvas>
    )
}

const v3str = (v: THR.Vector3) => `${v.x}, ${v.y}, ${v.z}`