$(document).ready(function() {
       
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
  
    $('#calendar').fullCalendar({
         dayClick: function(date){
            $.ajax({
                        url : serverAddr+"/auth/loginuser.json",
                        method : "GET",
                        dataType : "json",
                        success : function(obj){
                            var result = obj.jsonResult;
                            if(result.state !== "success"){
                                alert("로그인을 해주세요.")
                                return;
                            }
                            var today = y+"-"+(m+1)+"-"+d;
                            var clickday = date.format();
                            console.log(today);
                            console.log(clickday);
                            var spltoday =today.split("-");
                            var splclickday=clickday.split("-");

                            console.log(spltoday);
                            console.log(splclickday);
                            
                            if(spltoday[0]-splclickday[0] > 0){
                                alert("지난 시기 입니다.");
                            }else if(spltoday[1]-splclickday[1] > 0){
                                alert("지난 시기 입니다.");
                            }else if(spltoday[1]-splclickday[1] === 0 && spltoday[2]-splclickday[2] > 0){
                                alert("지난 시기 입니다.");
                            }else{
                               window.location.href="resister.html"
                            }        
                }
                    });
            },
            header: {
                left: 'prev,next ,today ',
                center: 'title',
                right: ''
            },
            editable : true,
            eventLimit : true
             });
              
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

        });
