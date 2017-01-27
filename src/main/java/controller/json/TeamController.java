package controller.json;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;

import dao.MemberDao;
import dao.PhotoDao;
import dao.TeamDao;
import dao.TeamPhotoDao;
import vo.JsonResult;
import vo.Member;
import vo.Photo;
import vo.Team;
import vo.TeamPhoto;

@Controller 
@RequestMapping("/team/") 
public class TeamController {
  
  @Autowired TeamDao teamDao;
  @Autowired MemberDao memberDao;
  @Autowired TeamPhotoDao teamPhotoDao;
  @Autowired PhotoDao photoDao;
  
  @RequestMapping(path="insert")
  public Object insertTeam(String teamName, String teamDesc, String tphoto_path, HttpSession session, SessionStatus sessionStatus) throws Exception {
    try {
      HashMap<String, Object> newTeam = new HashMap<>();
      newTeam.put("teamName", teamName);
      newTeam.put("teamDesc", teamDesc);
      Member member = (Member) session.getAttribute("member");
      
      Team team = teamDao.selectTeam(teamName);
      if (team != null) {
        return JsonResult.fail();
      }
      teamDao.insertTeam(newTeam);
      team = teamDao.selectTeam(teamName);
      if (tphoto_path != "") {
        team.setTphoto_path(tphoto_path);
        updateTeamPhoto(team);
      }
      
      List<TeamPhoto> teamPhoto = teamPhotoDao.selectOnePhoto(team.getNo());
      if (teamPhoto.size() != 0) {
        team.setTphoto_path(teamPhoto.get(0).getTphoto_path());
      }
      
      HashMap<String, Object> map = new HashMap<>();
      map.put("tno", team.getNo());
      map.put("no", member.getNo());
      memberDao.updateTeamNo(map);
      
      if (memberDao.countTno(team.getNo()) == 1) {
        memberDao.updateTauth(member.getNo());
      }
      
      sessionStatus.setComplete();
      member = memberDao.selectOne(member.getNo());
      List<Photo> photo = photoDao.selectOnePhoto(member.getNo());
      if (photo.size() != 0) {
        member.setPhoto_path(photo.get(0).getPhoto_path());
      }
      session.setAttribute("member", member);
      
      return JsonResult.success();
    } catch(Exception e) {
      e.printStackTrace();
      return JsonResult.error(e.getMessage());
    }
  }
  
  
  @RequestMapping(path="update")
  public Object teamUpdate(String teamDesc, String tphoto_path, HttpSession session) throws Exception {
    try {
      
      Member member = (Member) session.getAttribute("member");
      
      HashMap<String, Object> map = new HashMap<>();
      map.put("no", member.getTno());
      map.put("teamDesc", teamDesc);
      
      teamDao.update(map);
      Team team = teamDao.selectOne(member.getTno());
      team.setTphoto_path(tphoto_path);
      
      if (tphoto_path != "") {
        updateTeamPhoto(team);
      }
      
      List<TeamPhoto> teamPhoto = teamPhotoDao.selectOnePhoto(team.getNo());
      if (teamPhoto.size() != 0) {
        team.setTphoto_path(teamPhoto.get(0).getTphoto_path());
      }
      
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  @RequestMapping(path="teamlist")
  public Object teamList(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="8") int length) throws Exception {
    try {
      
      HashMap<String, Object> map = new HashMap<>();
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);
      
      List<Team> list = teamDao.selectTeamList(map);
      int totalPage = getTotalPage(length);
      
      for (int i = 0; i < list.size(); i++) {
        list.get(i).setCount(memberDao.countTno(list.get(i).getNo()));
      }
      
      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);
      data.put("totalPage", totalPage);
      data.put("pageNo", pageNo);
      data.put("length", length);
      
      return JsonResult.success(data);
    }catch (Exception e) {
      e.printStackTrace();
      return JsonResult.error(e.getMessage());
    }
  }
  
  @RequestMapping(path="teammemberlist")
  public Object teamMemberList(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="8") int length,
      int no) throws Exception {
    try {
      
      HashMap<String, Object> map = new HashMap<>();
      map.put("tno",no);
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);
      
      List<Member> list = memberDao.selectTeamMember(map);
      int totalPage = getMemberListTotalPage(length, no);
      
      for (int i = 0; i < list.size(); i++) {
        list.get(i).setPhoto_path(photoDao.selectOnePhotoPath(list.get(i).getNo()));
      }
      
      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);
      data.put("totalPage", totalPage);
      data.put("pageNo", pageNo);
      data.put("length", length);
      
      return JsonResult.success(data);
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  
  
  
  
  @RequestMapping(path="myteam")
  public Object myTeam(HttpSession session) throws Exception {
    try {
      Member member = (Member)session.getAttribute("member");
      if (member == null) {
        return JsonResult.fail();
      }
      if (member.getTno() == 0) {
        return JsonResult.success();
      }
      Team team = teamDao.selectOne(member.getTno());
      team.settAuth(member.isTauth());
      List<TeamPhoto> teamPhoto = teamPhotoDao.selectOnePhoto(team.getNo());
      
      if (teamPhoto.size() != 0) {
        team.setTphoto_path(teamPhoto.get(0).getTphoto_path());
      }
      
      return JsonResult.success(team);
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  
  @RequestMapping(path="delete")
  public Object deleteTeam(HttpSession session) throws Exception {
    try {
      
      Member member = (Member)session.getAttribute("member");
      if (member.isTauth() == true) {
        int tno = member.getTno();
        List<Member> list = memberDao.selectTno(member.getTno());
        for (int i = 0; i < list.size(); i++) {
          memberDao.deleteTno(list.get(i).getNo());
        }
        teamDao.delete(tno);
      } else {
         memberDao.deleteTno(member.getNo());
      }
      member.setTauth(false);
      member.setTno(0);
      return JsonResult.success(member);
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  
  
  
  
  public void updateTeamPhoto(Team team) throws Exception{
    try {
      TeamPhoto teamPhoto = new TeamPhoto();
      // 1. 처음 등록 하는 경우
      if (teamPhotoDao.selectOnePhoto(team.getNo()).size() == 0) {
        teamPhoto.setTno(team.getNo());
        teamPhoto.setTphoto_path(team.getTphoto_path());
        teamPhotoDao.insert(teamPhoto);
      }else if (team.getTphoto_path().equals("default Image")) { // 3. default Image 인경우
        teamPhoto.setTno(team.getNo());
        teamPhoto.setTphoto_path("");
        teamPhotoDao.update(teamPhoto);
      } else { // 사진 변경하는 경우
        teamPhoto.setTno(team.getNo());
        teamPhoto.setTphoto_path(team.getTphoto_path());
        teamPhotoDao.update(teamPhoto);
      }
      
    } catch (Exception e) {
      e.getMessage();
    }
  }
  
  
  public int getTotalPage(int pageSize) throws Exception {
    int countAll = teamDao.countAll();
    int totalPage = countAll / pageSize;
    if ((countAll % pageSize) > 0) {
      totalPage++;
    }
    return totalPage;
  }
  
  public int getMemberListTotalPage(int pageSize,int tno) throws Exception {
    int countAll = memberDao.countTno(tno);
    int totalPage = countAll / pageSize;
    if ((countAll % pageSize) > 0) {
      totalPage++;
    }
    return totalPage;
  }
  
  
}










