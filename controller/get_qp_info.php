<?php
    require_once("../models/dal_api.php");
    session_start();
    // 入库
    $dal_api  = new nc_dal_adapter();
    $ret      = $dal_api ->	get_qp_info();
    if($ret != "err"){
    	print $ret;
    }

?>