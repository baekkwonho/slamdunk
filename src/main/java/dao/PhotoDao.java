package dao;

import java.util.List;

import vo.Photo;

public interface PhotoDao {
  
  int insert(Photo photo) throws Exception;
  int update(Photo photo) throws Exception;
  List<Photo> selectOnePhoto(int no) throws Exception;
  
}
