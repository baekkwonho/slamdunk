package controller.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import vo.JsonResult;
import vo.Kbl;

@Controller 
@RequestMapping("/kbl/") 
public class KblController {
  
  @RequestMapping(path="today")
  public Object kblToday() throws Exception{
    
    try {
      return JsonResult.success(getKbl());
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="month")
  public Object kblMonth() throws Exception {
    try {

      Document document = Jsoup.connect("http://sports.news.naver.com/basketball/schedule/index.nhn?category=kbl").get();
      List<Kbl> list = new ArrayList<Kbl>();
      Kbl kbl = new Kbl();
      if (document != null) {

        Elements todayGame = document.select("#content tbody");
        for (int i = 0, k = 0; i < todayGame.size(); i++) {
          Elements element = todayGame.get(i).select("tr");

          for (int j = 0; j < element.size(); j++) {
            kbl.setDate(element.get(0).select(".td_date").text());
            kbl.setHour(element.get(j).select(".td_hour").text());

            if (element.get(j).select(".td_none").isEmpty() == false) {
              list.add(k,kbl);
              k++;
            }else {
              kbl.setLeftTeam(element.get(j).select(".team_lft").text());
              kbl.setLeftImg(element.get(j).select("img[title="+element.get(j).select(".team_lft").text()+"]").attr("src"));
              kbl.setScore(element.get(j).select(".td_score").text());
              kbl.setRightTeam((element.get(j).select(".team_rgt").text()));
              kbl.setRightImg(element.get(j).select("img[title="+element.get(j).select(".team_rgt").text()+"]").attr("src"));
              kbl.setStadium((element.get(j).select(".td_stadium").text()));

              list.add(k, kbl);
              k++;
            }
            kbl = new Kbl();
          }
        }
      }
      return JsonResult.success(list);
      
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










