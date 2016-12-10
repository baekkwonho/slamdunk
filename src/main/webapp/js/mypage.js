$(document).ready(function(){
	
	$('body').stop().animate({scrollTop:'0'})

	$('#mypage').click(function(){
		$("#mypage").addClass("active")
		$("#mypage").removeClass("nonactive")
		$("#teampage").removeClass("active")
		$("#teampage").addClass("nonactive")
		$('body').stop().animate({scrollTop : '0'},1500)
 	})
	
	$("#teampage").click(function(){
		$("#teampage").addClass("active")
		$("#teampage").removeClass("nonactive")
		$("#mypage").removeClass("active")
		$("#mypage").addClass("nonactive")
		$('body').stop().animate({scrollTop : '1100'},1500)
	})
	
	$(".commit_btn").click(function(){
	
		var position = document.querySelector("#position")
		var user = {
			"nickname":document.querySelector(".nickname").value,
			"password":document.querySelector(".password").value,
			"gender":document.querySelector('input[name="gender"]:checked').value,
			"height":document.querySelector(".height").value,
			"weight":document.querySelector(".weight").value,
			"position":position.options[position.selectedIndex].value,
			"skill":document.querySelector(".skill").value
		}
		
		



	})











});