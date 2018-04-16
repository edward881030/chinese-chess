	<?php
	require_once("../models/dal_api.php");
	session_start();
	$jbfl       = $_POST["jbfl"];
	$xllx       = $_POST["xllx"];
	$qpmc       = $_POST['qpmc'];
	#设置信息
	$dal_api = new nc_dal_adapter();
	$ret = $dal_api->delete_record($jbfl, $xllx, $qpmc);
	if($ret){
		print "ok";
	}else{
		print "err";
	}
?>