function logout() {
  $.ajax({
    method: "POST",
    url: "/api/users/logout",
    data: {},
    success: function (response) {
      alert("로그아웃 완료!");
      window.location.replace("/login");
    },
    error: function (error) {
      alert("로그아웃에 실패하였습니다.");
    },
  });
}
