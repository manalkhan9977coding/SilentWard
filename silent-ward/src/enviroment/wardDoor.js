import * as THREE from "three";

import {
    darkMaterial,
    metalMaterial,
} from "./material";

import {
    Interactable,
} from "../interaction/Interactable.js";

import {
    showMessage,
} from "../ui/interactablePrompt.js";


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
// CREATE WARD C DOOR
// ====================================

export function createWardCDoor(
    scene,
    interactionManager
) {

    // ------------------------------------
    // DOOR GROUP
    // ------------------------------------

    const door =
        new THREE.Group();


    door.name =
        "ward-c-door";


    // ------------------------------------
    // DOOR
    // ------------------------------------

    const doorMesh =
        createBox(
            2,
            3.5,
            0.25,
            darkMaterial,
            0,
            1.75,
            0
        );


    doorMesh.name =
        "ward-c-door-mesh";


    door.add(
        doorMesh
    );


    // ------------------------------------
    // DOOR FRAME - LEFT
    // ------------------------------------

    const leftFrame =
        createBox(
            0.2,
            3.8,
            0.3,
            metalMaterial,
            -1.1,
            1.9,
            0
        );


    door.add(
        leftFrame
    );


    // ------------------------------------
    // DOOR FRAME - RIGHT
    // ------------------------------------

    const rightFrame =
        createBox(
            0.2,
            3.8,
            0.3,
            metalMaterial,
            1.1,
            1.9,
            0
        );


    door.add(
        rightFrame
    );


    // ------------------------------------
    // DOOR FRAME - TOP
    // ------------------------------------

    const topFrame =
        createBox(
            2.4,
            0.2,
            0.3,
            metalMaterial,
            0,
            3.8,
            0
        );


    door.add(
        topFrame
    );


    // ------------------------------------
    // DOOR POSITION
    // ------------------------------------

    // Temporary position.
    // We can move this after seeing it
    // inside the room.

    door.position.set(
        -6,
        0,
        2
    );


    door.rotation.y =
        Math.PI / 2;


    scene.add(
        door
    );


    // ------------------------------------
    // INTERACTION
    // ------------------------------------

    const doorInteraction =
        new Interactable({

            object:
                door,

            name:
                "Ward C Door",

            interactionText:
                "Press E to enter code",

            onInteract: () => {

                const code =
                    prompt(
                        "Enter the 4-digit Ward C access code:"
                    );


                if (code === null) {
                    return;
                }


                if (code === "1734") {

                    showMessage(
                        "The lock clicks. Ward C is unlocked."
                    );

                    doorMesh.visible = false;

                    interactionManager.removeInteractable(
                        doorInteraction
                    );

                    interactionManager.clearInteraction();

                    return;
                }


                showMessage(
                    "Incorrect code."
                );

            },

        });


    interactionManager.addInteractable(
        doorInteraction
    );


    // ------------------------------------
    // RETURN COLLIDERS
    // ------------------------------------

    return {

        door,

        collider:
            doorMesh,

        interaction:
            doorInteraction,

    };

}