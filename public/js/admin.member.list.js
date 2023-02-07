$(document).ready(function () {
  getMemberList();
});

function getMemberList() {
  $.ajax({
    type: "GET",
    url: `/api/users/list`,
    data: {},
    success: function (response) {
      console.log(response);
    },
  });
}
