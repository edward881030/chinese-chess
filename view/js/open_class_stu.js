 $ = jQuery ;

var chess_border_obj            = new chess_border();
var chess_player_obj            = new chess_player(chess_border_obj);
var chess_classroom_manager_obj = new chess_classroom_manager(chess_player_obj);
var watch_competitor_timer;
var watch_tea_and_num_timer;

//======================================================================
// window 动作
function set_opening(){
		chess_classroom_manager_obj.chess_player.restart();
		chess_classroom_manager_obj.notify_competitor("open_chess", "");
}
	
function pack_chess(){
		chess_classroom_manager_obj.chess_player.pack_chess();
		chess_classroom_manager_obj.notify_competitor("pack_chess", "");
}

window.onload = function(){
	chess_classroom_manager_obj.chess_player.border_pos.init();
	chess_classroom_manager_obj.sync_tea_chess();
	watch_tea_and_num_timer  = setInterval("chess_classroom_manager_obj.watch_tea_and_num()", 2000);
}

window.history = function(){
	url = "/controller/set_exit_open_class.php/";
	var self = this;
	cfunc = function(ret_str){
		window.location.href = "/view/stu_train.html";
	}
	$.ajax({url:url, type:"post", success:cfunc, data:{}, async:true, timeout:2000});
}

function back_to_stu_train(){
	url = "/controller/set_exit_open_class.php/";
	var self = this;
	cfunc = function(ret_str){
		window.location.href = "/view/stu_train.html";
	}
	$.ajax({url:url, type:"post", success:cfunc, data:{}, async:true, timeout:2000});
}



window.onbeforeunload  = function(){
	// chess_classroom_manager_obj.set_exit_open_class();
}

window.onunload  = function(){
	// chess_classroom_manager_obj.set_exit_open_class();
}


// ========================================象棋棋盘管理类=========================
function chess_border(){
	// 所有坐标的id
	this.coord_ids           = [0,1, 2, 3, 4,5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,105, 106, 107, 108,109,110, 111, 112, 113, 114, 115,116,117,118,119,120,121];
	// 红色棋盒的坐标id
	this.red_box_coord_ids   = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,105];
	// 黑色棋盒的坐标id
	this.black_box_coord_ids = [106, 107, 108,109,110, 111, 112, 113, 114, 115,116,117,118,119,120,121];
	// 坐标id对应的X,Y值
	this.coord_pos_x         = {};
	this.coord_pos_y         = {};	
}

// 初始化坐标ID对应的X、Y坐标值
chess_border.prototype.init = function(){
	var coordHtml = "" 
	var coordinateId = 0;
	// 棋盘X、Y坐标
	for(i = 0; i < 9; ++i){
		for(j = 0; j < 10; ++j){
			this.coord_pos_x[coordinateId] = i * 57;
			this.coord_pos_y[coordinateId] = j * 57;
			coordHtml = coordHtml + '<img id ="'+ coordinateId + '"'+' style = "opacity: 0; filter:Alpha(opacity=0);position:absolute; top:' + (j * 57) + 'px; left:' + (i * 57) + 'px;"'+' src="images/chess/r_c.png"'+'></img>'
	        coordinateId += 1; 
		}
	}
	// 黑方棋盒的X、Y坐标
	for(i = 0; i < 4; ++i){
		for(j = 0; j < 4; ++j){
			this.coord_pos_x[coordinateId] =  545 + i * 57
			this.coord_pos_y[coordinateId] =  315  + j * 57
			coordHtml = coordHtml + '<img id ="'+ coordinateId + '"'+' style = "opacity: 0; filter:Alpha(opacity=0);position:absolute; top:' + (315 + j * 57) + 'px; left:' + (545 + i * 57) + 'px;"'+' src="images/chess/r_c.png"'+'></img>'
			coordinateId += 1;
		}
	}
	// 红方棋盒的X、Y坐标
	for(i = 0; i < 4;  ++i){
		for(j = 0; j < 4; ++j){
			this.coord_pos_x[coordinateId] =  545 + i * 57
			this.coord_pos_y[coordinateId] =  20   + j * 57
			coordHtml = coordHtml +  '<img id  ="'+ coordinateId + '"'+' style  = "opacity: 0; filter:Alpha(opacity=0);position:absolute; top:' + (20 + j * 57) + 'px; left:' + (545 + i * 57) + 'px;"'+' src ="images/chess/r_c.png"'+'></img> '
			coordinateId += 1; 
		}
	}
	document.getElementById("chessboard").innerHTML += coordHtml;
}


