import * as React from 'react'
import * as THR from 'three'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/Addons.js'

import { SimplexNoise } from 'three/examples/jsm/Addons.js'

class Bound {
    start: THR.Vector3 = new THR.Vector3()
    end: THR.Vector3 = new THR.Vector3()

    constructor(start?: THR.Vector3, end?: THR.Vector3){
        this.start = start ? start : new THR.Vector3()
        this.end = end ? end : new THR.Vector3()
    }
}

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
        const cam = new THR.OrthographicCamera()

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
        
        // gradient reference
        const planeGeo = new THR.PlaneGeometry(2, 2)
        const planeMat = new THR.ShaderMaterial({
            uniforms:{
                u_time: { value:0. },
                u_vpHeight: { value:0. },
                u_seed: { value: new Date().getMilliseconds() },
                u_grad: { value: new THR.TextureLoader().load('/images/v5/grad_ref.png') }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position.xy, 0.0, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;

                uniform float u_time;
                uniform float u_vpHeight;
                uniform float u_seed;
                uniform sampler2D u_grad;

                // Shoutout to Lallis, https://www.shadertoy.com/view/MtfXRH
                float noise3D(vec3 p)
                {
                    return fract(sin(dot(p ,vec3(12.9898,78.233,126.7378))) * 43758.5453)*2.0-1.0;
                }

                vec3 grad(vec3 p)
                {
                    return vec3(noise3D(p*1.00), noise3D(p*1.12), noise3D(p*1.23));
                }

                float perlin3D(vec3 q)
                {
                    vec3 f = fract(q);
                    vec3 p = floor(q);
                    f = f*f*(3.0-2.0*f);

                    float p0	= dot(grad(p), q-p);
                    float x 	= dot(grad(p+vec3(1.0,0.0,0.0)), q-(p+vec3(1.0,0.0,0.0)));
                    float y 	= dot(grad(p+vec3(0.0,1.0,0.0)), q-(p+vec3(0.0,1.0,0.0)));
                    float z 	= dot(grad(p+vec3(0.0,0.0,1.0)), q-(p+vec3(0.0,0.0,1.0)));
                    float xy	= dot(grad(p+vec3(1.0,1.0,0.0)), q-(p+vec3(1.0,1.0,0.0)));
                    float xz	= dot(grad(p+vec3(1.0,0.0,1.0)), q-(p+vec3(1.0,0.0,1.0)));
                    float yz	= dot(grad(p+vec3(0.0,1.0,1.0)), q-(p+vec3(0.0,1.0,1.0)));
                    float xyz	= dot(grad(p+1.0), q-(p+1.0));
                    
                    return mix(	mix(	mix(p0, x, 	 f.x), 
                                        mix(y, 	xy,  f.x), 	f.y), 
                                mix(	mix(z, 	xz,	 f.x), 
                                        mix(yz, xyz, f.x), 	f.y), 	f.z);
                }

                float fbm(vec3 p)
                {
                    float f = 0.5000*perlin3D(p*1.00);
                        f+= 0.2500*perlin3D(p*2.01);
                        f+= 0.1250*perlin3D(p*4.02);
                        f+= 0.0625*perlin3D(p*8.03);
                        f/= 0.9375;
                    return f;
                }

                vec2 rotUv(vec2 uv, float r)
                {
                    float mid = 0.5;
                    return vec2(
                        cos(r) * (uv.x - mid) + sin(r) * (uv.y - mid) + mid,
                        cos(r) * (uv.y - mid) - sin(r) * (uv.x - mid) + mid
                    );
                }

                void main() {
                    vec2 uv = rotUv(vUv.xy, 3.14159265 / 4.);
                    vec3 crd = vec3(uv.x * 10., uv.y * 2., u_seed + u_time + u_vpHeight/1000.);
                    float val = fbm(crd);

                    vec4 clr = texture(u_grad, vec2(clamp((1. - val - .1), 0., 1.), .5));

                    gl_FragColor = clr;
                    //gl_FragColor = vec4(vec3(val), 1.);
                }
            `
        })
        const plane = new THR.Mesh(planeGeo, planeMat)

        scn.add(plane)

        // LAYOUT

        cam.position.set(0,0,-1)


        // RENDER LOOP

        window.addEventListener('scroll', _ => planeMat.uniforms.u_vpHeight.value = window.scrollY)

        let fr = 0
        const tick = () => {
            fr++

            rndr.render(scn, cam)

            planeMat.uniforms.u_time.value += .001

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