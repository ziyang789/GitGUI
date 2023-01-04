package com.websocket.demo.controller;

import com.websocket.demo.service.Utils;
import com.websocket.demo.service.WebSocketServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.*;

@RestController
@RequestMapping("/open/socket")
public class WebSocketController {

    @Value("${mySocket.myPwd}")
    public String myPwd;

    @Autowired
    private WebSocketServer webSocketServer;

    /**
     * 手机客户端请求接口
     * @param id 发生异常的设备ID
     * @param pwd 密码（实际开发记得加密）
     * @throws IOException
     */
    @GetMapping(value = "/onReceive")
    public void onReceive(String id,String pwd, HttpServletResponse response) throws IOException {


        Math.abs(1);
//        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
//        Utils.setAttachmentResponseHeader(response, "sysfFS11111.ttf");
//        Utils.writeBytes("D:\\BaiduNetdiskDownload\\Workspace\\脚本\\websocket\\src\\main\\resources\\static\\font\\sysfFS.woff", response.getOutputStream());

//        String s = Utils.encryptToBase64("D:\\BaiduNetdiskDownload\\Workspace\\脚本\\websocket\\src\\main\\resources\\static\\font\\bjgy_msyh1.woff");
        String path = "D:\\BaiduNetdiskDownload\\Workspace\\脚本\\websocket\\src\\main\\resources\\static\\font\\sysfFS.woff";
//        String path = "C:\\Users\\NINGMEI\\Desktop\\git常用指令.doc";
//        if(pwd.equals(myPwd)){ //密码校验一致（这里举例，实际开发还要有个密码加密的校验的），则进行群发
            webSocketServer.broadCastInfo(path);
//        }
    }

    @GetMapping(value = "/jumo")
    public String jump(HttpServletResponse response) throws IOException {
//        String s = util.encryptToBase64("F:\\Workspace\\脚本\\websocket\\src\\main\\resources\\static\\font\\sysfFS.ttf");
//        String s = util.encryptToBase64("F:\\Workspace\\脚本\\websocket\\src\\main\\resources\\static\\font\\FZFS_GBK.woff");
//        String s = util.encryptToBase64("F:\\Workspace\\脚本\\websocket\\src\\main\\resources\\static\\img\\sofo.png");
//        webSocketServer.broadCastInfo(s);
//        FileInputStream fileInputStream = new FileInputStream(new File("F:\\Workspace\\脚本\\websocket\\src\\main\\resources\\static\\font\\sysfFS.ttf"));
//        byte[] bytes = FileCopyUtils.copyToByteArray(fileInputStream);
//        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
//        setAttachmentResponseHeader(response, "sysfFS11111.ttf");
//        writeBytes("F:\\Workspace\\脚本\\websocket\\src\\main\\resources\\static\\font\\sysfFS.ttf", response.getOutputStream());
//        writeBytes("C:\\Users\\Administrator\\Desktop\\java技术路线.png", response.getOutputStream());
        return "http://192.168.5.147:8888/open/socket/jumos";
    }

    @GetMapping(value = "/jumos")
    public void jumps(HttpServletResponse response) throws IOException {
//        String s = util.encryptToBase64("F:\\Workspace\\脚本\\websocket\\src\\main\\resources\\static\\font\\FZFS_GBK.woff");
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        Utils.setAttachmentResponseHeader(response, "sysfFS11111.ttf");
//        Utils.writeBytes("F:\\Workspace\\脚本\\websocket\\src\\main\\resources\\static\\font\\sysfFS.woff", response.getOutputStream());
//        Utils.writeBytes("D:\\BaiduNetdiskDownload\\Workspace\\脚本\\websocket\\src\\main\\resources\\static\\font\\bjgy_msyh1.woff", response.getOutputStream());
        Utils.writeBytes("D:\\BaiduNetdiskDownload\\Workspace\\脚本\\websocket\\src\\main\\resources\\static\\font\\hao-woff\\simhei1.woff", response.getOutputStream());
//        String s = Utils.encryptToBase64("F:\\Workspace\\脚本\\websocket\\src\\main\\resources\\static\\img\\sofo.png");
//        webSocketServer.broadCastInfo(s);
//        return s;
    }
}
