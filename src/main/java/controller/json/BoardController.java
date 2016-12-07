package controller.json;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import dao.BoardDao;
import vo.Board;
import vo.JsonResult;

@Controller 
@RequestMapping("/board/") 
public class BoardController {
  
  @Autowired BoardDao boardDao;
  
  @RequestMapping(path="boardlist")
  public Object boardList() throws Exception{
    
    try {
      List<Board> list = boardDao.selectBoardList();
      return JsonResult.success(list);
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="add")
  public Object addBoard(Board board) throws Exception{
    
    try {
      boardDao.insert(board);
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  
}










