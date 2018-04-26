$(function () {
  /*  $("div").append($("<hr/>"));
    var a=$("div");
    var s=$("div")[1];
    var o=$(s);
    var inp=$("<input type='button'>");
    $("body").append($(inp));
   alert($("input").length+"***********") ;
    o.after($("<br/>"));
    console.log(o);
   // var p=$.toJSON(o);
    alert(a.length+"lenth");*//*
  var arr=$("body").children("div").children("input");
    alert(arr.length+"===");*/
    var s=$("#op1").text();
    alert(s);
    $("#op1").text("qweqwe");
    var s=$("#op1").text();
    alert(s);
})