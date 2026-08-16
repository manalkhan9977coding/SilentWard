import * as THREE from "three";

export function prepareModel(model) {
  model.traverse((child) => {
    if (!child.isMesh) {
      return;
    }

    child.castShadow = true;
    child.receiveShadow = true;

    if (child.material) {
      child.material.needsUpdate = true;
    }
  });

  return model;
}