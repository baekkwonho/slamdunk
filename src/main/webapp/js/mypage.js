$(function(){
	
	$('body').stop().animate({scrollTop:'0'})

	$('#mypage').click(function(){
		$("#mypage").addClass("active")
		$("#mypage").removeClass("nonactive")
		$("#teampage").removeClass("active")
		$("#teampage").addClass("nonactive")
		$('body').stop().animate({scrollTop : '0'},1500)
 	})
	
	$("#teampage").click(function(){
		$("#teampage").addClass("active")
		$("#teampage").removeClass("nonactive")
		$("#mypage").removeClass("active")
		$("#mypage").addClass("nonactive")
		$('body').stop().animate({scrollTop : '1100'},1500)
	})
	
	$(".commit_btn").click(function(){
	
		var position = document.querySelector("#position")
		var user = {
			nickname:document.querySelector(".nickname").value,
			password:document.querySelector(".password").value,
			gender:document.querySelector('input[name="gender"]:checked').value,
			height:document.querySelector(".height").value,
			weight:document.querySelector(".weight").value,
			position:position.options[position.selectedIndex].value,
			skill:document.querySelector(".skill").value
		}
		ajaxCommit(user);//함수호출.		
	})

	function ajaxCommit(user){//객체를 받아서 넘겨주기위해.
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
	 		$(".nickname strong").text(result.data.nickname);

	 		console.log(result);
	 		$("#id_email").val(result.data.email);
	 		$(".nickname").val(result.data.nickname);
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



// 호출부분.
	ajaxLoginUser();

});

	
	


