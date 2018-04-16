	<?php
	require_once("../models/dal_api.php");
	session_start();
	$jbfl       = $_POST["jbfl"];
	$xllx       = $_POST["xllx"];
	$qpmc       = $_POST['qpmc'];
	$record_str = $_POST["record_str"];
	#设置信息
	$dal_api = new nc_dal_adapter();
	$ret = $dal_api->store_record($jbfl, $xllx, $qpmc, $record_str);
	if($ret){
		print "ok";
	}else{
		print "err";
	}
?>