$(function() {
	
	function ajaxTeamLoginUser(){
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
				$(".team_name1").text(result.data.teamName);
			}
		})
	}
	
	
	$(".addmatch_btn").click(function() {
		
		var match = {
				region : $(".region").text(),
				match_date : $(".match_date").text(),
				location : $(".place").val(),
				rule : $("#team_number").val(),
				match_desc : $("#memo_area").val()
		}
		
		console.log(match);
		ajaxAddMatch(match);
		
	})
	
	function ajaxAddMatch(match) {
		$.ajax({
			url : serverAddr + "/match/add.json",
			method : "POST",
			dataType : "json",
			data : match,
			success : function(obj) {
				var result = obj.jsonResult;
				if (result.state !== "success") {
					alert ("match 등록 실패");
					return;
				}
				
				console.log("add!!")
			}
		})
	}
	
	ajaxTeamLoginUser();
	
	
	
})
