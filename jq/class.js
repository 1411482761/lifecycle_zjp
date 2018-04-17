function func(form) {
    var formId = form;
    var index = 0;
    var str;
    var map = {};
    var pageNum = 1;
    var pageSize = 5;
    var total = conf.columns.length;


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
            return myMap;
           //alert("该对象id是:"+myMap["2"].id)
       };*/
    /*------------------------------------------------------------------------*/
    this.rebuildIndex = rebuildIndex;

    function rebuildIndex() {
        index = 0;
    }

    this.addPageNum = addPageNum;

    function addPageNum() {
        pageNum++;
    }

    this.reducePageNum = reducePageNum;

    function reducePageNum() {
        pageNum--;
    }

    //按条件查询
    function searchCondition() {
        var condition = $("#" + formId + " #search").val();
        $.ajax({
            url: "",
            type: "POST",
            data: "condition=" + condition,
            success: function () {
                //将返回的数据展示在页面上
            }
        });
    }

    //按页码查询数据
    function searchByPage() {
        pageNum = $("#" + formId + " #page").val();
        fetch(pageNum);
        $("#" + formId + " #page").val(pageNum);
    }

    map = getMap(dat);
    //fetch();
    //上一页按钮功能
    function prePage() {
        if (pageNum == 1) {
            alert("已经是第一页了");
        } else {
            pageNum--;
            fetch(pageNum);
        }
        $("#" + formId + " #page").val(pageNum);

    }

    //下一页按钮功能
    function nextPage() {
        var temp = Math.ceil(Object.keys(map).length * 1.0 / pageSize);
        if (pageNum == Math.ceil(temp)) {
            alert("已经是最后一页了");
        } else {
            pageNum++;
            fetch(pageNum);
        }
        $("#" + formId + " #page").val(pageNum);
    }

    /*function fetch(){
     getDatas();
     /!* if(map==null){
          //第一次查询,请求数据库
          map=getMap(dat);
          getDatas(1);
      }else{
          getDatas(pageNum);
      }*!/
 }*/
    this.fetch = fetch;

    function fetch(arr) {
        var str1 = str;
        console.log(str1);
        var total = conf.columns.length;
        pageNum = pageNum * pageSize - pageSize + 1;
        for (var i = 0; i < pageSize; i++) {//每页展示三条数据
            /*        alert(map["1"]+"====================");
                    alert(map["1"].id);*/
            //var page2=pageNum;
            //根据arr数组中的值对比map中的id值去取值
            var key = arr[index];
            index++;
            /* var k=page2++;

             // var rowdata=map['"'+k+'"'];//从map中根据key获取要查询的数据
             var key=k+"";*/
            var rowdata = map[key];
            //  alert(rowdata);
            //alert(rowdata.id+rowdata.quality);
            //  alert(rowdata["id"]+"[id]");

            str1 += "<tr>";
            for (var j = 0; j < total; j++) {
                var column = conf.columns[j];
                var data = rowdata[column.name];   //得到数据表中的属性名,根据名字调用format中方法
                var format = conf.format[column.name](data, rowdata);
                str1 += format;
            }
            str1 += "</tr>";
            if (rowdata.id == Object.keys(map).length) {
                break;
            }
            //  alert("完成");
        }
        $("#" + formId + " #table1").html(str1);
        //$("#table1").html(str1);

    }

    //获得id数组
    function getIdArray() {
        var order = $("#" + formId + " ###").val();
        var condition = $("#" + formId + " #search").val();
        $.ajax({
            url: "",
            type: "POST",
            data: "order=" + order + "&condition=" + condition,
            success: function (data) {
                var arr = [];
                var jsonStr = eval('(' + data + ')');
                //将json数据中的id放入arr数组中
                for (var i in jsonStr) {
                    arr.push(i);
                }
                return arr;
            }
        })
    }

    this.getIdArray = getIdArray;

}
//将返回的json数据封装到map中key等于数据id
function getMap(dat) {
    var myMap={};
    //请求数据:
    /* $.ajax({
         url:"",
         type:"POST",
         success:function (data) {
             var str=(data);
             var len=str.datas.length;
             for (var i=0;i<len;i++){
                 var key=i+1+"";
                 myMap[key]=str.datas[i];
             }
             return myMap;
         }
     })*/
    var str= eval(dat);
    var len=str.datas.length;
    for (var i=0;i<len;i++){
        var key=i+1+"";
        myMap[key]=str.datas[i];
        // myMap.put(i+1+"",str.datas[i]);
    }

    // alert("该对象id是:"+myMap["2"].id);
    return myMap;
}

/*function PageBuilder() {

}

PageBuilder.prototype.addPage = function (a, b, c) {

}

var pb = new PageBuilder();
pb.addPage();

var c = pb.addPage
c.apply(pb, [1, 2, 3])

class PageBuilder2 {

    addPage(a, b, c) {
        if (true){
            let a;
        }
    }
}*/
