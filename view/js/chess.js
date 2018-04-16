 $ = jQuery ;

var chess_player_obj = new chess_player();
var check_stu_tea_ready_timer;
var watch_competitor_timer;


function set_opening(){
		chess_player_obj.set_opening();
		chess_player_obj.notify_competitor("set_opening", "");
}
	
function pack_chess(){
		chess_player_obj.pack_chess();
		chess_player_obj.notify_competitor("pack_chess", "");
}


window.onload = function(){
	chess_player_obj.init();
	chess_player_obj.set_enter_classroom();	
	chess_player_obj.restart();
	check_stu_tea_ready_timer = setInterval("chess_player_obj.check_stu_tea_ready()", 500);
	watch_competitor_timer    = setTimeout("chess_player_obj.watch_competitor()", 500);
}


window.onbeforeunload  = function(){
	chess_player_obj.set_exit_classroom();
	chess_player_obj.clear_game_info();
}

window.onunload  = function(){
	chess_player_obj.set_exit_classroom();
	chess_player_obj.clear_game_info();
}


// Ajax相关
var xmlhttp;
// Ajax同步处理
function ajaxProcess_async_notify_competitor(url, str, cfunc, error_func){
	$.ajax({
			url:url, 
			type:"post", 
			success:cfunc, 
			error:error_func,
			data:str,
			async:true}
		);
}

// Ajax异步处理
function ajaxProcess_async_watch_competitor(url, str, cfunc){
	$.ajax({
			url:url, 
			type:"post", 
			success:cfunc, 
			data:str,
			error:function(){setTimeout("chess_player_obj.watch_competitor()", 500);},
			async:true, 
			timeout:2000}
		);
}

// Ajax异步处理
function ajaxProcess_async(url, str, cfunc){
	$.ajax({
			url:url, 
			type:"post", 
			success:cfunc, 
			data:str,
			async:true, 
			timeout:2000}
		);
}



// 象棋类
function chess_player(){
	// 所有棋子的id
	this.cp_ids    = ["rlc", "rlm", "rlx", "rls", "rs", "rrs", "rrx", "rrm", "rrc", "rlp", "rrp", "r1b", "r2b", "r3b", "r4b", "r5b","blc", "blm", "blx", "bls", "bs", "brs", "brx", "brm", "brc", "blp", "brp", "b1b", "b2b", "b3b", "b4b", "b5b"];
	// 所有坐标的id
	this.coord_ids  = [0,1, 2, 3, 4,5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
					 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
					 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 
					 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 
					 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 
					 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 
					 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,105, 106, 107, 108,109,
	 				 110, 111, 112, 113, 114, 115,116,117,118,119,120,121];
	// 红色棋盒的坐标id
	this.red_box_coord_ids   = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,105];
	// 黑色棋盒的坐标id
	this.black_box_coord_ids = [106, 107, 108,109,110, 111, 112, 113, 114, 115,116,117,118,119,120,121];
	// 坐标id对应的X,Y值
	this.coord_pos_x    = {};
	this.coord_pos_y    = {};	
	//初始化棋子位置
	this.init_cp_coord_ids = {
							   "rlc":9,  "rlm":19,  "rlx":29, "rls":39, "rs":49,  "rrs":59, "rrx":69, "rrm":79, "rrc":89,
							   "rlp":17, "rrp":77,  "r1b":6,  "r2b":26, "r3b":46, "r4b":66, "r5b":86, 
							   "blc":0,  "blm":10,  "blx":20, "bls":30, "bs":40,  "brs":50, "brx":60, "brm":70, "brc":80,
							   "blp":12, "brp":72,  "b1b":3,  "b2b":23, "b3b":43, "b4b":63, "b5b":83
						     };
	this.cur_cp_coord_ids  = {
							   "rlc":9,  "rlm":19,  "rlx":29, "rls":39, "rs":49,  "rrs":59, "rrx":69, "rrm":79, "rrc":89,
							   "rlp":17, "rrp":77,  "r1b":6,  "r2b":26, "r3b":46, "r4b":66, "r5b":86, 
							   "blc":0,  "blm":10,  "blx":20, "bls":30, "bs":40,  "brs":50, "brx":60, "brm":70, "brc":80,
							   "blp":12, "brp":72,  "b1b":3,  "b2b":23, "b3b":43, "b4b":63, "b5b":83
					        };
	// 棋子对应的图片
	this.cp_img            = {
								rlc:"r_c", rlm:"r_m", rlx:"r_x", rls:"r_s", rs:"r_j", rrs:"r_s", rrx:"r_x", rrm:"r_m", 
								rrc:"r_c", rlp:"r_p", rrp:"r_p", r1b:"r_z", r2b:"r_z", r3b:"r_z", r4b:"r_z", r5b:"r_z", 
								blc:"b_c", blm:"b_m", blx:"b_x", bls:"b_s", bs:"b_j", brs:"b_s", brx:"b_x", brm:"b_m", 
								brc:"b_c", blp:"b_p", brp:"b_p", b1b:"b_z", b2b:"b_z", b3b:"b_z", b4b:"b_z", b5b:"b_z"
						     };

	// 当前选中的棋子id
	this.cur_chess_id       = "";
	// 是否已经更新
	this.competitor_step    = 0;
	this.my_step            = 0;
	// 当前是否老师和学生都到齐。0 都没来， 1 有一个人来， 2 都到齐
	this.ready_status       = 1;
}

