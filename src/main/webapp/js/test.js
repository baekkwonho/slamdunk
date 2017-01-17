$(function() {
	
	$("#selectFileBtn").on('click', function() {
		$("#fileupload").click()
	})

	$("#fileupload").fileupload({
		url : serverAddr + "/photo/add.json",
		dataType: "json",
		add: function(e, data) {
			data.submit()
		},
		done: function(e, data) {
			$("#newFileName").text(data.result.filename)
			$("#originFileName").text(data.result.originFilename)
			$("#uploadImage").attr({src: "/slamdunk/upload/"+data.result.filename, height:"150px"})
		}
	})
	
	$("#addbtn").click(function() {
		var user = {
				no : 1,
				nickname: "test",
				gender: true,
				height: 180,
				weight: 90,
				photo_path : $("#newFileName").text()
		}
		console.log("user",user);
		ajaxCommit(user);
	})
	
	function ajaxCommit(user){
		console.log(user);
		$.ajax({
			url:serverAddr+"/photo/update.json",
			method:"POST",
			dataType:"json",
			data:user,
			success:function(obj){
				var result = obj.jsonResult;
				if(result.state !== "success"){
					alert("변경이 실패되었습니다.");
					return;
				}
				console.log("ok");
				//window.location.reload();
			}
		})
	}//서버에 변경된 값을 보내주는것.서버에 변경된것을 저장시켜달라고 요청.
	
	
	$("#defaultbtn").click(function() {
		$("#uploadImage").attr({src: "/slamdunk/images/dog1.jpg", height:"150px"})
		$("#newFileName").text("default Image");
	})

})
