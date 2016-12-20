package controller.json;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class NaverSportController {

  public static void main(String[] args) {
    try {
      Document document = Jsoup.connect("http://sports.news.naver.com/basketball/schedule/index.nhn?category=kbl").get();
      if (document != null) {
        Elements todayGame = document.select("#content tbody");
        for (int i = 0; i < todayGame.size(); i++) {
          Elements element = todayGame.get(i).select("tr");
          for (int j = 0; j < element.size(); j++) {
            System.out.println(element.get(j).select(".td_date"));
            System.out.println(element.get(j).select(".team_lft"));
            System.out.println(element.get(j).select(".team_rgt"));
          }
        }
      }
      
    } catch (Exception e) {
      System.out.println(e);
    }
  }

}
