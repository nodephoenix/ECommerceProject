$(document).ready(function () {
  productDetail();
});

function productDetail() {
  let query = window.location.search;
  let param = new URLSearchParams(query);
  let productId = param.get("productId");
  console.log(productId)
  $.ajax({
    type: "GET",
    url: `/api/products/detail/${productId}`,
    data: {},
    success: function (response) {
      console.log(response)
      let temp_html = `<div class="product-description">
                        <div class="product-image">
                          <img
                            src="${response.image}"
                            class="img-thumbnail product-img"
                            alt="..."
                          />
                        </div>
                        <!-- 상품설명 -->
                        <div class="product-details">
                          <hr />
                          <br />
                          <h2>${response.productName}</h2>
                          <p>${response.desc}</p>
                          <h3>가격: ${response.price}</h3>
                          <br />
                          <div class="counter">
                            <li class="list-group-item">
                              수량: <button type="button" class="btn btn-outline-primary" id="minus" onclick=" minus()">-</button>
                              <span id="count">1</span>
                              <button type="button" class="btn btn-outline-primary" id="plus" onclick="plus()">+</button>
                            </li>
                          </div>
                          <button type="button" class="btn btn-success" onclick="order(${response.id})">구매하기</button>
                          <button type="button" class="btn btn-success" style="margin-left: 20px" onclick="putCart(${response.id})">카트담기</button>
                        </div>
                      </div>`;
      $(".detail").append(temp_html);
    },
    error: function(error) {
      alert(error.responseJSON.errorMessage)
    }
  });
}
function plus () {
  let count = document.getElementById('count').innerText
  return document.getElementById('count').innerText = Number(count) + 1
}

function minus () {
  let count = document.getElementById('count').innerText
  if(count <= 1) {
    return count
  }
  return document.getElementById('count').innerText = Number(count) - 1
}
function order(productId){
  let count = Number(document.getElementById('count').innerText)

  $.ajax({
    type: "POST",
    url: `/api/orders`,
    data: {productId : productId , count : count },
    success: function (response) {
      alert(response)
      window.location.replace('/')
    },
    error: function(error) {
      if(error.status === 401){
        alert(error.responseJSON.errorMessage)
        window.location.replace('/login')
      }
      alert(error.responseJSON.errorMessage)
    }
  })
}

function putCart(productId){
  let count = Number(document.getElementById('count').innerText)

  $.ajax({
    type: "POST",
    url: `/api/carts/${productId}`,
    data: {count : count},
    success: function (response) {
      alert(response.message)
    },
    error: function(error) {
      alert(error.responseJSON.errorMessage)
    }
  })
}
