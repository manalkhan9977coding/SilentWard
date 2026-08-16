import * as THREE from "three";
import { Interactable } from "../interaction/Interactable.js";

import {
    updateInventoryUI,
} from "../inventory/InventoryUI.js";


export function createHospitalKey(
    scene,
    inventory,
    interactionManager
) {

    const geometry =
        new THREE.BoxGeometry(
            0.15,
            0.15,
            0.8
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0xb0b0b0,
            metalness: 0.8,
            roughness: 0.3,
        });

    const key =
        new THREE.Mesh(
            geometry,
            material
        );


    key.position.set(
        1,
        1.2,
        -2
    );


    key.rotation.z =
        Math.PI / 2;


    scene.add(key);


    const keyItem = {
        id: "hospital_key",

        name: "Hospital Key",

        description:
            "An old key. The tag reads: Ward B.",
    };


    const keyInteraction =
        new Interactable({

            object: key,

            name: "Hospital Key",

            interactionText:
                "Press E to pick up",

            onInteract: () => {

                inventory.addItem(
                    keyItem
                );


                // Update inventory UI
                updateInventoryUI(
                    inventory
                );


                // Remove key from interaction system
                interactionManager.removeInteractable(
                    keyInteraction
                );


                // Remove key from world
                scene.remove(
                    key
                );


                // Clear interaction prompt
                interactionManager.clearInteraction();

            },

        });


    interactionManager.addInteractable(
        keyInteraction
    );


    return key;
}