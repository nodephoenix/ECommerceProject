$(document).ready(function () {
  productList();
});

function productList() {
  $.ajax({
    type: "GET",
    url: `/api/products`,
    data: {},
    success: function (response) {
      console.log(response);

      response.forEach((element) => {
        let temp_html = `<div class="col">
                          <a href="/product/detail?productId=${element.id}" style="color: black;">
                            <div class="card h-100">
                              <img src=${element.image} class="card-img-top" alt="...">
                              <div class="card-body">
                                <h5 class="card-title">${element.productName}</h5>
                                <p class="card-text">${element.desc}</p>
                              </div>
                              <div class="card-footer">
                                <small class="text-muted">Point : ${element.price} 가운데 정렬 해주세오 ,,</small>
                              </div>
                            </div>
                          </a>
                        </div>`;
        $("#productList").append(temp_html);
      });
    },
  });
}
