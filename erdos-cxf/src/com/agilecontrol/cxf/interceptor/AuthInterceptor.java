package com.agilecontrol.cxf.interceptor;

import java.io.IOException;
import java.util.Enumeration;


import javax.servlet.http.HttpServletRequest;

import org.apache.cxf.binding.soap.SoapMessage;  

import org.apache.cxf.interceptor.Fault;  
import org.apache.cxf.phase.AbstractPhaseInterceptor;  
import org.apache.cxf.phase.Phase;
import org.apache.cxf.transport.http.AbstractHTTPDestination;


import sun.misc.BASE64Decoder;  
  
/**   
 * <p>类描述：用户权限验证拦截器  </p> 
 * <p>修改人：王成委 </p> 
 * <p>修改时间：2014-5-10 下午03:16:16  </p> 
 * @version   
 */  
public class AuthInterceptor extends AbstractPhaseInterceptor<SoapMessage> {   
    //在调用之前拦截  
	public AuthInterceptor() {  
        super(Phase.PRE_INVOKE);  
    }  
    /** 
     * 自定义拦截器需要实现handleMessage方法，该方法抛出Fault异常，可以自定义异常集成自Fault， 
     * 也可以new Fault(new Throwable()) 
     */  
    public void handleMessage(SoapMessage soap) throws Fault {  
        System.out.println("开始验证用户信息");  
        HttpServletRequest request = (HttpServletRequest) soap.get(AbstractHTTPDestination.HTTP_REQUEST);
        Enumeration headerNames = request.getHeaderNames();
        String auth="";
        String username="";
        String password="";
        while (headerNames.hasMoreElements()) {
          String key = (String) headerNames.nextElement();
          /*String value = request.getHeader(key);
          System.out.println(key+"==="+value);*/
          if (key.equals("authorization")) {
        	  auth=request.getHeader(key);
          }
        }
        //检查headers是否存在  
        if(auth == null || auth==""){  
            throw new Fault(new IllegalArgumentException("找不到 authorization，无法验证用户信息"));  
        } else {
        	byte[] bt;
        	try {
        		auth=auth.substring(6);
				bt=(new BASE64Decoder()).decodeBuffer(auth);
				String string = new String(bt, "utf-8");
				String [] strings = string.split(":");
				if (strings.length<2) {
					throw new Fault(new IllegalArgumentException("找不到 用户名或密码，无法验证用户信息"));  
				}else {
					username = strings[0];
					password = strings[1];	
				}
							
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
        	//与数据库信息验证比较
        	if(username.equals("admin")&&password.equals("lifecycle")) {
        		
        		System.out.println("允许访问");
        	}else {
        		throw new Fault(new IllegalArgumentException("用户名或密码错误,请重新验证"));  
        	}
        	
        }
  
}  
