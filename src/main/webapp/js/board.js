
//새글 등록하기
$("#newboard_btn").click(function() {
	window.location.href="boardform.html"
})


//Board 게시글 가져오기
function ajaxBoardList() {
	$.getJSON(serverAddr +"/board/boardlist.json",function(obj) {
		var result = obj.jsonResult
		if (result.state !== "success") {
			alert("조회실패입니다.")
			return
		}
		for (var i = 0; i < result.data.length; i++) {
			$("tbody").append(
					"<tr>"+
					"<td>"+result.data[i].no+"</td>"+
					"<td>"+result.data[i].title+"</td>"+
					"<td>"+result.data[i].writer+"</td>"+
					"<td>"+result.data[i].cre_dt+"</td>"+
					"<td>"+result.data[i].vw_cnt+"</td>" +
					"<tr>")
		}
		
	})
}



