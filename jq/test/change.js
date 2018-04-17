$(function(){
    var dat = {"datas":[
            {"id":1,"num":"2018-1","quality":"255g/m","element":"w:100%","width":"150cm","count":"30",
                "code":"123aa-456bb-asd","pic": "aaa","pic1": "bbb","pic2": "ccc"},
            {"id":2,"num":"2018-2","quality":"235g/m","element":"w:10%","width":"180cm","count":"32",
                "code":"123aa-456bb-asd","pic": "aaa","pic1": "bbb","pic2": "ccc"},
            {"id":3,"num":"2018-1","quality":"255g/m","element":"w:100%","width":"150cm","count":"30",
                "code":"123aa-456bb-asd","pic": "aaa","pic1": "bbb","pic2": "ccc"},
            {"id":4,"num":"2018-4","quality":"255g/m","element":"w:100%","width":"150cm","count":"30",
                "code":"123aa-456bb-asd","pic": "aaa","pic1": "bbb","pic2": "ccc"},
            {"id":5,"num":"2018-1","quality":"255g/m","element":"w:100%","width":"150cm","count":"30",
                "code":"123aa-456bb-asd","pic": "aaa","pic1": "bbb","pic2": "ccc"},
            {"id":6,"num":"2018-1","quality":"255g/m","element":"w:100%","width":"150cm","count":"30",
                "code":"123aa-456bb-asd","pic": "aaa","pic1": "bbb","pic2": "ccc"},
            {"id":7,"num":"2018-1","quality":"255g/m","element":"w:100%","width":"150cm","count":"30",
                "code":"123aa-456bb-asd","pic": "aaa","pic1": "bbb","pic2": "ccc"},
            {"id":8,"num":"2018-1","quality":"255g/m","element":"w:100%","width":"150cm","count":"30",
                "code":"123aa-456bb-asd","pic": "aaa","pic1": "bbb","pic2": "ccc"},
            {"id":9,"num":"2018-1","quality":"255g/m","element":"w:100%","width":"150cm","count":"30",
                "code":"123aa-456bb-asd","pic": "aaa","pic1": "bbb","pic2": "ccc"},
            {"id":10,"num":"2018-1","quality":"255g/m","element":"w:100%","width":"150cm","count":"30",
                "code":"123aa-456bb-asd","pic": "aaa","pic1": "bbb","pic2": "ccc"},
            {"id":11,"num":"2018-1","quality":"255g/m","element":"w:100%","width":"150cm","count":"30",
                "code":"123aa-456bb-asd","pic": "aaa","pic1": "bbb","pic2": "ccc"},
            {"id":12,"num":"2018-11","quality":"255g/m","element":"w:100%","width":"150cm","count":"30",
                "code":"123aa-456bb-asd","pic": "aaa","pic1": "bbb","pic2": "ccc"}
        ]};
    $("#test").click(function () {
       /* var arr=getArray();
        alert(arr);*/
        var jsonStr = "{ a:1,b:2,c:3 }";
        var jsonObj = eval('('+jsonStr+')');
        alert(jsonObj.toString());
        getMap(dat);

    })

});


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
