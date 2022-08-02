let title = document.getElementById("Title");
let price = document.getElementById("Price");
let taxes = document.getElementById("Taxes");
let ads = document.getElementById("Ads");
let discount = document.getElementById("Discount");
let total = document.getElementById("total");
let count = document.getElementById("Count");
let category = document.getElementById("Category");
let createBTn = document.querySelector(".btn");
let mood = "create";
let temp;

// Function for get Total Price
function getTotalPrice() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "rgb(33, 145, 80)";
  } else {
    total.style.backgroundColor = "rgb(104, 8, 8)";
    total.innerHTML = "";
  }
}

// <---------------------------------------------------------------------------------------------------------->
// <---------------------------------------------------------------------------------------------------------->
// function to create product in localStorage
let productsCard;
if (localStorage.product != null) {
  productsCard = JSON.parse(localStorage.product);
} else {
  productsCard = [];
}
createBTn.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  // function for count products
  if (
    title.value != "" &&
    price.value != "" &&
    newProduct.price < 60000 &&
    category.value != "" &&
    newProduct.count <= 150
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          productsCard.push(newProduct);
        }
      } else {
        productsCard.push(newProduct);
      }
    } else {
      productsCard[temp] = newProduct;
      mood = "create";
      createBTn.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(productsCard));
  showData();
};
// <---------------------------------------------------------------------------------------------------------->
// <---------------------------------------------------------------------------------------------------------->
// Function to clear data from inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// <---------------------------------------------------------------------------------------------------------->
// <---------------------------------------------------------------------------------------------------------->
// Function to show data from inputs to outputs

function showData() {
  let table = "";
  for (i = 0; i < productsCard.length; i++) {
    table += `
  <tr>
  <td>${i + 1}</td>
  <td>${productsCard[i].title}</td>
  <td>${productsCard[i].price}</td>
  <td>${productsCard[i].taxes}</td>
  <td>${productsCard[i].ads}</td>
  <td>${productsCard[i].discount}</td>
  <td>${productsCard[i].total}</td>
  <td>${productsCard[i].category}</td>
  <td class="btn" onclick="updateData(${i})">update</td>
  <td class="btn" onclick="deleteProduct(${i})">delete</td>
</tr>
  `;
  }
  document.querySelector("#tbody").innerHTML = table;
  let BtnDelete = document.getElementById("deleteAll");
  if (productsCard.length > 0) {
    BtnDelete.innerHTML = `
    <button class="btn" onclick="deleteAll()">Delete All(${productsCard.length})</button>
    `;
  } else {
    BtnDelete.innerHTML = "";
  }
  getTotalPrice();
}
showData();
// <---------------------------------------------------------------------------------------------------------->
// <---------------------------------------------------------------------------------------------------------->
// function for remove data from outbut
function deleteProduct(i) {
  productsCard.splice(i, 1);
  localStorage.product = JSON.stringify(productsCard);
  showData();
}
// <---------------------------------------------------------------------------------------------------------->
// <---------------------------------------------------------------------------------------------------------->
// function for clear all data from outbut
function deleteAll() {
  localStorage.clear();
  productsCard.splice(0);
  showData();
}
// <---------------------------------------------------------------------------------------------------------->
// <---------------------------------------------------------------------------------------------------------->
// function for update Data
function updateData(i) {
  title.value = productsCard[i].title;
  price.value = productsCard[i].price;
  taxes.value = productsCard[i].taxes;
  ads.value = productsCard[i].ads;
  discount.value = productsCard[i].discount;
  getTotalPrice();
  count.style.display = "none";
  category.value = productsCard[i].category;
  createBTn.innerHTML = "update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// <---------------------------------------------------------------------------------------------------------->
// <---------------------------------------------------------------------------------------------------------->
// function for search  in button

let searchMood = "title";

function getSearchMood(id) {
  let searchBtn = document.getElementById("Search");
  if (id === "titleSearch") {
    searchMood = "title";
  } else {
    searchMood = "Category";
  }
  searchBtn.placeholder = "Search By " + searchMood;
  searchBtn.focus();
  searchBtn.value = "";
  showData();
}

function searchProduct(value) {
  let table = "";
  for (let i = 0; i < productsCard.length; i++) {
    let tableContent = `      <tr>
<td>${i}</td>
<td>${productsCard[i].title}</td>
<td>${productsCard[i].price}</td>
<td>${productsCard[i].taxes}</td>
<td>${productsCard[i].ads}</td>
<td>${productsCard[i].discount}</td>
<td>${productsCard[i].total}</td>
<td>${productsCard[i].category}</td>
<td class="btn" onclick="updateData(${i})">update</td>
<td class="btn" onclick="deleteProduct(${i})">delete</td>
</tr>`;
    if (searchMood == "title") {
      if (productsCard[i].title.includes(value.toLowerCase())) {
        table += `${tableContent}

      `;
      }
    } else {
      if (productsCard[i].category.includes(value.toLowerCase())) {
        table += `${tableContent}`;
      }
    }
  }

  document.querySelector("#tbody").innerHTML = table;
}
