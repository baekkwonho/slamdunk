var check = false;
var nick_check = false;

//메인페이지 로그인 버튼 눌렀을 때
var login_btn = document.querySelector(".login_btn");
login_btn.onclick = function() {
	$("#login_tap").removeClass("nonactive")
	$("#login_tap").addClass("active")
	$("#signup_tap").removeClass("active")
	$("#signup_tap").addClass("nonactive")
	$(".login_form").show()
	$(".signup_form").hide()
	init();
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

//로그인 탭 누를 경우
$("#login_tap").click(function() {
	$("#login_tap").removeClass("nonactive")
	$("#login_tap").addClass("active")
	$("#signup_tap").removeClass("active")
	$("#signup_tap").addClass("nonactive")
	$(".login_form").show()
	$(".signup_form").hide()
})

//회원가입 탭 누를 경우
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
$('#confirm_emailbtn').click(function(){
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


//로그아웃 버튼 누를경우
$('.logout_btn').click(function() {
	ajaxLogout();
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
			window.location.reload();
		}
	})
}

//로그아웃 처리
function ajaxLogout() {
	$.post(serverAddr+"/auth/logout.json",function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("로그아웃 실패 입니다.")
			return
		}
		window.location.reload()
	})
}


//로그인 정보 확인
function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginuser.json", function(obj) {
		var result = obj.jsonResult
		
	    if (result.state != "success") {
	    	$('.logout_btn').hide();
	    	$(".login_btn").show();
	    	$(".signup_btn").show();
	    	return;
	    }
		$(".login_btn").hide();
		$(".signup_btn").hide();
		$(".loginUser_form").append("<p>"+result.data.nickname+"</p>");
		$(".loginUser_form").show();
		
  })
}


//쿠키를 이용해서 로그인 정보가 있는지 확인
function init() {
	var cookieMap = cookieToObject()
	
	if ("email" in cookieMap) { // cookieMap 객체에 email 이라는 이름의 프로퍼티가 있는가?
		$("#email").val(cookieMap["email"])
		$("#saveEmail").attr("checked", true)

	}
	
}
// init()함수에서 쓰일 함수 정의
function cookieToObject() {
		var cookies = document.cookie.split(";")
		var obj = {}
		
		if (cookies.length === 0) 
			return obj;
		
	    cookies.forEach(function(data) {
		  var cookie = data.trim().split("=")
		  obj[cookie[0]] = cookie[1].replace(/\"/gi, "")
	    });
	    
		return obj;
}

