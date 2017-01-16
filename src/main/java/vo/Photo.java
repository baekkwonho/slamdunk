package vo;

import java.io.Serializable;
import java.sql.Date;

public class Photo implements Serializable {
  private static final long serialVersionUID = 1L;

  int no;
  int mno;
  String photo_path;
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getMno() {
    return mno;
  }
  public void setMno(int mno) {
    this.mno = mno;
  }
  public String getPhoto_path() {
    return photo_path;
  }
  public void setPhoto_path(String photo_path) {
    this.photo_path = photo_path;
  }
  
  
}