// 初始化坐标ID对应的X、Y坐标值
chess_player.prototype.init_coord_xy = function(){
	var coordHtml = "" 
	var coordinateId = 0;
	// 棋盘X、Y坐标
	for(i = 0; i < 9; ++i){
		for(j = 0; j < 10; ++j){
			// 记录id 对应的 坐标
			this.coord_pos_x[coordinateId] = i * 57;
			this.coord_pos_y[coordinateId] = j * 57;
			// 嵌入图片
			coordHtml = coordHtml + '<img id ="'+ coordinateId + '"'+' style = "opacity: 0; filter:Alpha(opacity=0);position:absolute; top:' + (j * 57) + 'px; left:' + (i * 57) + 'px;"'+' src="images/chess/r_c.png"'+'></img>'
            coordinateId += 1; 
		}
	}
	// 黑方棋盒的X、Y坐标
	for(i = 0; i < 4; ++i){
		for(j = 0; j < 4; ++j){
			// 记录id 对应的 坐标
			this.coord_pos_x[coordinateId] =  545 + i * 57
			this.coord_pos_y[coordinateId] =  315  + j * 57
			//  嵌入图片
			coordHtml = coordHtml + '<img id ="'+ coordinateId + '"'+' style = "opacity: 0; filter:Alpha(opacity=0);position:absolute; top:' + (315 + j * 57) + 'px; left:' + (545 + i * 57) + 'px;"'+' src="images/chess/r_c.png"'+'></img>'
			coordinateId += 1;
		}
	}

	// 红方棋盒的X、Y坐标
	for(i = 0; i < 4;  ++i){
		for(j = 0; j < 4; ++j){
			// 记录id 对应的 坐标 
			this.coord_pos_x[coordinateId] =  545 + i * 57
			this.coord_pos_y[coordinateId] =  20   + j * 57
			// 嵌入图片
			coordHtml = coordHtml +  '<img id  ="'+ coordinateId + '"'+' style  = "opacity: 0; filter:Alpha(opacity=0);position:absolute; top:' + (20 + j * 57) + 'px; left:' + (545 + i * 57) + 'px;"'+' src ="images/chess/r_c.png"'+'></img> '
			coordinateId += 1; 
		}
	}

	// 嵌入html
	document.getElementById("chessboard").innerHTML += coordHtml;
}

