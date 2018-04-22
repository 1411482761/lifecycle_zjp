$(function(){
    var data=data_json;
    $("body").append($("<h1>参会证</h1><hr/>")).append(_buildinfo());
    var scheduleDiv=$("<div></div>");
    var popDiv=$("<div id='pop'></div>");//弹窗的div
    $("body").append($("<hr/><strong>日程安排</strong><hr/>")).append(scheduleDiv).append(popDiv);
    _buildSchedule();

    //隐藏层
    function hideDialog(event) {
        popDiv.hide(1);
    }
    popDiv.on("click","input[name='exit']",hideDialog.bind(this));
    //给所有的a标签绑定事件
    //将点击的每条事件详细内容填充到div中
    $("a").click(function (event) {
        //假如有其他的弹窗,先把原来的清了
        popDiv.empty();
        hideDialog();
        var target=event.target;
        var index=target.name;//数组下标
        var arr=data.schedule;
        var scheduleDate=arr[index]["date"];
        var date=new Date(scheduleDate);
        var hour=arr[index]["time"];
        var datetime=scheduleDate+" "+hour+":00";
        var myTime=new Date(datetime);
        var myTimestamp=Date.parse(myTime);//获取日程时间戳
        //var nowdate=new Date();
        var nowTimestamp=Date.parse(new Date());
        var leftDay=Math.floor((myTimestamp-nowTimestamp)/1000/60/60/24);
        var leftHours=Math.floor((myTimestamp-nowTimestamp)/1000/60/60-24*leftDay);
        var leftminutes=Math.floor((myTimestamp-nowTimestamp)/1000/60-24*leftDay*60-leftHours*60);
        alert(typeof(leftminutes))
        alert(leftminutes)
        if(myTimestamp<nowTimestamp){
            leftDay=0;
            leftHours=0;
            leftminutes=0;
        }
        //alert(leftDay+"天"+leftHours+"hours"+leftminutes)
        var month=date.getMonth()+1;
        var day=date.getDate();
        var tempForm=$('<form method="post"><input type="hidden" name="id" value="'+data.participant["id"]+'"></form>');
        var tempDate=$('<h3>'+month+'月'+day+'日</h3>');
        var tempUl=$('<ul style="list-style:none"><li>'+arr[index]["duration"]+'</li><li>'+arr[index]["event"]+'</li><li>' +
        arr[index]["address"]+'</li><li>'+arr[index]["detail"]+'</li></ul>');
        var tempSign=$('<span>已签到<strong>'+3+'</strong>次</span>');
        var tempSubmit=$('<input type="submit" value="签到" />');
        var tempExit=$('<input type="button" name="exit" value="退出" >');
        var timeleft=$('<span>距离本日程开始还有'+leftDay+'天'+leftHours+'小时'+leftminutes+'分钟</span>');
        tempForm.append(tempDate).append(tempUl).append(tempSign).append(timeleft).append(tempSubmit).append(tempExit);
        popDiv.append(tempForm);
       /* var str='<form method="post"><input type="hidden" name="id" value="'+data.participant["id"]+'"><h3>'+month+'月'+day+'日</h3><ul style="list-style:none"><li>'+arr[index]["duration"]+'</li><li>'+arr[index]["event"]+'</li><li>' +
            arr[index]["address"]+'</li><li>'+arr[index]["detail"]+'</li></ul>' +
            '<span>已签到<strong>'+3+'</strong>次</span><br/>' +
            '<input type="submit" value="签到" /><input type="button" name="exit" value="退出" ></form> ';
        popDiv.append($(str));*/
        popDiv.show(300);
    });
    //生成参与者个人信息展示
   function _buildinfo() {
       var dom=$("<div></div>");
       var str='<img src="'+data.participant["url"]+'" /><br/>'+
                '姓名:<em>'+data.participant["name"]+'</em><br/>'+
                '手机号:'+data.participant["phone"]+'<br/>';
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
               dom.append($('<ul></ul>'));
           }
           var str='<li><a href="javascript:void(0)" data-index="index" name="'+index+'">'+arr[i]["duration"]+arr[i]["event"]+'</a></li>';
           index++;
           dom.children("ul:last-child").append($(str));
           domArr.push(dom);
           scheduleDiv.append(dom);
       }

   }

})