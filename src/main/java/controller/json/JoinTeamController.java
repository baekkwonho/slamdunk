package controller.json;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import dao.JoinTeamDao;
import dao.MemberDao;
import vo.JoinTeam;
import vo.JsonResult;
import vo.Member;

@Controller 
@RequestMapping("/jointeam/") 
public class JoinTeamController {
  
  @Autowired MemberDao memberDao;
  @Autowired JoinTeamDao joinTeamDao;
  
  @RequestMapping("join")
  public Object joinTeam(HttpSession session, int no) throws Exception {
    try {
      
      //no = teamno
      //1. 요청자 구하기
      Member reqMember = (Member)session.getAttribute("member");
      //2. teamno 로 tauth 인 member 구하기.
      Member resMember = memberDao.selectMemberbyTauth(no);
      
      //3 reqNo로 join_team에 있는지 확인
      int count =  joinTeamDao.selectOnebyReqno(reqMember.getNo());
      int member_cnt = memberDao.countTno(resMember.getTno());
      System.out.println(member_cnt);
      if (count != 0 || member_cnt >= 15) {
        return JsonResult.fail();
      }
      //4 jointeam DB에 추가하기
      JoinTeam joinTeam = new JoinTeam();
      joinTeam.setResno(resMember.getNo());
      joinTeam.setReqno(reqMember.getNo());
      joinTeamDao.insert(joinTeam);
      
      
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  // 요청 리스트 보여주기
  @RequestMapping("list")
  public Object joinTeamList(HttpSession session) throws Exception {
    try {
      Member member = (Member)session.getAttribute("member");
      List<JoinTeam> list = joinTeamDao.selectList(member.getNo());
      
      for (int i = 0; i < list.size(); i++) {
        list.get(i).setReqNickname(memberDao.selectNickname(list.get(i).getReqno()));
      }
      
      return JsonResult.success(list);
    } catch (Exception e){
      return JsonResult.error(e.getMessage());
    }
  }
  
  //팀 승인
  @RequestMapping("ok")
  public Object addTeam(HttpSession session, int no) throws Exception {
    try {
      //no = reqno
      Member member = (Member)session.getAttribute("member");
      HashMap<String, Object> map = new HashMap<>();
      
      map.put("tno", member.getTno());
      map.put("no", no);
      memberDao.updateTeamNo(map);
      
      joinTeamDao.delete(no);
      
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  //팀 거절
  @RequestMapping("no")
  public Object deleteRequest(int no) throws Exception {
    try {
      
      joinTeamDao.delete(no);
      
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  
}










