<?php
    require_once("../models/dal_api.php");
    session_start();
    $user_id     = $_SESSION['user_id'];
	$course_opt  = $_POST['course_opt'];
    $time_opt    = $_POST['time_opt'];
    $fkm         = $_POST['fkm'];
    // 入库
    $dal_api  = new nc_dal_adapter();
    $ret      = $dal_api ->pay_course($user_id, $course_opt, $time_opt, $fkm);
    print $ret;
?>