$(function() {
	
	
	
	$.ajax({
		url : "http://sports.news.naver.com/basketball/news/index.nhn?type=popular",
		crossOrigin: true,
		success : function(data) {
//			$("a").attr("href","http://sports.news.naver.com/basketball/news/read.nhn?oid=486&aid=0000000398");
			$("a").attr("href","http://sports.news.naver.com"+data.split("aside_news_list")[1].split("li")[1].split('href="')[1].split('"')[0]);
			//$("body").html("<a href='https://sport.news.naver.com"+data.split("aside_news_list")[1].split("li")[1].split('href="')[1].split('"')[0]+"'>news</a>")
			console.log(data.split("aside_news_list")[1].split("li")[1].split('"')[1].split('"')[0]);
			console.log(data.split("aside_news_list")[1].split("li")[1].split("<span>")[1].split("</span>")[0]);
			var title = data.split("aside_news_list")[1].split("li")[1].split("<span>")[1].split("</span>")[0];
			var link = data.split("aside_news_list")[1].split("li")[1].split('"')[1].split('"')[0];
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
