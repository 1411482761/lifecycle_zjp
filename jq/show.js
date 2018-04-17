var str;
var map={};
var pageNum=1;
var pageSize=5;
var total = conf.columns.length;
str="<tr>";
for(var i=0;i<total;i++){
    var rowdata= conf.columns[i];
    var name=rowdata.name;
    str+=conf.title[name];
}
str+="</tr>";
function goods(){

}
$(function(){
    /*--------------------------------------------------*/

 /*   var myMap={};

//将返回的json数据封装到map中key等于数据id
    function getMap(dat) {
        //请求数据:
        /!* $.ajax({
             url:"",
             type:"POST",
             success:function (data) {
                 var str=(data);
                 var len=str.datas.length;
                 for (var i=0;i<len;i++){
                     var key=i+1+"";
                     myMap[key]=str.datas[i];
                 }
             }
         })*!/
        var str= eval(dat);
        var len=str.datas.length;
        for (var i=0;i<len;i++){
            var key=i+1+"";
            myMap[key]=str.datas[i];
            // myMap.put(i+1+"",str.datas[i]);
        }

        alert("该对象id是:"+myMap["2"].id)
    };*/
    /*------------------------------------------------------------------------*/
    /*$("#button1").click(function(){

        //生成标题行

        str="<tr>";
         for(var i=0;i<total;i++){
             var rowdata= conf.columns[i];
             var name=rowdata.name;
             str+=conf.title[name];
        }
        str+="</tr>";

        var str1 = str;
         //根据数据生成表
        var len=datas.length;
        for (var i=0;i<len;++i){
            var rowdata=datas[i];
            str1+="<tr>";
            for(j=0;j<total;j++){
                var column=conf.columns[j];
                var data=rowdata[column.name];   //得到数据表中的属性名,根据名字调用format中方法
                var format=conf.format[column.name](data,rowdata);
                str1+=format;
            }
            str1+="</tr>";
        }
        $("#table1").html(str1);

        //给新生成的按钮添加点击事件
        $("#button2").on("click",function ( ) {
            var str1 = str;
            for(var i=0;i<4;++i){
                var rowdata=datas[i];
                str1+="<tr>";
                for(j=0;j<total;j++){
                    var column=conf.columns[j];
                    var data=rowdata[column.name];   //得到数据表中的属性名,根据名字调用format中方法
                    var format=conf.format[column.name](data,rowdata);
                    str1+=format;
                }
                str1+="</tr>";

            }
            $("#table1").html(str1);
        })
    });*/
    //按条件查询
    $("#doSearch").click(function(){
        var condition= $("#search").val();
        $.ajax({
            url:"",
            type:"POST",
            data:"condition="+condition,
            success:function(){
                //将返回的数据展示在页面上
        }
        });
    });
    //按页码查询数据
    $("#getPage").click(function(){
         pageNum=$("#page").val();
        fetch(pageNum);
        $("#page").val(pageNum);
    });
    map=getMap(dat);
    fetch(pageNum);
    //上一页按钮功能
    $("#pre").click(function(){
        if(pageNum==1){
            alert("已经是第一页了");
        }else{
            pageNum--;
            fetch(pageNum);
        }
        $("#page").val(pageNum);
    });
    //下一页按钮功能
    $("#next").click(function(){


        var temp=Math.ceil(Object.keys(map).length*1.0/pageSize);
        if(pageNum==Math.ceil(temp)){
            alert("已经是最后一页了");
        }else{
            pageNum++;
            fetch(pageNum);
        }
        $("#page").val(pageNum);
    });
});

function fetch(pageNum){
    getDatas(pageNum);
   /* if(map==null){
        //第一次查询,请求数据库
        map=getMap(dat);
        getDatas(1);
    }else{
        getDatas(pageNum);
    }*/
}
function getDatas(pageNum){
    var str1=str;
    console.log(str1);
    var total = conf.columns.length;
    pageNum=pageNum*pageSize-pageSize+1;
    for (var i=0;i<pageSize;i++){//每页展示三条数据
/*        alert(map["1"]+"====================");
        alert(map["1"].id);*/

        var k=pageNum++;

       // var rowdata=map['"'+k+'"'];//从map中根据key获取要查询的数据
        var key=k+"";
        var rowdata=map[key];
      //  alert(rowdata);
        //alert(rowdata.id+rowdata.quality);
      //  alert(rowdata["id"]+"[id]");

        str1+="<tr>";
        for(var j=0;j<total;j++){
            var column=conf.columns[j];
            var data=rowdata[column.name];   //得到数据表中的属性名,根据名字调用format中方法
            var format=conf.format[column.name](data,rowdata);
            str1+=format;
        }
        str1+="</tr>";
        if(rowdata.id==Object.keys(map).length){
            break;
        }
      //  alert("完成");
    }
    $("#table1").html(str1);
}