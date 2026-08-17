import {
    Interactable,
} from "../interaction/Interactable.js";

import {
    showMessage,
} from "../ui/interactablePrompt.js";

import {
    updateInventoryUI,
} from "../inventory/InventoryUI.js";


export function createCabinetInteraction(
    scene,
    inventory,
    interactionManager,
    mysteriousNote
) {

    // ====================================
    // FIND CABINET
    // ====================================

    const cabinet =
        scene.getObjectByName(
            "hospital-cabinet"
        );


    if (!cabinet) {

        console.error(
            "Hospital cabinet not found."
        );

        return null;
    }


    // ====================================
    // FIND DOOR PIVOT
    // ====================================

    const doorPivot =
        scene.getObjectByName(
            "hospital-cabinet-door-pivot"
        );


    if (!doorPivot) {

        console.error(
            "Hospital cabinet door pivot not found."
        );

        return null;
    }


    // ====================================
    // CABINET STATE
    // ====================================

    let isOpen = false;

    let isOpening = false;


    // ====================================
    // INTERACTION
    // ====================================

    const cabinetInteraction =
        new Interactable({

            object:
                cabinet,

            name:
                "Hospital Cabinet",

            interactionText:
                "Press E to open",

            onInteract: () => {

                // --------------------------------
                // PREVENT DOUBLE INTERACTION
                // --------------------------------

                if (isOpening || isOpen) {
                    return;
                }


                // --------------------------------
                // CHECK FOR KEY
                // --------------------------------

                if (
                    !inventory.hasItem(
                        "hospital_key"
                    )
                ) {

                    showMessage(
                        "The cabinet is locked."
                    );

                    return;
                }


                // --------------------------------
                // USE KEY
                // --------------------------------

                inventory.removeItem(
                    "hospital_key"
                );


                updateInventoryUI(
                    inventory
                );


                // --------------------------------
                // CABINET OPENING
                // --------------------------------

                showMessage(
                    "The key fits..."
                );


                isOpening = true;


                openCabinetDoor(
                    doorPivot,
                    () => {

                        isOpen = true;

                        isOpening = false;

                        // --------------------------------
                        // REVEAL MYSTERIOUS NOTE
                        // --------------------------------

                        if (mysteriousNote) {

                            mysteriousNote.reveal();

                        }

                        showMessage(
                            "The cabinet opens."
                        );

                    }
                );


                // --------------------------------
                // REMOVE INTERACTION
                // --------------------------------

                interactionManager.removeInteractable(
                    cabinetInteraction
                );


                interactionManager.clearInteraction();

            },

        });


    // ====================================
    // REGISTER INTERACTION
    // ====================================

    interactionManager.addInteractable(
        cabinetInteraction
    );


    return cabinetInteraction;
}


// ====================================
// DOOR ANIMATION
// ====================================

function openCabinetDoor(
    doorPivot,
    onComplete
) {

    const startRotation =
        doorPivot.rotation.y;


    // Positive 90 degrees
    // opens the door outward
    // from the right-side hinge.

    const targetRotation =
        Math.PI / 2;


    const duration =
        700;


    const startTime =
        performance.now();


    function animateDoor(
        currentTime
    ) {

        const elapsed =
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        // Smooth ease-out

        const easedProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        doorPivot.rotation.y =
            startRotation +
            (
                targetRotation -
                startRotation
            ) *
            easedProgress;


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                animateDoor
            );

            return;
        }


        doorPivot.rotation.y =
            targetRotation;


        if (onComplete) {
            onComplete();
        }

    }


    requestAnimationFrame(
        animateDoor
    );
}