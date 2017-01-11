package dao;

import java.util.Map;

import vo.Member;

public interface MemberDao {
  
  Member selectOneByEmailAndPassword(Map<String,Object> paramMap) throws Exception;
  Member confirmEmail(Map<String,Object> paramMap) throws Exception;
  Member confirmNickname(Map<String,Object> paramMap) throws Exception;
  int insertMember(Map<String,Object> paramMap) throws Exception;
  Member selectOne(int no) throws Exception;
  int update(Member member) throws Exception; //update
  int updateTeamNo(Map<String,Object> paramMap) throws Exception; 
  
  
}
