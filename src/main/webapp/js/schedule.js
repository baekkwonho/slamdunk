
$(document).ready(function () {
	/*
	$.ajax({
		crossOrigin: true,
		type: "GET",
		dataType : "JSON",
		url: "http://www.naver.com",
		success : function(data) {
		//	var list = $.parseHTML(html);
			
			console.log(data);
		}
	})
	*/
	$.ajaxSetup({
		crossOrigin: true
	});
	
	$.getJSON("http://www.kbl.or.kr/schedule/today/todaygame.asp", function(data) {
		console.log(data)
	})
});





