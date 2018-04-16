<?php
    require_once("../models/dal_api.php");
    session_start();
    $user_id     = $_SESSION['user_id'];
    $stu_id      = $_SESSION['stu_id'];
    $type        = $_SESSION['user_type'];
    // 入库
    $dal_api  = new nc_dal_adapter();
    $ret      = $dal_api ->set_exit_open_class($user_id, $type);
    if($ret != "err"){
    	print $ret;
    }

?>