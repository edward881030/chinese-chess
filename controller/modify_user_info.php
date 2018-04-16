<?php
    require_once("../models/dal_api.php");
	$user_id  = $_POST['nick_name'];
    $username = $_POST['real_name'];
    $passwd   = $_POST['pwd'];
    $type     = "s";
    $tel      = $_POST['tel'];
    $qq       = $_POST['qq'];
    // 入库
    $dal_api  = new nc_dal_adapter();
    $modify_ret = $dal_api -> modify_user($user_id, $username, $passwd, $tel, $qq, $type);
    if($modify_ret == False){
        echo '<html>'; 
        echo '<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>'; 
        echo "<script type='text/javascript'>alert('注册失败，系统错误，请联系客服!');</script>";
        echo "<script type='text/javascript'>window.location.href='/view/stu_info.html'</script>";
        echo "<script type='text/javascript'></script>";
        echo '</html>'; 
    }else{
        echo '<html>'; 
        echo '<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>'; 
        echo "<script type='text/javascript'>alert('修改成功');</script>";
        echo "<script type='text/javascript'>window.location.href='/view/stu_info.html'</script>";
        echo "<script type='text/javascript'></script>";
        echo '</html>'; 
    }

?>