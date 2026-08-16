export function createCrosshair() {
  const crosshair =
    document.createElement("div");

  crosshair.id = "crosshair";

  document.body.appendChild(
    crosshair
  );

  return crosshair;
}

export function setCrosshairActive() {

  const crosshair =
    document.getElementById(
      "crosshair"
    );

  if (!crosshair) {
    return;
  }

  crosshair.classList.add(
    "active"
  );
}


export function setCrosshairInactive() {

  const crosshair =
    document.getElementById(
      "crosshair"
    );

  if (!crosshair) {
    return;
  }

  crosshair.classList.remove(
    "active"
  );
}

export function createInteractionPrompt() {
  const prompt = document.createElement("div");

  prompt.id = "interaction-prompt";

  prompt.textContent = "Press E to interact";

  document.body.appendChild(prompt);

  return prompt;
}


export function showInteractionPrompt(
  prompt,
  text
) {
  prompt.textContent = text;
  prompt.style.display = "block";
}


export function hideInteractionPrompt(prompt) {
  prompt.style.display = "none";
}


// ------------------------------------
// GAME MESSAGE
// ------------------------------------

let messageTimeout = null;

export function showMessage(message) {

  let messageBox =
    document.getElementById(
      "game-message"
    );


  if (!messageBox) {

    messageBox =
      document.createElement("div");

    messageBox.id =
      "game-message";

    document.body.appendChild(
      messageBox
    );
  }


  messageBox.textContent =
    message;

  messageBox.style.display =
    "block";


  clearTimeout(
    messageTimeout
  );


  messageTimeout =
    setTimeout(() => {

      messageBox.style.display =
        "none";

    }, 4000);
}