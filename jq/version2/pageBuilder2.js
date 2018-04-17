class PageBuilder2{
    constructor(){
        this.conf=config;
        this.pageNum=1;
        this.pageSize=3;
        this.dataMap=this._getDataMap();
        this.flag=0;//识别升序降序,0为升序,1为降序
        this.idArray=this._getIdArray();
        this.formElement=this._buildForm();
        this.titleMap=this._buildTitleMap();
        this.bodyDivElement=
        this.divElement=$("<div></div>");
        this.tableBody=this._buildTable();
        this.formElement.append(this.divElement).append($("<input type='submit' value='提交选择'/>"));
        this.conditionElement=this._buildCondition();
        this.formElement.append(this.conditionElement);
        $("body").append(this.formElement).append(this.tableBody);
        this._fetch();
        this._buildPageButton();
    }
    _buildBodyDiv(){
        var n=Math.random()*10000;
        var str='<div ></div>'
    }
    _bindFunction(){

        $(form).on("click","#prev",this._prevPage.bind(this));
        $(form).on("click","#getPage",this._byPageNum.bind(this));
        this.formElement.on("click","#next",this._nextPage.bind(this));
        this.formElement.on("change",".create",this._createCondition.bind(this));
        //$(form).on("click","[data-sortable]",this._doOrder.bind(this));
    }
    //创建一个form表单
    _buildForm(){
        var formId=Math.random()*100000;
        var str='<form id="'+formId+'" action="#"></form>';
        return $(str);
    }
    //生成标题栏map
    _buildTitleMap(){
       var myMap={};
       var conf=this.conf;
       var rowArr=conf.columns;
       for(var i=0;i<rowArr.length;i++){
           var rowData=rowArr[i];
           var key=i+1+"";
           if(rowData.order){
               var str='<input type="button" name="'+rowData.name+'" data-sortable="1" value="'+rowData.describe+'">';
               myMap[key]=$(str);//可排序
               console.log(myMap[key]);
           }else{
               var str='<input type="button" name="'+rowData.name+'" data-sortable="0" value="'+rowData.describe+'" />';
               myMap[key]=$(str);//不可排序
           }
       }
        return myMap;
    }
    _buildTitleLine(){
        var map=this.titleMap;
        var len=Object.keys(map).length;
        var dom=$("<tr></tr>");
        for(var i=1;i<=len;i++){
            var temp=$("<th></th>");
            temp.append(map[i]);
            dom.append(temp);
        }
        return dom;
    }
    //生成一个查询条件框
    _buildCondition(){
        var map=this.titleMap;
        var str='<select name="condition" class="create">';
        for(var i=1;i<=Object.keys(map).length;i++){
            str+='<option value="'+map[i].attr("name")+'">'+map[i].val()+'</option>';
        }
        str+="</select>";
        str+='<select name="choose">\n' +
            '        <option value=">"> > </option>\n' +
            '        <option value="="> = </option>\n' +
            '        <option value="<"> < </option>\n' +
            '    </select>\n' +
            '    <input name="" >';
        this.divElement.append($(str));
    }
    //当选择一项查询条件后生成新的查询输入框
    _createCondition(){
        //先判断改变的是不是最下面一行条件输入框
        var dom=this._buildCondition();
        this.formElement.append(dom);
    }
    //生成table
    _buildTable(){
        var dom= $('<table id="table" name="table" align="center" border="1" cellspacing="0"></table>') ;
        dom.append(this._buildTitleLine());
        return dom;
    }
    //生成翻页工具
    _buildPageButton(){
        var dom=$('<input type="button" name="prev" id="prev" value="上一页">' +
            '<input type="text" id="page" name="page" value="1">' +
            '<input type="button" value="查询" name="getPage"  id="getPage">' +
            '<input type="button" id="next" name="next" value="下一页">') ;
        return dom;
    }

    //获取数据封装到map中
    _getDataMap() {
        var myMap={};
        $.ajax({
            url:"http://localhost:63342/jq/jsondata.js",
            type:"POST",
            async:false,
            success:function (data) {
                var str= JSON.parse(data);
                if(str.status){
                    var len=str.datas.length;
                    for (var i=0;i<len;i++){
                        var key=i+1+"";
                        myMap[key]=str.datas[i];
                    }
                }
            }
        });
        return myMap;

    }
    //获取id数组
    _getIdArray(searchCondition,orderCondition,sequenceType)//参数一是输入框中查询条件,参数二是排序条件
    {
        var result =[];
        $.ajax({
            url: "http://localhost:63342/jq/idArray.js",
            type: "POST",
            async:false,
            data: "orderCondition=" + orderCondition + "&searchCondition=" + searchCondition+"&sequenceType="+sequenceType,
            success: function (data) {
                var jsonStr = eval('(' + data + ')');
                //将json数据中的id放入arr数组中
                /* for (var i in jsonStr) {
                     arr.push(i);
                 }*/
                result= jsonStr.ids;
            }
        });
        return result;
    }

    //根据arr数组获取数据
    _fetch(){
        var arr=this.idArray;
        var pageNum=this.pageNum;
        var pageSize=this.pageSize;
        var map=this.dataMap;
        var str="" ;
        var conf=this.conf;
        // console.log("str1====="+str1);
        var total = conf.columns.length;
        var index=(pageNum-1)*pageSize;
        for (var i = 0; i <pageSize; i++) {//每页展示三条数据
            var key = arr[index];
            if (index==arr.length){
                break;
            }
            index++;
            var rowdata = map[key];
            str += "<tr>";
            for (var j = 0; j < total; j++) {
                var column = conf.columns[j];
                var data = rowdata[column.name];   //得到数据表中的属性名,根据名字调用format中方法
                var format = conf.format[column.name](data, rowdata);
                str += format;
            }
            str += "</tr>";
        }
        $("table").empty().append(this._buildTitleLine()).append($(str));
        //this.tableBody.html(this._buildTable(this.conf)+str);
    }



    //上一页
    _prevPage(){
        if (this.pageNum==1){
            // alert("已经是第一页了");
        } else{
            var pageNum=--this.pageNum;
            // alert(pageNum+"pre");
            $("#page").val(pageNum);
            this._fetch();
        }

    }
    //根据输入页码查询
    _byPageNum(){
        var pageNum=$("#page").val();
        var temp = Math.ceil(Object.keys(this.map).length * 1.0 / this.pageSize);
        if(pageNum>temp){
            // alert("xxxxxx");
        }else{
            // alert(pageNum+"page");
            this.pageNum=pageNum;
            this._fetch();
        }

    }
    //下一页
    _nextPage(){
        alert("下一页")
        var temp = Math.ceil(Object.keys(this.map).length * 1.0 / this.pageSize);
        if(this.pageNum==temp){
            // alert("已经是最后一页了");
        }else{
            var pageNum=++this.pageNum;
            // alert(pageNum+"next");
            $("#page").val(pageNum);
            this._fetch();
        }
    }
    //生成翻页工具
    _buildPageButton(){
        var str=  '<input type="button" name="prev" id="prev" value="上一页">' +
            '<input type="text" id="page" name="page" value="1">' +
            '<input type="button" value="查询" name="getPage"  id="getPage">' +
            '<input type="button" id="next" name="next" value="下一页">';
        this.tableBody.after($(str));
    }
}
