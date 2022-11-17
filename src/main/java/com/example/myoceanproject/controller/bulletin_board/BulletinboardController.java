package com.example.myoceanproject.controller.bulletin_board;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/bulletinboard/*")
public class BulletinboardController {

    //모임 목록 페이지
    @GetMapping("/index")
    public String bulletinboard(){
        return "app/bulletin_board/bulletin_board";
    }
}
