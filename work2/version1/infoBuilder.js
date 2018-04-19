$(function(){
    var data=data_json;
    $("body").append($("<h1>参会证</h1><hr/>")).append(_buildinfo());
    var scheduleDiv=$("<div></div>");
    var popDiv=$("<div id='racePop' class='raceShow'></div>");//弹窗的div
    $("body").append($("<hr/><strong>日程安排</strong><hr/>")).append(scheduleDiv).append(popDiv);
    _buildSchedule();

    //隐藏层
    function hideDialog(event) {
        popDiv.hide(300);
    }
    popDiv.on("click","input[type='submit']",hideDialog.bind(this));
    //给所有的a标签绑定事件
    $("a").click(function (event) {
        alert("a标签的绑定事件出发")
        var target=event.target;
        var index=target.name;//数组下标
        var arr=data.schedule;
        var date=new Date(arr[index]["date"]);
        var month=date.getMonth()+1;
        var day=date.getDate();
        var str='<form><h3>'+month+'月'+day+'日</h3>&nbsp&nbsp&nbsp&nbsp&nbsp'+arr[index]["duration"]+'&nbsp&nbsp&nbsp&nbsp'+arr[index]["event"]+'<br/>' +
            '&nbsp&nbsp&nbsp&nbsp&nbsp'+arr[index]["address"]+'<br/>&nbsp&nbsp&nbsp&nbsp&nbsp'+arr[index]["detail"]+'<br><br>' +
            '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<input type="submit" value="核实" /></form> ';
        popDiv.append($(str));
        alert("*******8")
      //  popDiv.show(300);
    });
    //生成参与者个人信息展示
   function _buildinfo() {
       var dom=$("<div></div>");
       var str='<img src="'+data.participant["url"]+'" /><br/>'+
                '姓名:&nbsp&nbsp&nbsp&nbsp<em>'+data.participant["name"]+'</em><br/>'+
                '手机号:&nbsp&nbsp&nbsp&nbsp'+data.participant["phone"]+'<br/>';
       dom.append($(str));
       return dom;
   }
   //生成日程安排计划
   function _buildSchedule() {
        var arr=data.schedule;
        var len=arr.length;
        var domArr=[];
        var index=0;
        var flag="";
       for (var i = 0; i < len; i++) {
           if(flag!=arr[i]["date"]){
               var dom=$("<div></div>");
               flag=arr[i]["date"];
               var date=new Date(arr[i]["date"]);
               var month=date.getMonth()+1;
               var day= date.getDate();
               dom.append($('<h4>'+month+'月'+day+'日</h4>'));
           }
           var str='<h7>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href="javascript:void(0)" name="'+index+'">'+arr[i]["duration"]+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+arr[i]["event"]+'</a></h7><br/>';
           index++;
           dom.append($(str));
           domArr.push(dom);
           scheduleDiv.append(dom);
       }

   }
   function showDetails() {
       
   }
})