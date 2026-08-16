import * as THREE from "three";
import { PLAYER_CONFIG } from "../config/gameConfig.js";

export class Player {
  constructor(camera) {
    this.camera = camera;

    this.height = PLAYER_CONFIG.height;
    this.radius = PLAYER_CONFIG.radius;

    this.position = new THREE.Vector3(
      0,
      this.height,
      3.5
    );

    this.camera.position.copy(
      this.position
    );
  }

  updateCameraPosition() {
    this.camera.position.copy(
      this.position
    );
  }
}