chess_player.prototype.init_cp_xy = function(){
	var chessHtml = "" 
	// 嵌入棋子图片
	for(i in this.cp_ids){
		imgId   = this.cp_img[this.cp_ids[i]];
		coordId = this.init_cp_coord_ids[this.cp_ids[i]];
		chessHtml = chessHtml + '<img id ="'+ this.cp_ids[i] + '"'+' style = "position:absolute; top:' +  this.coord_pos_y[coordId] + 'px; left:' + this.coord_pos_x[coordId] + 'px;"'+' src="images/chess/' + imgId + '.png"'+'></img>';
	}

	// 嵌入html
	document.getElementById("chessboard").innerHTML += chessHtml;
}

//  
chess_player.prototype.init = function(){
	// 清空坐标id对应的X,Y值
	this.coord_pos_x  = {};
	this.coord_pos_y  = {};	
	// 重设坐标id对应的X,Y值
	this.init_coord_xy();
	this.init_cp_xy();
	// 当前选中的棋子id
	this.cur_chess_id    = "";
	// 是否已经更新
	this.step_seq      = 0;
	//注册事件
	var self = this;
	click_chess = function(chess_id){
		document.getElementById(chess_id).onclick = function(){
											$.when(self.notify_competitor("ch", chess_id))
											.done(self.click_chess(chess_id))
											.fail();
															   };
	}
	click_coord = function(chess_id){
		document.getElementById(chess_id).onclick = function(){	
											$.when(self.notify_competitor("co", chess_id))
											.done(self.click_coord(chess_id))
											.fail();
															   };
	}
	for(i in this.cp_ids ){
		click_chess(this.cp_ids[i]);
	}
	for(j in this.coord_ids){
		click_coord(this.coord_ids[j]);
	}
}


// 重新开始游戏
chess_player.prototype.restart = function(){
	var self = this;
	// 重新摆棋
	self.set_opening();
	// 清空记录
	self.clear_game_info();
	// 走数记录
	self.my_step 		 = 0;
	self.competitor_step = 0;
	self.ready_status    = 1;
}

// 白棋
chess_player.prototype.set_opening = function(){
	var self = this;
	for(id in self.cp_ids){
		coordId = self.init_cp_coord_ids[this.cp_ids[id]];
		document.getElementById(this.cp_ids[id]).style.top  = self.coord_pos_y[coordId]  + "px";
		document.getElementById(this.cp_ids[id]).style.left = self.coord_pos_x[coordId]  + "px";
	}
	if(self.cur_chess_id != ""){
		document.getElementById(self.cur_chess_id).style.backgroundImage = "";
		self.cur_chess_id = "";
	}
	self.cur_cp_coord_ids = {}
	for(i in self.init_cp_coord_ids){
		self.cur_cp_coord_ids[i]=self.init_cp_coord_ids[i];
	}
}

// 装盒
chess_player.prototype.pack_chess = function(){
	var self = this;
	var i = 90;
	for(id in self.cp_ids){
		self.cur_cp_coord_ids[this.cp_ids[id]] = i;
		document.getElementById(this.cp_ids[id]).style.top  = self.coord_pos_y[i]  + "px";
		document.getElementById(this.cp_ids[id]).style.left = self.coord_pos_x[i]  + "px";
		++i;
	}
	if(self.cur_chess_id != ""){
		document.getElementById(self.cur_chess_id).style.backgroundImage = "";
		self.cur_chess_id = "";
	}
}

// 点击坐标
chess_player.prototype.click_coord = function(coordId){
	var self = this;
	// 当前棋子ID为空，不做任何动作
	if(self.cur_chess_id != ""){
		self.cur_cp_coord_ids[self.cur_chess_id] = coordId;
		cur_chess = self.cur_chess_id;
		self.cur_chess_id = "";
		// 当前棋子不为空，把棋子移动到该坐标
		$("#" + cur_chess).animate(
			{top:self.coord_pos_y[coordId]  + "px", left:self.coord_pos_x[coordId]  + "px"},
			function(){
				document.getElementById(cur_chess).style.backgroundImage = "";
			});
	}
}

