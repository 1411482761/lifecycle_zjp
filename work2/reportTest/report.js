
$(function () {

    t_header();
t_content();
})
function t_header() {
    var header_len = result.result.data.header.length;
    var  headers = result.result.data.header;
    var  t_header = "<tr style='background-color: darkgrey'>";
    for (var i = 0; i<header_len ; i++){
        t_header += "<th>"+headers[i].name+"</th>";
    }
    t_header+="</tr>";
    $("#rpt_t").append($(t_header));
}
function t_content() {
    var bodys = result.result.data.table;
    var header_len = result.result.data.header.length;
    var len = bodys[0].length;
    var arr=[4,6,8,11,13,15];
    var m_arr = [];
    for (let i = 0; i < header_len; i++) {
        if(result.result.data.header[i].name.indexOf("金额")!=-1){
            m_arr.push(i);
        }
    }
    for (var i = 0; i < len; i++) {
        var t_tr = $("<tr ></tr>");
        if(bodys[1][i]=="合计" || bodys[0][i]=="总计"){
            t_tr.attr("style",'background-color: #722C14');
        }
        var str="";
        for (var j = 0; j < header_len; j++) {
            if(bodys[j][i]!="" && arr.indexOf(j)!=-1 ){
                str +="<td>"+bodys[j][i].toFixed(2)+"%</td>";
            }else if (bodys[j][i]!="" && m_arr.indexOf(j)!=-1 ){
                str+="<td>"+bodys[j][i].toFixed(0)+"</td>";
            } else{
                str +="<td>"+bodys[j][i]+"</td>";
            }

        }
        t_tr.append($(str));
        $("#rpt_t").append(t_tr);
    }
}