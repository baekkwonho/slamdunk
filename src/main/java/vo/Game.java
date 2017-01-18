package vo;

import java.io.Serializable;
import java.sql.Date;

public class Game implements Serializable {
  private static final long serialVersionUID = 1L;
  
  String date;
  String hour;
  String leftTeam;
  String leftImg;
  String score;
  String rightTeam;
  String rightImg;
  String stadium;
  
  public String getDate() {
    return date;
  }
  public void setDate(String date) {
    this.date = date;
  }
  public String getHour() {
    return hour;
  }
  public void setHour(String hour) {
    this.hour = hour;
  }
  public String getLeftTeam() {
    return leftTeam;
  }
  public void setLeftTeam(String leftTeam) {
    this.leftTeam = leftTeam;
  }
  public String getLeftImg() {
    return leftImg;
  }
  public void setLeftImg(String leftImg) {
    this.leftImg = leftImg;
  }
  public String getScore() {
    return score;
  }
  public void setScore(String score) {
    this.score = score;
  }
  public String getRightTeam() {
    return rightTeam;
  }
  public void setRightTeam(String rightTeam) {
    this.rightTeam = rightTeam;
  }
  public String getRightImg() {
    return rightImg;
  }
  public void setRightImg(String rightImg) {
    this.rightImg = rightImg;
  }
  public String getStadium() {
    return stadium;
  }
  public void setStadium(String stadium) {
    this.stadium = stadium;
  }
  
}
