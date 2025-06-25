import * as React from 'react'
import * as THR from 'three'

export default (scene: THR.Scene) => {
    scene.background = new THR.Color(0x768a45)
}