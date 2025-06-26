import * as React from 'react'
import * as THR from 'three'

import initScene from './InitScene'
import { Props3d } from './Props'
import { GrassManager } from './Grass'
import { d2r } from './utility'
import { PropObjManager } from './PropObjects'
import { addPointerHandler, cleanupPointerHandler } from './WindowEvents'
import { type IObjectManager } from './ObjectManger'

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

const disposeScene = (rndr: THR.WebGLRenderer, managers: IObjectManager[]) => {
    managers.forEach(e => e.dispose())

    rndr.dispose()
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
        const cam = new THR.PerspectiveCamera(40, 1 / 1)
        cam.position.set(0, 0, 10)
        // setup and rotate camera parent
        const camParent = new THR.Group().add(cam)
        camParent.position.set(0, 0, 0)
        camParent.rotateY(d2r(-15))
        camParent.rotateX(d2r(-45))

        const camOrigin = new THR.Group()
        camOrigin.add(camParent)

        const resizeHandler = () => initialize(rndr, cam)

        // resize support
        {
            const vv = window.visualViewport
            if (vv){
                vv.addEventListener("resize", resizeHandler)
            }else{
                window.addEventListener('resize', resizeHandler)
            }
        }
        
        // fit camera size
        initialize(rndr, cam)
        

        //  SCENE SETUP
        // ----------------------
        const scn = new THR.Scene()
        initScene(scn) // background color etc.

        scn.add(camOrigin)        

        let objMgrs: IObjectManager[] = []

        const grassMgr = new GrassManager(scn, 120, 1, .2, new THR.Vector2(15, 15))
        const sceneObjMgr = new PropObjManager(scn, 1)

        objMgrs.push(grassMgr, sceneObjMgr)

        // DEBUG
        // const axesHelper = new THR.AxesHelper( 1000 );
        // scn.add( axesHelper );

        //  CLICK / TOUCH
        // ------------------
        // TODO: できたらマウスカーソルとかタッチに応じてオブジェクトが揺れたりするヤツを追加する
        // グローバルに一回wposを計算した後、各updateにそれをフィードするとかで
        // addPointerHandler(rndr, cam)

        //  RENDER LOOP
        // ----------------------
        let running = true
        let frId: number

        //  HMR dispose
        // ----------------------
        if (import.meta.hot) {
            import.meta.hot.dispose(() => {
                running = false
                if (frId) cancelAnimationFrame(frId)

                disposeScene(rndr, objMgrs)

                objMgrs = []

                rndr.dispose()
            });
        }

        const startedAt = Date.now() / 1000
        let lastTime = 0

        let fr = 0

        let lastScroll = 0
        let scrollVelocity = 0
        const damping = 0.9

        const tick = () => {
            if (!running) return

            const globalTime = (Date.now() / 1000) - startedAt
            const deltaTime = globalTime - lastTime
            lastTime = globalTime

            const curScroll = window.scrollY
            const rawScrollDelta = lastScroll - curScroll
            lastScroll = curScroll

            // ダンピング処理
            scrollVelocity = scrollVelocity * damping + rawScrollDelta * (1 - damping)
            const scrollDelta = scrollVelocity

            objMgrs.forEach(e => e.tick(fr, globalTime, deltaTime, scrollDelta))

            rndr.render(scn, cam)

            fr++
            frId = requestAnimationFrame(tick)
        }

        tick()

        return () => {
            running = false
            if (frId) cancelAnimationFrame(frId)

            disposeScene(rndr, objMgrs)

            objMgrs = []

            const vv = window.visualViewport;
            if (vv) {
                vv.removeEventListener("resize", resizeHandler);
            } else {
                window.removeEventListener("resize", resizeHandler);
            }
        }
    }, [])

    return (
        <canvas id='threeCanv' ref={canvRef} className='fixed -z-10'></canvas>
    )
}