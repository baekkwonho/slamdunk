package vo;

import java.io.Serializable;

public class Member implements Serializable {
  private static final long serialVersionUID = 1L;

  int no;
  int tno;
  String email;
  String password;
  String nickname;
  boolean gender;
  String position;
  float height;
  float weight;
  String skill;
  boolean tauth;
  String photo_path;
  int requstCount;
  
  
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
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public String getNickname() {
    return nickname;
  }
  public void setNickname(String nickname) {
    this.nickname = nickname;
  }
  public boolean isGender() {
    return gender;
  }
  public void setGender(boolean gender) {
    this.gender = gender;
  }
  public String getPosition() {
    return position;
  }
  public void setPosition(String position) {
    this.position = position;
  }
  public float getHeight() {
    return height;
  }
  public void setHeight(float height) {
    this.height = height;
  }
  public float getWeight() {
    return weight;
  }
  public void setWeight(float weight) {
    this.weight = weight;
  }
  public String getSkill() {
    return skill;
  }
  public void setSkill(String skill) {
    this.skill = skill;
  }
  public boolean isTauth() {
    return tauth;
  }
  public void setTauth(boolean tauth) {
    this.tauth = tauth;
  }
  public String getPhoto_path() {
    return photo_path;
  }
  public void setPhoto_path(String photo_path) {
    this.photo_path = photo_path;
  }
  public int getRequstCount() {
    return requstCount;
  }
  public void setRequstCount(int requstCount) {
    this.requstCount = requstCount;
  }
  
  
  
}
