$(function(){
    var conf=config;
    var form=$('<form action="http://localhost:63342/work2/version1/apply.html" method="get"></form>');
    var titleArr=_buildTitleArr(conf);
    $("body").append($("<h1>报名表</h1><hr/>")).append(form);
    _buildFace(titleArr,form);
    form.on("click","input[type='submit']",_submitCheck.bind(this));
});
//生成报名页面元素数组
 function _buildTitleArr(conf){
    var conf= conf;
    var myArr=[];
    var typeArr=["text","button","checkbox","file","hidden","image","password","radio","reset","submit"];
    var rowArray=conf.columns;
    for(var i=0;i<rowArray.length;i++){
        var rowdata=rowArray[i];//map
        var myMap={};
        var len=Object.keys(rowdata).length;
        var type=rowdata["type"];
        var index=$.inArray(type,typeArr);
        if(index>=0){//是input标签
            var str='<div><span>'+rowdata["describe"]+"</span>"+'<input type="'+type+'" name="'+rowdata["name"]+'"/></div>';
            myMap["dom"]=$(str);
        }else{ //不是input
            var str='<div><span>'+rowdata["describe"]+'</span><select name="'+rowdata["name"]+'">';
            for(var j=0;j<rowdata["options"].length;j++){
                var data=rowdata["options"][j];
                str+='<option value="'+data["value"]+'">'+data["describe"]+'</option>';
            }
            str+="</select></div>";
            myMap["dom"] = $(str);
        }
        if(myMap["is_required"]==null){
            myMap["is_required"]=true;
        }else{
            myMap["is_required"]=rowdata["is_required"];
        }
        if (myMap["is_display"]==null){
            myMap["is_display"]=true;
        } else{
            myMap["is_display"]=rowdata["is_display"];
        }
        myArr.push(myMap);
    }
    return myArr;
}
//根据数组生成页面
function _buildFace(titleArr,form){
    var arr= titleArr;
    var len= arr.length;
    for (var i = 0; i < len; i++) {
        var dataMap=arr[i];
        if(dataMap["is_display"]){//展示
            if(dataMap["is_required"]){
                dataMap["dom"].children("input").attr("is_required",true);
                dataMap["dom"].children("select").attr("is_required",true);
            }
            form.append(dataMap["dom"]);
        }
    }
    form.append($('<input type="submit"  value="报名">'));
}
//提交表单校验
function _submitCheck(){
    var arr=$("[is_required='true']");
    var len=arr.length;
    for (var i = 0; i < len; i++) {
        if($(arr[i]).val().length==0){
            alert($(arr[i]).prev().text()+"不能为空");
            return false;
        }
    }
}



