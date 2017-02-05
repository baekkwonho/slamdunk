package controller.json;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import dao.MatchDao;
import dao.MatchTeamDao;
import dao.TeamDao;
import vo.JsonResult;
import vo.Match;
import vo.MatchTeam;
import vo.Member;

@Controller 
@RequestMapping("/matchteam/") 
public class MatchTeamController {
  
  @Autowired MatchDao matchDao;
  @Autowired MatchTeamDao matchTeamDao;
  @Autowired TeamDao teamDao;
  
  
  @RequestMapping("battle")
  public Object matchTeamBattle(HttpSession session, int matchno) throws Exception {
    try {
      
      Member reqMember = (Member)session.getAttribute("member");
      
      MatchTeam matchTeam = new MatchTeam();
      matchTeam.setMatch_no(matchno);
      matchTeam.setReqTeamNo(reqMember.getTno());
      
      System.out.println(matchTeam.getMatch_no());
      System.out.println(matchTeam.getReqTeamNo());
      int count = matchTeamDao.selectOnebyReqTeamNo(matchTeam);
      System.out.println(count);
      
      if (count != 0) {
        return JsonResult.fail();
      }
      
      // 응답자 설정
      List<Match> match = matchDao.selectMatch(matchno);
      matchTeam.setResTeamNo(match.get(0).getTeam_no1());
      
      //DB추가
      matchTeamDao.insert(matchTeam);
      
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  
  @RequestMapping(path="list")
  public Object matchTeamList(HttpSession session) throws Exception {
    try {
      
      Member member = (Member)session.getAttribute("member");
      List<MatchTeam> list = matchTeamDao.selectList(member.getTno());
      
      for (int i = 0; i < list.size(); i++) {
        list.get(i).setReqTeamname(teamDao.selectTeamName(list.get(i).getReqTeamNo()));
        list.get(i).setMatch_date(matchDao.selectMatch(list.get(i).getMatch_no()).get(0).getMatch_date());
      }
      
      return JsonResult.success(list);
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  @RequestMapping(path="ok")
  public Object addMatch(HttpSession session, int mtno) throws Exception {
    try {
      //mtno = matchteamno를 받아서 reqteamno를 찾아야함.
      
      Member member = (Member)session.getAttribute("member");
      
      List<MatchTeam> list = matchTeamDao.selectMatchTeam(mtno);
      // 해당 매치 가져오기
      List<Match> match = matchDao.selectMatch(list.get(0).getMatch_no());
      System.out.println(match.get(0).getMatch_no());
      // 매치에 요청 팀번호, 팀이름 저장
      match.get(0).setTeam_no2(list.get(0).getReqTeamNo());
      match.get(0).setTeam_name2(teamDao.selectTeamName(list.get(0).getReqTeamNo()));
      
      System.out.println(match.get(0).getTeam_no2());
      System.out.println(match.get(0).getTeam_name2());
      
      Match updateMatch = new Match();
      updateMatch.setMatch_no(match.get(0).getMatch_no());
      updateMatch.setTeam_no2(match.get(0).getTeam_no2());
      
      matchDao.updateBattleMatch(updateMatch);
      
      
      // matchteam table에서 해당 매칭에 대해 모두 삭제
      matchTeamDao.deletebyMatchNo(list.get(0).getMatch_no());
      
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  @RequestMapping(path="no")
  public Object deleteRequestMatch(int mtno) throws Exception {
    try {
      
      matchTeamDao.deletebyMatchTeamNo(mtno);
      
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
}










