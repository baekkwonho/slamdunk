$(function() {
	
	$("#addbtn").click(function() {
		
		console.log($("file").text());
		
		$(".file").fileupload({
			url : serverAddr + "/photo/add.json",
			dataType : "json",
			add : function(e, data) {
				console.log("add");
				data.submit()
			},
			done : function(e, data) {
				console.log("done");
			}
		})
	})
	
	function ajaxToadyNews() {
		$.getJSON(serverAddr + "/news/list.json", function(obj) {
			var result = obj.jsonResult;
			if (result.state !== "success") {
				alert("조회 실패 입니다.");
				return;
			}
			console.log(result);
		})
	}

	ajaxToadyNews();
	
})
