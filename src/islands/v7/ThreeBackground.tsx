import * as React from 'react'
import * as THR from 'three'

import initScene from './InitScene'

const initialize = (rndr: THR.WebGLRenderer, cam: THR.OrthographicCamera) => {
    const vv = window.visualViewport

    const w = vv ? vv.width : window.innerWidth
    const h = vv ? vv.height : window.innerHeight

    rndr.setSize(w, h)

    cam.left =      -w/2
    cam.right =      w/2
    cam.top =       -h/2
    cam.bottom =     h/2
    cam.updateProjectionMatrix()
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
        })
        

        // create camera with temporal aspect ratio
        const cam = new THR.OrthographicCamera()
        cam.position.set(0, 0, -1)


        // fit size
        let resizeTimeout = NaN

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
        initScene(scn)

        // RENDER LOOP

        let fr = 0
        const tick = () => {
            fr++

            rndr.render(scn, cam)

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