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


//로그인 버튼 누를경우(user라는 객체를 만들었다.)
$("#login_btn").click(function(){
	var user ={
 		email : $("#email").val(),
 		password : $("#password").val(),
 		saveEmail : $("#saveEmail").is(":checked")
	}
	ajaxLogin(user);

})
//회원가입 버튼을 누를 경우

$('#signup_btn').click(function(){
	if($('#new_email').val()===""){
		alert('이메일을 입력해주세요.');
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
	ajaxSignup(newUser);
})
//회원가입 정보 추가
function ajaxSignup(user){
	$.ajax({
		url : serverAddr+"/auth/signup.json",
		data : user,
		method : "POST",
		dataType : "json",
		success : function(obj){
			var result = obj.jsonResult;
			console.log(result);
			if(result.state !== "success"){
				alert("회원가입 실패 입니다.");
				return;
			}
			alert("slamdunk에 오신것을 환영합니다.")
			window.location.reload();
		}
	})
}

//이메일 중복확인 버튼을 눌렀을 경우
$('#confirm_emailbtn').click(function(){
	if($('#new_email').val().split("@").length===1 || $('#new_email').val().split('@').length>2 || $('#new_email').val().split('@')[1].split('.').length===1 || $('#new_email').val().split('@')[1].split('.').length>2 || $("#new_email").val()=== ""){
	alert('이메일 양식이 아닙니다.');
	return;
	 }	
	var confirm_email={
		email : $('#new_email').val()
	}
	ajaxConfirmEmail(confirm_email);

})
//이메일 중복 확인
function ajaxConfirmEmail(email){
	$.ajax({
		url : serverAddr+"/auth/confirmemail.json",
		method : "POST",
		dataType : "json",
		data : email,
		success : function(obj){
			var result = obj.jsonResult;
			if(result.state !== "success"){
				alert("이메일이 이미 있습니다.");
				return;
			}
			alert("사용가능한 이메일 입니다.");
			check = true;
		}
	})
}

//닉네임 중복확인 버튼을 눌렀을 경우
$('#confirm_nickbtn').click(function(){
	var confirm_nickname = {
		nickname : $('#new_nickname').val()
	}

	ajaxConfirmNickname(confirm_nickname)
})
//닉네임 중복확인
function ajaxConfirmNickname(nickname){
	$.ajax({
		url : serverAddr+"/auth/confirmnickname.json",
		method : "POST",
		dataType : "json",
		data : nickname,
		success : function(obj){
			var result = obj.jsonResult;
			if(result.state !== "success"){
				alert("닉네임이 이미 있습니다.");
				return;
			}
			alert("사용가능한 닉네임 입니다.");
			nick_check = true;
		}
	})
}

//로그인 처리(제이쿼리에서 제공하는 ajax사용)
function ajaxLogin(user){
	$.ajax({
		url : serverAddr+"/auth/login.json",
		method : "POST",
		dataType : "json",
		data : user,
		success : function(obj){
			var result = obj.jsonResult;
			if(result.state !== "success"){
				alert("로그인 실패입니다.\n이메일 또는 암호를 확인하세요.");
				return;
			}
		window.location.reload();
		}
	})
}


//마이페이지 버튼 누를 경우
$(".mypage_btn").click(function(){
	window.location.href="mypage.html"
})

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
function ajaxLogout(){
	$.ajax({
		url : serverAddr+"/auth/logout.json",
		method : "POST",
		dataType : "json",
		success : function(obj){	
			var result = obj.jsonResult;
			if(result.state !== "success"){
				alert("로그아웃 실패 입니다.");
				return;
			}
			window.location.reload();
		}
	})
}

//로그인 정보 확인
function ajaxLoginUser(){
	 $.ajax({
	 	url : serverAddr+"/auth/loginuser.json",
	 	method : "GET",
	 	dataType : "json",
	 	success : function(obj){
	 		var result = obj.jsonResult;
	 		if(result.state !== "success"){
	 			$("#icon").hide();
	 			$(".loginUser_form").hide();
	 			$(".login_btn").show();
	 			$(".signup_btn").show();
	 			if ($("header ul").length === 1) {
	 				$("header ul").css("right", "180px");
	 			}
	 			return;
	 		};

	 		$("#icon").show();
	 		$(".loginUser_form").hide();
	 		$("#icon").click(function(){
	 			$(".loginUser_form").toggle();
	 			
	 		});


	 		$(".login_btn").hide();
	 		$(".signup_btn").hide();
	 		$(".nickname strong").text(result.data.nickname);

	 		ajaxMatchRequest();
	 	}
	})
};
	function ajaxMatchRequest(){
		$.ajax({
			url : serverAddr+"/matchteam/list.json",
			method : "GET",
			dataType : "json",
			success : function(obj){
				var result = obj.jsonResult;
				if(result.state !== "success"){
					alert("요청을 불러오지 못했습니다.");
					return;
				}
				console.log(result);
				var str = "";
				for(var i=0;i<result.data.length;i++){
					str+="<div class='add'><p class='date'>"+result.data[i].match_date+"</p><p class='teamname'>"+result.data[i].reqTeamname+"</p><span class='request'>Try Battle Now?</span><div class='add_btn'><button type='button' class='ok_btn' data-no='"+result.data[i].mtno+"'>Ok</button><button type='button' class='no_btn' data-no='"+result.data[i].mtno+"'>No</button></div></div>"
				}
				$(".match_request").html(str);
				$(".match_request").css({
					"background" : "#e09115",
					'border-bottom-right-radius': 10,
					'border-bottom-left-radius': 10
				});

				$(".ok_btn").click(function(){
					ajaxOkrequest($(this).attr("data-no"));
				});
				$(".no_btn").click(function(){
					ajaxNorequest($(this).attr("data-no"));
				});
			}

		})
	}
			function ajaxOkrequest(datano){
			$.ajax({
				url : serverAddr+"/matchteam/ok.json",
				method : "GET",
				dataType : "json",
				data: {mtno : datano},
				success : function(obj){
					var result = obj.jsonResult;
					if(result.state !== "success"){
						alert("수락이 실패 했습니다.");
						return;
					}
					window.location.reload();
				}
			})
		}
		function ajaxNorequest(datano){
			$.ajax({
				url : serverAddr+"/matchteam/no.json",
				method : "GET",
				dataType : "json",
				data: {mtno : datano},
				success : function(obj){
					var result = obj.jsonResult;
					if(result.state !== "success"){
						alert("거절이 실패 했습니다.");
						return;
					}
					window.location.reload();
				}
			})
		}

// <!--save email-->
//쿠키를 이용해서 로그인 정보가 있는지 확인
function init() {
	var cookieMap = cookieToObject();
	
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

