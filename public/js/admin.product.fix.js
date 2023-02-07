$(document).ready(function () {
  getProductDetail();
});

function getProductDetail() {
  let query = window.location.search;
  let param = new URLSearchParams(query);
  let productId = param.get("productId");

  $.ajax({
    type: "GET",
    url: `/api/products/${productId}`,
    data: {},
    success: function (response) {
      console.log(response);
      let productId = response.id;
      let productName = response.productName;
      let desc = response.desc;
      let price = response.price;
      let image = response.image;
      let temp_html = `      <div class="product-image inline-block">
      <img
        src="${image}"
        class="img-thumbnail product-img"
        alt="..."
      />
    </div>
    <!-- 텍스트 입력 -->
    <nav class="text-content">
      <div class="form-floating mb-3 input-content">
        <input type="productId" class="form-control" id="productId" />
        <label for="floatingInput">상품번호</label>
      </div>
      <div class="form-floating mb-3 input-content">
        <input type="productName" class="form-control" id="productName" />
        <label for="floatingInput">상품명</label>
      </div>
      <div class="form-floating mb-3 input-content">
        <input type="desc" class="form-control" id="desc" />
        <label for="floatingInput">설명</label>
      </div>
      <div class="form-floating mb-3 input-content">
        <input type="price" class="form-control" id="price" />
        <label for="floatingInput">가격</label>
      </div>
      <button type="button" class="btn btn-primary" style="font-size: 12px">
        이미지 업로드
      </button>
    </nav>`;
      $("#editItemInfo").append(temp_html);
      $("#productId").val(`${productId}`);
      $("#productName").val(`${productName}`);
      $("#desc").val(`${desc}`);
      $("#price").val(`${price}`);
    },
  });
}

// 상품 삭제
