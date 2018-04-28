$(function(){
    var data=data_json;
   // $("body").append($("<h1 class='text-center'>参会证</h1><hr/>")).append(_buildinfo());
    var scheduleDiv=$("<div></div>");
    var popDiv=$("<div id='pop'></div>");//弹窗的div
    $("body").append($("<h1 class='text-center'>参会证</h1><hr/>")).append(_buildTheme(data)).append(_buildinfo()).append($("<hr id='hr2'/><span id='scheduletitle'>日程安排</span>")).append(scheduleDiv).append(popDiv);
    _buildSchedule();

    //生成会议名称和logo
    function _buildTheme(data){
        var div=$("<div id='theme'></div>");
        var logo=$('<span><img name="logo" src="'+data.theme["logo"]+'"></span>');
        var subject=$('<span><strong>'+data.theme["subject"]+'</strong></span>');
        $(div).append(logo);
        $(div).append(subject);
        $(div).append('<hr id="hr1"/>');
        return div;
    }

    //隐藏层
    function hideDialog(event) {
        popDiv.hide(1);
    }
    popDiv.on("click","input[name='exit']",hideDialog.bind(this));
    //给所有的a标签绑定事件
    //将点击的每条事件详细内容填充到div中
    $("div[data-index]").click(function (event) {
        //假如有其他的弹窗,先把原来的清了
        popDiv.empty();
        hideDialog();
        var target=event.target;
        var dataset=target.dataset;//数组下标
        var index=dataset["index"];
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
        var leftMinutes=Math.floor((myTimestamp-nowTimestamp)/1000/60-24*leftDay*60-leftHours*60);

        if(myTimestamp<nowTimestamp){
            leftDay=0;
            leftHours=0;
            leftMinutes=0;
        }
        //alert(leftDay+"天"+leftHours+"hours"+leftminutes)
        var month=date.getMonth()+1;
        var day=date.getDate();
        var tempForm=$('<form method="post"><input type="hidden" name="id" value="'+data.participant["id"]+'"></form>');
        var tempDate=$('<h3>'+month+'月'+day+'日</h3><hr>');
        var tempUl=$('<ul style="list-style:none"><li><span name="thistime">'+arr[index]["duration"]+'</span><span name="thisevent">'+arr[index]["event"]+'</span></li><li>' +
        arr[index]["address"]+'</li><li>'+arr[index]["detail"]+'</li></ul>');
        var tempSign=$('<span>已签到<strong>'+3+'</strong>次</span><br>');
        var tempSubmit=$('<input type="submit" class="btn btn-primary btn-lg btn-block"  id="sub" value="签到" />');
        var tempExit=$('<input type="button"  name="exit" value="X" >');
        var timeLeft=$('<span>距本日程剩余'+leftDay+'天'+leftHours+'小时'+leftMinutes+'分钟</span><br>');
        tempForm.append(tempDate).append(tempUl).append(tempSign).append(timeLeft).append(tempSubmit);
        popDiv.append(tempExit).append(tempForm);
        popDiv.show(300);
    });
    //生成参与者个人信息展示
   function _buildinfo() {
       var dom=$("<div><span>个人信息</span><br></div>");
      var str='<img name="code" src="'+data.participant["url"]+'" /><br/>';
             /*    '姓名:<em>'+data.participant["name"]+'</em><br/>'+
                '手机号:'+data.participant["phone"]+'<br/>';*/
        str+='<span><img id="head" src="'+data.participant["pic"]+'"></span><div id="personInfo"><strong>姓名:</strong><strong>'+data.participant["name"]
            +'</strong><br><span>手机:</span><span>'+data.participant["phone"]+'</span></div>';
       dom.append($(str));
       return dom;
   }
   //生成日程安排计划
   function _buildSchedule() {
        var arr=data.schedule;
        var len=arr.length;
        var index=0;
        var flag="";
        var thisDate=new Date();
        var thisYear=thisDate.getFullYear();
        var thisMonth=thisDate.getMonth()+1;
        var thisDate=thisDate.getDate();
       for (var i = 0; i < len; i++) {
           if(flag!=arr[i]["date"]){
               var dom=$("<div></div>");
               flag=arr[i]["date"];
               var date=new Date(arr[i]["date"]);
               var year=date.getFullYear();
               var month=date.getMonth()+1;
               var day= date.getDate();
               dom.append($('<li>'+month+'月'+day+'日</li><hr>'));
               dom.append($('<ul></ul>'));
               if(year==thisYear&&month==thisMonth&&day==thisDate){
                  $(dom.children("li")).attr("style","color: #0dc938");
                  $(dom.children("li")).append($('<span id="today">☚</span>'));
               }
           }
          //var str='<li><a href="javascript:void(0)" data-index="'+index+'"><span data-index="'+index+'" name="time">'+arr[i]["duration"]+'</span><span data-index="'+index+'"  name="event">'+
           //    arr[i]["event"]+'</span><span data-index="'+index+'" name="finger">></span></a></li>';
          var str='<li><div><div data-index="'+index+'" name="time">'+arr[i]["duration"]+'</div><div data-index="\'+index+\'" name="finger">></div><div data-index="'+index+'"  name="event">'+
               arr[i]["event"]+'</div><div id="clear"></div></div></li>';

           index++;
           dom.children("ul:last-child").append($(str));
           scheduleDiv.append(dom);
       }

   }

})