// ========================================象棋玩家==================================
function chess_player(border_pos_param){
	// 棋盘坐标
	this.border_pos          = border_pos_param;
	// 所有棋子的id
	this.cp_ids              = ["rlc", "rlm", "rlx", "rls", "rs", "rrs", "rrx", "rrm", "rrc", "rlp", "rrp", "r1b", "r2b", "r3b", "r4b", "r5b","blc", "blm", "blx", "bls", "bs", "brs", "brx", "brm", "brc", "blp", "brp", "b1b", "b2b", "b3b", "b4b", "b5b"];
	// 棋子对应的图片
	this.cp_img              = {"rlc":"r_c", "rlm":"r_m", "rlx":"r_x", "rls":"r_s", "rs":"r_j", "rrs":"r_s", "rrx":"r_x", "rrm":"r_m", "rrc":"r_c", "rlp":"r_p", "rrp":"r_p", "r1b":"r_z", "r2b":"r_z", "r3b":"r_z", "r4b":"r_z", "r5b":"r_z", "blc":"b_c", "blm":"b_m", "blx":"b_x", "bls":"b_s", "bs":"b_j", "brs":"b_s", "brx":"b_x", "brm":"b_m", "brc":"b_c", "blp":"b_p", "brp":"b_p", "b1b":"b_z", "b2b":"b_z", "b3b":"b_z", "b4b":"b_z", "b5b":"b_z"};
	// 棋子对应的坐标i
	this.init_cp_coord_ids   = {"rlc":9,  "rlm":19,  "rlx":29, "rls":39, "rs":49,  "rrs":59, "rrx":69, "rrm":79, "rrc":89,"rlp":17, "rrp":77,  "r1b":6,  "r2b":26, "r3b":46, "r4b":66, "r5b":86, "blc":0,  "blm":10,  "blx":20, "bls":30, "bs":40,  "brs":50, "brx":60, "brm":70, "brc":80,"blp":12, "brp":72,  "b1b":3,  "b2b":23, "b3b":43, "b4b":63, "b5b":83};
	//this.init_cp_coord_ids   = {rlc:9,  rlm:19,  rlx:29, rls:39, rs:49,  rrs:59, rrx:69, rrm:79, rrc:89,rlp:17, rrp:77,  r1b:6,  r2b:26, r3b:46, r4b:66, r5b:86, blc:0,  blm:10,  blx:20, bls:30, bs:40,  brs:50, brx:60, brm:70, brc:80,blp:12, brp:72, b1b:3,  b2b:23, b3b:43, b4b:63, b5b:83};
	this.cur_cp_coord_ids    = {"rlc":9,  "rlm":19,  "rlx":29, "rls":39, "rs":49,  "rrs":59, "rrx":69, "rrm":79, "rrc":89,"rlp":17, "rrp":77,  "r1b":6,  "r2b":26, "r3b":46, "r4b":66, "r5b":86, "blc":0,  "blm":10,  "blx":20, "bls":30, "bs":40,  "brs":50, "brx":60, "brm":70, "brc":80,"blp":12, "brp":72,  "b1b":3,  "b2b":23, "b3b":43, "b4b":63, "b5b":83};
	//this.cur_cp_coord_ids    = {rlc:9,  rlm:19,  rlx:29, rls:39, rs:49,  rrs:59, rrx:69, rrm:79, rrc:89, rlp:17, rrp:77,  r1b:6,  r2b:26, r3b:46, r4b:66, r5b:86, blc:0,  blm:10,  blx:20, bls:30, bs:40,  brs:50, brx:60, brm:70, brc:80, blp:12, brp:72,  b1b:3,  b2b:23, b3b:43, b4b:63, b5b:83};
	// 当前选中的棋子id
	this.cur_chess_id        = "";
	// 是否已经更新
	this.competitor_step     = 0;
}

