$(function(){
    var data=_parseData(json);
    $("body").append($("<div id='body'></div>"));
    var scheduleDiv=$("<div></div>");
    var popDiv=$("<div id='pop'></div>");//弹窗的div
    $("#body").append($("<div class='size18'><span >参会证</span><hr/></div>"));
    $("#body").append(_buildTheme(data));
    $("#body").append(_buildInfo(data));
    $("#body").append(scheduleDiv);
    $("#body").after(popDiv);
    _buildSchedule(data);

    //生成会议名称和logo
    function _buildTheme(data){
        var div=$("<div></div>");
        var logo=$('<span><img name="logo" src="/img/logo.png"></span>');
        var subject=$('<span class="size15"><strong>'+data.meeting["subject"]+'</strong></span>');
        $(div).append(logo);
        $(div).append(subject);
        $(div).append('<hr id="hr1"/>');
        return div;
    }
    //生成参与者个人信息展示
    function _buildInfo(data) {
        var sex=_formateSex(data.wxuser["sex"]);
        var dom=$("<div><span class='size15'>个人信息</span></div>");
        var str='<div id="persondiv"><div id="code"><img name="code" src="'+data.participant["url"]+'" /></div>';
        str+='<span><img id="head" class="img-circle" src="'+data.wxuser["headimgurl"]+'"></span>' +
            '<div id="personInfo"><strong class="size13">'+data.participant["name"]+
            '</strong><br><span class="detail">'+sex+'</span><span class="detail">|</span>' +
            '<span class="detail">'+data.wxuser["country"]+'</span><span class="detail">|</span>' +
            '<span class="detail">'+data.wxuser["province"]+'</span><span class="detail">|</span>' +
            '<span class="detail">'+data.participant["mobilephone"]+'</span></div></div>';
        dom.append($(str));
        return dom;
    }
    //隐藏层
    function hideDialog(event) {
        popDiv.hide();
    }

    popDiv.on("click","div[name='exit']",hideDialog.bind(this));

    //弹窗模块
    $("div[class='blockli']").click(function (event) {
        //假如有其他的弹窗,先把原来的清了
            popDiv.empty();
            hideDialog();
            var target = event.currentTarget;
            console.log(event)
            var dataset = target.dataset;
            console.log(target)
            var map_data = dataset["map"];
            var map = JSON.parse(map_data);
            var schedule = map["schedule"];
            var date = map["date"];
            var content = map["content"];
            var check_count = map["check_count"];
            var subject = map["subject"];
            var isToday =map["isToday"];
            var detail=map["detail"];
            var user_id=map["user_id"];
            var plan_id=map["plan_id"];
            var meeting_id=map["meeting_id"];
            var tempForm = $('<form method="post"></form>');
            var  dateDiv=$("<div></div>");
            var tempDate = $('<span style="color: #8e959b">' + date + '</span>');
            dateDiv.append(tempDate).append($("<hr>"));
            var eventDiv=$("<div id='event'></div>");
            var tempevent=$('<span name="thistime" id="thistime">' + schedule + '</span><span name="thisevent" id="thisevent">' + subject + '</span>');
            eventDiv.append(tempevent);
            var contentDiv=$("<div id='content'></div>");
            var tempcontent=$("<span>"+content+"</span>");
            contentDiv.append(tempcontent);
            var signDiv=$("<div></div>");
            var tempSign = $('<span style="color: #8e959b">已签到<strong>' + check_count + '</strong>次</span><br>');
            signDiv.append(tempSign);
            var subDiv=$("<div></div>");
            var tempSubmit = $('<input type="submit" class="btn btn-primary btn-lg btn-block"  id="sub" value="签到" />');
            subDiv.append(tempSubmit);
            var tempExit = $('<div id="exit" name="exit"><span>X</span></div>');
            tempForm.append(dateDiv).append(eventDiv).append(contentDiv).append(signDiv).append(subDiv);
            var hideDiv=$('<div></div>');
            var temp_userid=$('<input type="hidden" name="user_id" value="'+user_id+'">');
            var temp_planid=$('<input type="hidden" name="plan_id" value="'+plan_id+'">');
            var temp_meetingid=$('<input type="hidden" name="meeting_id" value="'+meeting_id+'">');
            hideDiv.append(temp_userid).append(temp_planid).append(temp_meetingid);
            tempForm.append(hideDiv);
            if (schedule == "全天") {
                var hide = $("<span style='color: #8e959b'>("+detail+")</span>");
                tempDate.after(hide);
            }
            if(isToday){
                tempDate.attr("style","color: #0dc938");
                tempevent.attr("style","color: #0dc938");
            }
            popDiv.append(tempExit).append(tempForm);
            popDiv.show();
    });

    //生成日程计划
    function _buildSchedule(data){
        var dateArr=_getDateArray(data);
        var dateMap=_packData(data,dateArr);
        var out_ul=$("<ul id='outer'></ul>");
        scheduleDiv.append($("<hr id='hr2'/><span id='scheduletitle' class='size15'>日程安排</span>"));
        var len=dateArr.length;
        for (var i = 0; i < len; i++) {
            var map=_caculateDateTime(dateArr[i]);
            var key=dateArr[i]+"";
            var arr=dateMap[key];
            var arr_length=arr.length;
            var md_str=map["month"]+"月"+map["date"]+"日";
            var dom_div = $("<div class='schedulelist'></div>");
            var outer_li=$('<li>'+md_str+'</li>');
            var inner_ul=$("<ul></ul>");
            for (var j = arr_length-1; j >= 0; j--) {
                //将需要传递的数据封装到集合
                var data_map=arr[j];
                data_map["isToday"]=map["isToday"];
                data_map["date"]=md_str;
                var mapstr=JSON.stringify(data_map);
                var inner_li=$("<li class='size13'></li>");
                var base_div=$("<div class='blockli' data-map='"+mapstr+"'></div>");
                var duration = $('<div name="time"  >' +arr[j]["schedule"] + '</div>');
                var right_div=$('<div name="right" ></div>');
                var subject = $('<div  name="event" >' + arr[j]["subject"] + '</div>');
                var sign = $('<div name="finger" >></div>');
                var clear = $('<div id="clear"></div>');
                right_div.append(sign).append(subject);
                base_div.append(duration).append(right_div).append(clear);
                inner_li.append(base_div);
                inner_ul.append(inner_li);

            }
            if(map["isToday"]){
                outer_li.attr("style", "color: #0dc938");
                /*outer_li.append($('<span id="today">☚</span>'));*/
            }

            dom_div.append(outer_li).append(inner_ul);
            out_ul.append(dom_div);
            scheduleDiv.append(out_ul);
            outer_li.after($("<hr>"));
            inner_ul.after($("<hr>"));
        }
    }

    //将日期中的每一天放入集合中
    function _getDateArray(data){
        var plans=data.plans;
        var plans_len=plans.length;
        var datearr=[];
        for (var i = 0; i < plans_len; i++) {
            var b_map=_caculateDateTime(plans[i]["date_begin"].replace(/-/g,"/"));
            var e_map=_caculateDateTime(plans[i]["date_end"].replace(/-/g,"/"));
            if(b_map["date"]==e_map["date"]&&b_map["date"]==e_map["date"]&&b_map["year"]==e_map["year"]){
                //同一天结束
                var timestamp=b_map["timestamp"]-b_map["hours"]*60*60*1000-b_map["minutes"]*60*1000-b_map["seconds"]*1000;//当天开始时间戳
                if(datearr.indexOf(timestamp)>=0){
                    //已存在
                }else{
                    datearr.push(timestamp);
                }
            }else {
                //日程跨天结束
                var timestamp=b_map["timestamp"]-b_map["hours"]*60*60*1000-b_map["minutes"]*60*1000-b_map["seconds"]*1000;//当天开始时间戳
                for (var j = timestamp; j < e_map["timestamp"]; j+=86400000) {
                    //将日程期间每天开始的时间戳放入数组
                    if(datearr.indexOf(j)==-1){
                        //不存在
                        datearr.push(j);
                    }else{
                    }
                }
            }
        }
        //将datearr排序
        var len=datearr.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len-i-1; j++) {
                        if(datearr[j]>datearr[j+1]){
                            var temp=datearr[j];
                            datearr[j]=datearr[j+1];
                            datearr[j+1]=temp;
                        }
            }
        }

        return datearr;
    }

    //创建{timestamp:[{subject:xxx,time:xxx,content:xxx},{subject:xxx,time:xxx,content:xxx}]...}形式数据
    function _packData(data,arr) {
        var final_map={};
        var plans=data.plans;
        var p_len=plans.length;
        var a_len=arr.length;
        var userid=data.participant["uuid"];
        for (var i = 0; i < a_len; i++) {
            var obj_arr=[];
            var obj_index=[];
            for (var j = 0; j < p_len; j++) {
                var b_date=plans[j]["date_begin"];
                var e_date=plans[j]["date_end"];
                var b_map=_caculateDateTime(b_date.replace(/-/g,"/"));
                var e_map=_caculateDateTime(e_date.replace(/-/g,"/"));
                var timestamp=b_map["timestamp"]-b_map["hours"]*60*60*1000-b_map["minutes"]*60*1000-b_map["seconds"]*1000;//开始当天00:00时间戳
                if(e_date.substring(0,10)==b_date.substring(0,10)){
                    //同一天内完成
                    if(timestamp==arr[i]){
                        let temp_map={};
                        temp_map["date"]=b_map["month"]+"月"+b_map["date"]+"日";
                        temp_map["subject"]=plans[j]["subject"];
                        temp_map["content"]=plans[j]["content"];
                        temp_map["user_id"]=userid;
                        temp_map["plan_id"]=plans[j]["uuid"];
                        temp_map["meeting_id"]=plans[j]["meeting_id"];
                        temp_map["check_count"]=_checkCount(plans[j]["uuid"]);
                        temp_map["schedule"]=_getHoursAndMinutes(b_map)+"~"+_getHoursAndMinutes(e_map);
                        obj_arr.push(temp_map);
                        obj_index.push(b_map["timestamp"]);
                    }
                }else{
                    //日程跨天
                    var b_timestamp=b_map["timestamp"]-b_map["hours"]*60*60*1000-b_map["minutes"]*60*1000;
                    var e_timestamp=e_map["timestamp"];
                   // var dayToDay=b_map["month"]+"月"+b_map["date"]+"日-"+e_map["month"]+"月"+e_map["date"]+"日";
                    //将期间的每一天放入数组中
                    for (var k = b_timestamp; k <=e_timestamp ; k+=86400000) {
                        if(k==arr[i]){
                            let t_map=_caculateDateTime(j);
                            let temp_map={};
                            temp_map["date"]=t_map["month"]+"月"+t_map["date"]+"日";
                            temp_map["subject"]=plans[j]["subject"];
                            temp_map["content"]=plans[j]["content"];
                            temp_map["user_id"]=userid;
                            temp_map["plan_id"]=plans[j]["uuid"];
                            temp_map["meeting_id"]=plans[j]["meeting_id"];
                            temp_map["check_count"]=_checkCount(plans[j]["uuid"]);
                            temp_map["schedule"]="全天";
                            temp_map["detail"]=b_map["month"]+"月"+b_map["date"]+"日~"+e_map["month"]+"月"+e_map["date"]+"日";
                            obj_arr.push(temp_map);
                            obj_index.push(b_map["timestamp"]*10);
                        }
                    }
                }
            }
            //将生成的obj_arr按时间排序
            var templen=obj_index.length;
            for (var j = 0; j < templen; j++) {
                for (var k = 0; k < templen-1-j; k++) {
                    if(obj_index[k]>obj_index[k+1])
                    var temp1=obj_index[k];
                    obj_index[k]=obj_index[k+1];
                    obj_index[k+1]=temp1;
                    var temp2=obj_arr[k];
                    obj_arr[k]=obj_arr[k+1];
                    obj_arr[k+1]=temp2;
                }
            }
            var  key=arr[i]+"";
            final_map[key]=obj_arr;
        }
        return final_map;
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
       var nowtime=new Date();
       var isToday=false;
       if(nowtime.getDate()==date&&nowtime.getMonth()==month-1&&nowtime.getFullYear()==year){
           isToday=true;
       }
       timeMap["isToday"]=isToday;
       timeMap["year"]=year;
       timeMap["month"]=month;
       timeMap["date"]=date;
       timeMap["hours"]=hours;
       timeMap["minutes"]=minutes;
       timeMap["seconds"]=seconds;
       timeMap["timestamp"]=timestamp;
       return timeMap;
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

    //将获取的json中的/r/n替换成<br>
    function _parseData (data){
        var str=JSON.stringify(data);
        str=str.replace(/\\r\\n/gi,"<br>");
        var json=JSON.parse(str);
        return json;
    }

    //计算签到次数
    function _checkCount(uuid){
        var checkins=data.checkin;
        var len=checkins.length;
        var count=0;
        for (var i = 0; i < len; i++) {
            if (checkins[i]["plan_id"]==uuid){
                count++;
            }
        }
        return count;
    }
})