
//새글 작성 시 날짜 구해서 넣어주기
function loadBoard() {
	var objDate = new Date()
	var year = objDate.getFullYear()
	var month = objDate.getMonth() + 1
	var date = objDate.getDate()
	var createDate = year+"-"+month+"-"+date
	$(".createDate_form label").html(createDate)
}

//ok 버튼 눌었을 때
$("#ok_btn").click(function() {
	var newBoard = {
			title : $("#title").val(),
			contents : $("#contents").val(),
			cre_dt : $(".createDate_form label").text()
	}
	console.log(newBoard)
	ajaxAddBoard(newBoard)
})

function ajaxAddBoard(board) {
	$.post(serverAddr + "/board/add.json", board, function(obj) {
		var result = obj.jsonResult
		if (result.state !== "success") {
			alert("등록 실패입니다.")
			return
		}
		window.location.href="board.html"
	})
}

//update 버튼 눌었을 때
//delete 버튼 눌었을 때
//cancel 버튼 눌었을 때
