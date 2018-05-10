function showLinkPhone(){
  $("#side-bar-div").css("display","block");
  $("#side-bar-triangle").css("display","block");
}
function hideLinkPhone(){
  $("#side-bar-div").css("display","none");
  $("#side-bar-triangle").css("display","none");
}
//案例切换
function caseChange(type){
  if(type==1){
    // <img id="index-case-img1" src="./img/index/case1.jpg"/>
    $("#index-case-img1")[0].src="./img/index/case1.jpg";
    $("#index-case-img2")[0].src="./img/index/case2.jpg";
    $("#index-case-img3")[0].src="./img/index/case3.jpg";

  } else if(type==2){
    $("#index-case-img1")[0].src="./img/index/case2.jpg";
    $("#index-case-img2")[0].src="./img/index/case3.jpg";
    $("#index-case-img3")[0].src="./img/index/case1.jpg";
  } else if(type==3){
    $("#index-case-img1")[0].src="./img/index/case3.jpg";
    $("#index-case-img2")[0].src="./img/index/case2.jpg";
    $("#index-case-img3")[0].src="./img/index/case1.jpg";
  }
};
//品牌图的切换
function brandChange(type){
  if(type==1){
    $("#index-brand-img-pc")[0].src="./img/index/logo-wall1.jpg";
  } else if(type==2){
    $("#index-brand-img-pc")[0].src="./img/index/logo-wall2.png";
  } else if(type==3){
    $("#index-brand-img-pc")[0].src="./img/index/logo-wall3.png";
  } else if(type==4){
    $("#index-brand-img-pc")[0].src="./img/index/logo-wall4.png";
  } else if(type==5){
    $("#index-brand-img-pc")[0].src="./img/index/logo-wall5.png";
  } else if(type==6){
    $("#index-brand-img-pc")[0].src="./img/index/logo-wall6.png";
  }
}
function changeBrand(){
  var type= $(".index-brand-select").val();
  if(type==1){
    $("#index-brand-img-sj")[0].src="./img/index/logo-wall-sj1.jpg";
  } else if(type==2){
    $("#index-brand-img-sj")[0].src="./img/index/logo-wall-sj2.png";
  } else if(type==3){
    $("#index-brand-img-sj")[0].src="./img/index/logo-wall-sj3.png";
  } else if(type==4){
    $("#index-brand-img-sj")[0].src="./img/index/logo-wall-sj4.png";
  } else if(type==5){
    $("#index-brand-img-sj")[0].src="./img/index/logo-wall-sj5.png";
  } else if(type==6){
    $("#index-brand-img-sj")[0].src="./img/index/logo-wall-sj6.png";
  }
}
//贯信文化 和 精神切换
function changeCultureMind(type){
  if(type==1){
    $(".aboutus-second-level").css("display","block");
    $(".aboutus-second-mind").css("display","none");
  } else if(type=2){
    $(".aboutus-second-level").css("display","none");
    $(".aboutus-second-mind").css("display","block");
  }
}
//申请合作
function applyCooperation1(type){
  $("#cooperate-application-wrap").toggle();
}
function hideApplication(){
  $("#cooperate-application-wrap").toggle();
}
function submitApplication(){

  var form = $("#cooperate-application-form").serialize();
  console.log(form);
  $.ajax({
   type: "POST",
   url: "http://192.168.100.18:8800/servlets/binserv/D/OfficialWebsiteServlet",
   data: form,
   success: function(msg){
     alert("申请成功"+msg);
   },
   error: function(error){
     alert("申请失败,请联系客服");
   }
 });
}
// 订阅邮件
function subscribe(){
  var mailAddress=$("#index-mail-address").val();
  if(mailAddress==""){
    alert("请填写邮箱");
    return;
  }
  $.ajax({
   type: "POST",
   url: "http://192.168.100.18:8800/servlets/binserv/D/OfficialWebsiteServlet",
   data:"mailAddress="+mailAddress,
   success: function(msg){
     alert("订阅成功");
   },
   error: function(error){
     alert("订阅失败,请联系客服");
   }
 });
}
// $("select.index-brand-select").change(function(){
//
// });

function changeRecruit(type){
  $(".job").css("display","none");
  $("#joinus-"+type).css("display","block");
}
function selectRecruit(){
  var type= $(".joinus-first-select").val();
  changeRecruit(type);
}
