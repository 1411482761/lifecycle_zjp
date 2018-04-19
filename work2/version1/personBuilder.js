class PersonBuilder{
    constructor(conf){
        this.conf=conf;
        this.titleArr=this._buildTitleArr();
        this.form=$('<form action="http://localhost:63342/work2/version1/apply.html" method="post"></form>');
        $("body").append($("<h1>报名表</h1><hr/>")).append(this.form);
        this._buildFace();

    }
    //生成报名页面元素数组
    _buildTitleArr(){
        var conf= this.conf;
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
                var str='<div>'+rowdata["describe"]+":"+'&nbsp&nbsp&nbsp&nbsp<input type="'+type+'" name="'+rowdata["name"]+'"/></div>';
                myMap["dom"]=$(str);
            }else{ //不是input
                var str="<div>"+rowdata["describe"]+'&nbsp&nbsp&nbsp&nbsp<'+type+' name="'+rowdata["name"]+'"></div>';
                    for(var j=0;j<rowdata["options"].length;j++){
                        var data=rowdata["options"][j];
                        str+='<option value="'+data["value"]+'">'+data["describe"]+'</option>';
                    }
                    str+="</select>";
                    myMap["dom"] = $(str);
            }
            if(len<=3) {
                //最基础的数据,不需要其他操作
                myMap["is_required"] = true;
                myMap["is_display"] = true;
            }
            else{
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
            }
            myArr.push(myMap);
        }
        return myArr;
    }
    //根据数组生成页面
    _buildFace(){
        var arr= this.titleArr;
        var len= arr.length;
        for (var i = 0; i < len; i++) {
            var dataMap=arr[i];
            if(dataMap["is_display"]){//展示
                if(dataMap["is_required"]){
                    dataMap["dom"].attr("is_required",true);
                }
                this.form.append(dataMap["dom"]);
            }
        }
        this.form.append($('<input type="submit" value="报名">'));
    }
}