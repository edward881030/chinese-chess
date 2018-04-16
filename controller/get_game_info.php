<?php
    require_once("../models/dal_api.php");
	  session_start();
	  $stu_id    = $_SESSION["stu_id"];
    $user_id   = $_SESSION["user_id"];
    $update_id = $_POST["step_seq"];
    $type      = $_SESSION["user_type"];
	  #获取棋盘信息
    $dal_api = new nc_dal_adapter();
  	$info = $dal_api->get_chess_info($user_id, $stu_id, $update_id, $type);
  	$start_time = $dal_api->get_chess_start_time($stu_id);
  	$now = date('H:i:s');
  	$time_diff = (int)((strtotime($now) - strtotime($start_time))/60);
  	print  $start_time . "#" . $time_diff . "#" .$info
?>