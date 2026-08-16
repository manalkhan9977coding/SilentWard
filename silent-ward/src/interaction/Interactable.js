export class Interactable {
  constructor({
    object,
    name,
    interactionText,
    onInteract,
  }) {
    this.object = object;
    this.name = name;
    this.interactionText = interactionText;
    this.onInteract = onInteract;
  }

  interact() {
    if (this.onInteract) {
      this.onInteract();
    }
  }
}