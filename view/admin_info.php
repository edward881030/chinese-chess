<!DOCTYPE html>
<html lang="en" xmlns:wb="http://open.weibo.com/wb">
  <head>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>楚河在线棋院</title>
    <meta name="description" content="象棋在线教学，中国象棋" />
    <meta name="mr_edward@163.com" content="象棋教学">
    <!-- CSS--> 
    <link href="css/admin.css"          rel="stylesheet"> 
    <link href="css/common/bootstrap.min.css" rel="stylesheet">
    <link href="css/common/word.css"           rel="stylesheet">
    <link href="css/common/table.css"          rel="stylesheet"> 
    <!-- JS -->
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>  
    <script src="js/admin_info.js"></script> 

<!-- 代码部分begin -->
</head>
<body>
<div style="width:100%; height:94px; border-bottom:1px solid red;">
    <div id = "title" style="float:left; margin-top:20px; border:solid 0px;"> 
    <p  style="margin-left:80px; font-family:KaiTi; font-size:30px; font-weight:bold;">楚河<span style="font-size:21px;">在线棋院</span></p>
    </div>
    <?php 
        session_start();
        if(isset($_SESSION["user_id"])){
          $name = $_SESSION["user_id"];
              if(strlen($_SESSION["user_id"]) >= 6){
                  $name=substr($name, 0, 6)."...";
          } 
            echo '<div style="margin-right:30px; float:right; border:0px solid;"><p class="p_sty" style="padding-top:35px; padding-bottom: 35px;">您好,&nbsp'.$name.' |<a href="/index.html"><span style="color:black;">返回主页</span></a></p></div>';
        }
    ?>
</div>
<div style="clear:both;"></div>
<div style="border:solid 0px; height:530px; width:100%">
    <div style="border:solid 0px; width:1300px; margin:auto;"> 
    <div id= "xuanxiang" style = "float:left; height:320px; width:150px; margin-top:40px; border-right:solid 0px;">
        <ul class="nav nav-pills nav-stacked">
           <li >                          <a  id="pqls" href="javascript:;"><span class="span_sty">已聘请教师</span></a></li>
           <li  style="margin-top:35px; "><a id="zcxs"  href="javascript:;"><span class="span_sty">已注册学生</span></a></li>
           <li  style="margin-top:35px; "><a id="jfpk"  href="javascript:;"><span class="span_sty">缴费学生管理</span></a></li>
           <li  style="margin-top:35px; "><a id="bxqp"  href="javascript:;"><span class="span_sty">编写棋谱</span></a></li>
           <li  style="margin-top:35px; "><a id="gkkpq"  href="javascript:;"><span class="span_sty">公开课排期</span></a></li>
        </ul>
    </div>
    <div style="float:left;margin-top:40px; margin-left:20px;height: 520px; width:1040px; border-left:solid 1px; padding-left:50px;">
        <div id="pqls_li" style="position:absolute;">
        </div>
        <div id="zcxs_li" style="position:absolute; display:none">
        </div>
        <div id="jfpk_li" style="position:absolute; display:none;">
        </div>
        <div id="bxqp_li" style="position:absolute; display:none;width:1040px;">
            <div class="row" >
                <div class="col-md-2" style="text-align:left;">
                    <a href="admin_rec_che.html"><img src="images/icon/tj.svg" style="vertical-align:bottom; height:25px; width:25px;"/><span class="span_sty" style="color:black;">添加</span></a>
                </div>
            </div>
            <div class="row" style="margin-top:50px;" >
                <div class="col-md-8" style="text-align:left;">
                        <select id="jbfl" style="font: normal normal normal 18px/23px 'SimSun', SimSun;">
                            <option value ="零基础">零基础</option>
                            <option value ="入门">入门</option>
                            <option value ="提高">提高</option>
                            <option value ="进阶">进阶</option>
                            <option value ="职业化">职业化</option>
                        </select>
                        <select id="xllx" style="font: normal normal normal 18px/23px 'SimSun', SimSun;">
                            <option value ="经典残局">经典残局</option>
                            <option value ="一步杀">一步杀</option>
                            <option value ="二步杀">二步杀</option>
                            <option value ="三步杀">三步杀</option>
                            <option value ="象棋定式">象棋定式</option>
                        </select>
                        <span class="span_sty">棋谱名称:</span><input id="qpmc" type="text" ></input>
                        <img src="images/icon/sc.svg"  style="vertical-align:bottom; height:25px; width:25px;"/><span class="span_sty" id="delqp" style="color:black;">删除</span>
                </div>
            </div>
        </div>
        <div id="gkkpq_li" style="position:absolute; display:none;">
        </div>
        </div>
    </div>
    </div>
</div>
<script language="javascript">
$=jQuery;
$("#pqls").click(function(){
    // css change
    $("#pqls").css({"background-color":"rgb(82,170,231)"});
    $("#zcxs").css({"background-color":"#ffffff"});
    $("#jfpk").css({"background-color":"#ffffff"});
    $("#bxqp").css({"background-color":"#ffffff"});
    // content change
    $("#pqls_li").css({"display":"inline"});
    $("#zcxs_li").css({"display":"none"});
    $("#jfpk_li").css({"display":"none"});
    $("#bxqp_li").css({"display":"none"});
    make_pqls_html();
});

$("#zcxs").click(function(){
    // css change
    $("#pqls").css({"background-color":"#ffffff"});
    $("#zcxs").css({"background-color":"rgb(82,170,231)"});
    $("#jfpk").css({"background-color":"#ffffff"});
    $("#bxqp").css({"background-color":"#ffffff"});
    // content change
    $("#pqls_li").css({"display":"none"});
    $("#zcxs_li").css({"display":"inline"});
    $("#jfpk_li").css({"display":"none"});
    $("#bxqp_li").css({"display":"none"});
    make_zcxs_html();
});

$("#jfpk").click(function(){
    // css change
    $("#pqls").css({"background-color":"#ffffff"});
    $("#zcxs").css({"background-color":"#ffffff"});
    $("#jfpk").css({"background-color":"rgb(82,170,231)"});
    $("#bxqp").css({"background-color":"#ffffff"});
    // content change
    $("#pqls_li").css({"display":"none"});
    $("#zcxs_li").css({"display":"none"});
    $("#jfpk_li").css({"display":"inline"});
    $("#bxqp_li").css({"display":"none"});
    // get content through ajax
    make_jfpk_html();
});

$("#bxqp").click(function(){
    // css change
    $("#pqls").css({"background-color":"#ffffff"});
    $("#zcxs").css({"background-color":"#ffffff"});
    $("#jfpk").css({"background-color":"#ffffff"});
    $("#bxqp").css({"background-color":"rgb(82,170,231)"});
    // content change
    $("#pqls_li").css({"display":"none"});
    $("#zcxs_li").css({"display":"none"});
    $("#jfpk_li").css({"display":"none"});
    $("#bxqp_li").css({"display":"inline"});
    // get content through ajax
});

$("#delqp").click(function(){
  var jbfl = $("#jbfl  option:selected").text();
  var xllx = $("#xllx").val();
  var qpmc = $("#qpmc").val();
  if(qpmc == ""){
    alert("棋谱名称不能为空！");
    return;
  }
  $.post("/controller/delete_record.php", {jbfl : jbfl, xllx : xllx, qpmc : qpmc}, function(ret){
    var ret_str  = ret.replace(/\s/g,'');
    alert(ret_str);
    if(ret_str == "ok"){
        alert("删除成功！");
    }else{
        alert("删除失败！");
    }
  });
})
</script>
</body>
</html> 