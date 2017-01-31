package dao;

import java.util.List;

import vo.Match;

public interface MatchDao {
  
  int insertMatch(Match match) throws Exception;
  List<Match> selectListMatch(int no) throws Exception;
  Match selectMatch(int no) throws Exception;
}
