class PageBuilder {
    constructor(formId, searchText,pageButton,conf) {
        this.formId = formId;
        this.conf = conf;
        this.order=0;
        this.pageNum=1;
        this.pageSize=3;
        this.flag=0;//识别升序降序,0为升序,1为降序
        this.idArray=this._getIdArray();
        this.searchText=searchText;
        this.pageButton=pageButton;
        this.map=this._getMap();
       /* this.element=$("<div></div>");
        $("body").append(this.element);*/
        this._buildBase(this.formId, this.conf);
        this._fetch();
        this._bind();
    }
    _bind(){
        var form=$("#"+this.formId);
        /*$("#prev").on("click",this._prevPage());
        $("#getPage").on("click",this._byPageNum());
        $("#next").on("click",this._nextPage());*/
        $(form).on("click","#prev",this._prevPage.bind(this));
        $(form).on("click","#getPage",this._byPageNum.bind(this));
        $(form).on("click","#next",this._nextPage.bind(this));
        $(form).on("click","#doSearch",this._doSearchText.bind(this));
        $(form).on("click","[data-sortable]",this._doOrder.bind(this));
    }
    //创建基础form表单框架
    _buildBase() {
        var formId=this.formId;
        var conf=this.conf;
        //window.map=this._getMap(dat);
        var str='';
        var pageButton=this.pageButton;
        var searchText=this.searchText;
        if(searchText){
            str+=this._buildSearchText();
        }
        str+=this._buildTable(conf);
        if (pageButton){
            str+=this._buildPageButton();
        }
        this.frame = '<div align="center"><form  id="' + formId + '">\n' + str +'</form></div>';
        //this.element.html(this.frame);
        $("body").html(this.frame);
        return this;
    }
    //生成搜索框
    _buildSearchText(){
        var str ='<input type="text" id="searchText" name="searchText"/><input type="button" id="doSearch" name="doSearch" value="搜索">\n';
        return str;
    }
    //生成table
    _buildTable(conf){
        var str=  '<table id="table1" name="table1" align="center" border="1" cellspacing="0">\n' +
            this._buildTitle(conf) +
            '</table>\n';
        return $(str);
    }
    //生成翻页工具
    _buildPageButton(){
        return  '<input type="button" name="prev" id="prev" value="上一页">\n' +
            '<input type="text" id="page" name="page" value="1">\n' +
            '<input type="button" value="查询" name="getPage"  id="getPage">\n' +
            '<input type="button" id="next" name="next" value="下一页">\n';
    }
    //生成标题栏
    _buildTitle(conf) {
        var columns = conf.columns;
        var title = conf.title;
        var total = columns.length;
        var str = "<tr>";
        for (var i = 0; i < total; i++) {
            var columndef = columns[i];
            var name = columndef.name;
            var fn = title[name];
            str += fn.apply(this, [columndef]);
        }
        str += "</tr>";
        return str;
    }
    //获取数据封装到map中
    _getMap() {
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
        var map=this.map;
        var str1="" ;
       // console.log("str1====="+str1);
        var total = conf.columns.length;
       // pageNum = pageNum * pageSize - pageSize + 1;
        var index=(pageNum-1)*pageSize;
        for (var i = 0; i <pageSize; i++) {//每页展示三条数据
            var key = arr[index];
            if (index==arr.length){
                break;
            }
            index++;
            var rowdata = map[key];
            str1 += "<tr>";
            for (var j = 0; j < total; j++) {
                var column = conf.columns[j];
                var data = rowdata[column.name];   //得到数据表中的属性名,根据名字调用format中方法
                var format = conf.format[column.name](data, rowdata);
                str1 += format;
            }
            str1 += "</tr>";
        }
        $("#" + this.formId + " #table1").html(this._buildTable(this.conf)+str1);
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

    //搜索框搜索事件
    _doSearchText(){
        var searchCondition = $("#" + this.formId + " #searchText").val();
        this.idArray=this._getIdArray(searchCondition,null,0);
        this.pageNum=1;
        this.flag=0;
        this._fetch();
    }
    _doOrder(event){
        var target = event.target;//event.originalTarget//event.currentTarget
        console.log(target);

        var orderCondition=target.name;
        alert("name======="+orderCondition+"          id======"+target.id+"     value====="+target.value);
       // var orderCondition = this.sequenceCondition;
        var searchCondition = $("#" + formId + " #searchText").val();
        this.pageNum=1;
        //flag为0是默认排序,为1时升序,为2时降序
        if(this.flag==0){
            this.idArray=this._getIdArray(searchCondition,orderCondition,1);
            this.flag++;
        }else if(this.flag==1){
            this.idArray=this._getIdArray(searchCondition,orderCondition,2);
            this.flag++;
        }else{
            this.idArray=this._getIdArray(searchCondition,orderCondition,0);
            this.flag=0;
        }
        this._fetch();
    }

}