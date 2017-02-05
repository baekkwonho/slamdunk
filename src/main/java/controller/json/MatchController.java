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
        if (list.get(i).getTeam_no2() != 0) {
          list.get(i).setTeam_name2(teamDao.selectTeamName(list.get(i).getTeam_no2()));
        }
      }
      
      return JsonResult.success(list);
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  @RequestMapping(path="detail")
  public Object detailMatch(int matchno) throws Exception {
    try {
      
      List<Match> match = matchDao.selectMatch(matchno);
      match.get(0).setRegion(regionDao.selectRegionName(match.get(0).getRegion_no()));
      match.get(0).setTeam_name1(teamDao.selectTeamName(match.get(0).getTeam_no1()));
      
      if (match.get(0).getTeam_no2() != 0) {
        match.get(0).setTeam_name2(teamDao.selectTeamName(match.get(0).getTeam_no2()));
      }

//      System.out.println(match.get(0).getRegion_no());
//      System.out.println(match.get(0).getRegion());
//      System.out.println(match.get(0).getMatch_date());
//      System.out.println(match.get(0).getTeam_no1());
//      System.out.println(match.get(0).getTeam_name1());
//      System.out.println(match.get(0).getLocation());
//      System.out.println(match.get(0).getRule());
//      System.out.println(match.get(0).getMatch_desc());
      
      
      return JsonResult.success(match);
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  @RequestMapping(path="update")
  public Object updateMatch(Match match) throws Exception {
    try {
      
//      System.out.println(match.getMatch_no());
//      System.out.println(match.getLocation());
//      System.out.println(match.getRule());
//      System.out.println(match.getMatch_desc());
      
      matchDao.updateMatch(match);
      
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  @RequestMapping(path="delete")
  public Object deleteMatch(int matchno) throws Exception {
    try {
      matchDao.deleteMatch(matchno);
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
    
  }
  
  
}










