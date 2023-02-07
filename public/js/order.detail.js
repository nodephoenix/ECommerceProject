$(document).ready(function () {
  orderDetail();
});

function orderDetail() {
  let query = window.location.search;
  let param = new URLSearchParams(query);
  let orderId = param.get("orderId");

  $.ajax({
    type: "GET",
    url: `/api/orders/${orderId}`,
    data: {},
    success: function (response) {
      let price = 0
      response.forEach(element => {
        let sumPrice = element.price * element.count
        price = price + sumPrice
        let temp_html = `<div>
                        <table style="margin: 20px auto 0 auto">
                          <tr>
                            <td style="width: 150px">
                              <img
                                src="${element.image}"
                                class="img-thumbnail product-img"
                                alt="..."
                              />
                            </td>
                            <td style="width: 300px">
                              <div class="card" style="width: 18rem">
                                <ul class="list-group list-group-flush">
                                  <li class="list-group-item">상품명: ${element.productName}</li>
                                  <li class="list-group-item">주문총액: ${sumPrice} 원</li>
                                  <li class="list-group-item">수량: ${element.count}개</li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        </table></div>`
        $("#orderDetailList").append(temp_html);
      });
      document.getElementById('orderPrice').innerHTML = `총 결제금액: ${price} 원`
    },
    error: function(error) {
      if(error.status === 401) {
        alert(error.responseJSON.errorMessage)
        return window.location.replace('/login')
      }
      alert(error.responseJSON)
    }
  });
}