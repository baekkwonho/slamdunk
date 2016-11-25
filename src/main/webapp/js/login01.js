//로그인 탭 누를 경우
$("#login_tap").click(function() {
	$("#login_tap").removeClass("nonactive")
	$("#login_tap").addClass("active")
	$("#signup_tap").removeClass("active")
	$("#signup_tap").addClass("nonactive")
	$(".login_form").show()
	$(".signup_form").hide()
})

//회원가입 태 누를 경우
$("#signup_tap").click(function() {
	$("#signup_tap").removeClass("nonactive")
	$("#signup_tap").addClass("active")
	$("#login_tap").removeClass("active")
	$("#login_tap").addClass("nonactive")
	$(".signup_form").show()
	$(".login_form").hide()
})


//로그인 버튼 누를경우
$("#login_btn").click(function() {
	var user = {
			email : $("#email").val(),
			password : $("#password").val(),
			saveEmail : $("#saveEmail").is(":checked")  // 체크박스 만들어서 값 받아와야함.
	}
	
	console.log(user);
	
	ajaxLogin(user);
});

//로그인 처리
function ajaxLogin(user) {
	$.ajax({
		url: serverAddr + "/auth/login.json",
		method: "POST",
		dataType: "json",
		data: user,
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("로그인 실패입니다.\n이메일 또는 암호를 확인하세요.")
				return
			}
			window.location.href="slamdunk01.html"
		}
	})
}