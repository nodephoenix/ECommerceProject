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
      console.log(response)
      response.forEach(element => {
        let temp_html = ``
          $("#orderHistory").append(temp_html);
      });
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