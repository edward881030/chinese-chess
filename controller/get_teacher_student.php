<?php
    require_once("../models/dal_api.php");
    session_start();
    $user_id     = $_SESSION['user_id'];
    // 入库
    $dal_api  = new nc_dal_adapter();
    $ret      = $dal_api ->get_teacher_student_info($user_id);
    if($ret != "err"){
    	print $ret;
    }

?>