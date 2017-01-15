package dao;

import java.util.List;
import java.util.Map;

import vo.Board;
import vo.Notice;

public interface NoticeDao {
  
  List<Notice> selectNotice() throws Exception; //list
  int insert(Notice notice) throws Exception;
  Notice selectOne(int no) throws Exception; //detail
  int updateViewCount(Notice notice) throws Exception; //update viewCount
  int update(Notice notice) throws Exception; //update
  int delete(int no) throws Exception; //delete
  
}
