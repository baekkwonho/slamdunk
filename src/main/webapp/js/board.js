
//새글 등록하기
$("#newboard_btn").click(function() {
	
	$.getJSON(serverAddr + "/auth/loginuser.json", function(obj) {
		var result = obj.jsonResult
		if (result.state !== "success") {
			alert("로그인이 필요 합니다.")
			return
		}
		window.location.href="boardform.html"
	})
	
})

var pageNo = 1;
var pageLength = 10;

//Board 게시글 가져오기
function ajaxBoardList() {
	$.getJSON(serverAddr +"/board/boardlist.json", {
		"pageNo" : pageNo,
		"lenth" : pageLength
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state !== "success") {
			alert("조회실패입니다.");
			return;
		}
		
		//리스트 출력
		
		/* append 이용 시 페이지가 넘어갈 경우에도 계속해서 리스트를 추가 하게 되어 사용 불가
		for (var i = 0; i < result.data.list.length; i++) {
			$("tbody").append(
					"<tr class='boardLink' href='#' data-no="+result.data.list[i].no+">"+
					"<td>"+result.data.list[i].no+"</td>"+
					"<td>"+result.data.list[i].title+"</td>"+
					"<td>"+result.data.list[i].writer+"</td>"+
					"<td>"+result.data.list[i].cre_dt+"</td>"+
					"<td>"+result.data.list[i].vw_cnt+"</td>" +
					"<tr>");
		};
		*/
		
		var writeList = "";
		for (var i = 0; i < result.data.list.length; i++) {
			writeList += "<tr class='boardLink' href='#' data-no="+result.data.list[i].no+">"+
			"<td>"+result.data.list[i].no+"</td>"+
			"<td>"+result.data.list[i].title+"</td>"+
			"<td>"+result.data.list[i].writer+"</td>"+
			"<td>"+result.data.list[i].cre_dt+"</td>"+
			"<td>"+result.data.list[i].vw_cnt+"</td>" +
			"<tr>";
		};
		
		$("tbody").html(writeList);
		
		
		// 리스트 링크
		$(".boardLink").click(function(event) {
			window.location.href = "boardform.html?no=" + $(this).data("data-no");
	    });
	    
	    //현재 페이지
	    pageNo = result.data.pageNo;
	    var totalPage = result.data.totalPage;
	    
	    var writePageNo = ""
	    for (var i = 1; i <= totalPage; i++) {
	    	var temp = "<span>"+i+"</span>";
	    	writePageNo += temp;
	    	console.log(writePageNo);
	    }
	    
	    $("#pageNo").html(writePageNo);
	    
	 //   $("#pageNo").text(pageNo);
	    
	    
	    console.log(totalPage);
	    
	})
}

$("#next_btn").click(function() {
	pageNo++;
	ajaxBoardList();
});

$("#prev_btn").click(function() {
	pageNo--;
	ajaxBoardList();
});





