package controller.json;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import dao.MatchDao;
import dao.MemberDao;
import dao.RegionDao;
import dao.TeamDao;
import vo.JsonResult;
import vo.Match;
import vo.Member;

@Controller 
@RequestMapping("/match/") 
public class MatchController {
  
  @Autowired TeamDao teamDao;
  @Autowired MemberDao memberDao;
  @Autowired MatchDao matchDao;
  @Autowired RegionDao regionDao;
  
  @RequestMapping(path="add")
  public Object addMatch(HttpSession session, Match match) throws Exception {
    try {
      
      Member member = (Member)session.getAttribute("member");
      
      Match newMatch = new Match();
      newMatch.setMatch_date(match.getMatch_date());
      newMatch.setTeam_no1(member.getTno());
      newMatch.setRegion_no(regionDao.selectRegion(match.getRegion()));
      newMatch.setLocation(match.getLocation());
      newMatch.setRule(match.getRule());
      newMatch.setMatch_desc(match.getMatch_desc());
      
      matchDao.insertMatch(newMatch);
      
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  
  @RequestMapping(path="list")
  public Object listMatch(int region) throws Exception {
    try {
      
      List<Match> list = matchDao.selectListMatch(region);
      
      for (int i = 0; i < list.size(); i++) {
        list.get(i).setTeam_name1(teamDao.selectTeamName(list.get(i).getTeam_no1()));
      }
      
      return JsonResult.success(list);
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  
  
  
}










