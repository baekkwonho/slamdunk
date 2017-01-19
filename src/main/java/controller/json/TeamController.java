package controller.json;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import dao.MemberDao;
import dao.TeamDao;
import vo.JsonResult;
import vo.Member;
import vo.Team;

@Controller 
@RequestMapping("/team/") 
public class TeamController {
  
  @Autowired TeamDao teamDao;
  @Autowired MemberDao memberDao;
  
  @RequestMapping(path="insert")
  public Object insertTeam(String teamName, String teamDesc, HttpSession session) throws Exception {
    try {
      
      HashMap<String, Object> newTeam = new HashMap<>();
      newTeam.put("teamName", teamName);
      newTeam.put("teamDesc", teamDesc);
      Member member = (Member) session.getAttribute("member");
      System.out.println(member.getNo());
      System.out.println(newTeam.get("teamName"));
      System.out.println(newTeam.get("teamDesc"));
      System.out.println("insert NewTeam");
      teamDao.insertTeam(newTeam);
      Team team = teamDao.selectTeam(teamName);
      System.out.println(team.getNo());
      System.out.println(team.getTeamName());
      System.out.println(team.getTeamDesc());
      
      HashMap<String, Object> map = new HashMap<>();
      map.put("tno", team.getNo());
      map.put("no", member.getNo());
      memberDao.updateTeamNo(map);
      
      return JsonResult.success();
    } catch(Exception e) {
      e.printStackTrace();
      return JsonResult.error(e.getMessage());
    }
  }
  
  @RequestMapping(path="teamlist")
  public Object teamList() throws Exception {
    try {
      
      List<Team> list = teamDao.selectTeamList();
      
      return JsonResult.success(list);
    }catch (Exception e) {
      e.printStackTrace();
      return JsonResult.error(e.getMessage());
    }
  }
  
  
  
  
  
  
  
}










