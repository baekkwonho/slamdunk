$(function(){

	function ajaxNews(){
		$.ajax({
		url : serverAddr+"/news/list.json",
		method : "GET",
		dataType : "json",
		success : function(obj){
		var result = obj.jsonResult;
		if(result.state !== "success"){
				alert("조회 실패입니다.");
				return;
			}
		$(".content_box1 h3").text(result.data.newsTitle);
		$(".content_box1 h3").click(function(){
			window.location.href = "http://sports.news.naver.com"+result.data.newsSrc;
		});
		$(".content_box2 h3").text(result.data.videoTitle);
		$(".content_box2 img").attr("src",result.data.videoImage);
		$(".content_box2 img").click(function(){
			window.location.href ="http://sports.news.naver.com"+result.data.videoSrc;
		});
		}
		})
	}


	function ajaxNotice(){
		$.ajax({
			url: serverAddr+"/board/boardlist.json",
			method: "GET",
			dataType: "json",
			success: function(obj){
				var result = obj.jsonResult;
				if(result.state !== "success"){
					alert("조회 실패입니다.");
					return;
				}
				$(".content_box3 h3").text(result.data.noticeList[0].title);
				$(".content_box3 h3").attr("data-no",result.data.noticeList[0].no);
				}
			})
	}
	$(".content_box3 h3").click(function(){
		window.location.href = "boardform.html?noticeno="+$(this).attr("data-no");
	});





	ajaxNews();
	ajaxNotice();
});