// 点击棋子
chess_player.prototype.click_chess = function(chess_id){
	// 没有棋子被选中
	var self = this;
	if (self.cur_chess_id == ""){
		document.getElementById(chess_id).style.backgroundImage = "url('images/chess/r_box.png')";
		self.cur_chess_id  = chess_id;
	}// 如果已经有棋子被选中
	else{
		// 点击的棋子不是当前选中的棋子， 则吃子。
		if(self.cur_chess_id != chess_id) {
			// 获取被吃棋子的坐标ID
		    coordId = self.cur_cp_coord_ids[chess_id];
		    cur_chess = self.cur_chess_id;
			self.cur_chess_id = "";
			// 移动当前棋子到被吃的棋子的位置
			$("#" + cur_chess).animate({top:self.coord_pos_y[coordId]  + "px", left:self.coord_pos_x[coordId]  + "px"},
			  function(){
			  			// 当前棋子放到其盒中
			  			self.cur_cp_coord_ids[cur_chess] = coordId;
						empty_box_coord_id = self.get_empty_box_coord_id(chess_id);
						document.getElementById(chess_id).style.top  = self.coord_pos_y[empty_box_coord_id]  + "px";
						document.getElementById(chess_id).style.left = self.coord_pos_x[empty_box_coord_id]  + "px";
						self.cur_cp_coord_ids[chess_id] = empty_box_coord_id;
						document.getElementById(cur_chess).style.backgroundImage = ""
						}
			 );
		}else{
		// 点击的棋子是当前选中的棋子。则取消选中
			document.getElementById(self.cur_chess_id).style.backgroundImage = "";
			self.cur_chess_id = "";
		}
	}
}

// 设置游戏信息
chess_player.prototype.notify_competitor = function(type, info){
	//在函数内部，新建一个Deferred对象
	var dtd = $.Deferred();
	var self = this;
	self.my_step = self.my_step + 1;
	var post_data = type + "-" + info;
	url = "/controller/set_game_info.php";
	ret = "";
	ajaxProcess_async_notify_competitor(url, 
										{step_seq:self.my_step, info:post_data}, 
										function(ret_str){dtd.resolve()},
										function(){self.my_step = self.my_step - 1;
											       dtd.reject();
											      }	
										);
	return  dtd.promise();
}

// 获取游戏信息
chess_player.prototype.watch_competitor = function(){
	url = "/controller/get_game_info.php";
	var self = this;
	cfunc = function(ret_str){	
			items  = ret_str.replace(/\s/g,'').split("#");
			document.getElementById("start_time").innerHTML = "开始时间:  " + items[0];
			document.getElementById("end_time").innerHTML   = "上课时间:  " + items[1] + "分钟";
			if(items[2] != ""){
				details = items[2].split("-");
				if (details.length == 2){
					redis_type  = details[0];
					redis_click = details[1];
					if(redis_type == "co" ){
						// 更新当前步骤
						self.competitor_step = self.competitor_step + 1;
						self.click_coord(redis_click);
					}else if(redis_type == "ch"){
						// 更新当前步骤
						self.competitor_step = self.competitor_step + 1;
						self.click_chess(redis_click);
					}else if(redis_type == "pack_chess"){
						// 更新当前步骤
						self.competitor_step = self.competitor_step + 1;
						self.pack_chess();
					}else if(redis_type == "set_opening"){
						// 更新当前步骤
						self.competitor_step = self.competitor_step + 1;
						self.set_opening();
					}else if(redis_type == "restart"){
						self.restart();
					}
				}
			}
			setTimeout("chess_player_obj.watch_competitor()", 500);
		}	
		var tmp_step_seq  = self.competitor_step + 1;
		ajaxProcess_async_watch_competitor(url, {step_seq:tmp_step_seq}, cfunc);
}

