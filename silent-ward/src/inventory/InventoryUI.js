export function createInventoryUI() {

  let inventory =
    document.getElementById(
      "inventory"
    );

  if (inventory) {
    return inventory;
  }


  inventory =
    document.createElement("div");

  inventory.id =
    "inventory";

  inventory.innerHTML = `
    <div class="inventory-title">
      INVENTORY
    </div>

    <div
      id="inventory-items"
      class="inventory-items"
    ></div>
  `;


  document.body.appendChild(
    inventory
  );


  return inventory;
}


export function updateInventoryUI(
  inventory
) {

  const container =
    document.getElementById(
      "inventory-items"
    );


  if (!container) {

    console.error(
      "Inventory UI container not found."
    );

    return;
  }


  const items =
    inventory.getItems();


  console.log(
    "Updating inventory UI:",
    items
  );


  container.innerHTML = "";


  if (items.length === 0) {

    container.innerHTML = `
      <div class="inventory-empty">
        Empty
      </div>
    `;

    return;
  }


  for (const item of items) {

    const itemElement =
      document.createElement("div");


    itemElement.className =
      "inventory-item";


    itemElement.textContent =
      item.name;


    container.appendChild(
      itemElement
    );
  }
}