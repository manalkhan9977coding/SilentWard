import * as THREE from "three";

import {
  darkMaterial,
  metalMaterial,
} from "./material";


// ====================================
// CREATE BOX
// ====================================

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


// ====================================
// CREATE WARD C FURNITURE
// ====================================

export function createWardCFurniture(scene) {

  const colliders = [];


  function addCollider(mesh) {

    scene.add(mesh);

    colliders.push(mesh);

  }


  // ====================================
  // DESK
  // ====================================

  addCollider(
    createBox(
      2.5,
      1.4,
      0.8,
      darkMaterial,
      2.5,
      0.7,
      -14
    )
  );


  // Desk top

  addCollider(
    createBox(
      2.7,
      0.15,
      0.9,
      metalMaterial,
      2.5,
      1.45,
      -14
    )
  );


  // ====================================
  // CHAIR
  // ====================================

  addCollider(
    createBox(
      1,
      0.2,
      1,
      darkMaterial,
      2.5,
      0.8,
      -12.5
    )
  );


  // Chair back

  addCollider(
    createBox(
      1,
      1.2,
      0.2,
      darkMaterial,
      2.5,
      1.4,
      -12.9
    )
  );


  // ====================================
  // MEDICAL TABLE
  // ====================================

  addCollider(
    createBox(
      1.5,
      1.2,
      0.8,
      metalMaterial,
      -2.8,
      0.6,
      -14
    )
  );


  // ====================================
  // MEDICAL TRAY
  // ====================================

  scene.add(
    createBox(
      1.2,
      0.08,
      0.7,
      metalMaterial,
      -2.8,
      1.25,
      -14
    )
  );


  return colliders;

}