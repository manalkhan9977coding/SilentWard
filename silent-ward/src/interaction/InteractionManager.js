import * as THREE from "three";

import {
    showInteractionPrompt,
    hideInteractionPrompt,
    setCrosshairActive,
    setCrosshairInactive,
} from "../ui/interactablePrompt.js";


export class InteractionManager {

    constructor({
        camera,
        scene,
    }) {

        this.camera = camera;
        this.scene = scene;

        this.raycaster =
            new THREE.Raycaster();

        this.interactables = [];

        this.currentInteractable = null;

        this.maxDistance = 3;

        this.prompt = null;

        this.setupInput();
    }


    setPrompt(prompt) {
        this.prompt = prompt;
    }


    addInteractable(interactable) {
        this.interactables.push(
            interactable
        );
    }


    setupInput() {

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.code === "KeyE" &&
                    !event.repeat
                ) {
                    this.interact();
                }

            }
        );
    }


    update() {

        if (!this.camera) {
            return;
        }

        this.raycaster.setFromCamera(
            new THREE.Vector2(0, 0),
            this.camera
        );


        const objects =
            this.interactables.map(
                (item) => item.object
            );


        const intersections =
            this.raycaster.intersectObjects(
                objects,
                true
            );


        if (intersections.length === 0) {

            this.clearInteraction();

            return;
        }


        const hit =
            intersections[0];


        if (
            hit.distance >
            this.maxDistance
        ) {

            this.clearInteraction();

            return;
        }


        const interactable =
            this.findInteractable(
                hit.object
            );


        if (!interactable) {

            this.clearInteraction();

            return;
        }


        this.currentInteractable =
            interactable;

        showInteractionPrompt(
            this.prompt,
            this.currentInteractable.interactionText
        );

        setCrosshairActive();
    }


    findInteractable(object) {

        let current = object;

        while (current) {

            const interactable =
                this.interactables.find(
                    (item) =>
                        item.object === current
                );


            if (interactable) {
                return interactable;
            }


            current =
                current.parent;
        }


        return null;
    }

    removeInteractable(
        interactable
    ) {

        const index =
            this.interactables.indexOf(
                interactable
            );


        if (index === -1) {
            return;
        }


        this.interactables.splice(
            index,
            1
        );


        if (
            this.currentInteractable ===
            interactable
        ) {

            this.clearInteraction();

        }

    }


    clearInteraction() {

        this.currentInteractable =
            null;

        if (this.prompt) {
            hideInteractionPrompt(
                this.prompt
            );
        }

        setCrosshairInactive();
    }


    interact() {

        if (
            !this.currentInteractable
        ) {
            return;
        }

        this.currentInteractable.interact();
    }
}