
$(document).ready(function () {
	
	ajaxNaverSport();
	
	
	
	
	function ajaxNaverSport() {
		$.getJSON(serverAddr + "/kbl/kbllist.json", function(obj) {
			var result = obj.jsonResult;
			if (result.state !== "success") {
				alert("조회 실패 입니다.");
				return;
			}
			
			//console.log(result.data.leftImg);
			//$(".schedule_left>img").attr("src",result.data.leftImg);
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





