$(document).ready(function () {
    mypage()
});
function mypage() {
  $.ajax({
    type: "GET",
    url: "api/users/mypage",
    data: {},
    success: function (response) {
        console.log(response)
        let temp_html =`<div class="col-sm-4">
        <p><strong>이름:</strong> ${response.data.userName}</p>
        <p><strong>이메일:</strong> ${response.data.email}</p>
        <p><strong>주소:</strong> ${response.data.address}</p>
        <p><strong>전화번호:</strong> ${response.data.phone}</p>
        <button type="button" class="btn btn-primary" onclick="location.href='/mypage/fix'">수정</button>
      </div>`
      $("#mypage").append(temp_html)
    },
  });
}
