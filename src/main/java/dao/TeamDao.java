package dao;

import java.util.List;
import java.util.Map;

import vo.Team;

public interface TeamDao {
  
  int insertTeam(Map<String,Object> paramMap) throws Exception;
  Team selectOne(int no) throws Exception;
  Team selectTeamNo(String teamName) throws Exception;
  int update(Team team) throws Exception; //update
  List<Team> selectTeamList() throws Exception;
  
  
}
