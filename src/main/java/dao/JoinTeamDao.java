package dao;

import java.util.List;

import vo.JoinTeam;

public interface JoinTeamDao {
  
  int insert(JoinTeam joinTeam) throws Exception;
  int selectOnebyReqno(int no) throws Exception;
  int countRequest(int no) throws Exception;
  List<JoinTeam> selectList(int no) throws Exception;
  int delete(int no) throws Exception;
  
}
