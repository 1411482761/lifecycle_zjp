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
 * <p>���������û�Ȩ����֤������  </p> 
 * <p>�޸��ˣ�����ί </p> 
 * <p>�޸�ʱ�䣺2014-5-10 ����03:16:16  </p> 
 * @version   
 */  
public class AuthInterceptor extends AbstractPhaseInterceptor<SoapMessage> {   
    //�ڵ���֮ǰ����  
	public AuthInterceptor() {  
        super(Phase.PRE_INVOKE);  
    }  
    /** 
     * �Զ�����������Ҫʵ��handleMessage�������÷����׳�Fault�쳣�������Զ����쳣������Fault�� 
     * Ҳ����new Fault(new Throwable()) 
     */  
    public void handleMessage(SoapMessage soap) throws Fault {  
        System.out.println("��ʼ��֤�û���Ϣ");  
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
        //���headers�Ƿ����  
        if(auth == null || auth==""){  
            throw new Fault(new IllegalArgumentException("�Ҳ��� authorization���޷���֤�û���Ϣ"));  
        } else {
        	byte[] bt;
        	try {
        		auth=auth.substring(6);
				bt=(new BASE64Decoder()).decodeBuffer(auth);
				String string = new String(bt, "utf-8");
				String [] strings = string.split(":");
				if (strings.length<2) {
					throw new Fault(new IllegalArgumentException("�Ҳ��� �û��������룬�޷���֤�û���Ϣ"));  
				}else {
					username = strings[0];
					password = strings[1];	
				}
							
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
        	//�����ݿ���Ϣ��֤�Ƚ�
        	if(username.equals("admin")&&password.equals("lifecycle")) {
        		
        		System.out.println("�������");
        	}else {
        		throw new Fault(new IllegalArgumentException("�û������������,��������֤"));  
        	}
        	
        }
  
}  
