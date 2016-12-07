package dao;

import java.util.List;

import vo.Board;

public interface BoardDao {
  
  List<Board> selectBoardList() throws Exception;
  int insert(Board board) throws Exception;
  
}
