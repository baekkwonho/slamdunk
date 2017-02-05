
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

// 전역변수 pageNo, pageLength, totalPage
var pageNo = 1;
var pageLength = 9; //pageListLength
var totalPage = 0;

//Board 게시글 가져오기
function ajaxBoardList() {
	$.getJSON(serverAddr +"/board/boardlist.json", {
		"pageNo" : pageNo,
		"length" : pageLength
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state !== "success") {
			alert("조회실패입니다.");
			return;
		}
		console.log(result);
		var writeList = ""; // table body에 넣어줄 html 태그를 작성할 변수
		
		
		// 공지사항 부분 넣어주기.
		if (result.data.noticeList.length !== 0) {
			writeList += "<tr class='noticeLink' href='#' data-no="+result.data.noticeList[0].no+">"+
			"<td>[공지사항]</td>"+
			"<td>"+result.data.noticeList[0].title+"</td>"+
			"<td>"+result.data.noticeList[0].writer+"</td>"+
			"<td>"+result.data.noticeList[0].cre_dt+"</td>"+
			"<td>"+result.data.noticeList[0].vw_cnt+"</td>" +
			"</tr>";
		}
			
		
		// 게시판 부분 추가하기.
		for (var i = 0; i < result.data.list.length; i++) {
			writeList += "<tr class='boardLink' href='#' data-no="+result.data.list[i].no+">"+
			"<td>"+result.data.list[i].no+"</td>"+
			"<td>"+result.data.list[i].title+"</td>"+
			"<td>"+result.data.list[i].writer+"</td>"+
			"<td>"+result.data.list[i].cre_dt+"</td>"+
			"<td>"+result.data.list[i].vw_cnt+"</td>" +
			"</tr>";
		};
		
		// 공지사항과 게시판 부분 한꺼번에 tbody에 넣어주기.
		$("tbody").html(writeList);
		
		//공지사항 링크
		$(".noticeLink").click(function(event) {
			window.location.href = "boardform.html?noticeno=" + $(this).attr("data-no");
		})
		
		// 리스트 링크
		$(".boardLink").click(function(event) {
			window.location.href = "boardform.html?no=" + $(this).attr("data-no");
	    });
	    
	    //현재 페이지
	    pageNo = result.data.pageNo;
	    totalPage = result.data.totalPage;
	    
	    var writePageNo = "";
	    var temp = "";
	    for (var i = 1; i <= totalPage; i++) {
	    	if (pageNo === i) {
	    		temp = "<span class='currPage'>"+i+"</span>";
	    	} else {
	    		temp = "<span>"+i+"</span>";
	    	}
	    	writePageNo += temp;
	    }
	    
	    $("#pageNo").html(writePageNo);
	    
	    
	})
}

$("#next_btn").click(function() {
	if (pageNo === totalPage) {
		return;
	}
	pageNo++;
	ajaxBoardList();
});

$("#prev_btn").click(function() {
	pageNo--;
	if (pageNo < 1) {
		return;
	}
	ajaxBoardList();
});



