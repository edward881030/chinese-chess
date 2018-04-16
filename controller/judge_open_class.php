<?php
    require_once("../models/dal_api.php");
	session_start();
    if(!isset($_SESSION['user_id'])){
	    echo '<html>'; 
	    echo '<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>'; 
	    echo "<script type='text/javascript'>alert('请先登录!');</script>";
	    echo "<script type='text/javascript'>window.location.href='index.php'</script>";
	    echo '</html>'; 
    }else{
        #设置开始时间
        $dal_api  = new nc_dal_adapter();
        if($_SESSION['user_type'] == "s"){
            $dal_api->set_open_class_stu_num($_SESSION["user_id"]);
            header("Location:/view/open_class_stu.html");
        }else{
            $dal_api->set_chess_start_time("open_class_chess");
            $dal_api->set_open_class_tea_num($_SESSION["user_name"]);
            header("Location:/view/open_class_tea.html");
        }
    }
?>