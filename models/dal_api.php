<?php
	require_once("mysql_handler.php");
	class nc_dal_adapter{
		private $mysql_handler;

		public function __construct(){
			$this->mysql_handler = new nc_mysql_handler();
		}

		/**
		 * 获取用户信息
		 */
		public function login($user_id, $user_pwd){
			   $sql = "select user_id from user_info where user_id='".$user_id."' and pwd='".$user_pwd."'";
			   $result = $this->mysql_handler->excute_sql($sql);

			   if(mysql_num_rows($result) == 1){
			    	return True;
			    }
			   return False;
		}

		/**
		 * 获取用户类型
		 */
		public function get_user_type($user_id){
			   $sql = "select type from user_info where user_id='".$user_id."'";
			   $result = $this->mysql_handler->excute_sql($sql);
			   if(mysql_num_rows($result) > 0){
				   if($row = mysql_fetch_array($result)){
				   		return $row["type"];
				   }
				}
				return "err";
		}
		/**
		 * 获取用户信息
		 */
		public function get_user_info($user_id){
			   $sql = "select user_id, name, pwd, phone, qq, type from user_info where user_id='".$user_id."'";
			   $result = $this->mysql_handler->excute_sql($sql);
			   if(mysql_num_rows($result) == 1){
			   		if($row = mysql_fetch_array($result)){
			   			return $row["user_id"]."#".$row["name"]."#".$row["pwd"]."#".$row["phone"]."#".$row["qq"]."#".$row["type"];
			   		}
			   }
			   return "err";
		}
		/**
		 * 获取用户信息
		 */
		public function get_all_stu(){
			   $sql = "select user_id, name from user_info where type = 's'";
			   $result = $this->mysql_handler->excute_sql($sql);
			   if(mysql_num_rows($result) > 0){
			   		$ret_str = "";
			   		while($row = mysql_fetch_array($result)){
			   			$ret_str .= $row["user_id"]."#".$row["name"]."##";
			   		}
			   		return $ret_str;
			   }
			   return "err";
		}
		/**
		 * 获取用户名
		 */
		public function get_user_name($user_id){
			   $sql = "select name from user_info where user_id='".$user_id."'";
			   $result = $this->mysql_handler->excute_sql($sql);
			   if($row = mysql_fetch_array($result)){
			   		return $row["name"];
			   }
			   return "err";
		}

		/**
		 * 获取老师信息
		 */
		public function get_teacher_info(){
			   $sql = "select user_id, name, phone, qq from user_info where type='t';";
			   $ret_arr = array();
			   $result  = $this->mysql_handler->excute_sql($sql);
			   while($row  = mysql_fetch_array($result)){
			   		$item = $row["user_id"]."#".$row["name"]."#".$row["phone"]."#".$row["qq"];
			   		$ret_arr[] = $item;
			   }
			   return json_encode($ret_arr);
		}


		/**
		 * 获取老师信息
		 */
		public function get_teacher_student_info($user_id){

			   $sql = "select t1.user_id, t2. name, t1.course_name, t2.qq, t2.phone, t1.class_num, t1.has_attend, t1.class_time from ( select t1.user_id, t1.course_name, t1.has_attend, t1.class_time, t1.tea_name, t2.class_num from ( select user_id, course_name, has_attend, class_time, tea_name from user_pay ) t1 join ( select name, class_num from course_info ) t2 on (t1.course_name = t2. name)) t1 join ( select user_id, name, phone, qq from user_info ) t2 on (t1.user_id = t2.user_id) where tea_name = '". $user_id."'; ";
			   $ret_arr = array();

			   $result  = $this->mysql_handler->excute_sql($sql);
			   while($row  = mysql_fetch_array($result)){
			   		$item = $row["user_id"]."#".$row["name"]."#".$row["course_name"]."#".$row["qq"]
			   			   ."#".$row["phone"]."#".$row["class_num"]."#".$row["has_attend"]."#".$row["class_time"];
			   		$ret_arr[] = $item;
			   }
			   return json_encode($ret_arr);
		}


		/**
		 * 获取老师信息
		 */
		public function update_teacher($teacher_id, $stu_id, $course_name){
			    $sql = "update user_pay set tea_name = '".$teacher_id. "'  where user_id = '" .$stu_id. "' and  course_name = '".$course_name."';" ;
			    $result  = $this->mysql_handler->excute_sql($sql);
			    if($result){
			   		return "ok";
			    }else{
			    	return "err";
			    }
		}

		/**
		 * 获取老师信息
		 */
		public function update_has_attend($has_attend_num, $stu_id, $course_name){
			    $sql = "update user_pay set has_attend = '".intval($has_attend_num). "'  where user_id = '" .$stu_id. "' and  course_name = '".$course_name."';" ;
			    $result  = $this->mysql_handler->excute_sql($sql);
			    if($result){
			   		return "ok";
			    }else{
			    	return "err";
			    }
		}

		/**
		 * 获取学生信息
		 */
		public function get_student_info(){
			   $sql = "select user_id, name, phone, qq from user_info where type='s';";
			   $ret_arr = array();
			   $result  = $this->mysql_handler->excute_sql($sql);
			   while($row  = mysql_fetch_array($result)){
			   		$item = $row["user_id"]."#".$row["name"]."#".$row["phone"]."#".$row["qq"];
			   		$ret_arr[] = $item;
			   }
			   return json_encode($ret_arr);
		}

		/**
		 * 已付款学生信息
		 */
		public function get_student_pay_info(){
			   $sql = "select t1.user_id, t1. name, t2.course_name, t2.has_pay, t2.has_attend, t2.class_time, t2.tea_name, t2.class_num, t2.fee_per_class from ( select user_id, name, phone, qq from user_info where type = 's' ) t1 join ( SELECT t1.user_id, t1.course_name, t1.has_pay, t1.has_attend, t1.class_time, t1.tea_name, t2.class_num, t2.fee_per_class FROM ( select user_id, course_name, has_pay, has_attend, class_time, tea_name from user_pay ) t1 JOIN ( SELECT name, class_num, fee_per_class FROM course_info ) t2 on (t1.course_name = t2. name)) t2 on (t1.user_id = t2.user_id) where has_pay != 0 order by user_id desc";
			   $ret_arr = array();
			   $result  = $this->mysql_handler->excute_sql($sql);
			   while($row  = mysql_fetch_array($result)){
			   		$all_fee = "";
			   		if(intval($row["class_num"]) != -1){
			   			$all_fee = strval(intval($row["fee_per_class"]) * intval($row["class_num"]));
			   		}else{
			   			$all_fee = "不固定";
			   		}
			   		$refund = strval(intval($row["has_pay"]) - (intval($row["fee_per_class"]) * intval($row["has_attend"])));
			   		$item = $row["user_id"]."#".$row["name"]."#".$row["course_name"]."#".$row["class_num"]
			   				."#".$row["has_attend"]."#".$all_fee."#".$row["has_pay"]
			   				."#".$refund."#".$row["class_time"]."#".$row["tea_name"];
			   		$ret_arr[] = $item;
			   }
			   return json_encode($ret_arr);
		}


		/**
		* 设置棋局开始时间
		*/
		public function set_chess_start_time_in_mysql($user_id){
			$sql = "insert into room (s_id, start_time) values('".$user_id."', '". date('H:i:s')."') on duplicate key update start_time ='".date('H:i:s')."'";
			$result = $this->mysql_handler->excute_sql($sql);
		}

		/**
		* 判断学生是否存在
		*/
		public function is_student_exist($stu_id){
			$sql = "select user_id from user_info where user_id = '".$stu_id."' and type = 's'";
			$result = $this->mysql_handler->excute_sql($sql);
			if(mysql_num_rows($result) == 1){
			    return True;
			}
			return False;
		}

		/**
		* 设置棋局开始时间
		*/
		public function set_chess_start_time($user_id){
			try{
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);
	   			$redis->select(0);
	   			$redis->Set($user_id."_"."start_time", date('H:i:s'));
	   		}catch (Exception $e) {   
				print $e->getMessage();   
			} 
		}

		/**
		* 获取棋局开始时间
		*/
		public function get_chess_start_time($user_id){
			try{
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);
	   			$redis->select(0);
	   			$start_time = $redis->Get($user_id."_"."start_time");
	   			return $start_time;
	   		}catch (Exception $e) {   
				print $e->getMessage();   
			} 
		}

		/**
		* 设置棋局信息
		*/
		public function set_chess_info($user_id, $stu_id, $type, $update_id, $info){
			try{
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);	
	   			$redis->select(0);
	   			#hash描述： key:stu_id_type, field:chess + update_id, field:info
	   			$chose_queue = $type;
	   			$key   = $stu_id."_".$chose_queue;
	   			$field = $update_id;
	   			$info  = $info;
	   			#存储
	   			$ret   = $redis->HSET($key, $field, $info);
	   			return $ret == 1 ? "ok" : "err";
 	   		}catch (Exception $e) {   
				 error_log(date("Y-m-d H:i:s", time()).$e->getMessage()."\n",3, "/var/log/chess.log");
			} 
			return "err";
		}

		/**
		* 获取棋局信息时间
		*/
		public function get_chess_info($user_id, $stu_id, $update_id, $type){
			try{
	  			$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);
	   			$redis->select(0);
	   			#hash描述： key:stu_id, field:chess + update_id, field:info
	   			$chose_queue = ($type == "s" ? "t" : "s");
	   			if($stu_id == "open_class_chess"){
	   				$chose_queue = "o";
	   			}
	   			$key   = $stu_id."_".$chose_queue;
	   			$field = $update_id; 
	   			#获取 			
	   			$chess = $redis->HGET($key, $field);
	   			
	   			return $chess;
 	   		}catch (Exception $e){   
				 error_log(date("Y-m-d H:i:s", time()).$e->getMessage()."\n",3, "/var/log/chess.log");
			} 
		}

		/**
		 * 注册用户
		 */
		public function reg_user($user_id, $username, $pwd, $tel, $qq, $type){
			$sql = "insert into  user_info (user_id, name, pwd, phone, qq, type)values('$user_id', '$username', '$pwd', '$tel', '$qq', '$type')";
			$result = $this->mysql_handler->excute_sql($sql);
			return $result;
		}
		/**
		 * 修改用户
		 */
		public function modify_user($user_id, $username, $pwd, $tel, $qq, $type){
			$sql = "update  user_info set name = '$username', pwd = '$pwd', phone = '$tel', qq = '$qq' where user_id = '$user_id'";
			$result = $this->mysql_handler->excute_sql($sql);
			return $result;
		}
		/**
		 * 用户付费
		 * 0 : 重复选取该课程
		 * 1 : 该付款码不存在
		 * 2 : 该付款码已使用
		 * 3 : 该付款码不是对应课程
		 */
		public function pay_course($user_id, $course_opt, $time_opt, $fkm){
			// 是否重复选取课程
			$sql = "select user_id, course_name from user_pay where user_id = '$user_id'	 and course_name = '$course_opt'";
			$result = $this->mysql_handler->excute_sql($sql);
			if(mysql_num_rows($result) == 1){
			    return "0";
			}
			// 检查付款码
			$sql = "select pay_code, course_name, has_used, money from pay_code where pay_code = '$fkm'";
			$result = $this->mysql_handler->excute_sql($sql);
			// 1、查看该付款码是否存在
			if(mysql_num_rows($result) == 0){
			    return "1";
			}else{
				$row = mysql_fetch_array($result);
				$pay_code    = strval($row['pay_code']);
				$course_name = strval($row['course_name']);
				$has_used    = strval($row['has_used']);
				$money       = strval($row['money']);
				// 2、查看该付款码是否已经使用e
				if($has_used == "1"){
					return "2";
				}
				// 3、查看该付款码是否是对应课程
				if($course_name != $course_opt){
					return "3";
				}
				// 4、修改课程吗状态
				$time_str = date("Ymd");
				$sql = "update pay_code set has_used = 1, who_used = '$user_id', when_used = '$time_str' where pay_code = '$fkm'";
				$result = $this->mysql_handler->excute_sql($sql);
				// 5、修改课程状态,标记已选
				$sql = "insert into  user_pay (user_id, course_name, has_pay, has_attend, class_time, leave_num)values('$user_id', '$course_opt', $money, 0, '$time_opt', 0)";
				$result = $this->mysql_handler->excute_sql($sql);
				return "4";
			}
		}

		/**
		 * 用户付费
		 * 0 : 重复选取该课程
		 * 1 : 该付款码不存在
		 * 2 : 该付款码已使用
		 * 3 : 该付款码不是对应课程
		 */
		public function take_course($user_id, $course_opt, $time_opt){
			// 是否重复选取课程
			$sql = "select user_id, course_name from user_pay where user_id = '$user_id'	 and course_name = '$course_opt'";
			$result = $this->mysql_handler->excute_sql($sql);
			if(mysql_num_rows($result) == 1){
			    return "0";
			}
			// 5、修改课程状态,标记已选
			$sql = "insert into  user_pay (user_id, course_name, has_pay, has_attend, class_time, leave_num)values('$user_id', '$course_opt', 0, 0, '$time_opt', 0)";
			$result = $this->mysql_handler->excute_sql($sql);
			return "4";
		}

		/**
		 * 用户付费
		 * 0 : 已超限额
		 * 1 : 该付款码不存在
		 * 2 : 该付款码已使用
		 * 3 : 该付款码不是对应课程
		 */
		public function renew_course($user_id, $course_opt, $fkm){
			// 是否已超限额
			// to-do
			// 检查付款码
			$sql = "select pay_code, course_name, has_used, money from pay_code where pay_code = '$fkm'";
			$result = $this->mysql_handler->excute_sql($sql);
			// 1、查看该付款码是否存在
			if(mysql_num_rows($result) == 0){
			    return "1";
			}else{
				$row = mysql_fetch_array($result);
				$pay_code    = strval($row['pay_code']);
				$course_name = strval($row['course_name']);
				$has_used    = strval($row['has_used']);
				$money       = strval($row['money']);
				// 2、查看该付款码是否已经使用e
				if($has_used == "1"){
					return "2";
				}
				// 3、查看该付款码是否是对应课程
				if($course_name != $course_opt){
					return "3";
				}
				// 4、修改课程吗状态
				$time_str = date("Ymd");
				$sql = " update pay_code set has_used = 1, who_used = '$user_id', when_used = '$time_str' where pay_code = '$fkm'";
				$result = $this->mysql_handler->excute_sql($sql);
				// 5、修改课程状态
				$sql = "update  user_pay  set  has_pay = has_pay + $money where user_id = '$user_id' and course_name = '$course_opt'";
				print $sql;
				$result = $this->mysql_handler->excute_sql($sql);
				return "4";
			}
		}
		/**
		 * 获取用户选课记录
		 */
		public function get_course_recorder($user_id){
			// 查看是否已经付费
			$sql = "select" 
						." t1.course_name as course_name,"
						." t2.class_num   as class_num,"
						." t1.has_attend  as has_attend,"
						." t2.fee_per_class * t2.class_num as total_fee,"
						." t1.has_pay as has_pay,"
						." t1.has_pay - (t2.fee_per_class * t1.has_attend) as refund,"
						." t1.class_time as class_time"
					." from" 
					.	" (select course_name, has_pay, has_attend, class_time, leave_num from user_pay where  user_id = '$user_id') t1"
					." left join"
					.	" (select name, class_num, fee_per_class from course_info)t2"
					." on(t1.course_name = t2.name)";
			$result = $this->mysql_handler->excute_sql($sql);
			$ret    = "";
			while($row = mysql_fetch_array($result))
			  {
			  		$tmp_course_name = $row['course_name'];
			  		$tmp_class_num   = $row['class_num'];
			  		$tmp_has_attend  = $row['has_attend'];
			  		$tmp_total_fee   = $row['total_fee'];
			  		$tmp_has_pay     = $row['has_pay'];
			  		$tmp_refund      = $row['refund'];
			  		$tmp_class_time  = $row['class_time'];
			  		$ret .= $tmp_course_name."#".$tmp_class_num."#".$tmp_has_attend."#".$tmp_total_fee."#".$tmp_has_pay."#".$tmp_refund."#".$tmp_class_time."##";
			  }
			  return $ret;
		}

		/**
		* 上课签到
		*/
		public function set_enter_classroom_info($user_id, $stu_id){
			try{
				// 获取用户名和用户类型
				$type = "";
				$name = "";
			    $sql = "select type, name from user_info where user_id='".$user_id."'";
			    $result = $this->mysql_handler->excute_sql($sql);
			    if(mysql_num_rows($result) > 0){
				    if($row = mysql_fetch_array($result)){
				    		$type = $row["type"];
				    		$name = $row["name"];
				    }
				}
				// 写入redis作为签到。
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);	
	   			$redis->select(0);
	   			$enter_classroom_info = $redis->Set($stu_id."_".$type."_name", $name);
	   			return "ok";
	   		}catch (Exception $e) {   
				print $e->getMessage();   
			} 
		}
		/**
		* 离开签出
		*/
		public function set_exit_classroom_info($user_id, $stu_id){
			try{
				// 获取用户名和用户类型
				$type = "";
				$name = "";
			    $sql = "select type, name from user_info where user_id='".$user_id."'";
			    $result = $this->mysql_handler->excute_sql($sql);
			    if(mysql_num_rows($result) > 0){
				    if($row = mysql_fetch_array($result)){
				    		$type = $row["type"];
				    		$name = $row["name"];
				    }
				}
				// 写入redis作为签到。
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);
	   			$redis->select(0);
	   			$enter_classroom_info = $redis->Del($stu_id."_".$type."_name");
	   			return "ok";
	   		}catch (Exception $e) {   
				print $e->getMessage();   
			} 
		}
		/**
		* 获取签出
		*/
		public function get_sign_info($stu_id){
			try{
				// 写入redis作为签到。
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);
	   			$redis->select(0);
	   			$teacher = $redis->Get($stu_id."_t"."_name");
	   			$student = $redis->Get($stu_id."_s"."_name");
	   			return $teacher."#".$student;
	   		}catch (Exception $e) {   
				print $e->getMessage();   
			} 
		}

		/**
		* 锁住棋盘
		*/
		public function lock($user_id, $stu_id){
			try{
				// 写入redis作为签到。
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);
	   			$redis->select(0);
	   			// 上锁
	   			$key   = $stu_id."_lock";
	   			$value = time();
	   			$redis->watch($key);
	   			$redis->multi();
	   			$redis->SETNX($key, $value);
	   			$redis->EXPIRE($key, 30);
	   			$ret = $redis->exec();
	   			return $ret==True ? "ok" : "err" ;
 	   		}catch (Exception $e){   
				print $e->getMessage();   
			} 
			return "err";
		}

		/**
		* 锁住棋盘
		*/
		public function unlock($user_id, $stu_id){
			try{
				// 写入redis作为签到。
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);
	   			$redis->select(0);
	   			// 上锁
	   			$key   = $stu_id."_lock";
	   			$value = time();
	   			$redis->DEL($key);
	   			return "ok";
 	   		}catch (Exception $e){   
				print $e->getMessage();   
			} 
		}

		/**
		* 清空棋盘
		*/
		public function clear_game_info($user_id, $stu_id){
			try{
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);	
	   			$redis->select(0);
	   			#hash描述： key:stu_id, field:chess + update_id, field:info
	   			$key   = $stu_id."_t";
	   			#删除
	   			$redis->DEL($key);
	   			$key   = $stu_id."_s";
	   			#删除
	   			$redis->DEL($key);
 	   		}catch (Exception $e) {   
				print $e->getMessage(); 
			} 
		}

		/**
		 * 保存记录
		 */
		public function store_record($jbfl, $xllx, $qpmc, $record_str){
			try{
				$sql = "replace into train_record(level, train, name, content)values('".
					    $jbfl."','".$xllx."','".$qpmc."','".$record_str."')";
				$result = $this->mysql_handler->excute_sql($sql);
				print $sql;
				return  $result == True ? True : False;
			}catch (Exception $e) {   
				print $e->getMessage(); 
			} 
				return False;
		}

		/**
		 * 删除记录
		 */
		public function delete_record($jbfl, $xllx, $qpmc){
			try{
				$sql = "delete from train_record where level ='".$jbfl."'and train='".$xllx."'and name='".$qpmc."';";
				$result = $this->mysql_handler->excute_sql($sql);
				return  $result == True ? True : False;
			}catch (Exception $e) {   
				print $e->getMessage(); 
			} 
				return False;
		}

		/**
		 * 获取训练棋谱
		 */
		public function get_qp_info(){
			try{
				$ret_arr = array();
				$sql = "select level, train, name,  content from train_record order by level, train";
				$result = $this->mysql_handler->excute_sql($sql);
				while($row  = mysql_fetch_array($result)){
			   		$item = $row["level"]."@".$row["train"]."@".$row["name"]."@".$row["content"];
			   		$ret_arr[] = $item;
			    }
			    return json_encode($ret_arr);
			}catch (Exception $e) {   
				print $e->getMessage(); 
			} 
				return "err";
		}

		/**
		 * 获取训练项目
		 */
		public function get_train_item($level, $train){
			try{
				$ret_arr = array();
				$sql = "select level, train, name,  content from train_record where level='".$level."' and train = '".$train."'";
				$result = $this->mysql_handler->excute_sql($sql);
				while($row  = mysql_fetch_array($result)){
			   		$item = $row["level"]."&".$row["train"]."&".$row["name"]."&".$row["content"];
			   		$ret_arr[] = $item;
			    }
			    return json_encode($ret_arr);
			}catch (Exception $e) {   
				print $e->getMessage(); 
			} 
				return "err";
		}

		/**
		 * 记录公开课的学生
		 */
		public function set_open_class_stu_num($user_id){
			try{
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);	
	   			$redis->select(0);
	   			#hash描述： key:stu_id_type, field:chess + update_id, field:info
	   			$key   = "open_class_stu_num";
	   			#存储
	   			$ret   = $redis->incr($key);
	   			return $ret == 1 ? "ok" : "err";
			}catch (Exception $e) {   
				print $e->getMessage(); 
			} 
			return "err";
		}

		/**
		 * 记录公开课的老师
		 */
		public function set_open_class_tea_num($user_name){
			try{
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);	
	   			$redis->select(0);
	   			#hash描述： key:stu_id_type, field:chess + update_id, field:info
	   			$key   = "open_class_tea_name";
	   			$value = $user_name;
	   			#存储
	   			$ret   = $redis->SET($key, $value);
	   			return $ret == 1 ? "ok" : "err";
			}catch (Exception $e) {   
				print $e->getMessage(); 
			}
			return "err"; 
		}

		/**
		 * 离开公开课
		 */
		public function set_exit_open_class($user_id, $user_type){
			try{
				// 写入redis作为签到。
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);
	   			$redis->select(0);
	   			$ret = "";
	   			if($user_type == "s"){
	   				$ret = $redis->decr("open_class_stu_num");
	   			}else{
	   				$ret = $redis->Del("open_class_tea_name");
	   				$ret = $redis->Del("open_class_chess_o");
	   			}
	   			return "ok";
	   		}catch (Exception $e) {   
				print $e->getMessage();   
			} 
			return "err";
		}

		/**
		 * 离开公开课
		 */
		public function get_open_class_info(){
			try{
				// 写入redis作为签到。
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);
	   			$redis->select(0);
	   			$ret = "";
	   			$stu_num  = $redis->GET("open_class_stu_num");
	   			$tea_name = $redis->GET("open_class_tea_name");
	   			return $stu_num."#".$tea_name;
	   		}catch (Exception $e) {   
				print $e->getMessage();   
			} 
			return "err1";
		}

		/**
		 * 获取教师走的所有步骤
		 */
		public function get_open_class_all_tea_chess($queue){
			try{
				// 写入redis作为签到。
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);
	   			$redis->select(0);
	   			$key = "open_class_chess_o";
	   			#获取 			
	   			$chess = $redis->HGETALL($key);
	   			return json_encode($chess);
	   		}catch (Exception $e) {   
				print $e->getMessage();   
			} 
			return "err1";
		}

		/**
		 * 清楚信息
		 */
		public function clear_open_class_game_info(){
			try{
				$redis = new Redis();
	   			$redis->connect('127.0.0.1', 6379);	
	   			$redis->select(0);
	   			#hash描述： key:stu_id, field:chess + update_id, field:info
	   			$key   = "open_class_chess_o";
	   			#删除
	   			$redis->DEL($key);
	   		}catch (Exception $e) {   
				print $e->getMessage();   
			} 
			return "err1";
		}
	}	
?>