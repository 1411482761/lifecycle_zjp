' print every visible sheet of input file
' args: cscript e:\portal5\act.nea\bin\xlsprint.vbs "e:\portal5\act.nea\home\lifecycle.cn\893\a.xls" "printername"
' arg0: excel file, must exists, will not check
' arg1: printer name, can omit
' 2018-2-20 yfzhu init v1.0.001
' 
If wscript.Arguments.count=0 then   
	WScript.StdErr.WriteLine "Need xls file as argument"
	WScript.Quit(2)
End if
Dim oExcel,oWb,oSheet
Dim i
Set oExcel= CreateObject("Excel.Application")
oExcel.Application.Visible=False

Set oWb = oExcel.Workbooks.Open(wscript.Arguments.item(0))
if  wscript.Arguments.count>1 then
	oWb.PrintOut ,,,,wscript.Arguments.item(1)
else
	oWb.PrintOut
end if	
oWb.Close
oExcel.Quit 

set oWb=Nothing
set oExcel=Nothing
WScript.StdErr.WriteLine "Succeed printing " & wscript.Arguments.item(0)
WScript.Quit(0)