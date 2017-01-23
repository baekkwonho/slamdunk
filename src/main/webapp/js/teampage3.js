
$(function(){
	
	function ajaxTeamList(){
		$.ajax({
			url:serverAddr+"/team/teamlist.json",
			method:"GET",
			dataType:"json",
			success:function(obj){
				var result = obj.jsonResult;
				if(result.state !== "success"){
					alert("변경이 실패되었습니다.");
					return;
				}
				console.log(result);
			}
		})
	}
	
	var team = {
		teamName : "slamdunk",
		teamDesc : "slamdunk2입니다."
	}
	
	function ajaxInsertTeam(team) {
		$.ajax({
			url: serverAddr+"/team/insert.json",
			method: "POST",
			dataType:"json",
			data : team,
			success : function(obj) {
				var result = obj.jsonResult;
				if (result.state !== "success") {
					alert("추가 실패");
					return;
				}
				console.log("inert");
			}
		})
	}
	
	console.log(team);
	console.log("aa");
	
	ajaxInsertTeam(team);
	
	
	
	
})