<?php
    require_once("../models/dal_api.php");
	$user_id  = $_POST['nick_name'];
    // 入库
    $dal_api  = new nc_dal_adapter();
    $ret      = $dal_api ->get_user_name($user_id);
    if($ret != "err"){
        print "True";
    }else{
        print "False";
    }

?>