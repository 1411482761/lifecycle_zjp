$(function () {
    /*   var speed = 20;
       $("#td2").innerHTML = $("#td1").innerHTML;

       function Marquee() {
           if (wave.scrollLeft <= 0)
               wave.scrollLeft += $("#td2").offsetWidth;
           else {
               wave.scrollLeft--;
           }
       };
       setInterval(Marquee, speed);*/
    var data = json;
    var speed = 20;
    td2.innerHTML = td1.innerHTML;

    function Marquee() {
        if (wave.scrollLeft <= 0)
            wave.scrollLeft += td2.offsetWidth;
        else {
            wave.scrollLeft--;
        }
    };
    setInterval(Marquee, speed);
    _showMessage(data);

    function _caculateDate(date) {
        var map = {};
        var datestr = date.replace(/-/g, "/");
        var time = datestr.substring(11, 16);
        var datetime = new Date(datestr);
        var month = datetime.getMonth() + 1;
        var date = datetime.getDate();
        var nowtime = new Date();
        var datetimestamp = datetime.getTime();
        var nowtimestamp = nowtime.getTime();
        var ispassed = false;

        if (datetimestamp <= nowtimestamp) {
            ispassed = true;
        } else {
            ispassed = false;
        }
        map["month"] = month;
        map["date"] = date;
        map["time"] = time;
        map["md"] = datetime.getFullYear() + "年" + month + "月" + date + "日";
        map["ispassed"] = ispassed;
        return map;
    }

    function _showMessage(data) {
        var eb_map = _caculateDate(data.meeting["enroll_begin"]);
        var ee_map = _caculateDate(data.meeting["enroll_end"]);
        var mb_map = _caculateDate(data.meeting["date_begin"]);
        var me_map = _caculateDate(data.meeting["date_end"]);
        var eb_passed = eb_map["ispassed"];
        var ee_passed = ee_map["ispassed"];
        var mb_passed = mb_map["ispassed"];
        var me_passed = me_map["ispassed"];
        if (!eb_passed) {
            //报名时间未到
            $("#top").attr("style", "background-image:url('/img/greybackground.jpg')");
            $("#circle img").attr("src", "/img/greycircle.png");
            $("#info").attr("style", "background-color: #FCFCFC");
            $("#msg1 span").html("抱歉,报名尚未开始");
            $("#msg2 span").html("报名开始时间为");
            $("#time").html(eb_map["time"]);
            $("#date").html(eb_map["md"]);
        } else if (ee_passed) {
            //报名时间已结束
            $("#top").attr("style", "background-image:url('/img/greybackground.jpg')");
            $("#circle img").attr("src", "/img/greycircle.png");
            $("#info").attr("style", "background-color: #FCFCFC");
            $("#msg1 span").html("抱歉,报名已结束");
            $("#msg2 span").html("会议开始时间为");
            $("#time").html(mb_map["time"]);
            $("#date").html(mb_map["md"]);
        } else {
            if (data.participant == null) {
                //可以报名
                $("#top").attr("style", "background-image:url('/img/greenbackground.jpg')");
                $("#circle img").attr("src", "/img/greencircle.png");
                $("#msg1 span").html("恭喜您审核成功");
                $("#info").attr("style", "background-color: #F8FDF6");
                if (mb_passed && !me_passed) {
                    //会议已经开始未结束
                    $("#time").html("会议进行中...");
                } else if (!mb_passed && mb_map != null) {
                    //会议未开始 有会议时间
                    $("#msg2").html("本次会议尚未开始,会议开始时间为");
                    $("#time").html(mb_map["time"]);
                    $("#date").html(mb_map["md"]);
                } else {
                    $("#msg2").html("本次会议尚未开始,请耐心等待");
                }
            } else {
                //已经报过名
                $("#top").attr("style", "background-image:url('/img/redbackground.jpg')");
                $("#circle img").attr("src", "/img/redcircle.png");
                $("#msg1 span").html("抱歉,不能重复报名");
                $("#info").attr("style", "background-color: #FFF4F1");
                if (mb_passed && !me_passed) {
                    //会议已经开始未结束
                    $("#date").html("会议进行中...");
                } else if (!mb_passed && mb_map != null) {
                    //会议未开始 有会议时间
                    $("#msg2").html("本次会议尚未开始,会议开始时间为");
                    $("#time").html(mb_map["time"]);
                    $("#date").html(mb_map["md"]);
                } else {
                    $("#msg2").html("本次会议尚未开始,请耐心等待");
                }
            }
        }
    }
})