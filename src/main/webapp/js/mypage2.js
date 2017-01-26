$(function(){
	
	$('body').stop().animate({scrollTop:'0'});

	$('#mypage').click(function(){
		$("#mypage").addClass("active");
		$("#mypage").removeClass("nonactive");
		$("#teampage").removeClass("active");
		$("#teampage").addClass("nonactive");
		$('body').stop().animate({scrollTop : '0'},1500);

 	})
	
	$("#teampage").click(function(){
		$("#teampage").addClass("active");
		$("#teampage").removeClass("nonactive");
		$("#mypage").removeClass("active");
		$("#mypage").addClass("nonactive");
		$('body').stop().animate({scrollTop : '1100'},1500);
	})
	//사진 부분
	$(".photoBtn").click(function(){
		$(".file").click();
	});

	$(".file").fileupload({
		url : serverAddr + "/photo/add.json",
		dataType:"json",
		add : function(e,data){
			data.submit();
		},
		done: function(e,data){
			$(".originFileName").text(data.result.originFilename);
			$(".dataFileName").text(data.result.filename);	
			$(".left_form img").attr("src","/slamdunk/upload/"+data.result.filename);
		}

	});

	$(".defaultBtn").click(function(){
		$(".left_form img").attr("src","/slamdunk/images/bg05.jpg");
		$(".originFileName").text("");
		$(".dataFileName").text("default Image");
	});


	$(".commit_btn").click(function(){
		var gender = true;
		if(document.querySelector('input[name="gender"]:checked').value==="male"){
			gender = true;
		}else{
			gender = false;
		}
		
		var height = 0;
		if(document.querySelector(".height").value === ""){
			height = 0;
		}else{
			height=document.querySelector(".height").value;
		}
		
		var weight = 0;
		if(document.querySelector(".weight").value === ""){
			weight = 0;
		}else{
			weight=document.querySelector(".weight").value;
		}
		var position = document.querySelector("#position")
		if(document.querySelector(".password").value===""){
			var user = {
			no :document.querySelector("#id_email").getAttribute("data-no"),
			nickname:document.querySelector("#nickname").value,
			gender : gender,
			height:height,
			weight:weight,
			position:position.options[position.selectedIndex].value,
			skill:document.querySelector(".skill").value,
			photo_path:document.querySelector(".dataFileName").textContent
		}
		}else{
			var user = {
			no :document.querySelector("#id_email").getAttribute("data-no"),
			nickname:document.querySelector("#nickname").value,
			password:document.querySelector(".password").value,
			gender:gender,
			height:height,
			weight:weight,
			position:position.options[position.selectedIndex].value,
			skill:document.querySelector(".skill").value,
			photo_path:document.querySelector(".dataFileName").textContent
		}
		}
		console.log(user);
		ajaxCommit(user);
		
	})

	function ajaxCommit(user){
		$.ajax({
			url:serverAddr+"/auth/update.json",
			method:"POST",
			dataType:"json",
			data:user,
			success:function(obj){
				var result = obj.jsonResult;
				if(result.state !== "success"){
					alert("변경이 실패되었습니다.");
					return;
				}
				window.location.reload();
			}
		})
	}//서버에 변경된 값을 보내주는것.서버에 변경된것을 저장시켜달라고 요청.

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
	 			return;
	 		};
	 		$("#icon").show();
	 		$(".loginUser_form").hide();
	 		$("#icon").click(function(){
	 			$(".loginUser_form").toggle();	
	 		});
	 		console.log(result);
	 		
	 		if (result.data.photo_path !== null && result.data.photo_path !== "") {
	 			$(".photo_form img").attr("src","/slamdunk/upload/"+result.data.photo_path);
	 		}
	 		
	 		$(".nickname strong").text(result.data.nickname);
	 		$("#id_email").attr("data-no", result.data.no);
	 		$("#id_email").val(result.data.email);
	 		$("#nickname").val(result.data.nickname);
	 		if(result.data.height !== 0){
	 			$(".height").val(result.data.height);
	 		}
	 		if(result.data.weight !== 0){
	 			$(".weight").val(result.data.weight);
	 		}
	 		var position = document.querySelector("#position");
	 		for(var i=0;i<position.length;i++){
	 			if(position.options[i].value === result.data.position){
	 				position.options[i].setAttribute("selected","selected");
	 			}
	 		}
	 		if(result.data.skill !== 0){
	 			$(".skill").val(result.data.skill);
	 		}
	 		if(result.data.gender===false){
	 		$("input:radio[name='gender']:radio[value='female']").attr("checked",true);
	 		}else{
	 			$("input:radio[name='gender']:radio[value='male']").attr("checked",true);
	 			}
	 		
	 		//countRequest 설정 
	 		if (result.data.requstCount !== 0) {
	 			//joinTeam list 가져오기
	 			ajaxJoinTeamList();
	 		}
	 		
		 	}
	 
	 	
	 
	 
		})
	};

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
				window.location.href="mainpage.html";
			}
		})
	}
	
	$('.logout_btn').click(function() {
		ajaxLogout();
	
	});
	$(".mypage_btn").click(function(){

		window.location.reload();
	});
	$(".cancel_btn").click(function(){
		window.location.reload();
	});

	$(window).scroll(function(){
		var value = $('body').scrollTop();
		if(value >= 1100){
			$("#teampage").addClass("active");
			$("#teampage").removeClass("nonactive");
			$("#mypage").removeClass("active");
			$("#mypage").addClass("nonactive");
		}else if(value===0){
			$("#mypage").addClass("active");
			$("#mypage").removeClass("nonactive");
			$("#teampage").removeClass("active");
			$("#teampage").addClass("nonactive");	
		}
	});
	
	
	// 팀 가입 요청이 있는 경우 실행 될 함수
	function ajaxJoinTeamList() {
		$.ajax({
			url : serverAddr + "/jointeam/list.json",
			method : "GET",
			dataType : "json",
			success : function(obj) {
				var result = obj.jsonResult;
				if (result.state !== "success") {
					alert("가입 요청 리스트 조회 실패");
					return;
				}
				console.log(result);
				var str = "";
				for (var i = 0; i < result.data.length; i++) {
					str += "<span>"+result.data[i].reqNickname+" 님에게 가입신청이 왔습니다.</span>"+
					"<button type='button' class='ok_btn' data-no='"+result.data[i].reqno+"'>승인</button>"+
					"<button type='button' class='no_btn' data-no='"+result.data[i].reqno+"'>거절</button>"
				}
				$(".joinTeam").css("background","#e09115");
				$(".joinTeam").html(str);
				
				$(".ok_btn").click(function() {
					console.log($(this).attr("data-no"));
					ajaxOkTeam($(this).attr("data-no"));
				})
				
				$(".no_btn").click(function() {
					console.log($(this).attr("data-no"));
					ajaxNoTeam($(this).attr("data-no"));
				})
				
				
			}
		})
	}
	
	// 팀 승인 함수
	function ajaxOkTeam(no) {
		$.ajax({
			url : serverAddr + "/jointeam/ok.json?no="+no,
			method : "GET",
			dataType : "json",
			success : function(obj) {
				var result = obj.jsonResult;
				if (result.state !== "success") {
					alert("승인 실패");
					return;
				}
				console.log(result);
				//reload
			}
		})
	}
	
	function ajaxNoTeam(no) {
		$.ajax({
			url : serverAddr + "/jointeam/no.json?no="+no,
			method : "GET",
			dataType : "json",
			success : function(obj) {
				var result = obj.jsonResult;
				if (result.state !== "success") {
					alert("승인 실패");
					return;
				}
				console.log(result);
				//reload
			}
		})
	}
	
	
	ajaxLoginUser();
});

	
	


