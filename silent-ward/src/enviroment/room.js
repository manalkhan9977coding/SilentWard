import * as THREE from "three";
import {
  ROOM_CONFIG,
} from "../config/gameConfig.js";

import {
  wallMaterial,
  floorMaterial,
  darkMaterial,
  metalMaterial,
  windowGlassMaterial,
  windowFrameMaterial,
} from "./material";

const ROOM_WIDTH =
  ROOM_CONFIG.width;
const ROOM_DEPTH =
  ROOM_CONFIG.depth;

const ROOM_HEIGHT =
  ROOM_CONFIG.height;

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

export function createRoom(scene) {
  const colliders = [];

  function addCollider(mesh) {
    scene.add(mesh);
    colliders.push(mesh);
  }

  // -----------------------------
  // Floor
  // -----------------------------

  scene.add(
    createBox(
      ROOM_WIDTH,
      0.2,
      ROOM_DEPTH,
      floorMaterial,
      0,
      -0.1,
      0
    )
  );

  // -----------------------------
  // Back Wall
  // -----------------------------

  addCollider(
    createBox(
      ROOM_WIDTH,
      ROOM_HEIGHT,
      0.2,
      wallMaterial,
      0,
      ROOM_HEIGHT / 2,
      -ROOM_DEPTH / 2
    )
  );

  // -----------------------------
  // Left Wall
  // -----------------------------

  addCollider(
    createBox(
      0.2,
      ROOM_HEIGHT,
      ROOM_DEPTH,
      wallMaterial,
      -ROOM_WIDTH / 2,
      ROOM_HEIGHT / 2,
      0
    )
  );

  // -----------------------------
  // Right Wall
  // -----------------------------

  addCollider(
    createBox(
      0.2,
      ROOM_HEIGHT,
      ROOM_DEPTH,
      wallMaterial,
      ROOM_WIDTH / 2,
      ROOM_HEIGHT / 2,
      0
    )
  );

  // -----------------------------
  // Front Wall
  // -----------------------------

  addCollider(
    createBox(
      ROOM_WIDTH,
      ROOM_HEIGHT,
      0.2,
      wallMaterial,
      0,
      ROOM_HEIGHT / 2,
      ROOM_DEPTH / 2
    )
  );

  // -----------------------------
  // Ceiling
  // -----------------------------

  scene.add(
    createBox(
      ROOM_WIDTH,
      0.2,
      ROOM_DEPTH,
      darkMaterial,
      0,
      ROOM_HEIGHT,
      0
    )
  );

  // -----------------------------
  // Door
  // -----------------------------

  addCollider(
    createBox(
      2,
      3.5,
      0.25,
      darkMaterial,
      0,
      1.75,
      ROOM_DEPTH / 2 - 0.15
    )
  );

  // -----------------------------
  // Door Frames
  // -----------------------------

  addCollider(
    createBox(
      0.2,
      3.8,
      0.3,
      metalMaterial,
      -1.1,
      1.9,
      ROOM_DEPTH / 2 - 0.3
    )
  );

  addCollider(
    createBox(
      0.2,
      3.8,
      0.3,
      metalMaterial,
      1.1,
      1.9,
      ROOM_DEPTH / 2 - 0.3
    )
  );

  addCollider(
    createBox(
      2.4,
      0.2,
      0.3,
      metalMaterial,
      0,
      3.8,
      ROOM_DEPTH / 2 - 0.3
    )
  );

  // -----------------------------
  // Window Glass
  // -----------------------------

  scene.add(
    createBox(
      3,
      2,
      0.1,
      windowGlassMaterial,
      3,
      2.7,
      -ROOM_DEPTH / 2 + 0.15
    )
  );

  // -----------------------------
  // Window Frame - Left
  // -----------------------------

  addCollider(
    createBox(
      0.15,
      2.2,
      0.2,
      windowFrameMaterial,
      1.5,
      2.7,
      -ROOM_DEPTH / 2 + 0.05
    )
  );

  // -----------------------------
  // Window Frame - Right
  // -----------------------------

  addCollider(
    createBox(
      0.15,
      2.2,
      0.2,
      windowFrameMaterial,
      4.5,
      2.7,
      -ROOM_DEPTH / 2 + 0.05
    )
  );

  // -----------------------------
  // Window Frame - Top
  // -----------------------------

  addCollider(
    createBox(
      3.2,
      0.15,
      0.2,
      windowFrameMaterial,
      3,
      3.7,
      -ROOM_DEPTH / 2 + 0.05
    )
  );

  // -----------------------------
  // Window Frame - Bottom
  // -----------------------------

  addCollider(
    createBox(
      3.2,
      0.15,
      0.2,
      windowFrameMaterial,
      3,
      1.7,
      -ROOM_DEPTH / 2 + 0.05
    )
  );

  return colliders;
}