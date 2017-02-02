$(document).ready(function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate(); // 오늘의 날짜를 받아올수 있다.(전역변수)

    $("#district_form2").hide();
    $("#city_form").change(function(){
        if($("#city_form").val()==="고양시"){
            $("#district_form").show();
            $("#district_form2").hide();
        }else{
             $("#district_form").hide();
            $("#district_form2").show();
        }

    });

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

                    console.log(splclickday);
                    console.log(spltoday);

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
});
