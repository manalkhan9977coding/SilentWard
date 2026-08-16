import * as THREE from "three";

import {
  RENDER_CONFIG,
} from "../config/gameConfig.js";

export function createRenderer() {
  const renderer =
    new THREE.WebGLRenderer({
      antialias: true,
    });

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      RENDER_CONFIG.maxPixelRatio
    )
  );

  renderer.shadowMap.enabled = true;

  renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

  renderer.outputColorSpace =
    THREE.SRGBColorSpace;

  renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

  renderer.toneMappingExposure = 0.8;

  document.body.appendChild(
    renderer.domElement
  );

  return renderer;
}