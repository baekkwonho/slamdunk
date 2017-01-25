$(function(){
// 사진버튼처리
$(".teamphotoBtn").click(function(){
	$(".teamfile").click();
});
$(".teamfile").fileupload({
	url : serverAddr+"/photo/add.json",
	dataType : "json",
	add : function(e,data){
		data.submit();
	},
	done : function(e,data){
		$(".teamoriginFileName").text(data.result.originFilename);
		$(".teamdataFileName").text(data.result.filename);
		$("article img").attr("src","/slamdunk/upload/"+data.result.filename);
	}
});

//팀등록 버튼(빈칸이라면 이렇게 처리.)
$(".resister_btn").click(function(){
	if(document.querySelector(".teamname").value===""){
		alert("팀명을 작성해 주세요.");
		return;
	}else if(document.querySelector("#memo_area").value===""){
		alert("팀소개를 작성해 주세요.");
		return;
	}
	//입력된값 저장해놓기.(서버에 보내기전에.)
	var team = {
		teamName : document.querySelector(".teamname").value,
		teamDesc : document.querySelector("#memo_area").value,
		tphoto_path:document.querySelector(".teamdataFileName").textContent
	}
	console.log(team);
	ajaxInserTeam(team);

});
$(".teamdefaultBtn").click(function(){
	$("article img").attr("src","/slamdunk/images/teamimg.jpg");
	$(".teamoriginFilename").text(""); //보여주는 사진이름 빈문자열로 만들기.
	$(".teamdataFileName").text("default Image");
});

//서버에 요청하기.
	function ajaxInserTeam(team){
		$.ajax({
			url : serverAddr+"/team/insert.json",
			method : "POST",
			dataType : "json",
			data : team,
			success : function(obj){
				var result = obj.jsonResult;
				//오류 또는 팀명이 중복될때
				if(result.state !== "success"){
					alert("이미 팀명이 존재 합니다.");
					return;
				}
				window.location.reload();
				//함수 호출 후
				console.log("aaaa");
			}
		})

	}
	function ajaxteamLoginUser(){
		$.ajax({
			url : serverAddr+"/team/myteam.json",
			method : "GET",
			dataType : "json",
			success : function(obj){
				var result = obj.jsonResult;
				if(result.state !== "success"){
					alert("팀 조회를 실패했습니다.");
					return;
				}
				console.log(result);
				if(result.data === null){
					$(".update_btn").hide();
					$(".delete_btn").hide();
					$(".members1").hide();
					$(".members2").hide();
					ajaxTeamList();
				}else{
					if (result.data.tphoto_path !== null && result.data.tphoto_path !== "") {
	 				$("article img").attr("src","/slamdunk/upload/"+result.data.tphoto_path);
	 				$(".resister_btn").hide();
	 				}
					$(".teamname").css("display","none");
					$(".tname").text(result.data.teamName);
					$("#memo_area").text(result.data.teamDesc);
					$(".team_members1").hide();
					$(".team_members2").hide();
				}
			}
		})
	}

	$(".update_btn").click(function(){
		var teaminfo = {
			tphoto_path : document.querySelector('.teamdataFileName').textContent,
			teamDesc : document.querySelector("#memo_area").value
		}
		ajaxTeamUpdate(teaminfo);
	});

	function ajaxTeamUpdate(team){
		$.ajax({
		url : serverAddr+"/team/update.json",
		method : "POST",
		dataType : "json",
		data : team,
		success : function(obj){
			var result = obj.jsonResult;
			if(result.state !== "success"){
				alert("수정이 실패했습니다");
				return;
			}
			window.location.reload();
		}
	})
	}

	function ajaxTeamList(){
		$.ajax({
			url : serverAddr+"/team/teamlist.json",
			method:"GET",
			dataType:"json",
			success : function(obj){
				var result = obj.jsonResult;
				if(result.state !== "success"){
					alert("팀 리스트 조회 실패입니다.");
					return;
				}
				console.log(result);
				
				var str = "<h3>Team List</h3>";//문자 초기화
				
				for(var i=0;i<result.data.length;i++){
					str+="<div class='team_member'><p class='team_member_p'>Team Name</p><p>"+result.data[i].teamName+"</p><p class='Nteam'>"+result.data[i].count+"</p><p class='teams'>"+result.data[i].teamDesc+"</p><button type ='button' class='team_btn'  data-no='"+result.data[i].no+"'>Join</button></div>"
				}
				$(".team_members1").html(str);
			}
		})
	}







ajaxteamLoginUser();

});