package com.lz.test;

import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoTable;

public class DHH {

	public void callRfcExample() {
		// 获取RFC对象

		System.out.println("-");//ZFM_DHH_0001
		JCoFunction function = RfcManager.getFunction("ZFM_DHH_0001");

		System.out.println("function---------------"+function.toString()+".");
		// 获取表对象
		JCoTable tb = function.getTableParameterList().getTable("IT_DATA");

		int count = 1;// 预订合同数量，此处demo设为1

		for (int i = 1; i <= count; i++) {
			// 向表内添加一行并定位到此行
			tb.appendRow();
			tb.setRow(i - 1);

			// 为此行赋值，注意字段类型
			tb.setValue("TOPIC", "DHZT-1001-19-01"); // 主题代码
			tb.setValue("ZDHZZ", "660349"); // 订货组织
			tb.setValue("ZKSMA", "610210A"); // 款色码
			tb.setValue("JSIZE", "66"); // 网格值
			tb.setValue("ZDHSL", 20); // 订货数量
			tb.setValue("ZNOTE", "此款订货20件"); // 备注
		}

		// 执行RFC
		RfcManager.execute(function);

		// 获取RFC返回的字段值
		JCoParameterList exportParam = function.getExportParameterList();

		// 获取返回消息表对象
		JCoTable mb = function.getTableParameterList().getTable("IT_RESP");

		// 先判断是否执行成功标志
		int RE_CODE = exportParam.getInt("RE_CODE");

		if (RE_CODE == 0) { // 如果执行成功，返回预订合同编号
			
			for (int i = 0; i < mb.getNumRows(); i++) {
				mb.setRow(i);

				System.out.println("状态：" + mb.getString("STATU"));
				System.out.println("预订合同编号：" + mb.getString("GUID"));
				System.out.println("消息：" + mb.getString("REMSG"));
			}
			
		} else { // 如果执行失败，返回错误提示消息
			
			for (int i = 0; i < mb.getNumRows(); i++) {
				mb.setRow(i);
				
				System.out.println("状态：" + mb.getString("STATU"));
				System.out.println("消息：" + mb.getString("REMSG"));
			}
		}
	}

	public static void main(String[] args) {
		new DHH().callRfcExample();
	}
}
