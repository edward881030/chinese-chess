<?php
    session_start();
    if(isset($_SESSION['user_id']) && isset($_SESSION['user_type'])){
    $user_id     = $_SESSION['user_id'];
    $user_type   = $_SESSION['user_type'];
    // 入库
    $name = "";
    if(strlen($_SESSION["user_id"]) >= 6){
        $name=substr($user_id, 0, 6)."...";
    }else{
        $name=$user_id;
    }
    echo $name."#".$user_type;
	}else{
		echo "";
	}
?>