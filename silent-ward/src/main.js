import "./style.css";
import * as THREE from "three";

// ------------------------------------
// CORE
// ------------------------------------

import { createScene } from "./core/scene.js";
import { createCamera } from "./core/camera.js";
import { createRenderer } from "./core/renderer.js";

// ------------------------------------
// ENVIRONMENT
// ------------------------------------

import { createRoom } from "./enviroment/room.js";
import { createFurniture } from "./enviroment/furniture.js";
import { createProps } from "./enviroment/props.js";
import {
  createCabinetInteraction,
} from "./enviroment/cabinet.js";

import {
  createLighting,
  updateLighting,
} from "./enviroment/lightning.js";

import {
  createBedInteraction,
} from "./enviroment/bed.js";

import {
  createHospitalBed,
} from "./enviroment/furnitureLoader.js";


// ------------------------------------
// PLAYER
// ------------------------------------

import { Player } from "./player/Player.js";
import { PlayerController } from "./player/PlayerController.js";

// ------------------------------------
// INTERACTION
// ------------------------------------

import {
  InteractionManager,
} from "./interaction/InteractionManager.js";

// ------------------------------------
// INVENTORY
// ------------------------------------

import { Inventory } from "./inventory/Inventory.js";

import {
  createInventoryUI,
  updateInventoryUI,
} from "./inventory/InventoryUI.js";

// ------------------------------------
// ITEMS
// ------------------------------------

import {
  createWardCDoor,
} from "./enviroment/wardDoor.js";
import {
  createMysteriousNote,
} from "./items/mysteriousNotes.js";

import {
  createHospitalKey,
} from "./items/key.js";

// ------------------------------------
// UI
// ------------------------------------

import {
  createInteractionPrompt,
  createCrosshair,
} from "./ui/interactablePrompt.js";


// ====================================
// GAME INITIALIZATION
// ====================================

async function init() {

  // ------------------------------------
  // GAME SETUP
  // ------------------------------------

  const scene =
    createScene();

  const camera =
    createCamera();

  const renderer =
    createRenderer();


  // ------------------------------------
  // ENVIRONMENT
  // ------------------------------------

  const roomColliders =
    createRoom(scene);

  const furnitureColliders =
    createFurniture(scene);

  createProps(scene);

  const lights =
    createLighting(scene);


  // ------------------------------------
  // PLAYER
  // ------------------------------------

  const player =
    new Player(camera);


  // ------------------------------------
  // INVENTORY
  // ------------------------------------

  const inventory =
    new Inventory();

  createInventoryUI();

  updateInventoryUI(
    inventory
  );


  // ------------------------------------
  // LOAD 3D ASSETS
  // ------------------------------------

  const hospitalBed =
    await createHospitalBed(scene);


  // ------------------------------------
  // INTERACTION SYSTEM
  // ------------------------------------

  const interactionManager =
    new InteractionManager({
      camera,
      scene,
    });


  // ------------------------------------
  // UI
  // ------------------------------------

  createCrosshair();

  const interactionPrompt =
    createInteractionPrompt();

  interactionManager.setPrompt(
    interactionPrompt
  );

  // ------------------------------------
  // WARD C DOOR
  // ------------------------------------

  const wardCDoor =
    createWardCDoor(
      scene,
      interactionManager
    );


  // ------------------------------------
  // BED INTERACTION
  // ------------------------------------

  const bedInteraction =
    createBedInteraction(
      hospitalBed.model
    );

  interactionManager.addInteractable(
    bedInteraction
  );

  // ------------------------------------
  // MYSTERIOUS NOTE
  // ------------------------------------

  const mysteriousNote =
    createMysteriousNote(
      scene,
      inventory,
      interactionManager,
    );

  createCabinetInteraction(
    scene,
    inventory,
    interactionManager,
    mysteriousNote
  );


  // ------------------------------------
  // ITEMS
  // ------------------------------------


  createHospitalKey(
    scene,
    inventory,
    interactionManager
  );


  // ------------------------------------
  // COLLIDERS
  // ------------------------------------

  const colliders = [
    ...roomColliders,
    ...furnitureColliders,
    hospitalBed.collider,
    wardCDoor.collider,
  ];


  // ------------------------------------
  // PLAYER CONTROLLER
  // ------------------------------------

  const playerController =
    new PlayerController(
      camera,
      player,
      colliders
    );


  // ------------------------------------
  // POINTER LOCK
  // ------------------------------------

  renderer.domElement.addEventListener(
    "click",
    () => {

      playerController.controls.lock();

    }
  );


  // ------------------------------------
  // RESIZE
  // ------------------------------------

  window.addEventListener(
    "resize",
    () => {

      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

    }
  );


  // ------------------------------------
  // GAME LOOP
  // ------------------------------------

  const clock =
    new THREE.Clock();


  function animate() {

    requestAnimationFrame(
      animate
    );


    const deltaTime =
      clock.getDelta();

    const elapsedTime =
      clock.getElapsedTime();


    // Player

    playerController.update(
      deltaTime
    );


    // Interaction

    interactionManager.update();


    // Lighting

    updateLighting(
      elapsedTime,
      lights
    );


    // Render

    renderer.render(
      scene,
      camera
    );

  }


  animate();
}


// ====================================
// START GAME
// ====================================

init();