import * as THREE from "three";
import { PLAYER_CONFIG } from "../config/gameConfig.js";

import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

export class PlayerController {
  constructor(camera, player, colliders = []) {
    this.camera = camera;
    this.player = player;
    this.colliders = colliders;

    this.controls =
      new PointerLockControls(
        camera,
        document.body
      );

    this.moveSpeed =
    PLAYER_CONFIG.moveSpeed;

    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    };

    this.direction =
      new THREE.Vector3();

    this.velocity =
      new THREE.Vector3();

    this.setupInput();
  }

  setupInput() {

    document.addEventListener(
      "keydown",
      (event) => {

        switch (event.code) {

          case "KeyW":
            this.keys.forward = true;
            break;

          case "KeyS":
            this.keys.backward = true;
            break;

          case "KeyA":
            this.keys.left = true;
            break;

          case "KeyD":
            this.keys.right = true;
            break;
        }
      }
    );


    document.addEventListener(
      "keyup",
      (event) => {

        switch (event.code) {

          case "KeyW":
            this.keys.forward = false;
            break;

          case "KeyS":
            this.keys.backward = false;
            break;

          case "KeyA":
            this.keys.left = false;
            break;

          case "KeyD":
            this.keys.right = false;
            break;
        }
      }
    );
  }

  update(deltaTime) {

    if (!this.controls.isLocked) {
      return;
    }

    this.direction.set(0, 0, 0);

    if (this.keys.forward) {
      this.direction.z -= 1;
    }

    if (this.keys.backward) {
      this.direction.z += 1;
    }

    if (this.keys.left) {
      this.direction.x -= 1;
    }

    if (this.keys.right) {
      this.direction.x += 1;
    }


    if (this.direction.lengthSq() === 0) {
      return;
    }

    this.direction.normalize();


    const movement =
      this.direction
        .clone()
        .multiplyScalar(
          this.moveSpeed * deltaTime
        );


    this.move(
      movement
    );
  }

  move(movement) {

    const newPosition =
      this.player.position.clone();

    newPosition.x += movement.x;
    newPosition.z += movement.z;


    if (
      !this.checkCollision(
        newPosition
      )
    ) {
      this.player.position.copy(
        newPosition
      );

      this.player.updateCameraPosition();
    }
  }

  checkCollision(position) {

    const playerBox =
      new THREE.Box3(
        new THREE.Vector3(
          position.x - this.player.radius,
          0,
          position.z - this.player.radius
        ),
        new THREE.Vector3(
          position.x + this.player.radius,
          this.player.height,
          position.z + this.player.radius
        )
      );


    for (
      const collider
      of this.colliders
    ) {

      const colliderBox =
        new THREE.Box3().setFromObject(
          collider
        );

      if (
        playerBox.intersectsBox(
          colliderBox
        )
      ) {
        return true;
      }
    }

    return false;
  }
}