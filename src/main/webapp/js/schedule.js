
$(document).ready(function () {
	
	function ajaxKblMonth() {
		$.getJSON(serverAddr + "/schedule/kbl.json",function(obj) {
			var result = obj.jsonResult;
			if (result.state !== "success") {
				alert("일정 조회 실패입니다.");
				return;
			}
			
			for (var i = 0; i < result.data.length; i++) {
				if (result.data[i].hour !== "-") {
					$(".month_kbl_wrap table").append(
							"<tr>"+
							"<td class='month_date'>"+result.data[i].date+"</td>" +
							"<td class='month_hour'>"+result.data[i].hour+"</td>" +
							"<td class='month_game'><img src='"+result.data[i].leftImg+"'>"+result.data[i].leftTeam+" "+
							"<span class='month_score'>"+result.data[i].score+"</span> "+result.data[i].rightTeam+"<img src='"+result.data[i].rightImg+"'>"+
							"</td>" +
							"<td class='month_stadium'>"+result.data[i].stadium+"</td>"+"</tr>");
				} else {
					$(".month_kbl_wrap table").append(
							"<tr>"+
							"<td>"+result.data[i].date+"</td>" +
							"<td>"+result.data[i].hour+"</td>" +
							"<td colspan='2'> 경기가 없습니다. </td>"+"</tr>");
				}
			}
			
			
		})

	}
	
	function ajaxNbaMonth(){
		$.getJSON(serverAddr+"/schedule/nba.json",function(obj){
			var result = obj.jsonResult;
			if (result.state !== "success") {
				alert("일정 조회 실패입니다.");
				return;
			}
		
			
			for(var i=0; i<result.data.length; i++){
				if (result.data[i].hour !== "-") {
				$(".month_nba_wrap table").append(
					"<tr>"+
					"<td class='month_nba_date'>"+result.data[i].date+"</td>" +
					"<td class='month_nba_hour'>"+result.data[i].hour+"</td>" +
					"<td class='month_nba_game'><img src='"+result.data[i].leftImg+"'>"+result.data[i].leftTeam+" "+
					"<span class='month_nba_score'>"+result.data[i].score+"</span> "+result.data[i].rightTeam+"<img src='"+result.data[i].rightImg+"'>"+
					"</td>" +
					"<td class='month_nba_stadium'>"+result.data[i].stadium+"</td>"+"</tr>");
					} else {
					$(".month_kbl_wrap table").append(
							"<tr>"+
							"<td>"+result.data[i].date+"</td>" +
							"<td>"+result.data[i].hour+"</td>" +
							"<td colspan='2'> 경기가 없습니다. </td>"+"</tr>");
				}
			}
	
		})

	}


	ajaxNbaMonth();
	ajaxKblMonth();
	
});





