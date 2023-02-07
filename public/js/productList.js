let page = 1
$(document).ready(function () {
  productList(page);
});

function productList(page) {
  let query = window.location.search; 
  let param = new URLSearchParams(query);
  if (page === 1) {
    let getPage = param.get('page');
    if (getPage === null) {
      page = page
    }
    else {
      page = getPage
    }
  }

  $.ajax({
    type: "GET",
    url: `/api/products/${page}`,
    data: {},
    success: function (response) {
      response.productsInfo.forEach((element) => {
        let temp_html = `<div class="col-sm-3">
                          <div class="card" style="width: 18rem; height: 450px">
                            <img src="${element.image}" class="card-img-top" alt="..." />
                            <div class="card-body">
                              <h5 class="card-title" style="font-weight: bold">${element.productName}</h5>
                              <p class="card-text">${element.desc}</p>
                              <p class="price" style="font-size: 13px">가격: ${element.price} 원</p>
                              <hr />
                              <a href="/product/detail?productId=${element.id}" class="btn btn-primary">상세 보기</a>
                            </div>
                          </div>
                        </div>`;
        $(".row").append(temp_html);
      });
      let pageNum = response.pageNum
      for (let i = 1; i < pageNum + 1 ; i++) {
       let temp_html = `<li class="page-item"><a class="page-link" href="?page=${i}">${i}</a></li>`
        $("#pageNum").append(temp_html);
      }

    },
  });
}
