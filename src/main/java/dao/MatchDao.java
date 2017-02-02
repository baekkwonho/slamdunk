package dao;

import java.util.List;

import vo.Match;

public interface MatchDao {
  
  int insertMatch(Match match) throws Exception;
  List<Match> selectListMatch(int no) throws Exception;
  List<Match> selectMatch(int no) throws Exception;
  int updateMatch(Match match) throws Exception;
  int deleteMatch(int no) throws Exception;
}
