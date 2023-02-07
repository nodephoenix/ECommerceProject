$(document).ready(function () {
  getMemberList();
});

function getMemberList() {
  let gradeArray = ["브론즈", "실버", "골드", "플래티넘", "다이아"];

  $.ajax({
    type: "GET",
    url: `/api/users/list`,
    data: {},
    success: function (response) {
      console.log(response);
      response.data.forEach((el) => {
        let temp_html = `<tr>
        <th scope="row">${el.id}</th>
        <td>${el.userName}</td>
        <td>${el.address}</td>
        <td>${el.phone}</td>
        <td>${gradeArray[el.grade]}</td>
        <td><select class="form-select" id="grade${
          el.id
        }" aria-label="Default select example">
        <option selected >등급 선택</option>
        <option value="0">브론즈</option>
        <option value="1">실버</option>
        <option value="2">골드</option>
        <option value="3">플래티넘</option>
        <option value="4">다이아</option>
        </select></td><td><button type="button" class="btn btn-primary" onclick="statusChange(${
          el.id
        })">변경</button>
              </tr>
            `;
        $("#memberList").append(temp_html);
      });
    },
  });
}

function statusChange(userId) {
  let grade = $(`#grade${userId}`).val();
  console.log(grade, "grade");
  $.ajax({
    type: "put",
    url: `/api/admin/user/${userId}/grade`,
    data: { grade },
    success: function (response) {
      alert(response.message);
      window.location.reload();
    },
    error: function (error) {
      alert(error.message);
    },
  });
}
