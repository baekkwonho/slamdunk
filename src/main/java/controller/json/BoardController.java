package controller.json;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import dao.BoardDao;
import dao.NoticeDao;
import vo.Board;
import vo.JsonResult;
import vo.Member;
import vo.Notice;

@Controller 
@RequestMapping("/board/") 
public class BoardController {
  
  @Autowired BoardDao boardDao;
  @Autowired NoticeDao noticeDao;

  @RequestMapping(path="boardlist")
  public Object boardList(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="9") int length) throws Exception{
    
    try {
      HashMap<String, Object> map = new HashMap<>();
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);
      List<Board> list = boardDao.selectBoardList(map);
      int totalPage = getTotalPage(length);
      
      List<Notice> noticeList = noticeDao.selectNotice();
      
      HashMap<String, Object> data = new HashMap<>();
      data.put("noticeList", noticeList);
      data.put("list", list);
      data.put("totalPage", totalPage);
      data.put("pageNo", pageNo);
      data.put("length", length);
      
      return JsonResult.success(data);
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="add")
  public Object addBoard(HttpSession session, Board board) throws Exception{
    
    try {
      Member member = (Member)session.getAttribute("member");
      
      if (member.getNo() == 1) {
        Notice notice = new Notice();
        notice.setTitle(board.getTitle());
        notice.setContents(board.getContents());
        notice.setCre_dt(board.getCre_dt());
        notice.setWriter(member.getNickname());
        noticeDao.insert(notice);
      } else {
        board.setMno(member.getNo());
        board.setWriter(member.getNickname());
        boardDao.insert(board);
      }
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="detail")
  public Object detailBoard(int no) throws Exception {
    try {
      Board board = boardDao.selectOne(no);
      
      if (board == null) 
        throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");
      
      board.setVw_cnt(board.getVw_cnt()+1);
      
      boardDao.updateViewCount(board);
      board = boardDao.selectOne(no);
      
      return JsonResult.success(board);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="detailnotice")
  public Object detailNotice(int noticeno) throws Exception {
    try {
      Notice notice = noticeDao.selectOne(noticeno);
      
      if (notice == null) 
        throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");
      
      notice.setVw_cnt(notice.getVw_cnt()+1);
      noticeDao.updateViewCount(notice);
      
      notice = noticeDao.selectOne(noticeno);
      
      return JsonResult.success(notice);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  
  
  
  @RequestMapping(path="update")
  public Object updateBoard(HttpSession session, Board board) throws Exception {
    try {
      Member member = (Member)session.getAttribute("member");
      
      if (member.getNo() == 1) {
        if (noticeDao.selectOne(board.getNo()) == null) {
          throw new Exception("해당 게시물이 없습니다.");
        } else {
          Notice notice = new Notice();
          notice.setNo(board.getNo());
          notice.setTitle(board.getTitle());
          notice.setContents(board.getContents());
          noticeDao.update(notice);
        }
      } else {
          if (boardDao.selectOne(board.getNo()) == null) {
            throw new Exception("해당 게시물이 없습니다!");
          } else {
            boardDao.update(board);
          }
      }
      
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="delete")
  public Object deleteBoard(HttpSession session, int no) throws Exception {
    try {
      
      Member member = (Member)session.getAttribute("member");
      
      if (member.getNo() == 1) {
        if (noticeDao.selectOne(no) == null) {
          throw new Exception("해당 게시물이 없습니다.");
        } else {
          noticeDao.delete(no);
        }
      } else {
        if (boardDao.selectOne(no) == null) {
          throw new Exception("해당 게시물이 없습니다.");
        } else {
          boardDao.delete(no);
        }
      }
      
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  
  public int getTotalPage(int pageSize) throws Exception {
    int countAll = boardDao.countAll();
    int totalPage = countAll / pageSize;
    if ((countAll % pageSize) > 0) {
      totalPage++;
    }
    return totalPage;
  }
  
  
}










