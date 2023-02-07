$(document).ready(function () {
  ordersList();
});

function ordersList() {
  let statusArray = ['출고 준비', '출고 완료', '배송 중', '배송 완료', '주문 취소']
  $.ajax({
    type: "GET",
    url: `/api/orders/list`,
    data: {},
    success: function (response) {
      console.log(response);
      response.forEach(element => {
        let temp_html = `<table style="margin: 20px auto 0 auto">
                          <tr>
                            <td class="head-number">1</td>
                            <td style="width: 150px">
                              <img
                                src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbDGzHg%2FbtrXSxfvtYG%2FjgfqXjHXsLbtek9yidftEk%2Fimg.png"
                                class="img-thumbnail product-img"
                                alt="..."
                              />
                            </td>
                            <td style="width: 300px; padding-left: 20px">
                              <div class="card" style="width: 18rem">
                                <ul class="list-group list-group-flush">
                                  <li class="list-group-item">주문 번호: ${element.id}</li>
                                  <li class="list-group-item">주 소: 우리집</li>
                                  <li class="list-group-item">주문 일자: ${element.createdAt
                                  }</li>
                                  <li class="list-group-item">배송 상태: ${statusArray[element.status]}</li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <button type="button" class="btn btn-success" style="margin-left: 20px">조회</button>
                              <button type="button" class="btn btn-danger">취소</button>
                            </td>
                          </tr>
                        </table>`
          $("#orderHistory").append(temp_html);
      });
    },
  });
}
