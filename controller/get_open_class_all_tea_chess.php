<?php
    require_once("../models/dal_api.php");
	  session_start();
	  $queue    = "open_class_chess";
	  #获取棋盘信息
    $dal_api = new nc_dal_adapter();
  	$info = $dal_api->get_open_class_all_tea_chess($queue);
  	print  $info
?>