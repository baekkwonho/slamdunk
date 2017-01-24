package vo;

import java.io.Serializable;

public class Team implements Serializable {
  private static final long serialVersionUID = 1L;

  int no;
  String teamName;
  String teamDesc;
  String tphoto_path;
  
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getTeamName() {
    return teamName;
  }
  public void setTeamName(String teamName) {
    this.teamName = teamName;
  }
  public String getTeamDesc() {
    return teamDesc;
  }
  public void setTeamDesc(String teamDesc) {
    this.teamDesc = teamDesc;
  }
  public String getTphoto_path() {
    return tphoto_path;
  }
  public void setTphoto_path(String tphoto_path) {
    this.tphoto_path = tphoto_path;
  }
  
  
  
  
}
