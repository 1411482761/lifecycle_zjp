$(function(){
    var data=json_data;
   // $("body").append($("<h1 class='text-center'>参会证</h1><hr/>")).append(_buildInfo());
    $("body").append($("<div id='body'></div>"));
    var scheduleDiv=$("<div></div>");
    var popDiv=$("<div id='pop'></div>");//弹窗的div
    $("#body").append($("<h1 class='text-center'>参会证</h1><hr/>")).append(_buildTheme(data)).append(_buildInfo(data)).append($("<hr id='hr2'/><span id='scheduletitle'>日程安排</span>")).append(scheduleDiv).append(popDiv);
    _buildSchedule();

    //生成会议名称和logo
    function _buildTheme(data){
        var div=$("<div id='theme'></div>");
        var logo=$('<span><img name="logo" src="../project/picture/logo.png"></span>');
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
        var duration=dataset["duration"];
        var date=dataset["date"];
        var timestamp=dataset["timestamp"];
        var arr=data.plans;
        var beginDate=arr[index]["date_begin"];
        var b_map=_caculateDateTime(beginDate);
        var endDate=arr[index]["date_end"];
        var e_map=_caculateDateTime(endDate);
        var beginTimestamp=b_map["timestamp"];
       // var date=new Date(scheduleDate);
        var nowDate=new Date();
        var nowTimestamp=Date.parse(new Date());
        if(duration==null){
            duration=_getHoursAndMinutes(b_map)+'&nbsp~&nbsp'+_getHoursAndMinutes(e_map);
        }
        if(date==null){
            date=b_map["month"]+'月'+b_map["date"]+'日';
        }
        if(timestamp==null){
            timestamp=beginTimestamp;
        }
        var leftDay=Math.floor((timestamp-nowTimestamp)/1000/60/60/24);
        var leftHours=Math.floor((timestamp-nowTimestamp)/1000/60/60-24*leftDay);
        var leftMinutes=Math.floor((timestamp-nowTimestamp)/1000/60-24*leftDay*60-leftHours*60);


    /*    if(timestamp<nowTimestamp){
            leftDay=0;
            leftHours=0;
            leftMinutes=0;
        }*/
        var tempForm=$('<form method="post"><input type="hidden" name="id" value="'+data.participant["_id"]+'"></form>');
        var tempDate=$('<span style="color: #8e959b">'+date+'</span><hr>');
        var tempUl=$('<ul style="list-style:none"><li><span name="thistime" id="thistime">'+duration+'</span><span name="thisevent" id="thisevent">'+arr[index]["subject"]+'</span></li><li>' +
        arr[index]["content"]+'</li></ul>');
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
        if(nowDate.getFullYear()==b_map["year"]&&nowDate.getMonth()==b_map["month"]&&nowDate.getDate()==b_map["date"]){
            $("#thistime").attr("style","color: #0dc938");
            $("#thisevent").attr("style","color: #0dc938");
        }
        popDiv.show(300);
    });
    //生成参与者个人信息展示
   function _buildInfo(data) {
       var sex=_formateSex(data.wxuser["sex"]);
       var dom=$("<div><span>个人信息</span></div>");
      var str='<div><div id="code"><img name="code" src="'+data.participant["url"]+'" /></div>';
             /*    '姓名:<em>'+data.participant["name"]+'</em><br/>'+
                '手机号:'+data.participant["phone"]+'<br/>';*/
        str+='<span><img id="head" class="img-circle" src="'+data.wxuser["headimgurl"]+'"></span><div id="personInfo"><strong>'+data.participant["name"]
            +'</strong><br><span class="detail">'+sex+'|</span><span class="detail">'+data.wxuser["country"]+'|</span><span class="detail">'+data.wxuser["province"]+'|</span><span class="detail">'+data.participant["mobilephone"]+'</span></div></div>';
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
           var inOneDay=_isInOneDay(arr[i]);
           if(inOneDay) {
               //日程在同一天
               var beginMap = _caculateDateTime(arr[i]["date_begin"]);
               var endMap = _caculateDateTime(arr[i]["date_end"]);
               if (flag != (beginMap["month"] + " " + beginMap["date"])) {
                   is_today = false;
                   var dom = $("<div class='schedulelist'></div>");
                   flag = beginMap["month"] + " " + beginMap["date"];
                   var begin_year = beginMap["year"];
                   var begin_month = beginMap["month"];
                   var begin_date = beginMap["date"];
                   dom.append($('<li>' + begin_month + '月' + begin_date + '日</li><hr>'));
                   dom.append($('<ul></ul>'));
                   if (begin_year == thisYear && begin_month == thisMonth && begin_date == thisDate) {
                       is_today = true;
                       $(dom.children("li")).attr("style", "color: #0dc938");
                       $(dom.children("li")).append($('<span id="today">☚</span>'));
                   }
               }
               if (Date.parse(thisDateTime) < beginMap["timestamp"]) {
                   //未开始
                   status = -1;
               } else if (Date.parse(thisDateTime) > endMap["timestamp"]) {
                   //已结束
                   status = 1;
               } else {
                   //正在进行
                   status = 0;
               }
               var li = $("<li></li>");
               var div = $("<div></div>");
               var duration = $('<div data-index="' + index + '" data-status="' + status + '" name="time">' + beginMap["hours"] + ':' + _formatMinutes(beginMap["minutes"]) + ' ~ ' + endMap["hours"] + ':' + _formatMinutes(endMap["minutes"]) + '</div>');
               var subject = $('<div data-index="' + index + '" data-status="' + status + '" name="event">' + arr[i]["subject"] + '</div>');
               var sign = $('</div><div data-index="' + index + '" data-status="' + status + '" name="finger">></div>');
               var clear = $('<div id="clear"></div>');
               div.append(duration).append(sign).append(subject).append(clear);
               li.append(div);
               index++;
               if (is_today) {
                   if (Date.parse(thisDateTime) > beginMap["timestamp"] && Date.parse(thisDateTime) < endMap["timestamp"]) {
                       li.attr("style", "color: #0dc938");
                   }
               }
               dom.children("ul:last-child").append(li);
               scheduleDiv.append(dom);
           }else{
               //日程不在同一天的
               var beginMap = _caculateDateTime(arr[i]["date_begin"]);
               var endMap = _caculateDateTime(arr[i]["date_end"]);
               var dateArr=[];
               var timestampArr=[];
               var month_day=beginMap["month"]+"月"+beginMap["date"]+"日";
               dateArr.push(month_day);
               timestampArr.push(beginMap["timestamp"]);
               var b_timestamp=beginMap["timestamp"]-beginMap["hours"]*60*60*1000-beginMap["minutes"]*60*1000+86400000;
               var e_timestamp=endMap["timestamp"];
               //将期间的每一天放入数组中
               for (var j = b_timestamp; j <=e_timestamp ; j+=86400000) {
                   var temp=_caculateDateTime(j);
                   var md=temp["month"]+"月"+temp["date"]+"日";
                   dateArr.push(md);
                   timestampArr.push(j);
               }

               var dateArrLength=dateArr.length;

               for (var j = 0; j < dateArrLength; j++) {

                   var temp=_caculateDateTime(timestampArr[j]);
                   var todayMap=_caculateDateTime(new Date());
                   if(temp["month"]==todayMap["month"]&&temp["date"]==todayMap["date"]){
                       //如果是当天日期
                       is_today=true;
                   }else{
                       is_today=false;
                   }

                   var dom=$("<div class='schedulelist'></div>");
                   if(j==0){//日程第一天
                       if (Date.parse(new Date()) < beginMap["timestamp"]) {
                           //未开始
                           status = -1;
                       } else if (Date.parse(new Date()) > temp["timestamp"]+86400000) {
                           //已结束
                           status = 1;
                       } else {
                           //正在进行
                           status = 0;
                       }
                       dom.append($('<li>'+month_day+'</li><hr>'));
                       var tempul=$('<ul></ul>');
                       var templi=$('<li></li>');
                       var duration = $('<div data-timestamp="'+timestampArr[j]+'" data-date="'+dateArr[j]+'" data-duration="'+_getHoursAndMinutes(beginMap)+'&nbsp~&nbsp--:--" data-index="' + index + '" data-status="' + status + '" name="time">' + beginMap["hours"] + ':' + _formatMinutes(beginMap["minutes"]) + ' ~&nbsp' + '</div>');
                       var subject = $('<div data-timestamp="'+timestampArr[j]+'" data-date="'+dateArr[j]+'" data-duration="'+_getHoursAndMinutes(beginMap)+'&nbsp~&nbsp--:--" data-index="' + index + '" data-status="' + status + '" name="event">' + arr[i]["subject"] + '</div>');
                       var sign = $('</div><div data-timestamp="'+timestampArr[j]+'" data-date="'+dateArr[j]+'" data-duration="'+_getHoursAndMinutes(beginMap)+'&nbsp~&nbsp--:--" data-index="' + index + '" data-status="' + status + '" name="finger">></div>');
                       var clear = $('<div id="clear"></div>');
                       templi.append(duration).append(subject).append(sign).append(clear);
                       tempul.append(templi);
                       dom.append(tempul);
                       if(is_today){
                           $(dom.children("li")).attr("style", "color: #0dc938");
                           $(dom.children("li")).append($('<span id="today">☚</span>'));
                           if(beginMap["timestamp"]<Date.parse(new Date())){
                               templi.attr("style", "color: #0dc938");
                           }
                       }else{
                       }
                   }else if(j==dateArrLength-1){//日程最后一天
                       //var  tempDiv=$("<div></div>");
                       if (Date.parse(new Date()) < temp["timestamp"]) {
                           //未开始
                           status = -1;
                       } else if (Date.parse(new Date()) > endMap["timestamp"]) {
                           //已结束
                           status = 1;
                       } else {
                           //正在进行
                           status = 0;
                       }
                       dom.append($("<li>"+endMap["month"]+"月"+endMap["date"]+"日</li><hr>"));
                       var tempul=$('<ul></ul>');
                       var templi=$('<li></li>');
                       var duration = $('<div data-timestamp="'+timestampArr[j]+'" data-date="'+dateArr[j]+'"  data-duration="--:--&nbsp~&nbsp'+_getHoursAndMinutes(endMap)+'"  data-index="' + index + '" data-status="' + status + '" name="time">' +'&nbsp~'+ _getHoursAndMinutes(endMap) + '</div>');
                       var subject = $('<div data-timestamp="'+timestampArr[j]+'" data-date="'+dateArr[j]+'" data-duration="--:--&nbsp~&nbsp'+_getHoursAndMinutes(endMap)+'" data-index="' + index + '" data-status="' + status + '" name="event">' + arr[i]["subject"] + '</div>');
                       var sign = $('</div><div data-timestamp="'+timestampArr[j]+'" data-date="'+dateArr[j]+'" data-duration="--:--&nbsp~&nbsp'+_getHoursAndMinutes(endMap)+'" data-index="' + index + '" data-status="' + status + '" name="finger">></div>');
                       var clear = $('<div id="clear"></div>');
                       templi.append(duration).append(subject).append(sign).append(clear);
                       tempul.append(templi);
                       dom.append(tempul);
                       if(is_today){
                           $(dom.children("li")).attr("style", "color: #0dc938");
                           $(dom.children("li")).append($('<span id="today">☚</span>'));
                           if(endMap["timestamp"]>Date.parse(new Date())){
                               templi.attr("style", "color: #0dc938");
                           }
                       }else{
                       }
                   }else {
                       //中间日期  全天
                       if (Date.parse(new Date()) < temp["timestamp"]) {
                           //未开始
                           status = -1;
                       } else if (Date.parse(new Date()) > temp["timestamp"]+86400000) {
                           //已结束
                           status = 1;
                       } else {
                           //正在进行
                           status = 0;
                       }
                       var li=$("<li>"+ dateArr[j] +"</li>");
                       dom.append(li).append($("<hr>"));
                       var tempul=$('<ul></ul>');
                       var templi=$('<li></li>');
                       var duration = $('<div data-timestamp="'+timestampArr[j]+'" data-date="'+dateArr[j]+'" data-duration="全天" data-index="' + index + '" data-status="' + status + '" name="time">全天</div>');
                       var subject = $('<div data-timestamp="'+timestampArr[j]+'" data-date="'+dateArr[j]+'" data-duration="全天" data-index="' + index + '" data-status="' + status + '" name="event">' + arr[i]["subject"] + '</div>');
                       var sign = $('</div><div data-timestamp="'+timestampArr[j]+'" data-date="'+dateArr[j]+'" data-duration="全天" data-index="' + index + '" data-status="' + status + '" name="finger">></div>');
                       var clear = $('<div id="clear"></div>');
                       if(is_today){
                           $(dom.children("li")).attr("style", "color: #0dc938");
                           templi.attr("style", "color: #0dc938");
                           $(dom.children("li")).append($('<span id="today">☚</span>'));
                       }else{
                       }
                       templi.append(duration).append(subject).append(sign).append(clear);
                       tempul.append(templi);
                       dom.append(tempul);
                   }

                   scheduleDiv.append(dom);
               }
                index++;
           }
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
   //获取小时和分钟/09:20形式
    function _getHoursAndMinutes(map) {
        var hours=map["hours"];
        var minutes=map["minutes"];
        var str="";
        if(hours<10){
            str+="0"+hours;
        }else{
            str+=hours;
        }
        str+=":";
        if (minutes<10){
            str+="0"+minutes;
        } else{
            str+=minutes;
        }
        return str;
    }
    function _formateSex(num) {
        if(num==1){
            return "男";
        }else if (num==2){
            return "女";
        }else{
            return "sex";
        }
    }
    function _isInOneDay(rowdata) {
        var b_date=rowdata["date_begin"];
        var e_date=rowdata["date_end"];
        var b_map=_caculateDateTime(b_date);
        var e_map=_caculateDateTime(e_date);
        if(b_map["date"]==e_map["date"]&&[b_map["month"]==e_map["month"]]){
            return true;
        }else {
            return false;
        }


    }
/*
    function render(templatestring,dataobject){
       for (dataobject key){
           templatestirng=templatestring.replace('$'+key,dataobject[key])
        }
        return templatestring;
    }*/
})