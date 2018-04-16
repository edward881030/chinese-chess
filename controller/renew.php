<?php
    require_once("../models/dal_api.php");
    session_start();
    $user_id     = $_SESSION['user_id'];
	$course_name  = $_POST['course_name'];
    $fkm         = $_POST['fkm'];
    // 入库
    $dal_api  = new nc_dal_adapter();
    $ret      = $dal_api ->renew_course($user_id, $course_name, $fkm);
    print $ret;
?>