package controller.json;

import java.util.HashMap;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.support.SessionStatus;

import dao.MemberDao;
import vo.JsonResult;
import vo.Member;

@Controller 
@RequestMapping("/auth/") 
public class AuthController {
  
  @Autowired MemberDao memberDao;
  
  @RequestMapping(path="login")
  public Object login(
      HttpSession session, /* 세션이 무효화된 이후에 세션을 자동 생성하도록 강제한다.*/
      HttpServletResponse response,
      String email,
      String password,
      boolean saveEmail, 
      SessionStatus sessionStatus) throws Exception {
    
    try {
      
      Cookie cookie = new Cookie("email", email);
      if (!saveEmail){
        cookie.setMaxAge(0); 
        cookie.setPath("/");
      } else {
        cookie.setMaxAge(60 * 60 * 24 * 7);
        cookie.setPath("/");
      }
      response.addCookie(cookie);
      
      HashMap<String,Object> map = new HashMap<>();
      map.put("email", email);
      map.put("password", password);
      
      Member member = memberDao.selectOneByEmailAndPassword(map);
      
      if (member == null) {
        sessionStatus.setComplete(); // 스프링이 관리하는 세션 값을 무효화시킨다.
        return JsonResult.fail();
        
      } else {
        session.setAttribute("member", member);
        return JsonResult.success(member);
      }
      
    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.error(e.getMessage());
      
    }
  }
/*  
  @RequestMapping(path="logout")
  public Object logout(HttpSession session, SessionStatus sessionStatus) throws Exception {
    try {
      sessionStatus.setComplete();
      session.invalidate();
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  @RequestMapping(path="loginuser")
  public Object loginUser(HttpSession session) throws Exception {
    
    try {
      Member member = (Member)session.getAttribute("member");
      if (member == null) {
        throw new Exception("로그인이 되지 않았습니다.");
      }
      return JsonResult.success(member);
    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.error(e.getMessage());
    }
  }
  
  @RequestMapping(path="confirmemail")
  public Object confirmEmail(HttpSession session, String email) throws Exception {
    
    try {
      
      System.out.println(email);
      
      HashMap<String, Object> map = new HashMap<>();
      map.put("email", email);
      Member member = memberDao.confirmEmail(map);
      
      if (member == null) {
        session.setAttribute("confirmemail", email);
        return JsonResult.success();
      }
        return JsonResult.fail();
      
    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.error(e.getMessage());
    }
  }
  
  
  
  @RequestMapping(path="defaultsignup")
  public Object defaultSignUp(HttpSession session, String password, String nickname, SessionStatus sessionStatus) throws Exception {
    try {
      if (session.getAttribute("confirmemail") == null) {
        return JsonResult.fail();
      }
      
      HashMap<String, Object> map = new HashMap<>();
      map.put("email", session.getAttribute("confirmemail"));
      map.put("password", password);
      map.put("nickname", nickname);
      
      memberDao.insertDefaultMember(map);
      
      sessionStatus.setComplete();
      session.invalidate();
      return JsonResult.success();
    } catch(Exception e) {
      e.printStackTrace();
      return JsonResult.error(e.getMessage());
    }
    
  }
  
  @RequestMapping(path="optionsignup")
  public Object optionSignUp(HttpSession session, String password, String nickname,
      String birth, String gender, String address, String drink, SessionStatus sessionStatus) throws Exception {
    try {
      
      System.out.println(birth);
      System.out.println(gender);
      System.out.println(address);
      System.out.println(drink);
      
      
      if (session.getAttribute("confirmemail") == null) {
        return JsonResult.fail();
      }
      
      System.out.println("aaa");
      
      HashMap<String, Object> map = new HashMap<>();
      map.put("email", session.getAttribute("confirmemail"));
      map.put("password", password);
      map.put("nickname", nickname);
      map.put("birth", birth);
      map.put("gender", gender);
      map.put("address", address);
      map.put("drink", drink);
      
      memberDao.insertOptionMember(map);
      
      sessionStatus.setComplete();
      session.invalidate();
      return JsonResult.success();
    } catch(Exception e) {
      e.printStackTrace();
      return JsonResult.error(e.getMessage());
    }
    
  }
  
  */
}










