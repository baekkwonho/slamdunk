
$(document).ready(function () {
	//01.position
		$("#about_btn01").click(function() {
			$("body").stop().animate({scrollTop : '732'}, 1500);
		});
		
	//02.basketball term
		$("#about_btn02").click(function() {
			$("body").stop().animate({scrollTop : '1464'}, 1500);
		});
		
	//03.rules
		$("#about_btn03").click(function() {
			$("body").stop().animate({scrollTop : '2200'}, 1500);
		});
	
		$(".mypage_btn").click(function(){
			window.location.href="mypage.html"
		})
	
	
});





