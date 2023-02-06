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
      
      response.forEach(element => {
        let productName = element.productName
        let desc = element.desc
        let price = element.price
        let image = element.image
        let productId = element.id
        
        let temp_html =`<div class="col">
                          <a href="/product/detail?productId=${productId}" style="color: black;">
                            <div class="card h-100">
                              <img src=${image} class="card-img-top" alt="...">
                              <div class="card-body">
                                <h5 class="card-title">${productName}</h5>
                                <p class="card-text">${desc}</p>
                              </div>
                              <div class="card-footer">
                                <small class="text-muted">Point : ${price} 가운데 정렬 해주세오 ,,</small>
                              </div>
                            </div>
                          </a>
                        </div>`
          $('#productList').append(temp_html) 
      });
    },
  });
}
