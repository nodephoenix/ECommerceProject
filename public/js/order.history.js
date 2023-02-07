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
      
      response.forEach(element => {
        let temp_html = `<table style="margin: 20px auto 0 auto">
                          <tr>
                            <td style="width: 300px; padding-left: 20px">
                              <div class="card" style="width: 18rem">
                                <ul class="list-group list-group-flush">
                                  <li class="list-group-item">주문 번호: ${element.id}</li>
                                  <li class="list-group-item">주 소: ${element.User.address}</li>
                                  <li class="list-group-item">주문 일자: ${element.createdAt}</li>
                                  <li class="list-group-item">배송 상태: ${statusArray[element.status]}</li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <button type="button" class="btn btn-success" style="margin-left: 20px" onclick="location.href='/order/detail?orderId=${element.id}'">조회</button>
                              <button type="button" class="btn btn-danger" id="cancel" onclick="cancelOrder(${element.id})">취소</button>
                            </td>
                          </tr>
                        </table>`
          $("#orderHistory").append(temp_html);
      });
    },
    error: function(error) {
      if(error.status === 401) {
        alert(error.responseJSON.errorMessage)
        return window.location.replace('/login')
      }
      alert(error.responseJSON.errorMessage)
    }
  });
}

function cancelOrder(orderId){
  $.ajax({
    type: "PUT",
    url: `/api/orders/${orderId}`,
    data: {},
    success: function (response) {
      alert(response)
      window.location.replace('/order/history')
    },
    error: function(error) {
      alert(error.responseJSON)
      window.location.replace('/order/history')
    }
  })
}
