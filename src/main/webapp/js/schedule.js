
$(document).ready(function () {
	
	function ajaxKblToday() {
		$.getJSON(serverAddr + "/kbl/today.json", function(obj) {
			var result = obj.jsonResult;
			if (result.state !== "success") {
				alert("조회 실패 입니다.");
				return;
			}
		
			//console.log(result);
			
			if(result.data.fgState === "") {
				$(".today_kbl_left > h3").text("경기가 없습니다");
				$(".today_kbl_left .kbl_vs").text("");
			} else {
				$(".today_kbl_left > h3").text(result.data.fgState);
				$(".fgLeftImg").attr("src",result.data.fgLeftImg);
				$(".fgLeftTeam").text(result.data.fgLeftTeam);
				$(".fgLeftScore").text(result.data.fgLeftScore);
				$(".fgRightScore").text(result.data.fgRightScore);
				$(".fgRightTeam").text(result.data.fgRightTeam);
				$(".fgRightImg").attr("src",result.data.fgRightImg);
			}
			
			if(result.data.sgState === "") {
				$(".today_kbl_middle > h3").text("경기가 없습니다");
				$(".today_kbl_middle .kbl_vs").text("");
			} else {
				$(".today_kbl_middle > h3").text(result.data.sgState);
				$(".sgLeftImg").attr("src",result.data.sgLeftImg);
				$(".sgLeftTeam").text(result.data.sgLeftTeam);
				$(".sgLeftScore").text(result.data.sgLeftScore);
				$(".sgRightScore").text(result.data.sgRightScore);
				$(".sgRightTeam").text(result.data.sgRightTeam);
				$(".sgRightImg").attr("src",result.data.sgRightImg);
			}
			
			if(result.data.tgState === "") {
				$(".today_kbl_right > h3").text("경기가 없습니다");
				$(".today_kbl_right .kbl_vs").text("");
			} else {
				$(".today_kbl_right > h3").text(result.data.tgState);
				$(".tgLeftImg").attr("src",result.data.tgLeftImg);
				$(".tgLeftTeam").text(result.data.tgLeftTeam);
				$(".tgLeftScore").text(result.data.tgLeftScore);
				$(".tgRightScore").text(result.data.tgRightScore);
				$(".tgRightTeam").text(result.data.tgRightTeam);
				$(".tgRightImg").attr("src",result.data.tgRightImg);
			}
			
			
		})
	}
	
	function ajaxKblMonth() {
		$.getJSON(serverAddr + "/kbl/month.json",function(obj) {
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
							"<span class='month+score'>"+result.data[i].score+"</span> "+result.data[i].rightTeam+"<img src='"+result.data[i].rightImg+"'>"+
							"</td>" +
							"<td class='month_stadium'>"+result.data[i].stadium+"</td>");
				} else {
					$(".month_kbl_wrap table").append(
							"<tr>"+
							"<td>"+result.data[i].date+"</td>" +
							"<td>"+result.data[i].hour+"</td>" +
							"<td colspan='2'> 경기가 없습니다. </td>");
				}
			}
			
			
		})
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//ajaxKblToday();
	ajaxKblMonth();
	
});





