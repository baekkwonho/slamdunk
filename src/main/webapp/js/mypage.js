$(document).ready(function(){
$('#mypage').click(function(){
	$("#mypage").addClass("active")
	$("#mypage").removeClass("nonactive")
	$("#teampage").removeClass("active")
	$("#teampage").addClass("nonactive")
})
$("#teampage").click(function(){
	$("#teampage").addClass("active")
	$("#teampage").removeClass("nonactive")
	$("#mypage").removeClass("active")
	$("#mypage").addClass("nonactive")
})


























});