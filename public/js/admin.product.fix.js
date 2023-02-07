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
    </nav>`;
      $("#editItemInfo").append(temp_html);
      $("#productId").val(`${productId}`);
      $("#productName").val(`${productName}`);
      $("#desc").val(`${desc}`);
      $("#price").val(`${price}`);
    },
  });
}

// 상품 수정하기 버튼 클릭 시 수정
function edtiProductDetail() {
  const productId = $("#productId").val();
  const productName = $("#productName").val();
  const desc = $("#desc").val();
  const price = $("#price").val();
  const image = $("#uploadImage")[0].files[0];

  const sendingData = new FormData();
  sendingData.append("productName", productName);
  sendingData.append("desc", desc);
  sendingData.append("image", image);
  sendingData.append("price", price);

  $.ajax({
    type: "put",
    url: `/api/admin/products/${productId}`,
    processData: false, // 데이터 객체를 문자열로 바꿀지에 대한 값이다. true면 일반문자...
    contentType: false,
    data: sendingData,
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
}
