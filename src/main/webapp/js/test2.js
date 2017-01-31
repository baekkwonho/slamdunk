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
				console.log(result);
				$(".team_name1").text(result.data.teamName);
			}
		})
	}
	
	
	$(".addmatch_btn").click(function() {
		
		var match = {
				region : "일산동구",
				match_date : "2017-02-02",
				location : "불광중",
				rule : "3vs3",
				match_desc : "3:3 같이 하실분!"
		}
		
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
