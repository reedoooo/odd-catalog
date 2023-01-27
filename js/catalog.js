/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
state.cart = new Cart([]);

// On screen load, we call this method to put all of the product options
// (the things in the state.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product -- DONE
  const selectElement = document.getElementById('items');

  for (let i in state.allProducts) {
    let optionEl = document.createElement('option');
    optionEl.textContent = state.allProducts[i].name;
    optionEl.setAttribute('name', state.allProducts[i].name);
    optionEl.setAttribute('class', state.allProducts[i].filePath);

    selectElement.appendChild(optionEl);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading -- DONE
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart(event);
  state.cart.saveToLocalStorage();
  state.cart.updateCounter();
  updateCartPreview(event);

}

// TODO: Add the selected item and quantity to the cart -- DONE
function addSelectedItemToCart(event) {
  let addedItem = state.cart.addItem(event.target.items.value, event.target.quantity.value);
  state.cart.items.push(addedItem);
  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview(event) {
  // TODO: Get the item and quantity from the form -- DONE
  let item = event.target.items.value;
  let quantity = event.target.quantity.value;
  // TODO: Add a new element to the cartContents div with that information -- DONE
  let sectionEl = document.createElement('section');
  let itemNameEl = document.createElement('h5');
  let quantityEl = document.createElement('h6');

  itemNameEl.textContent = item;
  quantityEl.textContent = quantity;

  sectionEl.appendChild(itemNameEl);
  sectionEl.appendChild(quantityEl);

  document.getElementById('cartContents').appendChild(sectionEl);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
