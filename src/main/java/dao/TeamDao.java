package dao;

import java.util.List;
import java.util.Map;

import vo.Team;

public interface TeamDao {
  
  int insertTeam(Map<String,Object> paramMap) throws Exception;
  Team selectOne(int no) throws Exception;
  Team selectTeam(String teamName) throws Exception;
  int update(Map<String,Object> paramMap) throws Exception; //update
  List<Team> selectTeamList(Map<String,Object> paramMap) throws Exception;
  int countAll() throws Exception;
  int delete(int no) throws Exception;
  String selectTeamName(int no) throws Exception;
}
