
var productName=document.getElementById('pn');
var productPrice=document.getElementById('pp');
var productCategory=document.getElementById('pc');
var productDescription = document.getElementById('pd');
var allproducat;
var add = document.getElementById('add');

if (localStorage.getItem('allproducat')== null) {
  allproducat=[];
}
else {
  allproducat = JSON.parse(localStorage.getItem('allproducat'));
  displayedProducat(allproducat);
}
function producatAction() {
  if (validationName()) {
    var producat = {
      productName: productName.value,
      productPrice: productPrice.value,
      productCategory: productCategory.value,
      productDescription: productDescription.value,
    }
    if (add.innerHTML=='ADD') {
      
 
      allproducat.push(producat);
      localStorage.setItem('allproducat', JSON.stringify(allproducat));
      displayedProducat(allproducat);
    }
    else {
      allproducat.splice(temp, 1, producat);
      displayedProducat(allproducat);
      localStorage.setItem('allproducat', JSON.stringify(allproducat));
      add.innerHTML = 'ADD';
    }
  }
  else {
    alert('write the producat Name correctly');
  }
}

function displayedProducat(theArray) {
  var html = '';
  for (let i = 0; i < theArray.length; i++) {
    html+=`<tr>
    <td>${i + 1}</td>
    <td>${theArray[i].productName}</td>
    <td>${theArray[i].productPrice}</td>
    <td>${theArray[i].productCategory}</td>
    <td>${theArray[i].productDescription}</td>
    <td><button onclick="updateProducat(${i});" class="btn btn-outline-info btn-sm">update</button></td>
    <td><button class="btn btn-sm btn-outline-danger" onclick="deletedProduct(${i});">delete</button></td>
  </tr>`;
  }
  document.getElementById('tbody').innerHTML = html; 
}

function deletedProduct(index) {
  allproducat.splice(index, 1);
  displayedProducat(allproducat);
  localStorage.setItem('allproducat', JSON.stringify(allproducat));
}
var temp;
function updateProducat(index) {
  productName.value = allproducat[index].productName;
  productPrice.value = allproducat[index].productPrice;
  productCategory.value = allproducat[index].productCategory;
  productDescription.value = allproducat[index].productDescription;
  temp = index;
  add.innerHTML = 'UPDATE';
}
function search(trem) {
  var html = '';
  for (let i = 0; i < allproducat.length; i++) {
   if (allproducat[i].productName.toLowerCase().includes(trem.toLowerCase())) {
    html+=`<tr>
    <td>${i + 1}</td>
    <td>${allproducat[i].productName}</td>
    <td>${allproducat[i].productPrice}</td>
    <td>${allproducat[i].productCategory}</td>
    <td>${allproducat[i].productDescription}</td>
    <td><button class="btn btn-outline-info">update</button></td>
    <td><button class="btn btn-outline-danger" onclick="deletedProduct(${i});">delete</button></td>
  </tr>`;
   }
  }
  document.getElementById('tbody').innerHTML = html; 
}



function validationName() {
  var regx = /^[A-Z a-z]{2,15}$/;
  return regx.test(productName.value);
}