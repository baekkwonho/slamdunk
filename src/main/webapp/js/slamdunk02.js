//메인페이지 로그인 버튼 눌렀을 때
var login_btn = document.querySelector(".login_btn");
login_btn.onclick = function() {
	$("#login_tap").removeClass("nonactive")
	$("#login_tap").addClass("active")
	$("#signup_tap").removeClass("active")
	$("#signup_tap").addClass("nonactive")
	$(".login_form").show()
	$(".signup_form").hide()
}
//메인페이지 회원가입 버튼 눌렀을 때
var signup_btn = document.querySelector(".signup_btn");
signup_btn.onclick = function(){
	$("#signup_tap").removeClass("nonactive")
	$("#signup_tap").addClass("active")
	$("#login_tap").removeClass("active")
	$("#login_tap").addClass("nonactive")
	$(".login_form").hide()
	$(".signup_form").show()
}
