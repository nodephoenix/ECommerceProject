$(document).ready(function () {
  adminOrderProducts();
});

function adminOrderProducts() {
  $.ajax({
    type: "GET",
    url: `/api/admin/products`,
    data: {},
    success: function (response) {
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        let orderId = response[i]["id"];
        let productName = response[i]["items"][0]["productName"];
        console.log(productName);
      }
    },
  });
}
