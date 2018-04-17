$(function(){
    var demo = new func("form1");
    var arr=[];
    demo.fetch();
    $("#form1 #pre").click(function(){
        demo.reducePageNum()
        demo.fetch();
    });
    $("#form1 #next").click(function(){
        demo.addPageNum();
        arr=demo.getIdArray();
        demo.fetch(arr);
    })
    $("#form1 #doSearch").click(function(){
        demo.rebuildIndex();
        arr=demo.getIdArray();
        demo.fetch(arr);
    })

})