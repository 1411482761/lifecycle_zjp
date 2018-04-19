class PageBuilder2{
    constructor(){
        this.conf=config;
        this.pageNum=1;
        this.pageSize=3;
        this.sortButton=""; //标记用于排序的按钮
        this.conditionArr=[];
        this.sortName="";
        this.label=Math.random();
        this.dataMap=this._getDataMap();
        this.flag=0;//识别升序降序,0为升序,1为降序
        this.idArray=this._getIdArray();
        this.formElement=this._buildForm();
        this.titleMap=this._buildTitleMap();
        this.bodyDiv=$("<div label='"+this.label+"' align='center'></div>");//用于控制本对象,区别于其他对象
        $("body").append(this.bodyDiv);
        this.divElement=$("<div label='"+this.label+"'></div>");//用于追加条件选择框
        this.formElement.append(this.divElement).append($("<br/><input type='button' name='submit' value='提交选择'/>"));
        this.divElement.append(this._buildCondition());
        this.bodyDiv.append(this.formElement).append(this._buildPageButton());
        this._fetch();
        this._bindFunction();
    }
    _bindFunction(){
        this.bodyDiv.on("click","#prev",this._prevPage.bind(this));
        this.bodyDiv.on("click","#getPage",this._byPageNum.bind(this));
        this.bodyDiv.on("click","#next",this._nextPage.bind(this));
        this.bodyDiv.on("change",".create",this._createCondition.bind(this));
        this.bodyDiv.on("click","[data-sortable='1']",this._doOrderByButton.bind(this));
        this.bodyDiv.on("click","input[name='submit']",this._formSubmit.bind(this));
        this.bodyDiv.on("change","input[name='choose']",this._refreshConditionMap.bind(this));
        this.bodyDiv.on("change","input[name='standard']",this._refreshConditionMap.bind(this));
    }
    //创建一个form表单
    _buildForm(){
        var formId=Math.random();
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
               var str='<input type="button" name="'+rowData.name+'" back="'+rowData.describe  //back属性用于排序时button上value的值复原
                   +'" data-sortable="1" value="'+rowData.describe+'">';
               myMap[key]=$(str);//可排序
               console.log(myMap[key]);
           }else{
               var str='<input type="button" name="'+rowData.name+'" back="'+rowData.describe+
                   '" data-sortable="0" value="'+rowData.describe+'" />';
               myMap[key]=$(str);//不可排序
           }
       }
        return myMap;
    }

    //生成一个查询条件框
    _buildCondition(){
        var map=this.titleMap;
        var str='<select name="condition" class="create"><option value="0">--选择--</option>';
        for(var i=1;i<=Object.keys(map).length;i++){
            str+='<option value="'+map[i].attr("name")+'">'+map[i].val()+'</option>';
        }
        str+="</select>";
        str+='<select name="choose">\n' +
            '        <option value="0"> --选择-- </option>\n' +
            '        <option value=">"> > </option>\n' +
            '        <option value="="> = </option>\n' +
            '        <option value="<"> < </option>\n' +
            '    </select>\n' +
            '    <input name="standard" /><br/>';
        return ($(str));
    }
    //当选择一项查询条件后生成新的查询输入框
    _createCondition(){
        //移除原来所有的选择框class属性
        $("div[label='"+this.label+"'] select").removeAttr("class");
        var dom=this._buildCondition();
        this.divElement.append(dom);
    }
    //生成table
    _buildTable(){
        var dom= $('<table id="table" name="table" label="'+this.label+'" align="center" border="1" cellspacing="0"></table>') ;
        dom.append(this._buildTitleLine());
        return dom;
    }
    //生成标题栏
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
    //生成翻页工具
    _buildPageButton(){
        var dom=$('<div><input type="button" name="prev" id="prev" value="上一页">' +
            '<input type="text" id="page" name="page" value="1">' +
            '<input type="button" value="查询" name="getPage"  id="getPage">' +
            '<input type="button" id="next" name="next" value="下一页"></div><br/><br/><br/><br/>') ;
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
    _getIdArray(){
        var result =[];
        var param={"sortName":this.sortName,"condition":this.conditionArr,"sortType":this.flag};
        $.ajax({
            url: "http://localhost:63342/jq/idArray.js",
            type: "POST",
            async:false,
            data:"param="+param,
            success: function (data) {
                var jsonStr = eval('(' + data + ')');
                result= jsonStr.ids;
            }
        });
        return result;
    }
    //刷新conditionMap中数据
    _refreshConditionMap(){
        var len=$("div[label='"+this.label+"']").children("select[name='choose']").length;
        for(var i=0;i<len;i++){
            var v1=this.divElement.children("select[name='condition']").eq(i).val();
            var v2=this.divElement.children("select[name='choose']").eq(i).val();
            var v3=this.divElement.children("select[name='standard']").eq(i).val();
            var map={"condition":v1,"choose":v2,"standard":v3};
            this.conditionArr.put(map);
        }
    }
    //根据arr数组获取数据
    _fetch(){
        var arr=this.idArray;
        var pageNum=this.pageNum;
        var pageSize=this.pageSize;
        var map=this.dataMap;
        var str="" ;
        var conf=this.conf;
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
        $("table[label='"+this.label+"'] ").remove();//先删除table节点,重新生成新table
        var table=this._buildTable();
        table.append($(str));
        this.formElement.after(table);
    }
    //上一页
    _prevPage(){
        if (this.pageNum==1){
        } else{
            var pageNum=--this.pageNum;
            $("div[label='"+this.label+"'] input[name='page']").val(pageNum);
            this._fetch();
        }

    }
    //根据输入页码查询
    _byPageNum(){
        var pageNum=$("div[label='"+this.label+"'] #page").val();
        var temp = Math.ceil(this.idArray.length * 1.0 / this.pageSize);
        if(pageNum>temp){
        }else{
            this.pageNum=pageNum;
            this._fetch();
        }

    }
    //下一页
    _nextPage(){
        var temp = Math.ceil(this.idArray.length * 1.0 / this.pageSize);
        if(this.pageNum==temp){
        }else{
            var pageNum=++this.pageNum;
            $("div[label='"+this.label+"'] input[name='page']").val(pageNum);
            this._fetch();
        }
    }
    //表单提交
    _formSubmit(){
        var result=[1,6,9,4,5];
        $.post(
            'url',
            $("div[label='"+this.label+"'] form").serialize(),//data
            function(response){
                //成功或者失败操作
            },'json');

        /* var param={"sortName":this.sortName,"condition":this.conditionArr,"sortType":this.flag};
          $.ajax({
              url:"",//请求路径为获取数组的路径
              type:"post",
              async:false,
              data:$("div[label='"+this.label+"'] form").serialize(),
              success:function(data){
                  var jsonStr = eval('(' + data + ')');
                  result= jsonStr.ids;
              }
          });*/
        this.idArray=result;
        this.pageNum=1;
        $("div[label='"+this.label+"'] input[name='page']").val(1);
        this._fetch();
    }
    _doOrderByButton(event){
        var target=event.target;
        var result=[12,11,10,9,8,7,6,5,4,3,2,1];
        var len=Object.keys(this.titleMap).length;
        //如果排序按钮改变,将其他的排序取消了
       if(this.sortButton!=target.name) {
            for(var i=1;i<=len;i++){
                if(target.name!=this.titleMap[i].attr("name")){
                    this.titleMap[i].val(this.titleMap[i].attr("back"));
                    this.flag=0;
                }
            }
        }
        //flag为0是默认排序,为1时升序,为2时降序
        if(this.flag==0){
            for(var i=1;i<=len;i++){
                if(target.name==this.titleMap[i].attr("name")){
                    this.titleMap[i].val(this.titleMap[i].attr("back")+"↑");
                }
            }
            this.flag++;
        }else if(this.flag==1){
            for(var i=1;i<=len;i++) {
                if (target.name == this.titleMap[i].attr("name")) {
                    this.titleMap[i].val(this.titleMap[i].attr("back")+ "↓");
                }
            }
            this.flag++;
        }else{
                for(var i=1;i<=len;i++) {
                    if (target.name == this.titleMap[i].attr("name")) {
                        this.titleMap[i].val(this.titleMap[i].attr("back"));
                    }
                }
            this.flag=0;
        }
        var param={"sortName":this.sortName,"condition":this.conditionArr,"sortType":this.flag};
          $.ajax({
            url:"",//请求路径为获取数组的路径
            type:"post",
            async:false,
            data:"param="+param,
            success:function(data){
                var jsonStr = eval('(' + data + ')');
                result= jsonStr.ids;
            }
        });
          this.sortButton=target.name;
          this.idArray=result;
          this._fetch();
    }

}
