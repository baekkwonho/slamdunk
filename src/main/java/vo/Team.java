package vo;

import java.io.Serializable;

public class Team implements Serializable {
  private static final long serialVersionUID = 1L;

  int no;
  String teamName;
  String teamDesc;
  String tphoto_path;
  int count;
  String captain;
  Boolean tAuth;
  
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
  public int getCount() {
    return count;
  }
  public void setCount(int count) {
    this.count = count;
  }
  public String getCaptain() {
    return captain;
  }
  public void setCaptain(String captain) {
    this.captain = captain;
  }
  public Boolean gettAuth() {
    return tAuth;
  }
  public void settAuth(Boolean tAuth) {
    this.tAuth = tAuth;
  }
  
  
  
  
}
