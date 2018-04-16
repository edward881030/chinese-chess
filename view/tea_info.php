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
    <link   href="http://libs.baidu.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">    
    <link   href="css/common/word.css"              rel="stylesheet">
    <link   href="css/tea_info.css"                  rel="stylesheet"> 
    <!-- JS -->
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
    <script src="http://libs.baidu.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
    <script src="js/tea_info.js"></script> 
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
           <li >                          <a  id="sklb" href="javascript:;"><span class="span_sty">上课学生列表</span></a></li>
        </ul>
    </div>
    <div style="float:left;margin-top:40px; margin-left:20px;height: 520px; width:1040px; border-left:solid 1px; padding-left:50px;">
        <div id="sklb_li" style="position:absolute;margin-left:10px;">

        </div>
        <div id="zcxs_li" style="position:absolute; display:none">
        </div>
        <div id="jfpk_li" style="position:absolute; display:none;">
        </div>
    </div>
    </div>
</div>
<script language="javascript">
$=jQuery;
$("#sklb").click(function(){
    // css change
    $("#sklb").css({"background-color":"rgb(82,170,231)"});
    $("#zcxs").css({"background-color":"#ffffff"});
    $("#jfpk").css({"background-color":"#ffffff"});
    $("#qjgl").css({"background-color":"#ffffff"});
    // content change
    $("#sklb_li").css({"display":"inline"});
    $("#zcxs_li").css({"display":"none"});
    $("#jfpk_li").css({"display":"none"});
    $("#qjgl_li").css({"display":"none"});
    make_sklb_html();
});


</script>
</body>
</html> 