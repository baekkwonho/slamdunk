package dao;

import java.util.List;
import java.util.Map;

import vo.Board;

public interface BoardDao {
  
 // List<Board> selectBoardList() throws Exception; //list
  List<Board> selectBoardList(Map<String, Object> paramMap) throws Exception; //list
  int countAll() throws Exception;
  
  int insert(Board board) throws Exception; //insert
  Board selectOne(int no) throws Exception; //detail
  int updateViewCount(Board board) throws Exception; //update viewCount
  int update(Board board) throws Exception; //update
  int delete(int no) throws Exception; //delete
  
}
