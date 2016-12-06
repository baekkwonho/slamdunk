package vo;

import java.io.Serializable;
import java.sql.Date;

public class Board implements Serializable {
  private static final long serialVersionUID = 1L;

  int no;
  int mno;
  String title;
  String contents;
  String writer;
  String password;
  Date cre_dt;
  int vw_cnt;
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
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getContents() {
    return contents;
  }
  public void setContents(String contents) {
    this.contents = contents;
  }
  public String getWriter() {
    return writer;
  }
  public void setWriter(String writer) {
    this.writer = writer;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public Date getCre_dt() {
    return cre_dt;
  }
  public void setCre_dt(Date cre_dt) {
    this.cre_dt = cre_dt;
  }
  public int getVw_cnt() {
    return vw_cnt;
  }
  public void setVw_cnt(int vw_cnt) {
    this.vw_cnt = vw_cnt;
  }
  
  
}
