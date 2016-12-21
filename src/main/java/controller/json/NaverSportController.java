package controller.json;

import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import vo.Kbl;

public class NaverSportController {

  public static void main(String[] args) {
    try {
      Document document = Jsoup.connect("http://sports.news.naver.com/basketball/schedule/index.nhn?category=kbl").get();
      if (document != null) {
        
        Kbl kbl = new Kbl();
        kbl.setDate("12.1");
        kbl.setHour("21:00");
        kbl.setLeftTeam("ATeam");
        kbl.setScore("100:20");
        kbl.setRightTeam("BTeam");
        kbl.setStadium("잠실");
        
        List<Kbl> list = null;
        
        System.out.println(list);
        
        
        Elements todayGame = document.select("#content tbody");
        for (int i = 0; i < todayGame.size(); i++) {
          Elements element = todayGame.get(i).select("tr");
          for (int j = 0; j < element.size(); j++) {
            System.out.println(element.get(j).select(".td_date").text());
            System.out.println(element.get(j).select(".td_hour").text());
            System.out.println(element.get(j).select(".team_lft").text());
            System.out.println(element.get(j).select(".td_score").text());
            System.out.println(element.get(j).select(".team_rgt").text());
            System.out.println(element.get(j).select(".td_stadium").text());
          }
          System.out.println("===========");
        }
        
//        
//        Elements elements = document.select("#content tbody");
//        for (int i = 0; i < elements.size(); i++) {
//          System.out.println(elements.get(i));
//        }
        
        
      }
      
    } catch (Exception e) {
      System.out.println(e);
    }
  }

}
