var check = false;
var nick_check = false;
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
//회원가입 버튼을 누를 경우
$('#signup_btn').click(function(){
	if($('#new_email').val()===""){
		alert('이메일을 입력해주세요.');
		return;
	}
	if($('#new_email').val().split("@").length===1 || $('#new_email').val().split('@').length>2 || $('#new_email').val().split('@')[1].split('.').length===1 || $('#new_email').val().split('@')[1].split('.').length>2){
		alert('이메일 양식이 아닙니다.');
		return;
	}
	//signup을 눌렀을때 중복확인을 안했을 경우.
	if(check === false){
		alert('이메일을 중복확인 하세요.');
		return;
	}
	if($('#new_password').val()!==$('#confirm_password').val()){
		alert('비밀번호를 확인해 주세요.');
		return;
	}
	if($('#new_password').val()===""){
		alert('비밀번호를 입력하세요.');
		return;
	}
	if($('#new_nickname').val()==="") {
		alert('닉네임을 입력하세요.');
		return;
	}
	if(nick_check === false){
		alert('닉네임 중복확인을 하세요.')
		return;
	}

	
	var newUser = {
		 email : $('#new_email').val(),
		password : $('#new_password').val(),
		nickname : $('#new_nickname').val()
	}
})
//이메일 중복확인 버튼을 눌렀을 경우
$('#confirm_btn').click(function(){
	var confirm_email={
		email : $('#new_email').val()
	}
	check = true;

})
//닉네임 중복확인 버튼을 눌렀을 경우
$('#confirm_nickbtn').click(function(){
	var confirm_nickname = {
		nickname : $('#new_nickname').val()
	}
	nick_check = true;
})


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