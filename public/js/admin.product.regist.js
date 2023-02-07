// 상품 등록
function registerProduct() {
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
    type: "post",
    url: "/api/admin/products",
    processData: false, // 데이터 객체를 문자열로 바꿀지에 대한 값이다. true면 일반문자...
    contentType: false,
    data: sendingData,
    success: function (response) {
      alert("상품이 등록되었습니다.");
      window.location.href = "/admin/product/list";
    },
    error: function (error) {
      alert(error.responseJSON.message);
    },
  });
}
