
$(document).ready(function () {
	
	ajaxKblList();
	
	
	
	
	function ajaxKblList() {
		$.getJSON(serverAddr + "/kbl/today.json", function(obj) {
			var result = obj.jsonResult;
			if (result.state !== "success") {
				alert("조회 실패 입니다.");
				return;
			}
		
			console.log(result);
			
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
	
	
	/*
	$.ajax({
		crossOrigin: true,
		type: "GET",
		dataType : "script",
		url: "http://sports.news.naver.com/basketball/schedule/index.nhn?category=kbl",
		success : function(html) {
			
			
			
			//var list = html.split('<div class="sch_vs" id="todaySchedule0" >')[1].split('</form>')[0]
			//$(".today_schedule").html(list)
			
//			var list = html.split('<div class="sch_vs" id="todaySchedule0" >')[1]
//			var left = list.split('<div class="vs_btn">')[0]
//			console.log(left)
			var left = html.split('<div class="inner_lft ">')[1].split('<div class="vs_btn">')[0]
//			var left = html.split('<div class="inner_lft live">')[1]
//			if (left === undifined) {
//				console.log("aaa")
//			}
			
//			console.log(html);
//			console.log(typeof html)
		//	$(".schedule_left").html(left)
		}
	})
	*/
});