// 开局
chess_player.prototype.open_chess = function(cp_coord_ids_param){
	var self = this;
	var chess_html = "" 
	// 嵌入棋子图片
	for(i in self.cp_ids){
		img_id      = self.cp_img[self.cp_ids[i]];
		coord_id    = cp_coord_ids_param[self.cp_ids[i]];
		chess_html = chess_html + '<img id ="'+ self.cp_ids[i] + '"'+' style = "position:absolute; top:' +  this.border_pos.coord_pos_y[coord_id] + 'px; left:' + this.border_pos.coord_pos_x[coord_id] + 'px;"'+' src="images/chess/' + img_id + '.png"'+'></img>';
	}
	document.getElementById("chessboard").innerHTML += chess_html;
}

// 重开
chess_player.prototype.restart = function(cp_coord_ids_param, do_actual_move){
	do_actual_move = arguments[1] ? arguments[1] : true;
	var self = this;
	// 初始化当前棋子左边
	for(var i in cp_coord_ids_param){
		self.cur_cp_coord_ids[i] = cp_coord_ids_param[i];
	}
	// 初始化选中棋子坐标
	if(self.cur_chess_id  != ""){
		if(do_actual_move){
			document.getElementById(self.cur_chess_id).style.backgroundImage = "";
		}
		self.cur_chess_id == "";
	}
	// 清空所有棋子元素
	for(i in self.cp_ids){
		$("#" + self.cp_ids[i]).remove();
	}
	// 重开棋局
	if(do_actual_move){
		self.open_chess(self.cur_cp_coord_ids);
	}
}

// 装盒
chess_player.prototype.pack_chess = function(do_actual_move){
	do_actual_move = arguments[1] ? arguments[1] : true;
	var self = this;
	// 初始化当前棋子
	var i = 90;
	for(id in self.cp_ids){
		self.cur_cp_coord_ids[self.cp_ids[id]] = i;
		if(do_actual_move){
			document.getElementById(self.cp_ids[id]).style.top  = self.border_pos.coord_pos_y[i]  + "px";
			document.getElementById(self.cp_ids[id]).style.left = self.border_pos.coord_pos_x[i]  + "px";
		}
		++i;
	}
	// 初始化选中棋子坐标
	if(self.cur_chess_id  != ""){
		if(do_actual_move){
			document.getElementById(self.cur_chess_id).style.backgroundImage = "";
		}
		self.cur_chess_id == "";
	}
}

chess_player.prototype.move = function(click_id, do_actual_move){
	do_actual_move = arguments[1] ? arguments[1] : true;
	var self = this;
	//棋子ID
	if($.inArray(click_id, self.cp_ids) != -1){
		if (self.cur_chess_id == ""){
			if(do_actual_move){
				document.getElementById(click_id).style.backgroundImage = "url('images/chess/r_box.png')";
			}
			self.cur_chess_id  = click_id;
		}// 如果已经有棋子被选中
		else{
			// 点击的棋子不是当前选中的棋子， 则吃子。
			if(self.cur_chess_id != click_id) {
				// 获取被吃棋子的坐标ID
				coord_id = self.cur_cp_coord_ids[click_id];
				cur_chess = self.cur_chess_id;
				self.cur_chess_id = "";
				// 移动当前棋子到被吃的棋子的位置
				if(do_actual_move){
					$("#" + cur_chess).animate({top:self.border_pos.coord_pos_y[coord_id]  + "px", left:self.border_pos.coord_pos_x[coord_id]  + "px"},
					  function(){
						  			// 修改信息
						  			self.cur_cp_coord_ids[cur_chess] = coord_id;
									empty_box_coord_id               = self.get_empty_box_coord_id(click_id);
									self.cur_cp_coord_ids[click_id]  = empty_box_coord_id;
									// 完成动作
									document.getElementById(click_id).style.top  = self.border_pos.coord_pos_y[empty_box_coord_id]  + "px";
									document.getElementById(click_id).style.left = self.border_pos.coord_pos_x[empty_box_coord_id]  + "px";
									document.getElementById(cur_chess).style.backgroundImage = "";
								}
					 );
				}else{
		  			// 修改信息
		  			self.cur_cp_coord_ids[cur_chess] = coord_id;
					empty_box_coord_id               = self.get_empty_box_coord_id(click_id);
					self.cur_cp_coord_ids[click_id]  = empty_box_coord_id;
				}
			}else{
				// 点击的棋子是当前选中的棋子。则取消选中
				if(do_actual_move){
					document.getElementById(self.cur_chess_id).style.backgroundImage = "";
				}
				self.cur_chess_id = "";
			}
		}
	}else{ // 坐标ID
		 // 当前棋子ID为空，不做任何动作
		if(self.cur_chess_id != ""){
			self.cur_cp_coord_ids[self.cur_chess_id] = click_id;
			cur_chess = self.cur_chess_id;
			self.cur_chess_id = "";
			// 当前棋子不为空，把棋子移动到该坐标
			if(do_actual_move){
				$("#" + cur_chess).animate({top:self.border_pos.coord_pos_y[click_id]   + "px", left:self.border_pos.coord_pos_x[click_id]  + "px"},
											function(){
											document.getElementById(cur_chess).style.backgroundImage = "";
				});
			}
		}
	}
}

