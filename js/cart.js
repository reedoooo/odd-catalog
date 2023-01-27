/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  state.cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}


// TODO: Remove all of the rows (tr) in the cart table (tbody) -- DONE
function clearCart() {
  let tableRows = document.querySelectorAll('#cart tbody tr');

  for (let i = 0; i <= tableRows.length; i++) {
    if (tableRows[i]) { 
      console.log('removing rows');
      tableRows[i].remove();
    }
  }

}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart -- DONE
function showCart() {
  // TODO: Find the table body -- DONE
  let tableBodyEl = document.querySelector('tbody');
  // TODO: Iterate over the items in the cart -- DONE
  for (let i = 0; i < state.cart.items.items.length; i++) {
    let rowEl = document.createElement('tr');
    let itemEl = document.createElement('td');
    let quantityEl = document.createElement('td');
    let deleteEl = document.createElement('td');
    let deleteButton = document.createElement('button');

    itemEl.textContent = state.cart.items.items[i].product;
    quantityEl.textContent = state.cart.items.items[i].quantity;
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('type', 'submit');
    deleteButton.setAttribute('id', state.cart.items.items.indexOf(state.cart.items.items[i]));
    deleteEl.appendChild(deleteButton);
    
    rowEl.appendChild(deleteEl);
    rowEl.appendChild(quantityEl);
    rowEl.appendChild(itemEl);

    tableBodyEl.appendChild(rowEl);

  }
  // TODO: Create a TR -- DONE
  // TODO: Create a TD for the delete link, quantity,  and the item -- DONE
  // TODO: Add the TR to the TBODY and each of the TD's to the TR -- DONE

}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  state.cart.removeItem(event.target.id);
  // TODO: Save the cart back to local storage
  state.cart.saveToLocalStorage();
  // TODO: Re-draw the cart table
  renderCart();

}

// This will initialize the page and draw the cart on screen
renderCart();