package vo;

import java.io.Serializable;

public class TeamPhoto implements Serializable {
  private static final long serialVersionUID = 1L;

  int no;
  int tno;
  String tphoto_path;
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getTno() {
    return tno;
  }
  public void setTno(int tno) {
    this.tno = tno;
  }
  public String getTphoto_path() {
    return tphoto_path;
  }
  public void setTphoto_path(String tphoto_path) {
    this.tphoto_path = tphoto_path;
  }
  
  
  
}
