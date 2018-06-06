package com.agilecontrol.cxf.http;

import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.agilecontrol.cxf.pojo.ColorSize;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
public class HttpClient {
    /**
     * ????Post????
     * @param url
     * @param params
     * @return
     * @throws Exception
     */
    private JSONArray sendPost(String url, JSONObject params) throws Exception{
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost request = new HttpPost(url);

        HttpEntity httpEntity = null;
        List<NameValuePair> list = new ArrayList<NameValuePair>();
        for(Iterator<String> it = params.keys(); it.hasNext();){
            String key = it.next();
            String value = params.getString(key);
            list.add(new BasicNameValuePair(key, value));
        }

        httpEntity = new UrlEncodedFormEntity(list, Consts.UTF_8);
        request.setEntity(httpEntity);

        CloseableHttpResponse httpResponse = httpClient.execute(request);

        System.out.println("Post Response Status: " + httpResponse.getStatusLine().getStatusCode());


        String inputLine;

        BufferedReader reader = new BufferedReader(new InputStreamReader(httpResponse.getEntity().getContent(),"UTF-8"));
        StringBuffer response = new StringBuffer();
        while((inputLine = reader.readLine()) != null){
            response.append(inputLine);
        }
        reader.close();

        //String resp = new String(response.toString().getBytes(),"utf-8");
        JSONArray result = new JSONArray(response.toString());
        httpClient.close();
        return result;
    }

    /**
     * ??sign????MD5????
     * sign = sip_appkey + sip_timestamp + sip_sign
     * @param sign
     * @return
     */
    private String getSign(String sign){
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            md5.update(sign.getBytes());
            return new BigInteger(1, md5.digest()).toString(16);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * ???transactions
     * @return
     */
    private JSONArray getTransactions(List<ColorSize> colorSizes) throws JSONException {

        //transactions=[{"id":1,"command":"ObjectCreate","params":{"parsejson":"Y","NAME":"????1","DATEBEGIN":"20180519","DATESHOWON":"20180521","DESCRIPTION":"????1","FAIRKEY":"????1"","DATEEND":"20180531","table":"B_FAIR"}}]
        JSONArray transactions = new JSONArray();
        JSONObject transaction = new JSONObject();

        JSONArray attribnames=new JSONArray();
        JSONArray values=new JSONArray();
        JSONArray names=new JSONArray();
        JSONArray descriptions=new JSONArray();
        JSONArray ordernos=new JSONArray();
        JSONArray flags=new JSONArray();
        JSONArray ad_org_ids=new JSONArray();
        JSONArray ad_client_ids=new JSONArray();
        for (ColorSize cs : colorSizes) {
            System.out.println("canshu---"+cs.toString());
            attribnames.put(cs.getAttribname());
            values.put(cs.getValue());
            names.put(cs.getName());
            ad_org_ids.put(27);
            descriptions.put(cs.getDescription());
            ad_client_ids.put(37);
            ordernos.put(cs.getOrderno());
            flags.put(cs.getFlag());
        }

        JSONObject params = new JSONObject();
        params.put("ad_org_id", ad_org_ids);
        params.put("attribname", attribnames);
        params.put("value", values);
        params.put("ad_client_id", ad_client_ids);
        params.put("description", descriptions);
        params.put("name", names);
        params.put("orderno", ordernos);
        params.put("flag", flags);
        params.put("table", "i_clrsize");
        params.put("best_effort", "true");
        params.put("update_on_unique_constraints", true);
        transaction.put("id", 1);
        transaction.put("command", "ObjectCreate");
        transaction.put("params",params);

        transactions.put(transaction);
        return transactions;
    }

    public JSONArray doPost(List<ColorSize> colorSizes) {
        JSONObject params = new JSONObject();
        JSONArray result = new JSONArray();
        try {
            String timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(new Date());
            String appkey = "pushdata";
            String appSecret = "e8c2ad127be20d05284d5a2de84b20d1";
            String sign = appkey + timestamp + appSecret;
            String sip_sign = getSign(sign);
            JSONArray transactions = getTransactions(colorSizes);


            params.put("appkey", appkey);
            params.put("appSecret", appSecret);
            params.put("sip_appkey", appkey);
            params.put("sip_timestamp", timestamp);
            params.put("sip_sign", sip_sign);
            params.put("transactions", transactions);

            String url = "http://office.lifecycle.cn:23600/servlets/binserv/Rest";
            result = sendPost(url, params);
            System.out.println(result.toString());

        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

}
