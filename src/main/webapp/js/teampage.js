$(function(){
// 사진버튼처리
$(".teamphotoBtn").click(function(){
	$(".teamfile").click();
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
		teamDesc : document.querySelector("#memo_area").value
	}
	console.log(team);
	ajaxInserTeam(team);

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












});