	<?php
	require_once("../models/dal_api.php");
	session_start();
	$info  = $_POST["info"];
	$type  = $_SESSION["user_type"];
	$update_id = $_POST['step_seq'];
	$stu_id    = "open_class_chess";
    $user_id   = $_SESSION["user_id"];
	#设置信息
	$dal_api = new nc_dal_adapter();
	$ret = $dal_api->set_chess_info($user_id, $stu_id, $type, $update_id, $info);
	print $ret;
?>