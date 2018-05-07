$(function(){
    var conf=config;
    var form=$('<form action="#" method="get"></form>');
    $("body").append($("<h3 class='text-center'>报名表</h3><hr />")).append(form);
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
    _addPhoto(form);
    _addClassToInput(form);
    _addClassToSelect(form);
    //_addSign();
    _addStyleToSubmit(form);
    form.on("click","input[type='submit']",_submitCheck.bind(this));
}

//根据columns长度,生成基层的div
function _buildBaseDiv(conf,form) {
    var arr=conf.columns;
    var len=arr.length;
    for (var i = 0; i <= len; i++) {  //多一个div用于放置提交按钮
        var str='<div id="div'+i+'"></div>';
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

//根据配置文件给每个input中的name属性赋值
function _buildNameAttr(conf,form) {
    var arr=conf.columns;
    var inputs=form.children("div").children("input");
    var len=inputs.length;
    for (var i = 0; i < len-1; i++) { //最后一个input 为提交按钮 arr中长度不包含 -1
        var thisValue=arr[i]["name"];
        var sign=arr[i]["describe"];
        $(inputs[i]).attr("name",thisValue);
        $(inputs[i]).attr("sign",sign);
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
                domSelect.attr("sign",$(inputs[i]).attr("sign"));
                domSelect.attr("is_required",$(inputs[i]).attr("is_required"));
                domSelect.attr("sign",$(inputs[i]).attr("sign"));
                $(inputs[i]).after(domSelect);
                domSelect.attr("is_required",$(inputs[i]).attr("is_required"));
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

//判断是否强制要求
function _isRequired(conf,form) {
    var arr=conf.columns;
    var len=arr.length;
    var inputs=form.children("div").children("input");
    for (var i = 0; i < len; i++) {
        var rowdata=arr[i];
        if (rowdata["is_required"]==null){
            $(inputs[i]).attr("is_required",true);
        } else if(rowdata["is_required"]){
            $(inputs[i]).attr("is_required",true);
        }else{
            $(inputs[i]).attr("is_required",false);
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

//给照片上传添加图片样式
function _addPhoto(form){
    var input=form.children("div").children("input[type='file']")[0];
    $(input).attr("id",$(input).attr("name"));
    var str ='<label for="'+$(input).attr("id")+'"  class="btn btn-lg"><img align="center" src="../picture/1.jpg" class="img-circle"></label>';
    $(input).before($(str));
}

//给输入框修饰
function _addClassToInput(form) {
    var inputs=form.children("div").children("input[type='text']");
    var len=inputs.length;
    for (var i = 0; i < len; i++) {
        var dom=$(inputs[i]);
        dom.attr("class","form-control col-md-3 col-md-offset-3" );
    }
}

//给select下拉框添加样式
function _addClassToSelect(form) {
    var selects=form.children("div").children("select");
    var len=selects.length;
    for (var i = 0; i < len; i++) {
        var dom=$(selects[i]);
        dom.attr("class","form-control tag-select" );
    }
}

//给提交按钮添加样式
function _addStyleToSubmit(form) {
    $(form.children("div").children("input[type='submit']")).attr("class","btn btn-lg btn-block");
   // $(form.children("div").children("input[type='submit']")).attr("onclick","_submitCheck()");
    var divs=form.children("div");
    var len=divs.length;
    $(divs[len-1]).attr("name","submit");

}

//提交表单校验
function _submitCheck(){
    var arr=$("[is_required='true']");
    var len=arr.length;
    for (var i = 0; i < len; i++) {
        if($(arr[i]).val().length==0){
            alert($(arr[i]).attr("sign")+"不能为空");
            return false;
        }
    }
}


