package controller.json;

import java.util.ArrayList;
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
        List<Kbl> list = new ArrayList<Kbl>();
        Kbl kbl = new Kbl();
        
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
        
        System.out.println(list.size());
        
        System.out.println("===============");
        
        
        for (int i = 0; i < list.size(); i++) {
          System.out.println(i+" / "+list.get(i).getDate()+list.get(i).getHour()+list.get(i).getLeftTeam()+list.get(i).getScore() + list.get(i).getRightTeam());
          System.out.println(list.get(i).getLeftImg() + "\n" + list.get(i).getRightImg());
        }
      }
      
    } catch (Exception e) {
      System.out.println(e);
    }
  }

}
