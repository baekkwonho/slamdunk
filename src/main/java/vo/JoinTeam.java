package vo;

import java.io.Serializable;

public class JoinTeam implements Serializable {
  private static final long serialVersionUID = 1L;

  int jtno;
  int resno;
  int reqno;
  String reqNickname;
  
  public int getJtno() {
    return jtno;
  }
  public void setJtno(int jtno) {
    this.jtno = jtno;
  }
  public int getResno() {
    return resno;
  }
  public void setResno(int resno) {
    this.resno = resno;
  }
  public int getReqno() {
    return reqno;
  }
  public void setReqno(int reqno) {
    this.reqno = reqno;
  }
  public String getReqNickname() {
    return reqNickname;
  }
  public void setReqNickname(String reqNickname) {
    this.reqNickname = reqNickname;
  }
  
  
  
}
