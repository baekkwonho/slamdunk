package vo;

import java.io.Serializable;

public class Region implements Serializable {
  private static final long serialVersionUID = 1L;
  
  int rno;
  String region_name;
  
  public int getRno() {
    return rno;
  }
  public void setRno(int rno) {
    this.rno = rno;
  }
  public String getRegion_name() {
    return region_name;
  }
  public void setRegion_name(String region_name) {
    this.region_name = region_name;
  }
  
  
}
