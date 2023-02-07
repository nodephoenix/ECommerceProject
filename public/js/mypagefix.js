
function userModify(){
    const userName=$("#userName").val()
    console.log(userName)
    const phone=$("#phone").val()
    console.log(phone)
    const address=$("#address").val()
    console.log(address)
    $.ajax({
        type: "PUT",
        url: "/api/users/mypage",
        data: {userName, phone, address},
        success: function (response) {
           alert(response.message)
        }
})}
