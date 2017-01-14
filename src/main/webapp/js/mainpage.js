$(function(){

	$.ajax({
		crossOrigin: true,
		url : "http://sports.news.naver.com/basketball/news/index.nhn?type=popular",
		success : function(data){
			var title = data.split("aside_news_list")[1].split("li")[1].split("<span>")[1].split("</span>")[0];
			var link = data.split("aside_news_list")[1].split("li")[1].split('"')[1].split('"')[0];
			$(".content_box1 h3").text(title);
			$(".content_box1 h3").click(function(){
				window.location.href = "http://sports.news.naver.com"+link;
			});
		}





	})
















});
