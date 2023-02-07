$(document).ready(function () {
  adminOrderProducts();
});

function adminOrderProducts() {
  $.ajax({
    type: "GET",
    url: "/api/admin/products",
    data: {},
    success: function (response) {
      let statusArray = [
        "출고 준비",
        "출고 완료",
        "배송 중",
        "배송 완료",
        "주문 취소",
      ];
      response.forEach((element) => {
        let temp_html = `    <table style="margin: 20px auto 0 auto">
                              <tr>
                                <td style="width: 150px">
                                  <img
                                    src="${element.items[0].image}"
                                    class="img-thumbnail product-img"
                                    alt="..."
                                  />
                                </td>
                                <td style="width: 300px">
                                  <div class="card" style="width: 18rem">
                                      <ul class="list-group list-group-flush">
                                      <li class="list-group-item">주문 번호: ${
                                        element.id
                                      }<span></li>
                                      <li class="list-group-item">주문 일자: ${
                                        element.createdAt
                                      }</li>
                                      <li class="list-group-item">상태: <span id="status">${
                                        statusArray[element.status]
                                      }</span></li>
                                    </ul>
                                  </div>
                                </td>
                                <td style="width: 180px">
                                  <nav>
                                    <button
                                      type="button"
                                      class="btn btn-primary"
                                      style="margin-left: 30px"
                                      onclick="changeStatus(${element.id})"
                                    >
                                      수정
                                  </nav>
                                </td>
                              </tr>
                            </table>`;
        $("#adminProductList").append(temp_html);
      });
    },
  });
}

// 배송 상태 수정
function changeStatus(orderId) {
  $.ajax({
    type: "PUT",
    url: `/api/admin/order/status/${orderId}`,
    data: { orderId },
    success: function (response) {
      alert("배송 상태가 변경되었습니다.");
      window.location.reload();
    },
  });
}
