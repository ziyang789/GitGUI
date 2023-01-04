package com.websocket.demo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.ByteBuffer;
import java.util.Base64;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author jae
 * @ServerEndpoint("/webSocket/{uid}") 前端通过此URI与后端建立链接
 */

@ServerEndpoint("/webSocket/{uid}")
@Component
public class WebSocketServer {

    private static Logger log = LoggerFactory.getLogger(WebSocketServer.class);

    //静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。
    private static final AtomicInteger onlineNum = new AtomicInteger(0);

    //concurrent包的线程安全Set，用来存放每个客户端对应的WebSocketServer对象。
    private static CopyOnWriteArraySet<Session> sessionPools = new CopyOnWriteArraySet<Session>();

    /**
     * 有客户端连接成功
     */
    @OnOpen
    public void onOpen(Session session, @PathParam(value = "uid") String uid) throws IOException {
        sessionPools.add(session);
        onlineNum.incrementAndGet();
        log.info(uid + "加入webSocket！当前人数为" + onlineNum);

/*        String path = "D:\\BaiduNetdiskDownload\\Workspace\\脚本\\websocket\\src\\main\\resources\\static\\font\\sysfFS.woff";
        sendMessage(session, path);*/
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(Session session) {
        sessionPools.remove(session);
        int cnt = onlineNum.decrementAndGet();
        log.info("有连接关闭，当前连接数为：{}", cnt);
    }

    /**
     * 发送消息
     */
    public void sendMessage(Session session, String message) throws IOException {
        byte[] bytes = Utils.readFromByteFile(message);
//        String s = Base64.getEncoder().encodeToString(bytes);
        ByteBuffer wrap = ByteBuffer.wrap(bytes);
        if(session != null){
            synchronized (session) {
//                session.getBasicRemote().sendText(s);
                session.getBasicRemote().sendBinary(wrap);
            }
        }
    }

    /**
     * 收到客户端消息后调用的方法
     * @param message 客户端发送过来的消息
     * @param session 可选的参数
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("来自客户端的消息:" + message);
    }

    /**
     * 群发消息
     */

    public void broadCastInfo(String message) throws IOException {
        for (Session session : sessionPools) {
            if(session.isOpen()){
                sendMessage(session, message);
            }
        }
    }

    /**
     * 发生错误
     */
    @OnError
    public void onError(Session session, Throwable throwable){
        log.error("发生错误");
        throwable.printStackTrace();
    }

}