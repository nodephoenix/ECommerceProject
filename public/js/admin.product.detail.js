$(document).ready(function () {
  adminProductList();
});

function adminProductList() {
  $.ajax({
    type: "GET",
    url: `/api/products`,
    data: {},
    success: function (response) {
      console.log(response);

      response.forEach((element) => {
        let temp_html = `    <table style="margin: 20px auto 0 auto">
                              <tr>
                                <td style="width: 150px">
                                  <img
                                    src=${element.image}
                                    class="img-thumbnail product-img"
                                    alt="..."
                                  />
                                </td>
                                <td style="width: 300px">
                                  <div class="card" style="width: 18rem">
                                      <ul class="list-group list-group-flush">
                                      <li class="list-group-item">상품번호: ${element.id}</li>
                                      <li class="list-group-item">카테고리: ${element.category}</li>
                                      <li class="list-group-item">상품명: ${element.productName}</li>
                                      <li class="list-group-item">가격: ${element.price}원</li>
                                    </ul>
                                  </div>
                                </td>
                                <td style="width: 180px">
                                  <nav>
                                    <button
                                      type="button"
                                      class="btn btn-primary"
                                      style="margin-left: 30px"
                                      onclick="location.href='fix'"
                                    >
                                      수정
                                    </button>
                                    <button type="button" class="btn btn-danger">삭제</button>
                                  </nav>
                                </td>
                              </tr>
                            </table>`;
        $("#adminProductList").append(temp_html);
      });
    },
  });
}

// 상품 수정

// 상품 삭제
