package vo;

import java.io.Serializable;
import java.sql.Date;

public class MatchTeam implements Serializable {
  private static final long serialVersionUID = 1L;
  
  int mtno;
  int match_no;
  int reqTeamNo;
  int resTeamNo;
  String reqTeamname;
  Date match_date;
  
  public int getMtno() {
    return mtno;
  }
  public void setMtno(int mtno) {
    this.mtno = mtno;
  }
  public int getMatch_no() {
    return match_no;
  }
  public void setMatch_no(int match_no) {
    this.match_no = match_no;
  }
  public int getReqTeamNo() {
    return reqTeamNo;
  }
  public void setReqTeamNo(int reqTeamNo) {
    this.reqTeamNo = reqTeamNo;
  }
  public int getResTeamNo() {
    return resTeamNo;
  }
  public void setResTeamNo(int resTeamNo) {
    this.resTeamNo = resTeamNo;
  }
  public String getReqTeamname() {
    return reqTeamname;
  }
  public void setReqTeamname(String reqTeamname) {
    this.reqTeamname = reqTeamname;
  }
  public Date getMatch_date() {
    return match_date;
  }
  public void setMatch_date(Date match_date) {
    this.match_date = match_date;
  }
  
  
}
