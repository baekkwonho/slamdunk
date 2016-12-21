package controller.json;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import dao.BoardDao;
import vo.Board;
import vo.JsonResult;
import vo.Member;

@Controller 
@RequestMapping("/kbl/") 
public class KblController {
  
  @RequestMapping(path="today")
  public Object kblList() throws Exception{
    
    try {
      return JsonResult.success(getKbl());
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  
  public Object getKbl() throws Exception {
    Document document = Jsoup.connect("http://sports.news.naver.com/basketball/schedule/index.nhn?category=kbl").get();
    //firstGame 정보
    Elements left = document.select(".inner_lft  > div:not(.vs_btn)");
    String fgState = left.select("em.state").text();
    String fgLeftImg = left.select(".vs_lft > img").attr("src");
    String fgLeftTeam = left.select(".vs_lft > span").text();
    String fgLeftScore = left.select(".vs_lft > strong").text();
    String fgRightImg = left.select(".vs_rgt > img").attr("src");
    String fgRightTeam = left.select(".vs_rgt > span").text();
    String fgRightScore = left.select(".vs_rgt > strong").text();
    
    //SecondGame 정보
    Elements middle = document.select(".inner_mid > div:not(.vs_btn)");
    String sgState = middle.select("em.state").text();
    String sgLeftImg = middle.select(".vs_lft > img").attr("src");
    String sgLeftTeam = middle.select(".vs_lft > span").text();
    String sgLeftScore = middle.select(".vs_lft > strong").text();
    String sgRightImg = middle.select(".vs_rgt > img").attr("src");
    String sgRightTeam = middle.select(".vs_rgt > span").text();
    String sgRightScore = middle.select(".vs_rgt > strong").text();
    
    //ThirdGame 정보
    Elements right = document.select(".inner_rgt > div:not(.vs_btn)");
    String tgState = right.select("em.state").text();
    String tgLeftImg = right.select(".vs_lft > img").attr("src");
    String tgLeftTeam = right.select(".vs_lft > span").text();
    String tgLeftScore = right.select(".vs_lft > strong").text();
    String tgRightImg = right.select(".vs_rgt > img").attr("src");
    String tgRightTeam = right.select(".vs_rgt > span").text();
    String tgRightScore = right.select(".vs_rgt > strong").text();
    
    HashMap<String, Object> map = new HashMap<>();
    map.put("fgState", fgState);
    map.put("fgLeftImg", fgLeftImg);
    map.put("fgLeftTeam", fgLeftTeam);
    map.put("fgLeftScore", fgLeftScore);
    map.put("fgRightImg", fgRightImg);
    map.put("fgRightTeam", fgRightTeam);
    map.put("fgRightScore", fgRightScore);
    
    map.put("sgState", sgState);
    map.put("sgLeftImg", sgLeftImg);
    map.put("sgLeftTeam", sgLeftTeam);
    map.put("sgLeftScore", sgLeftScore);
    map.put("sgRightImg", sgRightImg);
    map.put("sgRightTeam", sgRightTeam);
    map.put("sgRightScore", sgRightScore);
    
    map.put("tgState", tgState);
    map.put("tgLeftImg", tgLeftImg);
    map.put("tgLeftTeam", tgLeftTeam);
    map.put("tgLeftScore", tgLeftScore);
    map.put("tgRightImg", tgRightImg);
    map.put("tgRightTeam", tgRightTeam);
    map.put("tgRightScore", tgRightScore);
    
    return map;
  }
  
  
  
  
}