// 查找空闲的棋盒
chess_player.prototype.get_empty_box_coord_id = function(id){
	var self = this;
	findempty_box_coord_id = function(type){
		var box = null;
		if(type == "r"){
			box = self.border_pos.red_box_coord_ids;
		}else{
			box = self.border_pos.black_box_coord_ids;
		}
		for(keyBoxcoord_id in box){
			boxcoord_id = box[keyBoxcoord_id];
			// 标记棋盒改坐标是否有棋子
			flag = 0;
			for(keyCpId in self.cp_ids){
				cpId = self.cp_ids[keyCpId];
				if(boxcoord_id == self.cur_cp_coord_ids[cpId]){
					flag = 1;
					break;
				}
			}
			if(flag == 0){
				return boxcoord_id;
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

// ========================================象棋教室管理============================
function chess_classroom_manager(chess_player_param){
	this.competitor_step = 0;
	this.my_step         = 0;
	this.chess_player    = chess_player_param;
}

chess_classroom_manager.prototype.watch_competitor  = function(){
	url = "/controller/get_open_class_chess.php/";
	var self = this;
	cfunc = function(ret_str){	
			items  = ret_str.replace(/\s/g,'').split("#");
			if(items[0] != ""){
				document.getElementById("start_time").innerHTML = "开始时间:  " + items[0];
				document.getElementById("end_time").innerHTML   = "讲课时长:  " + items[1] + "分钟";
			}else{
				document.getElementById("start_time").innerHTML = "开始时间:  " + "未开始";
				document.getElementById("end_time").innerHTML   = "讲课时长:  " + 0 + "分钟";
			}
			if(items[2] != ""){
				details = items[2].split("-");
				if (details.length == 2){
					redis_type  = details[0];
					redis_click = details[1];
					if(redis_type == "move" ){
						// 更新当前步骤
						self.competitor_step = self.competitor_step + 1;
						self.chess_player.move(redis_click);
					}else if(redis_type == "pack_chess"){
						// 更新当前步骤
						self.competitor_step = self.competitor_step + 1;
						self.chess_player.pack_chess();
					}else if(redis_type == "open_chess"){
						// 更新当前步骤
						self.competitor_step = self.competitor_step + 1;
						self.chess_player.open_chess(self.chess_player.init_cp_coord_ids);
					}else if(redis_type == "restart"){
						self.competitor_step = self.competitor_step + 1;
						self.chess_player.restart(self.chess_player.init_cp_coord_ids, true);
					}
				}
			}
		watch_competitor_timer   = setTimeout("chess_classroom_manager_obj.watch_competitor()", 500);
		}	
		var tmp_step_seq  = self.competitor_step + 1;
		$.ajax({url:url, type:"post", success:cfunc, data:{step_seq:tmp_step_seq},
				error:function(){setTimeout("chess_classroom_manager_obj.watch_competitor()", 500);},
				async:true, 
				timeout:2000});
}

// 设置游戏信息
chess_classroom_manager.prototype.notify_competitor = function(type, info){
	//在函数内部，新建一个Deferred对象
	var dtd = $.Deferred();
	var self = this;
	self.my_step = self.my_step + 1;
	var post_data = type + "-" + info;
	url = "/controller/set_open_class_chess.php/";
	ret = "";
	$.ajax({
			url:url, 
			type:"post", 
			success:function(ret_str){dtd.resolve()},
			error:function(){self.my_step = self.my_step - 1;dtd.reject();},	
			data:{step_seq:self.my_step, info:post_data},
			async:true}
		);
	return  dtd.promise();
}


// 注册点击事件
chess_classroom_manager.prototype.reg_click = function(id){
	var self = this;
	click_chess = function(chess_id){
	document.getElementById(chess_id).onclick = function(){
												$.when(self.notify_competitor("move", chess_id))
												.done(self.chess_player.move(chess_id))
												.fail();
														   };
	}
	click_coord = function(chess_id){
	document.getElementById(chess_id).onclick = function(){	
												$.when(self.notify_competitor("move", chess_id))
												.done(self.chess_player.move(chess_id))
												.fail();
												};
	}
	for(i in self.chess_player.cp_ids ){
	click_chess(self.chess_player.cp_ids[i]);
	}
	for(i in self.chess_player.border_pos.coord_ids){
	click_coord(self.chess_player.border_pos.coord_ids[i]);
	}
}

// 观察老师和学生
chess_classroom_manager.prototype.watch_tea_and_num = function(){
	url = "/controller/get_open_class_info.php/";
	var self = this;
	cfunc = function(ret_str){
		var items  = ret_str.replace(/\s/g,'').split("#");
		tea_name   = "";
		stu_num    = "";
		(items[1] == "") ?  tea_name = "缺席" : tea_name = items[1]; 
		(items[0] == "") ?  stu_num  = "0"    : stu_num  = items[0]; 
		if(items[1] == ""){
			self.competitor_step = 0;
		}
		tea_name_html   = '讲&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;师: <span style="color:red">'+ tea_name + '</span>';
		stu_num_html    = '学生人数: <span style="color:red">'+ stu_num +'</span>';
		$("#tea_name").html(tea_name_html);
		$("#stu_num").html(stu_num_html);
	}
	$.ajax({url:url, type:"post", success:cfunc, data:{}, async:true, timeout:2000});
}	

// 离开房间
chess_classroom_manager.prototype.set_exit_open_class = function(){
	url = "/controller/set_exit_open_class.php/";
	var self = this;
	cfunc = function(ret_str){
	}
	$.ajax({url:url, type:"post", success:cfunc, data:{}, async:true, timeout:2000});
}

// 同步教师的棋盘
chess_classroom_manager.prototype.sync_tea_chess = function(){
	// 获取老师已经走的所有的棋
	url = "/controller/get_open_class_all_tea_chess.php/";
	var self = this;
	cfunc = function(ret_str){
		// 判断不为空
		if(ret_str.replace(/\s/g,'') != "[]"){
		ret_arr = ret_str.replace(/\s/g,'').split(",");
		for(var i =0; i < ret_arr.length; ++i){
			tmp_arr_1 = ret_arr[i].split(":");
			tmp_arr_2 = tmp_arr_1[1];
			tmp_arr_3 = tmp_arr_2.split("\"");
			tmp_arr_4 = tmp_arr_3[1];
			details = tmp_arr_4.split("-");
			if (details.length == 2){
					redis_type  = details[0];
					redis_click = details[1];
					if(redis_type == "move" ){
						// 更新当前步骤
						self.competitor_step = self.competitor_step + 1;
						self.chess_player.move(redis_click, false);
					}else if(redis_type == "pack_chess"){
						// 更新当前步骤
						self.competitor_step = self.competitor_step + 1;
						self.chess_player.pack_chess(false);
					}else if(redis_type == "restart"){
						self.competitor_step = self.competitor_step + 1;
						self.chess_player.restart(self.chess_player.init_cp_coord_ids, false);
					}else if(redis_type == "open_chess"){
						self.competitor_step = self.competitor_step + 1;
						self.chess_player.open_chess(self.chess_player.init_cp_coord_ids, false);
					}
			}
		}
		}
		self.chess_player.restart(self.chess_player.cur_cp_coord_ids);
		watch_competitor_timer   = setTimeout("chess_classroom_manager_obj.watch_competitor()", 500);
	}
	$.ajax({url:url, type:"post", success:cfunc, data:{step_seq:self.competitor_step}, async:true, timeout:2000});
}
