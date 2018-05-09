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

    function _caculateDate(date){
        var map={};
        var datestr=date.replace(/-/g, "/");
        var datetime=new Date(datestr);
        var month=datetime.getMonth()+1;
        var date=datetime.getDate();
        var nowtime=new Date();
        var datetimestamp=datetime.getTime();
        var nowtimestamp=nowtime.getTime();
        var ispassed=false;
        if (datetimestamp>=nowtimestamp){
            ispassed=true;
        }else{
            ispassed=false;
        }
        map["month"]=month;
        map["date"]=date;
        map["ispassed"]=ispassed;
        return map;
    }
    var data = json;
    var datetimestr = data.meeting["enroll_begin"].replace(/-/g, "/");
    var datetime = new Date(datetimestr);
    var time = datetimestr.substring(11, 16);
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    $("#time").html(time);
    $("#date").html(month + "月" + date + "日");
})