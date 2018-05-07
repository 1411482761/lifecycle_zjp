$(function () {
 var str="aaaa\r\nbbbb\r\ncccc";
 str=str.replace(/\r\n/g,"<br>");
 alert(str);
})