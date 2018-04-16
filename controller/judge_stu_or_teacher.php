<?php
    require_once("../models/dal_api.php");
	session_start();
    if(!isset($_SESSION['user_id'])){
	    echo '<html>'; 
	    echo '<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>'; 
	    echo "<script type='text/javascript'>alert('请先登录!');</script>";
	    echo "<script type='text/javascript'>window.location.href='/index.html'</script>";
	    echo '</html>'; 
    }else{
    	if($_SESSION['user_type'] == "s"){	
    		#设置开始时间
    		$dal_api  = new nc_dal_adapter();
    		$dal_api->set_chess_start_time($_SESSION["user_id"]);
    		header("Location:/view/classroom.html");
    	}else if($_SESSION['user_type'] == "t"){
			header("Location:/view/tea_info.php");
		}else{
            header("Location:/view/admin_info.php");
        }
    	
    }
?>