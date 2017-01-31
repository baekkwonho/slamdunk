$(function() {
	
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d  = date.getDate();
	$("#district_form2").hide();
	
	$("#city_form").change(function() {
		
		if ($("#city_form").val() === "고양시") {
			$("#district_form1").show();
			$("#district_form2").hide();
		} else {
			$("#district_form1").hide();
			$("#district_form2").show();
		}
	})
	
	
	$("#calendar").fullCalendar({
		height: 600,
		header : {
			left : 'prev, next, today',
			center : 'title',
			right :''
		},
		timeFormat: 'H(:mm)', //14:30
		dayClick : function(date) {
			$.getJSON(serverAddr + "/auth/loginuser.json", function(obj) {
				var result = obj.jsonResult
				if (result.state !== "success") {
					alert("로그인이 필요 합니다.");
					return;
				}
				
				// 팀이 있어야 등록 가능
				if (result.data.tno === 0) {
					alert("팀이 있어야 등록이 가능합니다.");
					return;
				}
				
				
				var currDate =date.format();
				if ($("#city_form").val() === "고양시") {
					var loc = $("#district_form1").val();
				} else {
					var loc = $("#district_form2").val();
				}
				
				var today = y+ "-"+m + "-" + d;
				var todayarr = today.split("-");
				var clickday = currDate.split("-");
				if (todayarr[0] - clickday[0] > 0 ) {
					console.log("prev");
				} else if (todayarr[1] - clickday[1] > 0) {
					console.log("prev day");
				} else if (todayarr[1] - clickday[1] === 0 && todayarr[2] - clickday[2] > 0) {
					console.log("prev day2");
				} else {
					window.location.href="test2.html?date="+currDate+"&loc="+loc;
				}
			})
		},
		eventClick: function(event) {
//			   if (event.url) {
//		            window.open(event.url);
//		            return false;
//		        }
		    }
	})
	
	
	$(".filter_btn").click(function() {
		if ($("#city_form").val() === "고양시") {
			var region = $("#district_form1").val();
		} else {
			var region = $("#district_form2").val();
		}
		$("#calendar").fullCalendar('removeEvents');
		ajaxLoadMatch(region);
	})
	
	function ajaxLoadMatch(region) {
		console.log(region);
		
		$.ajax({
			url : serverAddr + "/match/list.json",
			method : "POST",
			dataType : "json",
			data : {"region" : region},
			success : function(obj) {
				var result = obj.jsonResult;
				if (result.state !== "success") {
					alert("match list 조회 실패");
					return;
				}
				console.log(result);
				
				
				for (var i = 0; i < result.data.length; i++) {
					if (result.data[i].team_no2 === 0) { // 상대팀이 없는 경우
						$("#calendar").fullCalendar('addEventSource', [{
							title : result.data[i].team_name1 + " vs ",
							start : result.data[i].match_date,
							url : "test2.html?no="+result.data[i].match_no
						}]);
					} else { // 상대팀이 결정된 경우
						$("#calendar").fullCalendar('addEventSource', [{
							title : result.data[i].team_name1 + " vs " + result.data[i].team_name2,
							start : result.data[i].match_date,
							url : "test2.html?no="+result.data[i].match_no
						}]);
					}
				}
				
			}
		})
		
	}
	
	/*
	var team1 = "slamdunk";
	var team2 = "rebound";
	
	$("#calendar").fullCalendar({
		height : 500,
		header : {
			left:   'prevYear, title, nextYear',
			center: '',
			right:  'prev,today,next'
		},
	    editable : true,
	    events : [
	              {
	            	  title : team1 + " vs " + team2,
	            	  start : "2017-01-26 14:30:00",
	            	  end : "2017-01-26 17:00:00"
	            	 // url : "http://google.com"
	              }
	             ],
	   //timeFormat: 'h:mm' // 2:30
	   timeFormat: 'H(:mm)', //14:30
	   columnFormat : 'dddd',
	   buttonText : {today : '오늘'},
	   eventClick: function(event) {
		   
		   if (event.url) {
	            window.open(event.url);
	            return false;
	        }
	    },
	   dayClick: function(date, jsEvent, view) {
	        console.log('day', date.format()); // date is a moment
	        $(this).css('background-color', 'red');
	        var start = date.format();
	        console.log(start);
	        $("#calendar").fullCalendar('addEventSource', [{
	        	title : "aaaa",
	        	start : date.format()
	        }]);
	    },
	    eventDrop: function(event, delta, revertFunc) {

	        alert(event.title + " was dropped on " + event.start.format());

	        if (!confirm("Are you sure about this change?")) {
	            revertFunc();
	        }

	    },
	});
	
	*/
	
})
