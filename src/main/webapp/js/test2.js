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
	
	//loadtest2
	
	
	
	
	ajaxTeamLoginUser();
	
	if (location.search.startsWith("?")) {
		  if (location.search.split("?")[1].split("=")[0] === "matchno") {
			  var matchno = location.search.split("?")[1].split("=")[1];
			  
		  } else {
			  var date = location.search.split("?")[1].split("&")[0].split("=")[1];
			    var loc = location.search.split("?")[1].split("&")[1].split("=")[1];
			    var region = "";
			    switch(loc) {
			    case 1 : 
			      region = "고양시 일산동구";
			      break;
			    case 2 :
			      region = "고양시 일산서구";
			      break;
			    case 3 :
			      region = "고양시 덕양구";
			      break;
			    case 4 :
			      region = "서울시 은평구";
			      break;
			    case 5 :
			      region = "서울시 강남구";
			      break;
			    case 6 : 
			      region = "서울시 서초구";
			      break;
			    default : 
			      region = "고양시 일산동구";
			    }
			    $(".region").text(region);
			    $(".match_date").text(date);
		  }
		  
	  }
	
	
})
