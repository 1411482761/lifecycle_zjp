package com.agilecontrol.cxf.impl;

import com.agilecontrol.cxf.IColorSize;
import com.agilecontrol.cxf.http.HttpClient;
import com.agilecontrol.cxf.pojo.ColorSize;
import org.json.JSONArray;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class ColorSizeImpl implements IColorSize {
    @Override
    public List<Object> pushColorSize(List<ColorSize> colorSize) {
        List<Object> list = new ArrayList<Object>();
        HttpClient http = new HttpClient();
        JSONArray resultjson = http.doPost(colorSize);
        String message = resultjson.optJSONObject(0).optString("message");
        if(message.indexOf("<pre>")!=-1){
            message = message.replaceAll("<pre>","").replaceAll("</pre>","");
            list = parseMessage(message);
        }else{

            list.add(message);
        }
        return list;
    }

    public String timeFormate(String time) {

        SimpleDateFormat format = new SimpleDateFormat("EEE MMM dd hh:mm:ss z yyyy", Locale.ENGLISH);
        Date date = null;
        try {
            date = format.parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String string2 = format2.format(date);
        return "Ö´ÐÐÊ±¼ä: "+string2;
    }

    public List parseMessage (String s)  {
        List list = new ArrayList();
        String reg = "[\r\n]+";
        String results[] = s.split(reg);
        int len = results.length;
        String timeString = results[0].substring(results[0].indexOf("#")+4, results[0].lastIndexOf(":"));
        String time = timeFormate(timeString);
        list.add(time);
        String table = results[1];
        list.add(table);
        String total = results[2];
        list.add(total);
        for (int i = 3; i < len; i++) {
            list.add(results[i]);
        }

        return list;
    }

}
