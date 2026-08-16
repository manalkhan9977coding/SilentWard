import * as THREE from "three";

export function createScene() {
  const scene =
    new THREE.Scene();

  scene.background =
    new THREE.Color(0x060708);

  scene.fog =
    new THREE.FogExp2(
      0x060708,
      0.045
    );

  return scene;
}