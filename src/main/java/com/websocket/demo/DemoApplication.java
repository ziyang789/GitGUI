package com.websocket.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

 /*   public static void main(String[] args) {
        String path = "F:\\BaiduNetdiskDownload\\资料\\23.png";
        Font font=new Font("微软雅黑", Font.BOLD, 20);
        File file = new File(path);
        if (file.exists()) {
            file.delete();
        }
        try {
            BufferedImage bi = waterMarkByText(200, 200,"测试水印~,11111111", Color.black, font, -45d, 0.2f, path);
            ImageIO.write(bi, "png", file);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }*/

    /**
     * 生成背景透明的 文字水印
     *
     * @param width     生成图片宽度
     * @param height    生成图片高度
     * @param text      水印文字
     * @param color     颜色对象
     * @param font      awt字体
     * @param degree    水印文字旋转角度
     * @param alpha     水印不透明度0f-1.0f
     * @param imagePath 图片地址
     */
/*
    public static BufferedImage waterMarkByText(int width, int height, String text, Color color, Font font, Double degree, float alpha, String imagePath) {
        BufferedImage buffImg = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        // 得到画笔对象
        Graphics2D g2d = buffImg.createGraphics();
        // 增加下面的代码使得背景透明
        buffImg = g2d.getDeviceConfiguration().createCompatibleImage(width, height, Transparency.TRANSLUCENT);
        g2d.dispose();
        g2d = buffImg.createGraphics();

        // 设置对线段的锯齿状边缘处理
        g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);

        //把源图片写入
*/
/*        if (imagePath != null && !imagePath.equals("")) {
            try {
                Image srcImg = ImageIO.read(new File(imagePath));
                Image image = srcImg.getScaledInstance(srcImg.getWidth(null), srcImg.getHeight(null), Image.SCALE_SMOOTH);
                g2d.drawImage(image, 0, 0, null);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }*//*

        // 设置水印旋转
        if (null != degree) {
            //注意rotate函数参数theta，为弧度制，故需用Math.toRadians转换一下
            //以矩形区域中央为圆心旋转
            g2d.rotate(Math.toRadians(degree), (double) buffImg.getWidth() / 2, (double) buffImg.getHeight() / 2);
        }
        // 设置颜色
        g2d.setColor(color);

        // 设置 Font
        g2d.setFont(font);

        // 设置透明度:1.0f为透明度 ，值从0-1.0，依次变得不透明
        g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, alpha));

        // 获取真实宽度
        float realWidth = getRealFontWidth(text);
        float fontSize = font.getSize();

        // 计算绘图偏移x、y，使得使得水印文字在图片中居中,x、y坐标是基于Graphics2D.rotate过后的坐标系
        float x = 0.5f * width - 0.5f * fontSize * realWidth;
        float y = 0.5f * height + 0.5f * fontSize;

        // 取绘制的字串宽度、高度中间点进行偏移，使得文字在图片坐标中居中
        g2d.drawString(text, x, y);
        // 释放资源
        g2d.dispose();
        return buffImg;
    }

    */
/**
     * 获取真实字符串宽度，ascii字符占用0.5，中文字符占用1.0
     *
     * @param text 文字
     * @return 宽度
     *//*

    private static float getRealFontWidth(String text) {
        int len = text.length();
        float width = 0f;
        for (int i = 0; i < len; i++) {
            if (text.charAt(i) < 256) {
                width += 0.5f;
            } else {
                width += 1.0f;
            }
        }
        return width;
    }
*/



}
