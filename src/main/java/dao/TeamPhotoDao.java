package dao;

import java.util.List;

import vo.TeamPhoto;

public interface TeamPhotoDao {
  
  int insert(TeamPhoto teamphoto) throws Exception;
  int update(TeamPhoto teamphoto) throws Exception;
  List<TeamPhoto> selectOnePhoto(int no) throws Exception;
  
}
