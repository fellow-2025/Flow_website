import * as THR from 'three'

// Listen for mouse/touch events and convert screen coords to world coords at y=0
// Use window event listener since canvas is behind other elements
const pointerHandler = (event: MouseEvent | TouchEvent, rndr: THR.WebGLRenderer, cam: THR.Camera) => {
    let clientX: number, clientY: number
    if ("touches" in event && event.touches.length > 0) {
        clientX = event.touches[0].clientX
        clientY = event.touches[0].clientY
    } else if ("clientX" in event) {
        clientX = event.clientX
        clientY = event.clientY
    } else {
        return
    }

    const rect = rndr.domElement.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 2 - 1
    const y = -((clientY - rect.top) / rect.height) * 2 + 1

    // Raycast from camera through screen point
    const pointer = new THR.Vector2(x, y)
    const raycaster = new THR.Raycaster()
    raycaster.setFromCamera(pointer, cam)

    // Intersect with y=0 plane
    const plane = new THR.Plane(new THR.Vector3(0, 1, 0), 0)
    const worldPos = new THR.Vector3()
    raycaster.ray.intersectPlane(plane, worldPos)

    // worldPos now contains the world coordinates at y=0
    // You can use worldPos here as needed
    console.log("World position at y=0:", worldPos)
}

export const addPointerHandler = (rndr: THR.WebGLRenderer, cam: THR.Camera) =>
    window.addEventListener("pointerdown", ev => pointerHandler(ev, rndr, cam))

export const cleanupPointerHandler = (rndr: THR.WebGLRenderer, cam: THR.Camera) =>
    window.removeEventListener('pointerdown', ev => pointerHandler(ev, rndr, cam))