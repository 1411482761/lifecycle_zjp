$(function(){
    var data=json_data;
   // $("body").append($("<h1 class='text-center'>参会证</h1><hr/>")).append(_buildInfo());
    var scheduleDiv=$("<div></div>");
    var popDiv=$("<div id='pop'></div>");//弹窗的div
    $("body").append($("<h1 class='text-center'>参会证</h1><hr/>")).append(_buildTheme(data)).append(_buildInfo()).append($("<hr id='hr2'/><span id='scheduletitle'>日程安排</span>")).append(scheduleDiv).append(popDiv);
    _buildSchedule();

    //生成会议名称和logo
    function _buildTheme(data){
        var div=$("<div id='theme'></div>");
        var logo=$('<span><img name="logo" src="../picture/logo.png"></span>');
        var subject=$('<span><strong>'+data.meeting["subject"]+'</strong></span>');
        $(div).append(logo);
        $(div).append(subject);
        $(div).append('<hr id="hr1"/>');
        return div;
    }

    //隐藏层
    function hideDialog(event) {
        popDiv.hide(1);
    }
    popDiv.on("click","div[name='exit']",hideDialog.bind(this));
    //给所有的a标签绑定事件
    //将点击的每条事件详细内容填充到div中
    $("div[data-index]").click(function (event) {
        //假如有其他的弹窗,先把原来的清了
        popDiv.empty();
        hideDialog();
        var target=event.target;
        var dataset=target.dataset;//数组下标
        var index=dataset["index"];
        var status=dataset["status"];
        alert(status);
        console.log(target);

        var arr=data.plans;
        var beginDate=arr[index]["date_begin"];
        var map=_caculateDateTime(beginDate);
        var beginTimestamp=map["timestamp"];
       // var date=new Date(scheduleDate);
        var nowDate=new Date();
        var nowTimestamp=Date.parse(new Date());
        var leftDay=Math.floor((beginTimestamp-nowTimestamp)/1000/60/60/24);
        var leftHours=Math.floor((beginTimestamp-nowTimestamp)/1000/60/60-24*leftDay);
        var leftMinutes=Math.floor((beginTimestamp-nowTimestamp)/1000/60-24*leftDay*60-leftHours*60);

        if(beginTimestamp<nowTimestamp){
            leftDay=0;
            leftHours=0;
            leftMinutes=0;
        }
        var tempForm=$('<form method="post"><input type="hidden" name="id" value="'+data.participant["_id"]+'"></form>');
        var tempDate=$('<span style="color: #8e959b">'+map["month"]+'月'+map["date"]+'日</span><hr>');
        var tempUl=$('<ul style="list-style:none"><li><span name="thistime" id="thistime">'+arr[index]["duration"]+'</span><span name="thisevent" id="thisevent">'+arr[index]["event"]+'</span></li><li>' +
        arr[index]["address"]+'</li><li>'+arr[index]["detail"]+'</li></ul>');
        var tempSign=$('<span style="color:rgba(169,169,169,0.83)">已签到<strong>'+3+'</strong>次</span><br>');
        var tempSubmit=$('<input type="submit" class="btn btn-primary btn-lg btn-block"  id="sub" value="签到" />');
        var tempExit=$('<div id="exit" name="exit"><span>X</span></div>');
        /*var timeLeft=$('<span style="color:darkgrey">距本日程剩余'+leftDay+'天'+leftHours+'小时'+leftMinutes+'分钟</span><br>');*/
        var leftstr="";
        if(status==-1){
            leftstr='<span style="color:darkgrey">距本日程剩余'+leftDay+'天'+leftHours+'小时'+leftMinutes+'分钟</span><br>';
        }else if(status==0){
            leftstr='<span style="color:#17a913">正在进行中...</span>';
        }else{
            leftstr='<span style="color:darkgrey">该日程已结束!!</span>';
        }
        var timeLeft=$(leftstr);
        tempForm.append(tempDate).append(tempUl).append(tempSign).append(timeLeft).append(tempSubmit);
        popDiv.append(tempExit).append(tempForm);
        //如果是当天的日程改变颜色
        if(nowDate.getFullYear()==map["year"]&&nowDate.getMonth()==map["month"]&&nowDate.getDate()==map["date"]){
            $("#thistime").attr("style","color: #0dc938");
            $("#thisevent").attr("style","color: #0dc938");
        }
        popDiv.show(300);
    });
    //生成参与者个人信息展示
   function _buildInfo() {
       var dom=$("<div><span>个人信息</span><br></div>");
      var str='<img name="code" src="'+data.participant["url"]+'" /><br/>';
             /*    '姓名:<em>'+data.participant["name"]+'</em><br/>'+
                '手机号:'+data.participant["phone"]+'<br/>';*/
        str+='<span><img id="head" src="'+data.wxuser["headimgurl"]+'"></span><div id="personInfo"><strong>姓名:</strong><strong>'+data.participant["name"]
            +'</strong><br><span>手机:</span><span>'+data.participant["mobilephone"]+'</span></div>';
       dom.append($(str));
       return dom;
   }
   //生成日程安排计划
   function _buildSchedule() {
        var arr=data.plans;
        var len=arr.length;
        var flag="";
        var index=0;
        var status=0;
        var is_today=false;
        var thisDateTime=new Date();
        var thisYear=thisDateTime.getFullYear();
        var thisMonth=thisDateTime.getMonth()+1;
        var thisDate=thisDateTime.getDate();
       for (var i = 0; i < len; i++) {

           var beginMap=_caculateDateTime(arr[i]["date_begin"]);
           var endMap=_caculateDateTime(arr[i]["date_end"]);
           if(flag!=(beginMap["month"]+" "+beginMap["date"])){
               is_today=false;
               var dom=$("<div></div>");
               flag=beginMap["month"]+" "+beginMap["date"];
               var begin_year=beginMap["year"];
               var begin_month=beginMap["month"];
               var begin_date= beginMap["date"];
               dom.append($('<li>'+begin_month+'月'+begin_date+'日</li><hr>'));
               dom.append($('<ul></ul>'));
               if(begin_year==thisYear&&begin_month==thisMonth&&begin_date==thisDate){
                   is_today=true;
                  $(dom.children("li")).attr("style","color: #0dc938");
                  $(dom.children("li")).append($('<span id="today">☚</span>'));
               }
           }
           if(Date.parse(thisDateTime)<beginMap["timestamp"]){
               //未开始
               status=-1;
           }else if(Date.parse(thisDateTime)>endMap["timestamp"]){
               //已结束
               status=1;
           }else{
               //正在进行
               status=0;
           }
           var li=$("<li></li>");
           var div=$("<div></div>");
           var duration=$('<div data-index="'+index+'" data-status="'+status+'" name="time">'+beginMap["hours"]+':'+_formatMinutes(beginMap["minutes"])+' ~ '+endMap["hours"]+':'+_formatMinutes(endMap["minutes"])+'</div>');
           var subject=$('<div data-index="'+index+'" data-status="'+status+'" name="event">'+arr[i]["subject"]+'</div>');
           var sign=$('</div><div data-index="'+index+'" data-status="'+status+'" name="finger">></div>');
           var clear=$('<div id="clear"></div>');
           div.append(duration).append(sign).append(subject).append(clear);
           li.append(div);
           index++;
           if(is_today){
               if(Date.parse(thisDateTime)>beginMap["timestamp"]&&Date.parse(thisDateTime)<endMap["timestamp"]){
                   li.attr("style","color: #0dc938");
               }
           }

          //var str='<li><a href="javascript:void(0)" data-index="'+index+'"><span data-index="'+index+'" name="time">'+arr[i]["duration"]+'</span><span data-index="'+index+'"  name="event">'+
           //    arr[i]["event"]+'</span><span data-index="'+index+'" name="finger">></span></a></li>';
        /*  var str='<li><div><div data-index="'+index+'" name="time">'+arr[i]["duration"]+'</div><div data-index="'+index+'" name="finger">></div><div data-index="'+index+'"  name="event">'+
               arr[i]["event"]+'</div><div id="clear"></div></div></li>';*/
           dom.children("ul:last-child").append(li);
           scheduleDiv.append(dom);
       }

   }
   function _caculateDateTime(dateTime){
       var timeMap={};
       var myDateTime=new Date(dateTime);
       var year=myDateTime.getFullYear();
       var month=myDateTime.getMonth()+1;
       var date=myDateTime.getDate();
       var hours=myDateTime.getHours();
       var minutes=myDateTime.getMinutes();
       var seconds=myDateTime.getSeconds();
       var timestamp=Date.parse(myDateTime);
       timeMap["year"]=year;
       timeMap["month"]=month;
       timeMap["date"]=date;
       timeMap["hours"]=hours;
       timeMap["minutes"]=minutes;
       timeMap["seconds"]=seconds;
       timeMap["timestamp"]=timestamp;
       return timeMap;
   }
   function _formatMinutes(minutes){
       if(minutes<10){
           minutes+="0";
       }
       return minutes;
   }

})