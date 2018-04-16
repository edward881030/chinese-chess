<?php
    require_once("../models/dal_api.php");
    session_start();
    $user_id     = $_SESSION['user_id'];
    $stu_id      = $_SESSION['stu_id'];
    // 入库
    $dal_api  = new nc_dal_adapter();
    $ret      = $dal_api ->lock($user_id, $stu_id);
    print $ret;
?>