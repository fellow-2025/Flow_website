import * as React from 'react'
import * as THR from 'three'

export default (scene: THR.Scene) => {
    scene.background = new THR.Color(0x768a45)

    // シーン全体を均一に照らす環境光を追加
    const ambientLight = new THR.AmbientLight(0xffffff, .8);
    scene.add(ambientLight);

    // 特定の方向から照らす指向性ライトを追加（影やハイライトが生まれる）
    const directionalLight = new THR.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(2, 1, 3);
    scene.add(directionalLight);

    // var directionalLightHelper = new THR.DirectionalLightHelper(directionalLight, 2);
    // directionalLight.position.set(0, 0, 0);
    // scene.add(directionalLightHelper);
}