import * as THREE from "three";

import {
  darkMaterial,
  metalMaterial,
  bedMaterial,
} from "./material";

function createBox(
  width,
  height,
  depth,
  material,
  x,
  y,
  z
) {
  const geometry = new THREE.BoxGeometry(
    width,
    height,
    depth
  );

  const mesh = new THREE.Mesh(
    geometry,
    material
  );

  mesh.position.set(x, y, z);

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}

export function createFurniture(scene) {
  const colliders = [];

  function addCollider(mesh) {
    scene.add(mesh);
    colliders.push(mesh);
  }

  // -----------------------------
  // Side Table
  // -----------------------------

  addCollider(
    createBox(
      1.2,
      1.2,
      1,
      darkMaterial,
      0.2,
      0.6,
      -1
    )
  );

  // Table top
  addCollider(
    createBox(
      1.3,
      0.15,
      1.1,
      metalMaterial,
      0.2,
      1.25,
      -1
    )
  );

  // -----------------------------
  // Cabinet
  // -----------------------------

  addCollider(
    createBox(
      1.8,
      2.5,
      0.7,
      darkMaterial,
      4,
      1.25,
      -3.8
    )
  );

  // -----------------------------
  // Cabinet Shelves
  // -----------------------------

  addCollider(
    createBox(
      1.5,
      0.08,
      0.1,
      metalMaterial,
      4,
      1.8,
      -3.4
    )
  );

  addCollider(
    createBox(
      1.5,
      0.08,
      0.1,
      metalMaterial,
      4,
      1.1,
      -3.4
    )
  );

  return colliders;
}