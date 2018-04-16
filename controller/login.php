<?php
    require_once("../models/dal_api.php");
    session_start();
    $user_id = $_POST['user_id'];
    $passwd  = $_POST['passwd'];
    #登陆
    $dal_api  = new nc_dal_adapter();
    $login_ok = $dal_api->login($user_id, $passwd); 
    if($login_ok == true){ 
        $_SESSION['user_type'] = $dal_api->get_user_type($user_id); 
        $_SESSION['user_name'] = $dal_api->get_user_name($user_id);
        $_SESSION['user_id'] = $user_id;
        if($_SESSION['user_type'] == "s"){  
            $_SESSION["stu_id"] = $_SESSION["user_id"];
        }
        echo '<html>'; 
        echo '<head><meta http-equiv="Content-Type" content="text/html; charset=gb2312" /></head>'; 
        echo "<script type='text/javascript'>alert('登陆成功');</script>";
        echo "<script type='text/javascript'>window.location.href='/index.html'</script>";
        echo '</html>'; 
    } else {
    	echo '<html>'; 
        echo '<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>'; 
        echo "<script type='text/javascript'>alert('登陆失败!');</script>";
        echo "<script type='text/javascript'>window.location.href='/index.html'</script>";
        echo '</html>'; 
    }
?>

