<?php
    require_once("../models/dal_api.php");
    session_start();
    $stu_id = $_POST['stu_id'];
    $dal_api = new nc_dal_adapter();
    $exist  = $dal_api->is_student_exist($stu_id);
    if ($exist){
        $_SESSION['stu_id'] = $stu_id;
        #设置开始时间
        $dal_api->set_chess_start_time($_SESSION['stu_id']);
        print "ok";
     }else{
        print "err";
     }
?>