package controller.json;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import dao.PhotoDao;
import vo.JsonResult;
import vo.Member;
import vo.Photo;

@Controller 
@RequestMapping("/photo/") 
public class PhotoController {
  
  @Autowired ServletContext sc;
  @Autowired PhotoDao photoDao;
  
  @RequestMapping(path="add")
  public Object photoAdd(MultipartFile file) throws IOException {
    try {
      
      String newFilename = null;
      
      if(!file.isEmpty()) {
        newFilename = this.getNewFilename(file.getOriginalFilename());
      }
      
      file.transferTo(new File(sc.getRealPath("/upload"+"/"+newFilename)));
      
      HashMap<String, Object> map = new HashMap<>();
      map.put("filename", newFilename);
      map.put("originFilename", file.getOriginalFilename());
      
      return map;
      
    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
  
  int count = 0;
  private String getNewFilename(String originFilename) {
    if (count > 100) {
      count = 0;
    }
    return System.currentTimeMillis() + "_" + (++count) + extractFileExt(originFilename);
  }
  
  private String extractFileExt(String filename) {
    return filename.substring(filename.lastIndexOf("."));
  }
  
}










