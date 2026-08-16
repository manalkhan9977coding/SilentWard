import { Interactable } from "../interaction/Interactable.js";
import { showMessage } from "../ui/interactablePrompt.js";

export function createBedInteraction(bedModel) {

  return new Interactable({
    object: bedModel,

    name: "Hospital Bed",

    interactionText:
      "Press E to examine",

    onInteract: () => {

      showMessage(
        "The mattress is cold. Something feels wrong."
      );

    },
  });
}