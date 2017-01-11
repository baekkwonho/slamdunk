package controller.json;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import dao.MemberDao;
import dao.TeamDao;
import vo.JsonResult;
import vo.Team;

@Controller 
@RequestMapping("/team/") 
public class TeamController {
  
  @Autowired TeamDao teamDao;
  @Autowired MemberDao memberDao;
  
  @RequestMapping(path="insert")
  public Object insertTeam(String teamName, String teamDesc, String sido, String gu, int mno) throws Exception {
    try {
      
      HashMap<String, Object> newTeam = new HashMap<>();
      newTeam.put("teamName", teamName);
      newTeam.put("teamDesc", teamDesc);
      newTeam.put("sido", sido);
      newTeam.put("gu", gu);
      
      teamDao.insertTeam(newTeam);
      Team team = teamDao.selectTeamNo(teamName);
      System.out.println(team.getNo());
      
      
      HashMap<String, Object> map = new HashMap<>();
      map.put("tno", team.getNo());
      map.put("no", mno);
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










