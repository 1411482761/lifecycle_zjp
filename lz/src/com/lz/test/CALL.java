package com.lz.test;


import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoTable;

public class CALL {

	public void callRfcExample() {  
        // 获取RFC 对象  
        JCoFunction function = RfcManager.getFunction("ZHRPT_USRID_INFO");
        // 设置import 参数  
        JCoParameterList importParam = function.getImportParameterList();
       // importParam.setValue("USER", "menguangpeng");
        importParam.setValue("USER", "menguangpeng1");


    /*    //3.JCoTable 主体参数，可为多个主体参数。。。
        JCoTable headerImportParam = function.getTableParameterList().getTable("_TABLE");//返回的值i个字段作为一个表
        //如果为参数集合，在外层加for循环即可
        headerImportParam.appendRow();//附加表的最后一个新行,行指针,它指向新添加的行。
        headerImportParam.setValue("NAME1", "VALUE1");//参数
        headerImportParam.setValue("NAME2", "VALUE2");//参数*/
        // 执行RFC  
        RfcManager.execute(function);  
  
        // 获取RFC返回的字段值  
        JCoParameterList exportParam = function.getExportParameterList();  
        
        System.out.println("EXPORT返回：");
        System.out.println(exportParam.getString("EMPLOYEENUMBER"));
        System.out.println(exportParam.getString("NAME"));
        System.out.println(exportParam.getString("ORGUNIT"));
        System.out.println(exportParam.getString("NAMEOFORGUNIT"));
        System.out.println(exportParam.getString("NATIO"));
        System.out.println("8888888888888888888888"+exportParam.getString("TRFGR"));
        
        
        System.out.println("---------------");
        System.out.println("TABLE返回：");
        // 遍历RFC返回的表对象
            JCoTable tb = function.getTableParameterList().getTable("MANAGER");
        for (int i = 0; i < tb.getNumRows(); i++) {  
            tb.setRow(i);  
            System.out.println(tb.getString("PERNR"));  
            System.out.println(tb.getString("ENAME"));  
            System.out.println(tb.getString("USER"));  
            System.out.println(tb.getString("TYPE"));  
        }  
    }  
	
	
	public static void main(String[] args) {

	    new CALL().callRfcExample();
	}
}
