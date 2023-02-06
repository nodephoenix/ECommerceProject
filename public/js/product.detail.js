$(document).ready(function () {
  productDetail();
});

function productDetail() {
  let query = window.location.search;
  let param = new URLSearchParams(query);
  let productId = param.get('productId');

  $.ajax({
    type: "GET",
    url: `/api/products/${productId}`,
    data: {},
    success: function (response) {
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
                              수량: <button type="button" class="btn btn-outline-primary" id="minus">-</button> 1
                              <button type="button" class="btn btn-outline-primary" id="plus">+</button>
                            </li>
                          </div>
                          <button type="button" class="btn btn-success">구매하기</button>
                          <button type="button" class="btn btn-success" style="margin-left: 20px">카트담기</button>
                        </div>
                      </div>`
        $('.detail').append(temp_html) 
    },
  });
}
