$(function() {
	
	function ajaxTeamLoginUser(){
		$.ajax({
			url : serverAddr+"/team/myteam.json",
			method : "GET",
			dataType : "json",
			success : function(obj){
				var result = obj.jsonResult;
				if(result.state !== "success"){
					alert("팀 조회를 실패했습니다.");
					return;
				}
				$(".team_name1").text(result.data.teamName);
			}
		})
	}
	
	
	$(".addmatch_btn").click(function() {
		
		var match = {
				region : $(".region").text(),
				match_date : $(".match_date").text(),
				location : $(".place").val(),
				rule : $("#team_number").val(),
				match_desc : $("#memo_area").val()
		}
		
		console.log(match);
		ajaxAddMatch(match);
		
	})
	
	function ajaxAddMatch(match) {
		$.ajax({
			url : serverAddr + "/match/add.json",
			method : "POST",
			dataType : "json",
			data : match,
			success : function(obj) {
				var result = obj.jsonResult;
				if (result.state !== "success") {
					alert ("match 등록 실패");
					return;
				}
				
				console.log("add!!")
			}
		})
	}
	
	$(".update_btn").click(function() {
		
		//빈칸이라면 alert
		
		
		var match = {
				match_no : location.search.split("?")[1].split("=")[1],
				location : $(".place").val(),
				rule : $("#team_number").val(),
				match_desc : $("#memo_area").val()
		}
		console.log(match);
		ajaxUpdateMatch(match);
	})
	
	function ajaxUpdateMatch(match) {
		$.ajax({
			url : serverAddr + "/match/update.json",
			method : "POST",
			dataType : "json",
			data : match,
			success : function(obj) {
				var result = obj.jsonResult;
				if (result.state !== "success") {
					alert ("match 변경  실패");
					return;
				}
				
				console.log("update!!")
				window.location.reload();
			}
		})
	}
	
	$(".delete_btn").click(function() {
		var matchno = location.search.split("?")[1].split("=")[1];
		ajaxDeleteMatch(matchno)
	})
	
	function ajaxDeleteMatch(matchno) {
		$.ajax({
			url : serverAddr + "/match/delete.json?matchno="+matchno,
			method : "GET",
			dataType : "json",
			success : function(obj) {
				var result = obj.jsonResult;
				if (result.state !== "success") {
					alert ("match delete  실패");
					return;
				}
				console.log("delete!!")
				window.location.href="test.html"
			}
		})
	}
	
	
	$(".vs_btn").click(function() {
		console.log("Vs!")
		var matchno = location.search.split("?")[1].split("=")[1];
		ajaxBattle(matchno);
	})
	
	function ajaxBattle(matchno) {
		$.ajax({
			url : serverAddr + "/matchteam/battle.json?matchno=" + matchno,
			method : "GET",
			dataType : "json",
			success : function(obj) {
				var result = obj.jsonResult;
				if (result.state !== "success") {
					alert( "대결 신청 실패 or 신청중");
					return;
				}
				console.log("battle success");
			}
		})
	}
	
	
	
	
	//loadtest2
	
	function ajaxDetailMatch(matchno) {
		$.ajax ({
			url : serverAddr + "/match/detail.json?matchno="+matchno,
			method : "GET",
			dataType : "json",
			success : function(obj) {
				var result = obj.jsonResult;
				if (result.state !== "success") {
					alert ("detail 조회 실패");
					return;
				}
				console.log(result);
				
				$.ajax({
					url : serverAddr+"/auth/loginuser.json",
				 	method : "GET",
				 	dataType : "json",
				 	success : function(obj2){
				 		var result2 = obj2.jsonResult;
				 		if (result2.state !== "success") {
				 			alert("로그인 정보 조회 실패");
				 			return;
				 		}
				 		console.log(result2);
				 		if (result2.data.tno === result.data[0].team_no1) {
				 			$(".place").val(result.data[0].location);
				 			$("#team_number").val(result.data[0].rule).attr("selected","selected");
							$("#memo_area").val(result.data[0].match_desc);
				 			$(".vs_btn").hide();
				 		} else {
				 			$(".place").hide();
				 			$("#team_number").hide();
				 			$("#memo_area").hide();
				 			
				 			$(".place_p").text(result.data[0].location);
				 			$(".rule").text(result.data[0].rule);
							$(".match_info").text(result.data[0].match_desc);
							
				 			$(".vs_btn").show();
				 			$(".update_btn").hide();
				 			$(".delete_btn").hide();
				 		}
				 	}
				})
				
				$(".region").text(result.data[0].region);
				$(".match_date").text(result.data[0].match_date);
				$(".addmatch_btn").hide();
				
				ajaxLoadLeftTeam(result.data[0].team_no1);
				$(".team_name1").text(result.data[0].team_name1);
				
				
			}
			
		})
	}	
	
	var currleftpageno = 1;
	var totalleftpage = 0;
	
	function ajaxLoadLeftTeam(no) {
		$.ajax({
			url : serverAddr+"/team/teammemberlist.json?no="+no+"&pageNo="+currleftpageno,
			method : "GET",
			dataType:"json",
			success : function(obj){
				var result = obj.jsonResult;
				if(result.state !== "success"){
					alert("팀원 조회를 실패했습니다.");
					return;
				}
				console.log(result);

				
				//멤버리스트 왼쪽에 뿌려주기
				var str = "<h3>Member's</h3>"
				for (var i = 0; i < result.data.list.length; i++) {
					
					var gender = "남자";
					if(result.data.list[i].gender === false){
						gender = "여자";
					}
					var position = "미지정"
					if(result.data.list[i].position !== null){
						position = result.data.list[i].position;
					}
					var skill = "미지정";
					if(result.data.list[i].skill !== null){
						skill = result.data.list[i].skill;
					}
					var photo = "/slamdunk/images/bg05.jpg"
					if(result.data.list[i].photo_path !== null && result.data.list[i].photo_path !== ""){
						photo = "/slamdunk/upload/"+result.data.list[i].photo_path;
					}
					
					str += "<div class='members'><img class='member_p' src=' "+photo +
					"' ><span class='team_nick'>NickName:"+result.data.list[i].nickname +
					"</span><p class='member_info'>Gender : "+gender+"<br>Position : "+ 
					position+"<br>Height : "+result.data.list[i].height+"<br>Skill : "+ 
					skill+"</p></div>"
					
					//$(".members_list").html(str);
					
					currleftpageno = result.data.pageNo;
					totalleftpage = result.data.totalPage;
					
					var numPageno = "";
					var numTemp = "";

					for(var i=1;i<=totalleftpage;i++){
						if(currleftpageno === i){
							numTemp="<span class='curr_leftnum'>"+i+"</span>";
						}else{
							numTemp="<span>"+i+"</span>";
						}
						numPageno+=numTemp;
					}
					
					//$(".left_pageno").html(numPageno);
					
					
					
				}
				
			}
		})
	}
	
	
	//요청온 리스트 확인
	
	function ajaxMatchRequest() {
		$.ajax({
			url : serverAddr +"/matchteam/list.json",
			method : "GET",
			dataType : "json",
			success : function(obj) {
				var result = obj.jsonResult;
				if (result.state !== "success") {
					alert ("리스트 조회 실패");
					return;
				}
				console.log(result);
			}
		})
	}
	
	
	
	
	
	if (location.search.startsWith("?")) {
		  if (location.search.split("?")[1].split("=")[0] === "matchno") {
			  var matchno = location.search.split("?")[1].split("=")[1];
			  ajaxDetailMatch(matchno);
			  ajaxMatchRequest();
			  
		  } else {
			  var date = location.search.split("?")[1].split("&")[0].split("=")[1];
			    var loc = location.search.split("?")[1].split("&")[1].split("=")[1];
			    var region = "";
			    switch(loc) {
			    case 1 : 
			      region = "고양시 일산동구";
			      break;
			    case 2 :
			      region = "고양시 일산서구";
			      break;
			    case 3 :
			      region = "고양시 덕양구";
			      break;
			    case 4 :
			      region = "서울특별시 은평구";
			      break;
			    case 5 :
			      region = "서울특별시 강남구";
			      break;
			    case 6 : 
			      region = "서울특별시 서초구";
			      break;
			    default : 
			      region = "고양시 일산동구";
			    }
			    $(".region").text(region);
			    $(".match_date").text(date);
			    $(".vs_btn").hide();
			    $(".update_btn").hide();
			    $(".delete_btn").hide();
			    
			    ajaxTeamLoginUser();
		  }
		  
	  }
	
	
})
