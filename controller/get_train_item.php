<?php
    require_once("../models/dal_api.php");
    session_start();
    $level = $_POST["level"];
    $train = $_POST["train"];
    // 入库
    $dal_api  = new nc_dal_adapter();
    $ret      = $dal_api ->	get_train_item($level, $train);
    if($ret != "err"){
    	print $ret;
    }

?>