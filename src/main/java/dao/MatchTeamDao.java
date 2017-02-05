package dao;

import java.util.List;

import vo.MatchTeam;

public interface MatchTeamDao {
  
  int insert(MatchTeam matchTeam) throws Exception;
  int selectOnebyReqTeamNo(MatchTeam matchTeam) throws Exception;
  List<MatchTeam> selectList(int no) throws Exception;
  List<MatchTeam> selectMatchTeam(int no) throws Exception;
  int deletebyMatchNo(int no) throws Exception;
  int deletebyMatchTeamNo(int no) throws Exception;
  
}
