
$(function(){

   function ajaxLoadTeam(){   //팀 인포 받아와서 뿌려주는 함수.
      
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
        
        if(result.data.tphoto_path !== null && result.data.tphoto_path !== ""){
          $(".teamimage").attr("src","/slamdunk/upload/"+result.data.tphoto_path);
        }
        ajaxTeamMemberList(result.data.no);
      }
    });
   }

   function ajaxLoadOtherTeam(teamno){
    $.ajax({
      url : serverAddr+"/team/otherteam.json?teamno="+teamno,
      method : "GET",
      dataType : "json",
      success : function(obj){
        var result = obj.jsonResult;
        if(result.state !== "success"){
          alert("다른 팀원들을 불러오지 못했습니다.");
          return;
        }
          $(".teamname").text(result.data.teamName);
        
        if(result.data.tphoto_path !== null && result.data.tphoto_path !== ""){
          $(".teamimage").attr("src","/slamdunk/upload/"+result.data.tphoto_path);
        }
        ajaxTeamMemberList(result.data.no);
      }

    })
   }

   function ajaxTeamMemberList(teamno){
    $.ajax({
      url : serverAddr+"/team/teammemberlist.json?no="+teamno+"&length=15",
      method : "GET",
      dataType : "json",
      success : function(obj){
        var result = obj.jsonResult;
        if(result.state !== "success"){
          alert("본인팀원을 불러오지 못했습니다.");
          return;
        }
        console.log(result)
        var str = "<h3>Member's List</h3>";
        for(var i=0;i<result.data.list.length;i++){
          //변경될 사항.초기값을 만들어줘야함.
          var position = "미지정";
          if(result.data.list[i].position !== null){
            position = result.data.list[i].position;
          }
          var photo = "/slamdunk/images/bg05.jpg"
          if(result.data.list[i].photo_path !== null && result.data.list[i].photo_path !== ""){
            photo = "/slamdunk/upload/"+result.data.list[i].photo_path;
          }
          str += "<img class='myteamimage' src='"+photo+"'><h3>닉네임 :</h3><p class='mynickname'>"+result.data.list[i].nickname+"</p><h3>포지션 :</h3><p class='myposition'>"+position+"</p>"
        }
        $(".myinfo").html(str);
      }
    })
   }

    function ajaxRightTeam(teamno){
    $.ajax({
      url : serverAddr+"/team/otherteam.json?teamno="+teamno,
      method : "GET",
      dataType : "json",
      success : function(obj){
        var result = obj.jsonResult;
        if(result.state !== "success"){
          alert("다른 팀원들을 불러오지 못했습니다.");
          return;
        }
          $(".other_teamname").text(result.data.teamName);
        
        if(result.data.tphoto_path !== null && result.data.tphoto_path !== ""){
          $(".other_teamimage").attr("src","/slamdunk/upload/"+result.data.tphoto_path);
        }
        ajaxRightTeamMemberList(result.data.no);
      }

    })
   }

   function ajaxRightTeamMemberList(teamno){
    $.ajax({
      url : serverAddr+"/team/teammemberlist.json?no="+teamno+"&length=15",
      method : "GET",
      dataType : "json",
      success : function(obj){
        var result = obj.jsonResult;
        if(result.state !== "success"){
          alert("본인팀원을 불러오지 못했습니다.");
          return;
        }
        console.log(result)
        var str = "<h3>Member's List</h3>";
        for(var i=0;i<result.data.list.length;i++){
          //변경될 사항.초기값을 만들어줘야함.
          var position = "미지정";
          if(result.data.list[i].position !== null){
            position = result.data.list[i].position;
          }
          var photo = "/slamdunk/images/bg05.jpg"
          if(result.data.list[i].photo_path !== null && result.data.list[i].photo_path !== ""){
            photo = "/slamdunk/upload/"+result.data.list[i].photo_path;
          }
          str += "<img class='other_image' src='"+photo+"'><h3>닉네임 :</h3><p class='other_nickname'>"+result.data.list[i].nickname+"</p><h3>포지션 :</h3><p class='other_position'>"+position+"</p>"
        }
        $(".other_info").html(str);
      }
    })
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
          window.history.back();
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

    function ajaxDetailMatch(matchno){
      $.ajax({
        url : serverAddr+"/match/detail.json?matchno="+matchno,
        method : "GET",
        dataType : "json",
        success : function(obj){
          var result = obj.jsonResult;
          if(result.state !== "success"){
            alert("상세 페이지 로드 실패입니다.");
            return;
          }
          console.log(result);
          $.ajax({
            url : serverAddr+"/auth/loginuser.json",
            method : "GET",
            dataType:"json",
            success : function(obj2){
              var result2 = obj2.jsonResult;
              if(result2.state !== "success"){
                alert("로그인이 실패입니다.");
                return;
              }
                console.log(result2);
                if(result.data[0].team_no1 === result2.data.tno){
                  ajaxLoadTeam();
                  $(".location").text(result.data[0].region);
                  $(".place").val(result.data[0].location);
                  $(".date").text(result.data[0].match_date);
                  $("#team_number").val(result.data[0].rule);
                  $("#memo_area").val(result.data[0].match_desc);
                  $(".resister_btn").hide();
                  $(".battle_btn").hide();
                  $(".otherteam h3").hide();
                }else if(result.data[0].team_no2 !== 0){
                   ajaxLoadOtherTeam(result.data[0].team_no1);
                  $(".location").text(result.data[0].region);
                  $(".place_p").text(result.data[0].location);
                  $(".place").hide();
                  $(".date").text(result.data[0].match_date);
                  $(".team_rule").text(result.data[0].rule);
                  $("#team_number").hide();
                  $(".team_intro").text(result.data[0].match_desc);
                  $("#memo_area").hide(); 
                  $(".resister_btn").hide();
                  $(".update_btn").hide();
                  $(".delete_btn").hide();
                  $(".battle_btn").hide();
                  ajaxRightTeam(result.data[0].team_no2);
                }
                else{
                  ajaxLoadOtherTeam(result.data[0].team_no1);
                  $(".location").text(result.data[0].region);
                  $(".place_p").text(result.data[0].location);
                  $(".place").hide();
                  $(".date").text(result.data[0].match_date);
                  $(".team_rule").text(result.data[0].rule);
                  $("#team_number").hide();
                  $(".team_intro").text(result.data[0].match_desc);
                  $("#memo_area").hide(); 
                  $(".resister_btn").hide();
                  $(".update_btn").hide();
                  $(".delete_btn").hide();
                  $(".otherteam h3").hide();
                }
            }
          })
        }
      })
    }


    $(".update_btn").click(function(){
      if($(".place").val()===""){
        alert("장소를 적어주세요");
        return;
      }else if($("#memo_area").val()===""){
        alert("소개를 입력해주세요.");
        return;
      }
      var updateinfo = {
        location : $(".place").val(),
        rule : $("#team_number").val(),
        match_desc : $("#memo_area").val(),
        match_no : location.search.split("?")[1].split("=")[1]
        }
        ajaxUpdateMatch(updateinfo);    
    });
    
    function ajaxUpdateMatch(updateinfo){
      $.ajax({
        url: serverAddr+"/match/update.json",
        method : "POST",
        dataType : "json",
        data : updateinfo,
        success : function(obj){
          var result = obj.jsonResult;
          if(result.state !== "success"){
            alert("수정이 실패되었습니다.");
            return;
          }
          window.location.reload();
        }
      })
    }

    $(".delete_btn").click(function(){
       var match_no = location.search.split("?")[1].split("=")[1];
       ajaxDeleteMatch(match_no);
    });

       function ajaxDeleteMatch(match_no){
      $.ajax({
        url: serverAddr+"/match/delete.json?matchno="+match_no,
        method : "GET",
        dataType : "json",
        success : function(obj){
          var result = obj.jsonResult;
          if(result.state !== "success"){
            alert("삭제가 실패되었습니다.");
            return;
          }
          window.location.href = "matching.html";
        }
      })
    }

        $(".battle_btn").click(function(){
       var match_no = location.search.split("?")[1].split("=")[1];
       ajaxTeamBattle(match_no);
        });
        
        function ajaxTeamBattle(match_no){
          $.ajax({
        url: serverAddr+"/matchteam/battle.json?matchno="+match_no,
        method : "GET",
        dataType : "json",
        success : function(obj){
          var result = obj.jsonResult;
          if(result.state !== "success"){
            alert("배틀신청 실패되었거나, 이미 신청하셨습니다.");
            return;
          }
          alert("베틀신청이 완료되었습니다.")
          window.location.href = "matching.html";
        }
      })
        }




// 페이지가 열리면 무조건 실행.
  if(location.search.startsWith("?")) { //url에 ?표가 있냐 없냐.//

    if(location.search.split("?")[1].split("=")[0] === "match_no"){
      //상대방과 내가 보는 디테일 폼.
        var matchno = location.search.split("?")[1].split("=")[1];
        ajaxDetailMatch(matchno);
   
    }else{ // 스케줄 신청 폼.
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
        $(".otherteam h3").hide();

        ajaxLoadTeam(); // 팀이름 뿌려주는 함수 실행.
    } //매칭에서 url로 넘겨준 날짜와 지역을 찾기위해.

  }
});