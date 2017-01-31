package vo;

import java.io.Serializable;
import java.sql.Date;

public class Match implements Serializable {
  private static final long serialVersionUID = 1L;
  
  int match_no;
  int region_no;
  String region;
  Date match_date;
  int team_no1;
  int team_no2;
  String team_name1;
  String team_name2;
  String location;
  String rule;
  String match_desc;
  
  public int getMatch_no() {
    return match_no;
  }
  public void setMatch_no(int match_no) {
    this.match_no = match_no;
  }
  public int getRegion_no() {
    return region_no;
  }
  public void setRegion_no(int region_no) {
    this.region_no = region_no;
  }
  public String getRegion() {
    return region;
  }
  public void setRegion(String region) {
    this.region = region;
  }
  public Date getMatch_date() {
    return match_date;
  }
  public void setMatch_date(Date match_date) {
    this.match_date = match_date;
  }
  public int getTeam_no1() {
    return team_no1;
  }
  public void setTeam_no1(int team_no1) {
    this.team_no1 = team_no1;
  }
  public int getTeam_no2() {
    return team_no2;
  }
  public void setTeam_no2(int team_no2) {
    this.team_no2 = team_no2;
  }
  public String getTeam_name1() {
    return team_name1;
  }
  public void setTeam_name1(String team_name1) {
    this.team_name1 = team_name1;
  }
  public String getTeam_name2() {
    return team_name2;
  }
  public void setTeam_name2(String team_name2) {
    this.team_name2 = team_name2;
  }
  public String getLocation() {
    return location;
  }
  public void setLocation(String location) {
    this.location = location;
  }
  public String getRule() {
    return rule;
  }
  public void setRule(String rule) {
    this.rule = rule;
  }
  public String getMatch_desc() {
    return match_desc;
  }
  public void setMatch_desc(String match_desc) {
    this.match_desc = match_desc;
  }
  
  
  
  
}
