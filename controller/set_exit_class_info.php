<?php
    require_once("../models/dal_api.php");
    session_start();
    $user_id     = $_SESSION['user_id'];
    $stu_id      = $_SESSION['stu_id'];
    // 入库
    $dal_api  = new nc_dal_adapter();
    $ret      = $dal_api ->set_exit_classroom_info($user_id, $stu_id);
    if($ret != "err"){
    	print $ret;
    }

?>