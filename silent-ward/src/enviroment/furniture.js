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


export function createFurniture(scene) {

  const colliders = [];


  function addCollider(mesh) {

    scene.add(mesh);

    colliders.push(
      mesh
    );

  }


  // ====================================
  // SIDE TABLE
  // ====================================

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


  // ====================================
  // HOSPITAL CABINET
  // ====================================

  const cabinet =
    new THREE.Group();


  // IMPORTANT:
  // Keep this name because the interaction
  // system uses it to find the cabinet.

  cabinet.name =
    "hospital-cabinet";


  // Move cabinet slightly forward
  // so it doesn't intersect the back wall.

  cabinet.position.set(
    4,
    0,
    -3.8
  );


  scene.add(
    cabinet
  );


  // ====================================
  // CABINET BACK
  // ====================================

  const cabinetBack =
    createBox(
      1.8,
      2.5,
      0.15,
      darkMaterial,
      0,
      1.25,
      -0.28
    );


  cabinetBack.name =
    "hospital-cabinet-back";


  cabinet.add(
    cabinetBack
  );


  // ====================================
  // LEFT SIDE
  // ====================================

  const cabinetLeft =
    createBox(
      0.15,
      2.5,
      0.7,
      darkMaterial,
      -0.825,
      1.25,
      0
    );


  cabinetLeft.name =
    "hospital-cabinet-left";


  cabinet.add(
    cabinetLeft
  );


  // ====================================
  // RIGHT SIDE
  // ====================================

  const cabinetRight =
    createBox(
      0.15,
      2.5,
      0.7,
      darkMaterial,
      0.825,
      1.25,
      0
    );


  cabinetRight.name =
    "hospital-cabinet-right";


  cabinet.add(
    cabinetRight
  );


  // ====================================
  // TOP
  // ====================================

  const cabinetTop =
    createBox(
      1.8,
      0.15,
      0.7,
      darkMaterial,
      0,
      2.425,
      0
    );


  cabinetTop.name =
    "hospital-cabinet-top";


  cabinet.add(
    cabinetTop
  );


  // ====================================
  // BOTTOM
  // ====================================

  const cabinetBottom =
    createBox(
      1.8,
      0.15,
      0.7,
      darkMaterial,
      0,
      0.075,
      0
    );


  cabinetBottom.name =
    "hospital-cabinet-bottom";


  cabinet.add(
    cabinetBottom
  );


  // ====================================
  // CABINET DOOR PIVOT
  // ====================================

  const doorPivot =
    new THREE.Group();


  doorPivot.name =
    "hospital-cabinet-door-pivot";


  // Right-side hinge position
  doorPivot.position.set(
    0.82,
    0,
    0.36
  );


  cabinet.add(
    doorPivot
  );


  // ====================================
  // CABINET DOOR
  // ====================================

  const cabinetDoor =
    createBox(
      1.6,
      2.3,
      0.12,
      darkMaterial,

      // Door extends LEFT
      // from the right-side hinge.

      -0.8,
      1.25,
      0
    );


  cabinetDoor.name =
    "hospital-cabinet-door";


  doorPivot.add(
    cabinetDoor
  );


  // ====================================
  // COLLIDERS
  // ====================================

  colliders.push(
    cabinetBack
  );


  colliders.push(
    cabinetLeft
  );


  colliders.push(
    cabinetRight
  );


  colliders.push(
    cabinetTop
  );


  colliders.push(
    cabinetBottom
  );


  return colliders;
}