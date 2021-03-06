
function ajaxLoadNotice(noticeno) {
	$.getJSON(serverAddr + "/board/detailnotice.json?noticeno="+noticeno, function(obj) {
		var result = obj.jsonResult;
		if (result.state != "success") {
			alert("조회 실패입니다.");
			return;
		}
		
		// 게시글 작성자와 유저가 다를 경우
		$.getJSON(serverAddr + "/auth/loginuser.json", function(obj2) {
			var memberResult = obj2.jsonResult;
			if (memberResult.state !== "success" || memberResult.data.nickname !== result.data.writer) {
				$("#title").attr("disabled","true");
				$("#title").val(result.data.title);
				$(".createDate_form label").text(result.data.cre_dt);
				$(".viewCount_form span").text(result.data.vw_cnt);
				$("#contents").attr("disabled","true");
				$("#contents").val(result.data.contents);
				$("#update_btn, #delete_btn").css("display","none");
				return;
			}
			
			//로그인 유저와 작성자가 동일 할 경우
			$("#title").val(result.data.title);
			$(".createDate_form label").text(result.data.cre_dt);
			$(".viewCount_form span").text(result.data.vw_cnt);
			$("#contents").val(result.data.contents);
		})
		
	})
};


