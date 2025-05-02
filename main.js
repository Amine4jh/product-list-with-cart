import { data } from "data.js";

const productsContainer = document.querySelector(".desserts .products");
const cartProducts = document.querySelector(".produits");
let finalPrice = document.querySelector(".order-total span");
var allQuantities = document.getElementById("quantity");
let modalPrice = document.querySelector(".modal .order-total span");
let modalProducts = document.querySelector(".modal-content .produits");
let modal = document.querySelector(".modal");
let startNewOrder = document.querySelector(".new-order");
const confirmOrder = document.querySelector(".confirm");
var quantityCount = 0;

for (let i of data) {
  // Create Item (Product) And Append It In The Page
  let item = document.createElement("div");
  let itemImage = document.createElement("div");
  let itemAddButton = document.createElement("div");
  let addToCartIcon = document.createElement("img");
  let addToCartTitle = document.createElement("span");
  let itemContent = document.createElement("div");
  let itemCategory = document.createElement("p");
  let itemName = document.createElement("h4");
  let itemPrice = document.createElement("span");
  let itemPriceValue = document.createElement("span");
  item.classList.add("item");
  itemImage.classList.add("item-img");
  itemAddButton.classList.add("add-button");
  itemContent.classList.add("item-content");
  itemCategory.id = "category";
  itemName.id = "name";
  itemPriceValue.id = "price";
  itemImage.style.backgroundImage = `url(${i.image.desktop})`;
  addToCartIcon.src = "assets/images/icon-add-to-cart.svg";
  addToCartTitle.innerText = "Add to Cart";
  itemCategory.innerText = i.category;
  itemName.innerText = i.name;
  itemPrice.innerText = "$";
  itemPriceValue.innerText = i.price.toFixed(2);
  item.appendChild(itemImage);
  itemAddButton.appendChild(addToCartIcon);
  itemAddButton.appendChild(addToCartTitle);
  item.appendChild(itemAddButton);
  itemContent.appendChild(itemCategory);
  itemContent.appendChild(itemName);
  itemPrice.appendChild(itemPriceValue);
  itemContent.appendChild(itemPrice);
  item.appendChild(itemContent);
  productsContainer.appendChild(item);

  // Create Elements When Click On "Add to Cart"
  let quantity = document.createElement("span");
  let plusIcon = document.createElement("img");
  let minusIcon = document.createElement("img");
  minusIcon.src = "assets/images/icon-decrement-quantity.svg";
  plusIcon.src = "assets/images/icon-increment-quantity.svg";
  minusIcon.classList.add("plus-minus");
  plusIcon.classList.add("plus-minus");

  // When Click + or -
  let count = 1;
  plusIcon.addEventListener("click", () => {
    count++;
    quantityCount++;
    allQuantities.innerText = quantityCount;
  });
  minusIcon.addEventListener("click", () => {
    count--;
    quantityCount--;
    allQuantities.innerText = quantityCount;
  });

  // Create Cart Product Elements
  let product = document.createElement("div");
  let productInformations = document.createElement("div");
  let productName = document.createElement("h6");
  let productQuantity = document.createElement("span");
  let productPrice = document.createElement("span");
  let productTotalPrice = document.createElement("span");
  let cancelIcon = document.createElement("img");
  product.classList.add("product");
  productInformations.classList.add("product-informations");
  productQuantity.classList.add("product-quantity");
  productPrice.classList.add("price-for-one");
  productTotalPrice.classList.add("all-quantities-price");
  cancelIcon.src = "assets/images/icon-remove-item.svg";
  productInformations.appendChild(productName);
  productInformations.appendChild(productQuantity);
  productInformations.appendChild(productPrice);
  productInformations.appendChild(productTotalPrice);
  product.appendChild(productInformations);
  product.appendChild(cancelIcon);
  // When Click On x Icon (Cancel)
  cancelIcon.addEventListener("click", function () {
    itemAddButton.removeChild(minusIcon);
    itemAddButton.removeChild(quantity);
    itemAddButton.removeChild(plusIcon);
    itemAddButton.appendChild(addToCartIcon);
    itemAddButton.appendChild(addToCartTitle);
    itemAddButton.classList.remove("add-clicked");
    itemAddButton.classList.add("add-button");
    itemImage.classList.remove("img-focus");
    itemImage.classList.add("item-img");
    count = 1;
    cartProducts.removeChild(product);
    if (cartProducts.children.length === 0) {
      cartProducts.parentElement.previousElementSibling.classList.remove(
        "remove-empty-cart"
      );
      cartProducts.parentElement.classList.remove("add-full-cart");
    }
    calculOrderTotal();
  });

  // When Click On "Confirm"
  let modalProduit = document.createElement("div");
  let modalProdInfo = document.createElement("div");
  let modalProdImg = document.createElement("div");
  let modalDiv = document.createElement("div");
  let modalProdName = document.createElement("h6");
  let modalProdQuan = document.createElement("span");
  let modalProdPrice = document.createElement("span");
  let modalProdAllPrice = document.createElement("span");
  modalProduit.classList.add("product");
  modalProdInfo.classList.add("modal-prod-info");
  modalProdImg.classList.add("product-img");
  modalProdQuan.classList.add("product-quantity");
  modalProdPrice.classList.add("price-for-one");
  modalProdAllPrice.classList.add("all-quantities-price");
  modalDiv.appendChild(modalProdName);
  modalDiv.appendChild(modalProdQuan);
  modalDiv.appendChild(modalProdPrice);
  modalProdInfo.appendChild(modalProdImg);
  modalProdInfo.appendChild(modalDiv);
  modalProduit.appendChild(modalProdInfo);
  modalProduit.appendChild(modalProdAllPrice);
  modalProdImg.style.backgroundImage = `url(${i.image.thumbnail})`;
  modalProdName.innerText = i.name;
  modalProdPrice.innerText = `@ ${i.price.toFixed(2)}`;

  confirmOrder.addEventListener("click", function () {
    modal.classList.remove("active-none");

    if (item.children[1].classList.contains("add-clicked")) {
      modalProducts.appendChild(modalProduit);
      modalProdQuan.innerText = `x${count}`;
      modalProdAllPrice.innerText = `$${(i.price * count).toFixed(2)}`;
    }
  });

  // Add Event When Click On "Add to Cart"
  itemAddButton.addEventListener("click", function () {
    if (itemAddButton.children[0] === addToCartIcon && count === 1) {
      itemAddButton.removeChild(addToCartIcon);
      itemAddButton.removeChild(addToCartTitle);
      itemAddButton.appendChild(minusIcon);
      itemAddButton.appendChild(quantity);
      itemAddButton.appendChild(plusIcon);
      itemAddButton.classList.remove("add-button");
      itemAddButton.classList.add("add-clicked");
      itemImage.classList.add("img-focus");
      itemImage.classList.remove("item-img");
      quantityCount++;
      allQuantities.innerText = quantityCount;
    }
    quantity.innerText = count;

    // Add Cart Product To Cart
    productName.innerText = i.name;
    productQuantity.innerText = `x${count}`;
    productPrice.innerText = `@ $${i.price.toFixed(2)}`;
    productTotalPrice.innerText = `$${(count * i.price).toFixed(2)}`;
    cartProducts.appendChild(product);
    cartProducts.parentElement.previousElementSibling.classList.add(
      "remove-empty-cart"
    );
    cartProducts.parentElement.classList.add("add-full-cart");

    // When Cancel Product From - Icon (Minus)
    if (count === 0) {
      itemAddButton.removeChild(minusIcon);
      itemAddButton.removeChild(quantity);
      itemAddButton.removeChild(plusIcon);
      itemAddButton.appendChild(addToCartIcon);
      itemAddButton.appendChild(addToCartTitle);
      itemAddButton.classList.remove("add-clicked");
      itemAddButton.classList.add("add-button");
      itemImage.classList.remove("img-focus");
      itemImage.classList.add("item-img");
      count = 1;
      cartProducts.removeChild(product);
      if (cartProducts.children.length === 0) {
        cartProducts.parentElement.previousElementSibling.classList.remove(
          "remove-empty-cart"
        );
        cartProducts.parentElement.classList.remove("add-full-cart");
      }
    }
    calculOrderTotal();
    let modalOrderTotal = calculOrderTotal();
    modalPrice.innerText = modalOrderTotal;
  });
}

function calculOrderTotal() {
  let finalOrderTotal = 0;
  for (let p of cartProducts.children) {
    let oneProductAmount = parseFloat(
      p.firstElementChild.lastElementChild.innerText.split("$").join("")
    );
    finalOrderTotal += oneProductAmount;
  }
  return (finalPrice.innerText = finalOrderTotal.toFixed(2));
}

startNewOrder.addEventListener("click", function () {
  location.reload();
});
