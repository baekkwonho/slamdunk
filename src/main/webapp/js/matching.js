$(document).ready(function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate(); // 오늘의 날짜를 받아올수 있다.(전역변수)

  

    $("#calendar").fullCalendar({
        
        header : {
            left : 'prev , next, today',
            center : 'title',
            right : ''
        },

        dayClick : function(date){
            $.ajax({
                url : serverAddr+"/auth/loginuser.json",
                method : "GET",
                dataType: "json",
                success : function(obj){
                    var result = obj.jsonResult;
                    if(result.state !== "success"){
                        alert("로그인을 하세요.");
                        return;
                    }
                    if(result.data.tno === 0){
                        alert("team이 필요합니다.");
                        return;
                    }

                    var local = 0;
                    if($("#city_form").val() === "고양시"){
                        local = $("#district_form").val();
                    }else{
                        local = $("#district_form2").val();
                    }

                    var clickday = date.format(); //클릭한 날짜를 받아온다.
                    var today = year +"-"+ month +"-"+ day;

                    var splclickday = clickday.split("-");
                    var spltoday = today.split("-");

                    if( spltoday[0] - splclickday[0] > 0 ){
                        alert("지난 시기 입니다.");
                        return;
                    }else if( spltoday[1] - splclickday[1] > 0 ){
                        alert("지난 시기 입니다.");
                        return;
                    }else if( spltoday[1] - splclickday[1] === 0 && spltoday[2] -splclickday[2] > 0 ){
                        alert("지난 시기 입니다.");
                        return;
                    }else{
                        window.location.href  = "resister.html?date="+clickday+"&loc="+local;
                    }
                }
            })
        }
    }); 
        // 검색버튼을 누르면 그것에 대한 값을 서버에 보낸다.
        $(".filter_btn").click(function(){
            if($("#city_form").val()==="고양시"){
                var region = $("#district_form").val();
            }else{
                var region = $("#district_form2").val();
            }
           
            // 이벤트를 뿌려주기전에 먼저 이벤트를 삭제해서 기존에 있던 스케줄을 초기화.
            $("#calendar").fullCalendar('removeEvents');
            
            //함수실행. 스케줄에 뿌려주기위한 함수실행.
            ajaxLoadMatch(region);
        });

        function ajaxLoadMatch(region){
            $.ajax({
                url : serverAddr+"/match/list.json?region="+region,
                method : "GET",
                dataType : "json",
                success : function(obj){
                    var result = obj.jsonResult;
                    if(result.state !== "success"){
                        alert("스케줄 로드를 실패했습니다.");
                        return;
                    }
                    // 데이터마다 체크를 해야되기때문에 반복문을 사용.
                    for(var i =0; i<result.data.length;i++){
                        if(result.data[i].team_no2 === 0){
                            $("#calendar").fullCalendar('addEventSource',[{
                                title : result.data[i].team_name1+" / "+result.data[i].rule+" / "+result.data[i].location,
                                start : result.data[i].match_date,
                                url : "resister.html?match_no="+result.data[i].match_no
                            }])
                        }else{
                            $("#calendar").fullCalendar('addEventSource',[{
                                title : result.data[i].team_name1+"VS"+result.data[i].team_name2,
                                start : result.data[i].match_date,
                                url : "resister.html?match_no="+result.data[i].match_no
                            }])
                        }
                    }
                }
            })
        }

       // select 값이 바뀔떄마다 적용.
          $("#city_form").change(function(){
            if($("#city_form").val()==="고양시"){
                $("#district_form").show();
                $("#district_form2").hide();
            }else{
                 $("#district_form").hide();
                $("#district_form2").show();
            }
        });
        // 지역이 어딘지를 인식. // 이 부분은 페이지가 열릴때마다 실행되는 부분.    
        if($("#city_form").val()==="고양시"){
                var region = $("#district_form").val();
                $("#district_form").show();
                $("#district_form2").hide();
            }else{
                var region = $("#district_form2").val();
                $("#district_form").hide();
                $("#district_form2").show();
            }
        
        ajaxLoadMatch(region);

});
