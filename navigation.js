

function submitForm() {
    let admin = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    if(admin == "admin" && password == "123456") {
        alert("Bạn đã đăng nhập thành công !!!");
        location.href = "/front_web/index.html";
    }else {
        alert("Bạn đã nhập sai tài khoản hoặc mật khẩu !!!");
    }
}