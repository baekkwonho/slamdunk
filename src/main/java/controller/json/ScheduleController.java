package controller.json;

import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import vo.Game;
import vo.JsonResult;

@Controller
@RequestMapping("/schedule/")
public class ScheduleController {

  @RequestMapping(path="kbl")
  public Object kblMonth() throws Exception {
    try {

      Document document = Jsoup.connect("http://sports.news.naver.com/basketball/schedule/index.nhn?category=kbl").get();
      List<Game> list = new ArrayList<Game>();
      Game kbl = new Game();
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
              kbl.setLeftImg(element.get(j).select("img[title="+element.get(j).select(".team_lft").text()+"]").attr("src").split("src=")[1]);
              kbl.setScore(element.get(j).select(".td_score").text());
              kbl.setRightTeam((element.get(j).select(".team_rgt").text()));
              kbl.setRightImg(element.get(j).select("img[title="+element.get(j).select(".team_rgt").text()+"]").attr("src").split("src=")[1]);
              kbl.setStadium((element.get(j).select(".td_stadium").text()));

              list.add(k, kbl);
              k++;
            }
            kbl = new Game();
          }
        }
      }
      return JsonResult.success(list);

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="nba")
  public Object nbaMonth() throws Exception {
    try {

      Document document = Jsoup.connect("http://sports.news.naver.com/basketball/schedule/index.nhn?category=nba").get();
      List<Game> list = new ArrayList<Game>();
      Game nba = new Game();

      if (document != null) {
        Elements todayGame = document.select("#content tbody");
        System.out.println(todayGame);

        for (int i = 0, k = 0; i < todayGame.size(); i++) {
          Elements element = todayGame.get(i).select("tr");

          for (int j = 0; j < element.size(); j++) {
            nba.setDate(element.get(0).select(".td_date").text());
            nba.setHour(element.get(j).select(".td_hour").text());

            if (element.get(j).select(".td_none").isEmpty() == false) {
              list.add(k,nba);
              k++;
            }else {
              nba.setLeftTeam(element.get(j).select(".team_lft").text());
              nba.setLeftImg(element.get(j).select("img[title="+element.get(j).select(".team_lft").text()+"]").attr("src").split("src=")[1]);
              nba.setScore(element.get(j).select(".td_score").text());
              nba.setRightTeam((element.get(j).select(".team_rgt").text()));
              nba.setRightImg(element.get(j).select("img[title="+element.get(j).select(".team_rgt").text()+"]").attr("src").split("src=")[1]);
              nba.setStadium((element.get(j).select(".td_stadium").text()));

              list.add(k, nba);
              k++;
            }
            nba = new Game();
          }
        }
      }

      return JsonResult.success(list);
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }

  }

}