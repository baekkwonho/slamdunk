$(function() {
	
	$.ajax({
		url : "http://sports.news.naver.com/basketball/news/index.nhn",
		crossOrigin: true,
		success : function(data) {
			console.log(data);
		}
	})
	
	
	
	/*
	function ajaxTeamList(){
		$.ajax({
			url : serverAddr + "/team/teamlist.json",
			method : "GET",
			dataType : "json",
			success : function(obj) {
				var result = obj.jsonResult;
				if (result.state !== "success") {
					alert("팀 리스트 조회 실패");
					return;
				}
				
				for (var i = 0; i < result.data.length; i++) {
					console.log(result.data[i]);
				}
				
				console.log("success!!")
				
			}
		})
	}
	ajaxTeamList();
	*/
	
	/*
	function ajaxInsertTeam(team) {
		$.ajax({
			url : serverAddr + "/team/insert.json",
			method : "POST",
			dataType : "json",
			data : team,
			success : function(obj) {
				var result = obj.jsonResult;
				if (result.state !== "success") {
					alert("팀 추가 실패");
					return;
				}
				
				console.log("success")
			}
		})
	}
	*/
	
	
	
	/*
	var team = {
		mno : 1,
		teamName : "B-team",
		teamDesc : "안녕하세요 B-team입니다.",
		sido : "서울시",
		gu : "은평구"
	}
	
	console.log(team);
	ajaxInsertTeam(team);
	*/
	
	
})
