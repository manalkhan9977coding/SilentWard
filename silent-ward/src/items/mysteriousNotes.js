import * as THREE from "three";

import {
    Interactable,
} from "../interaction/Interactable.js";

import {
    updateInventoryUI,
} from "../inventory/InventoryUI.js";

import {
    showMessage,
} from "../ui/interactablePrompt.js";


export function createMysteriousNote(
    scene,
    inventory,
    interactionManager
) {

    // ====================================
    // NOTE
    // ====================================

    const geometry =
        new THREE.BoxGeometry(
            0.5,
            0.02,
            0.35
        );


    const material =
        new THREE.MeshStandardMaterial({
            color: 0xd8d0bd,
            roughness: 0.9,
        });


    const note =
        new THREE.Mesh(
            geometry,
            material
        );


    note.name =
        "mysterious-note";


    // ====================================
    // NOTE POSITION
    // ====================================

    // Cabinet is positioned around z = -3.4.
    // Place the note inside the cabinet.

    note.position.set(
        4,
        1.55,
        -3.15
    );


    // Lay the note flat.

    note.rotation.x =
        -Math.PI / 2;


    // ====================================
    // HIDDEN INITIALLY
    // ====================================

    note.visible = false;


    scene.add(
        note
    );


    // ====================================
    // NOTE ITEM
    // ====================================

    const noteItem = {

        id:
            "mysterious_note",

        name:
            "Mysterious Note",

        description:
            "A handwritten note found inside the hospital cabinet.",

    };


    // ====================================
    // INTERACTION
    // ====================================

    const noteInteraction =
        new Interactable({

            object:
                note,

            name:
                "Mysterious Note",

            interactionText:
                "Press E to pick up",

            onInteract: () => {

                // --------------------------------
                // ADD TO INVENTORY
                // --------------------------------

                inventory.addItem(
                    noteItem
                );


                updateInventoryUI(
                    inventory
                );


                // --------------------------------
                // REMOVE FROM WORLD
                // --------------------------------

                scene.remove(
                    note
                );


                // --------------------------------
                // REMOVE INTERACTION
                // --------------------------------

                interactionManager.removeInteractable(
                    noteInteraction
                );


                interactionManager.clearInteraction();


                // --------------------------------
                // STORY CLUE
                // --------------------------------

                showMessage(
                    'The note reads: "Ward C. Do not let them hear you."'
                );

            },

        });


    // ====================================
    // RETURN NOTE CONTROLLER
    // ====================================

    return {

        note,

        interaction:
            noteInteraction,

        reveal() {

            // Make the note visible.

            note.visible = true;


            // Make the note interactable.

            interactionManager.addInteractable(
                noteInteraction
            );

        },

    };

}