import * as THREE from "three";

import {
  metalMaterial,
} from "./material.js";

function createBox(
  width,
  height,
  depth,
  material,
  x,
  y,
  z
) {
  const geometry =
    new THREE.BoxGeometry(
      width,
      height,
      depth
    );

  const mesh =
    new THREE.Mesh(
      geometry,
      material
    );

  mesh.position.set(
    x,
    y,
    z
  );

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}

export function createProps(scene) {

  const ceilingFixture =
    createBox(
      3,
      0.12,
      0.7,
      metalMaterial,
      0,
      4.75,
      0
    );

  scene.add(
    ceilingFixture
  );


  const fluorescentMaterial =
    new THREE.MeshBasicMaterial({
      color: 0xe9f4ff,
    });

  const fluorescentTube =
    createBox(
      2.5,
      0.04,
      0.12,
      fluorescentMaterial,
      0,
      4.65,
      0
    );

  scene.add(
    fluorescentTube
  );
}