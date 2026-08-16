import * as THREE from "three";

export const wallMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x5f625e,
    roughness: 0.95,
    metalness: 0,
  });

export const floorMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x252729,
    roughness: 0.95,
    metalness: 0,
  });

export const darkMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x111214,
    roughness: 0.9,
    metalness: 0,
  });

export const metalMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x55585a,
    metalness: 0.65,
    roughness: 0.45,
  });

export const bedMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xb8b8b2,
    roughness: 0.9,
    metalness: 0,
  });

export const windowGlassMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x17232a,
    transparent: true,
    opacity: 0.35,
    roughness: 0.2,
  });

export const windowFrameMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x18191a,
    roughness: 0.8,
  });