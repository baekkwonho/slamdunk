
$(function(){
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
				$(".teamname").text(result.data.teamName);

			}
		})
	}
  	
  	$(".resister_btn").click(function(){
  		var addinfo = {
  			region : $(".location").text(),
 			location : $(".place").val(),
  			match_date : $(".date").text(),
  			rule: $("#team_number").val(),
  			match_desc : $("#memo_area").val()
  		} 
  		console.log(addinfo);
  	});










  	ajaxteamLoginUser();
  	if(location.search.startsWith("?")){
  		var urldate = location.search.split("&")[0].split("=")[1];
  		var urllocation = location.search.split("&")[1].split("=")[1];
  	}
  	$(".date").text(urldate);
  	var region = "";
  	switch(urllocation){
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
  			region = "서울특별시 은평구";
  			break;
  		case 5 : 
  			region = "서울특별시 강남구";
  			break;
  		case 6 :
  			region = "서울특별시 서초구";
  			break;
  		default : 
  			region = "고양시 일산동구";
	}
	$(".location").text(region);

});