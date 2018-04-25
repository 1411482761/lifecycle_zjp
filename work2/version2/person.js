$(function(){
    var conf=config;
    var form=$('<form action="http://localhost:63342/work2/version1/apply.html" method="get"></form>');
    $("body").append($("<h1>报名表</h1><hr />")).append(form);
    _buildPage(conf,form);

});
//调用其他方法生成展示页面
function _buildPage(conf,form) {
    _buildBaseDiv(conf,form);
    _buildInfoElement(conf,form);
    _isRequired(conf,form);
    _buildNameAttr(conf,form);
    _addInputTypeAttr(conf,form);
    _BuildOptions(conf,form);
    _addPlaceholder(conf,form);
    _isDisplay(conf,form);
    _buildSubmitButton(form);
    _addCssStyle();
    form.on("click","input[type='submit']",_submitCheck.bind(this));
}
//根据columns长度,生成基层的div
function _buildBaseDiv(conf,form) {
    var arr=conf.columns;
    var len=arr.length;
    for (var i = 0; i <= len; i++) {  //多一个div用于放置提交按钮
        var str='<div id="'+i+'"></div>';
        form.append($(str));
    }
}

//根据配置生成每个div中的子元素
function _buildInfoElement(conf,form){
    var arr=conf.columns;
    var len=arr.length;
    //var divs=$("div");
    var divs=form.children("div");
    var divlen=divs.length;
    for (var i = 0; i < divlen; i++) {
        var thisDiv=$(divs[i]);
        var str='<input type="text">';
        thisDiv.append($(str));
    }
}

//判断是否强制要求
function _isRequired(conf,form) {
    var arr=conf.columns;
    var len=arr.length;
    var inputs=form.children("input");
    for (var i = 0; i < len; i++) {
        var rowdata=arr[i];
        if (rowdata["is_required"]==null){
            $(inputs[i]).attr("is_required",false);
        } else if(rowdata["is_required"]){
            $(inputs[i]).attr("is_required",true);
        }else{
            $(inputs[i]).attr("is_required",false);
        }
    }
}

//根据配置文件给每个input中的name属性赋值
function _buildNameAttr(conf,form) {
    var arr=conf.columns;
    var inputs=form.children("div").children("input");
    var len=inputs.length;
    for (var i = 0; i < len-1; i++) { //最后一个input 为提交按钮 arr中长度不包含
        var thisValue=arr[i]["name"];
        $(inputs[i]).attr("name",thisValue);
    }
}

// 根据配置决定input的type是什么类型以及是不是input
function _addInputTypeAttr(conf,form){
    var rowArr=conf.columns;
    var typeArr=["text","button","checkbox","file","hidden","image","password","radio","reset","submit"];
    var inputs=form.children("div").children("input");
    var len=inputs.length-1;
    for (var i = 0; i < len; i++) {
        var thisType=rowArr[i]["type"];
        var index=$.inArray(thisType,typeArr);
        if(index>=0){//是input标签
            $(inputs[i]).attr("type",thisType);
        }else{//别的标签
            if(thisType=="select"){
                var domSelect=$("<select></select>");
                domSelect.attr("name",$(inputs[i]).attr("name"));
                domSelect.attr("is_required",$(inputs[i]).attr("is_required"));
                $(inputs[i]).after(domSelect);
                $(inputs[i]).remove();
            }
        }

    }
}

//生成select中的选项
function _BuildOptions(conf,form){
    var rowArr=conf.columns;
    var len = rowArr.length;
    var index=0;
    for (var i = 0; i < len; i++) {
        if(rowArr[i]["type"]=="select"){
            var optionsLen=rowArr[i]["options"].length;
            var selects=form.children("div").children("select");
            var select=$(selects[index]);
            var options=rowArr[i]["options"];
            index++;
            for (var j = 0; j < optionsLen; j++) {
                var str='<option value="'+options[j]["value"]+'">'+options[j]["describe"]+'</option>';
                select.append($(str));
            }
        }
    }
}

//给输入文本框加上placeholder属性
function _addPlaceholder(conf,form) {
    var rowArr=conf.columns;
    var len=rowArr.length;
    var inputs=form.children("div").children("input[type='text']");
    var index=0;
    for (var i = 0; i < len; i++) {
        if (rowArr[i]["type"]=="text"){
            $(inputs[index]).attr("placeholder",rowArr[i]["describe"]);
            index++;
        }
    }

}

//判断是否显示
function _isDisplay(conf,form){
    var rowArr=conf.columns;
    var len=rowArr.length;
    var divs=form.children("div");
    for (var i = 0; i < len; i++) {
        if(rowArr[i]["is_display"]==null){
            
        }else if(!rowArr[i]["is_display"]){
            $(divs[i]).hide();
        }else{
            
        }
    }
}

//将最后一个input变成提交按钮
function _buildSubmitButton(form) {
    var sub=form.children("div").children("input");
    var len=sub.length;
    var submit = $(sub[len-1]);
    submit.attr("type","submit");
    submit.attr("value","报名");
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

//添加样式
function _addCssStyle() {
    //设置标题样式
    $("h1").attr("class","text-center");
    //设置照片上传按钮
    $("input[type='file']").before($('<label for="'+$("input[type='file']").attr("id")+'" class="btn btn-lg btn-block"><img src="../picture/1.jpg" class="img-circle"></label>'));
    //设置提交按钮样式
    $("input[type='submit']").attr("class","btn btn-lg btn-block");
    //设置属性名字(姓名,年龄)等字体样式


}



