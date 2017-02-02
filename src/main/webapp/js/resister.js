
$(function(){

   function ajaxLoadTeam(){   //팀명받아와서 뿌려주는 함수.
      
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
        $(".teamname").text(result.data.teamName);
      }
    });
   }

   function ajaxAddMatch(match){ //스케줄버튼 누르면 서버에 값전달해서 서버에 저장시키기.
    $.ajax({
        url : serverAddr+"/match/add.json",
        method : "POST",
        dataType : "json",
        data : match,
        success : function(obj){
          var result = obj.jsonResult;
          if(result.state !== "success"){
            alert("스케줄 신청 실패했습니다.");
            return;
          }
          window.location.href = "matching.html";
        }
    })
   }

   $(".resister_btn").click(function(){

      var match = {
        region : $(".location").text(),
        location : $(".place").val(),
        match_date : $(".date").text(),
        rule : $("#team_number").val(),
        match_desc : $("#memo_area").val()
      }

      ajaxAddMatch(match);
   });


  if(location.search.startsWith("?")) { //url에 ?표가 있냐 없냐.//
    var urlclickdate = location.search.split("&")[0].split("=")[1];
    var urllocal = location.search.split("&")[1].split("=")[1];
    var local = "";
    switch(urllocal){
      case "1" :
        local = "고양시 일산동구";
        break;
      case "2" :
        local = "고양시 일산서구";
       break;
      case "3" :
        local = "고양시 덕양구";
        break;
      case "4" :
        local = "서울특별시 은평구";
        break;
      case "5" :
        local = "서울특별시 강남구";
        break;
      case "6" :
        local = "서울특별시 서초구";
        break;
      default :
         local = "고양시 일산동구";
    }
    $(".location").text(local); // html 문서에 (매칭에서 선택한)지역뿌려주기.
    $(".date").text(urlclickdate); // html 문서에 (매칭에서 선택한)클린한 날짜 뿌려주기.
    $(".battle_btn").hide();
    $(".update_btn").hide();
    $(".delete_btn").hide();

    ajaxLoadTeam(); // 팀이름 뿌려주는 함수 실행.
  } //매칭에서 url로 넘겨준 날짜와 지역을 찾기위해.


});