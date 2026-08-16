import * as THREE from "three";

import { loadModel } from "../core/assetLoader.js";
import { prepareModel } from "../core/modelUtils.js";

export async function createHospitalBed(scene) {

  const model = await loadModel(
    "/assets/models/furniture/hospital-bed.glb"
  );

  prepareModel(model);

  // -----------------------------
  // Position
  // -----------------------------

  model.position.set(
    -2.5,
    0,
    -1
  );

  // -----------------------------
  // Rotation
  // -----------------------------

  model.rotation.set(
    0,
    Math.PI,
    0
  );

  // -----------------------------
  // Scale
  // -----------------------------

  model.scale.set(
    1,
    1,
    1
  );

  scene.add(model);


  // -----------------------------
  // Collision Box
  // -----------------------------

  const colliderGeometry =
    new THREE.BoxGeometry(
      3.5,
      1.8,
      1.6
    );

  const colliderMaterial =
    new THREE.MeshBasicMaterial({
      visible: false,
    });

  const collider =
    new THREE.Mesh(
      colliderGeometry,
      colliderMaterial
    );

  collider.position.set(
    -2.5,
    0.9,
    -1
  );

  scene.add(collider);


  return {
    model,
    collider,
  };
}