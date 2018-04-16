$ = jQuery ;

function make_index_dynamic_part(){
  $.post("/controller/get_user_info_from_session.php", {},  make_index_banner);
}

function make_person_center_dynamic_part(){
  $.post("/controller/get_user_info_from_session.php", {},  make_person_center_banner);
}

function check_if_login(){
  $.post("/controller/get_user_info_from_session.php", {},  user_use_for_test);
}

function make_person_center_dynamic_part(){
  $.post("/controller/get_user_info_from_session.php", {},  make_person_center_banner);
}

function make_index_banner(ret_str){
  var items  = ret_str.replace(/\s/g,'').split("#");
  var content;
  if(items.length != 2){
    // 用户没有登录
      content= '<div style="margin-top:34px; margin-left:130px; float:right; ">' +
              '<p style="font: normal normal normal 18px/23px, "SimSun", SimSun;padding-top: 35px; padding-bottom: 35px; " >' +
              '<a class="theme-login" href="javascript:;" ><img src="/view/images/icon/dl.png" style="height:20px; vertical-align:middle; width:20px;"/><span style="margin-left:5px; vertical-align:middle;color:black;">登 陆</span></a> |  ' +
              '<a class="theme-login" id = "theme-login_1" ref="javascript:;" ><img src="/view/images/icon/zc.png" style="vertical-align:middle;height:20px; width:20px;" /><span style="margin-left:5px; vertical-align:middle;color:black;">注 册</span></a></p>' +
              '</div>' +
              '<div class="theme-popover">' +
              '  <div class="theme-poptit">' +
              '   <a href="javascript:;" title="关闭" class="close">×</a>' +
              '    <p  style="font-family:SimSun; font-size:30px; font-weight:bold;">楚河<span style="font-size:23px;">在线棋院</span></p>' +
              '  </div>' +
              '  <div class="theme-popbod dform" style="position:absolute;margin-top:20px;" >' +
              '    <form class="theme-signin t1" style="margin-left:90px; margin-top:-30px;" name="loginform" action="/controller/login.php" method="post">' +
              '          <ol>' +
              '            <li>账&nbsp;&nbsp;号: <input class="ipt"                id="user_id" name = "user_id"                                 type="text"      size="40"     /></li>' +
              '            <li>密&nbsp;&nbsp;码: <input class="ipt"                id="passwd"  name = "passwd"  style="margin-top:10px;"        type="password"  size="40"     /></li>' +
              '            <li><input class="btn btn-primary"    style="margin-top:10px; margin-left:100px;"   type="submit"   value="登 录" /></li>' +
              '         </ol>' +
              '    </form>' +
              '  </div>' +
              '  <div class="theme-popbod dform" style="position:absolute;height:350px;"  >' +
              '     <form class="theme-signin t2"  style="margin-left:10px; margin-top:-50px;" name="loginform" onsubmit="return reg_param_check()" action="/controller/register.php" method="post">' +
              '              <ol>' +  
              '              <li>账&nbsp;&nbsp;号: <input class="ipt"  onblur="check_nick_name()"  id="nick_name"  name="nick_name"  type="text"      size="40"     /><span id="check_nick_name" style="color:red;">&nbsp;&nbsp;*(用于登陆)</span></li>' +
              '              <li>密&nbsp;&nbsp;码: <input class="ipt"  onblur="check_same_pwd_1()" id="pwd"  name = "pwd"  style="margin-top:10px;"        type="password"  size="40"     /><span id="first_pwd" style="color:red;">&nbsp;&nbsp;*</span></li>' +
              '              <li>再次输入: <input class="ipt"                id="ch_pwd"             name = "ch_pwd"   onblur="check_same_pwd_2()" style="margin-top:10px;"        type="password"  size="40"     /><span id="second_pwd" style="color:red;">&nbsp;&nbsp;*</span></li>' +
              '             <li>验&nbsp;&nbsp;证: <input class="ipt"   onblur="check_code_1()" id="check_code"  name = "check_code"      type="text"      size="40"     /><span id="check_code_txt" onclick="get_code()" style="color:green;">&nbsp;&nbsp;点击获取</span></li>' +
              '              <li>                  <input class="btn btn-primary"    style="margin-top:10px; margin-left:150px;"   type="submit"   value=" 注 册" /></li>' +
              '           </ol>' +
              '      </form> ' +
              ' </div> ' +
              ' </div> ' +
              '<div class="theme-popover-mask"></div>';
  }else{
    if(items[1] == "s"){
      //学生登录
      content = '<div style="margin-top:34px; margin-left:30px; float:right;"><p style="font: normal normal normal 18px/23px "SimSun", SimSun;padding-top: 35px; padding-bottom: 35px;">您好,&nbsp'+ items[0] +' | <a href="/view/stu_info.html" style=" "><span style="color:black">个人中心</span></a>| <a href="/view/stu_train.html"><span style="color:red">象棋训练</span></a>|<a href="/controller/session_destory.php"><span style="color:black;">注销</span></a></p></div>';
    }else if(items[1] == "t"){
      content = '<div style="margin-top:34px; margin-left:30px; float:right;"><p style="font: normal normal normal 18px/23px "SimSun", SimSun;padding-top: 35px; padding-bottom: 35px;">您好,&nbsp'+ items[0] +' | <a href="/controller/judge_stu_or_teacher.php"><span style="color:red">选择学生</span></a>|<a href="/controller/session_destory.php"><span style="color:black;">注销</span></a></p></div>'; 
    }else if(items[1] == "a"){
      content = '<div style="margin-top:34px; margin-left:30px; float:right;"><p style="font: normal normal normal 18px/23px "SimSun", SimSun;padding-top: 35px; padding-bottom: 35px;">您好,&nbsp'+ items[0] +' | <a href="/controller/judge_stu_or_teacher.php"><span style="color:red">棋院管理</span></a>|<a href="/controller/session_destory.php"><span style="color:black;">注销</span></a></p></div>'; 
    }else if(items[1] == "o"){
      content = '<div style="margin-top:34px; margin-left:30px; float:right;"><p style="font: normal normal normal 18px/23px "SimSun", SimSun;padding-top: 35px; padding-bottom: 35px;">您好,&nbsp'+ items[0] +' | <a href="/controller/judge_open_class.php"><span style="color:red">公开课</span></a>|<a href="/controller/session_destory.php"><span style="color:black;">注销</span></a></p></div>'; 
    }else{
      // 错误
    }
  }
  // 添加到html
  $('#nav_items').after(content);

$('.theme-login').click(function(){
    $('.theme-popover-mask').fadeIn(100);
    $('.theme-popover').slideDown(200);
    $('.t2').hide();
    $('.t1').fadeIn(100);
})
$('#theme-login_1').click(function(){
    $('.theme-popover-mask').fadeIn(100);
    $('.theme-popover').slideDown(200);
    $('.t1').hide();
    $('.t2').fadeIn(100);
})
$('.theme-poptit .close').click(function(){
    $('.theme-popover-mask').fadeOut(100);
    $('.theme-popover').slideUp(200);
});
}

function make_person_center_banner(ret_str){
  var items  = ret_str.replace(/\s/g,'').split("#");
  var content;
  if(items.length != 2){
    // 用户没有登录
  }else{
    content='<div style="margin-right:30px; float:right; border:0px solid;"><p class="p_sty" style="padding-top:35px; padding-bottom: 35px;">您好,&nbsp'+ items[0] +' | <a href="/index.html"><span style="color:black;">返回主页</span></a></p></div>';
  }
  // 添加到html
  $('#title').after(content);
}

function user_use_for_test(ret_str){
var items  = ret_str.replace(/\s/g,'').split("#");
  var content;
  if(items.length != 2){
    // 用户没有登录
      alert("请 先 登 录");
  }else{
    window.location.href="controller/judge_stu_or_teacher.php"; 
  }
}