// 清空游戏信息
chess_player.prototype.clear_game_info = function(){
	url = "/controller/clear_game_info.php";
	var self = this;
	cfunc = function(ret_str){}
	ajaxProcess_async(url, {}, cfunc);
}

// 进入房间
chess_player.prototype.set_enter_classroom = function(){
	url = "/controller/set_enter_class_info.php";
	var self = this;
	cfunc = function(retStr){
	}
	ajaxProcess_async(url, {}, cfunc);
}

// 离开房间
chess_player.prototype.set_exit_classroom = function(){
	url = "/controller/set_exit_class_info.php";
	var self = this;
	cfunc = function(retStr){
	}
	ajaxProcess_async(url, {}, cfunc);
}

// 检查是否学生和老师在教棋
chess_player.prototype.check_stu_tea_ready = function(){
	url = "/controller/get_sign_info.php";
	var self = this;
	cfunc = function(retStr){
			var items  = retStr.replace(/\s/g,'').split("#");
			tea = "";
			str = "";
			(items[0] == "") ? tea="老&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;师: <span style='color:red'>缺席</span>":tea="老&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;师: <span style='color:white'>"+items[0]+"</span>"; 
			(items[1] == "") ? stu="学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生: <span style='color:red'>缺席</span>":stu="学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生: <span style='color:white'>"+items[1]+"</span>"; 
			if(items[0] == "未知"){
				tea = "老&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;师: <a href='stu_info.html' style='text-decoration:none;'><span style='color:white'>点击完善“个人信息”/span></a>";
			}
			if(items[1] == "未知"){
				stu = "学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生: <a href='stu_info.html' style='text-decoration:none;'><span style='color:white'>点击完善“个人信息”</span></a>";
			}
			document.getElementById("tea_name").innerHTML = tea;
			document.getElementById("stu_name").innerHTML = stu;
			// 状态转变  只有一个人 -> 都到齐
			if(self.ready_status == 1 && items[0] != "" && items[1] != ""){
				self.restart();
				// 变更状态、调整查询时间。
				self.ready_status = 2;
				clearInterval(check_stu_tea_ready_timer);
				check_stu_tea_ready_timer = setInterval("chess_player_obj.check_stu_tea_ready()", 5000);
			}// 状态转变  都到齐 -> 变为一个人get_open_class_info
			else if(self.ready_status == 2 && (items[0] == "" ||  items[1] == "")){
				//变更状态、调整查询时间。
				self.ready_status = 1; 
				clearInterval(check_stu_tea_ready_timer);
				check_stu_tea_ready_timer = setInterval("chess_player_obj.check_stu_tea_ready()", 500);
			}
	}
	ajaxProcess_async(url, {}, cfunc);
}

// 查找空闲的棋盒
chess_player.prototype.get_empty_box_coord_id = function(id){
	var self = this;
	findempty_box_coord_id = function(type){
		var box = null;
		if(type == "r"){
			box = self.red_box_coord_ids;
		}else{
			box = self.black_box_coord_ids;
		}
		for(keyBoxCoordId in box){
			boxCoordId = box[keyBoxCoordId];
			// 标记棋盒改坐标是否有棋子
			flag = 0;
			for(keyCpId in self.cp_ids){
				cpId = self.cp_ids[keyCpId];
				if(boxCoordId == self.cur_cp_coord_ids[cpId]){
					flag = 1;
					break;
				}
			}
			if(flag == 0){
				return boxCoordId;
			}
		}
		return ""
	}
	empty_box_coord_id = null;
	if(id.charAt(0) == "r"){
		empty_box_coord_id = findempty_box_coord_id("r");
		if(empty_box_coord_id == ""){
			empty_box_coord_id = findempty_box_coord_id("b");
		}
	}else{
		empty_box_coord_id = findempty_box_coord_id("b");
		if(empty_box_coord_id == ""){
			empty_box_coord_id = findempty_box_coord_id("r");
		}
	}
	return empty_box_coord_id;
}






