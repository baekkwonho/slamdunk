
//새글 작성 시 날짜 구해서 넣어주기
function loadBoard() {
	var objDate = new Date();
	var year = objDate.getFullYear();
	var month = objDate.getMonth() + 1;
	var date = objDate.getDate();
	var createDate = year+"-"+month+"-"+date;
	$(".createDate_form label").html(createDate);
};

//리스트 눌러서 폼에 들어왔을 때(상세페이지)
function ajaxLoadBoard(no) {
	$.getJSON(serverAddr + "/board/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult;
		if (result.state != "success") {
			alert("조회 실패입니다.");
			return;
		}
		
		$.getJSON(serverAddr + "/auth/loginuser.json", function(obj2) {
			var memberResult = obj2.jsonResult;
			if (memberResult.state !== "success" || memberResult.data.nickname !== result.data.writer) {
				$("#title").css("display","none");
				$(".title_form").append("<span class='view_title'>"+result.data.title+"</span>");
				$(".createDate_form label").text(result.data.cre_dt);
				$(".viewCount_form span").text(result.data.vw_cnt);
				$("#contents").css("display","none");
				$(".contents_form").append("<p class='view_contents'>"+result.data.contents+"</p>");
				$("#update_btn, #delete_btn").css("display","none");
				return;
			}
			
			//로그인 유저와 작성자가 동일 할 경우
			$("#title").val(result.data.title);
			$(".createDate_form label").text(result.data.cre_dt);
			$(".viewCount_form span").text(result.data.vw_cnt);
			$("#contents").val(result.data.contents);
			
			
		});
		
		
	});
};


//ok 버튼 눌었을 때
$("#ok_btn").click(function() {
	
	if ($("#title").val() === "" || $("#contents").val() === "") {
		alert("빈칸을 채워주세요.");
		return;
	};
	
	var newBoard = {
			title : $("#title").val(),
			contents : $("#contents").val(),
			cre_dt : $(".createDate_form label").text()
	};
	ajaxAddBoard(newBoard);
});

function ajaxAddBoard(board) {
	$.post(serverAddr + "/board/add.json", board, function(obj) {
		var result = obj.jsonResult;
		if (result.state !== "success") {
			alert("등록 실패입니다.");
			return;
		};
		window.location.href="board.html";
	});
};

//update 버튼 눌었을 때
$("#update_btn").click(function() {
	var updateBoard = {
			no : location.search.split("=")[1],
			title : $("#title").val(),
			contents : $("#contents").val()
	};
	ajaxUpdateBoard(updateBoard);
});

function ajaxUpdateBoard(board) {
	$.post(serverAddr + "/board/update.json",board, function(obj) {
		var result = obj.jsonResult;
		if (result.state !== "success") {
			alert("변경 실패입니다.");
			return;
		};
		window.location.href="board.html";
	});
	
};

//delete 버튼 눌었을 때

$("#delete_btn").click(function() {
	var no = location.search.split("=")[1];
	ajaxDeleteBoard(no);
});

function ajaxDeleteBoard(no) {
	$.getJSON(serverAddr + "/board/delete.json?no="+no, function(obj) {
		var result = obj.jsonResult;
		if (result.state !== "success") {
			alert("삭제 실패입니다.");
			return;
		};
		window.location.href="board.html"
	});
};


//cancel 버튼 눌었을 때
$("#cancel_btn").click(function() {
	window.location.href="board.html";
});


