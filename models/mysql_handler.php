<?php
	require_once("conf.php");
	class nc_mysql_handler{
		public function excute_sql($sql){
			$con = mysql_connect($GLOBALS['host'], $GLOBALS['db_user'], $GLOBALS['db_pwd']);
			if(!$con){
      			$con = mysql_connect($GLOBALS['host'], $GLOBALS['db_user'], $GLOBALS['db_pwd']);
      			if(!$con){
  		    		die('Could not connect: ' . mysql_error());
      			}
			}
			mysql_select_db($GLOBALS['db'], $con);
			mysql_query("set names 'utf8' ");
			mysql_query("set character_set_client=utf8");
			mysql_query("set character_set_results=utf8");
			$result = mysql_query($sql,$con);	
			if(!$result){
				$result = mysql_query($sql, $con);
			}
			mysql_close($con);
			return $result;
		}
	}
?>

