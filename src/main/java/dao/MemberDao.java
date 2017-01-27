package dao;

import java.util.List;
import java.util.Map;

import vo.Member;

public interface MemberDao {
  
  Member selectOneByEmailAndPassword(Map<String,Object> paramMap) throws Exception;
  Member confirmEmail(Map<String,Object> paramMap) throws Exception;
  Member confirmNickname(Map<String,Object> paramMap) throws Exception;
  List<Member> selectTeamMember(Map<String,Object> paramMap) throws Exception;
  int insertMember(Map<String,Object> paramMap) throws Exception;
  Member selectOne(int no) throws Exception;
  int update(Member member) throws Exception; //update 비밀번호 없는 경우
  int updateAll(Member member) throws Exception; // update 비밀번호 있는 경우
  
  int updateTeamNo(Map<String,Object> paramMap) throws Exception; 
  int countTno(int tno) throws Exception;
  int updateTauth(int no) throws Exception;
  
  Member selectMemberbyTauth(int tno) throws Exception;
  String selectNickname(int no) throws Exception;
  int deleteTno(int no) throws Exception;
  List<Member> selectTno(int no) throws Exception;
  
}
