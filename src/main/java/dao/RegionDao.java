package dao;

public interface RegionDao {
  
  int selectRegion(String region_name) throws Exception;
  String selectRegionName(int no) throws Exception;
}
