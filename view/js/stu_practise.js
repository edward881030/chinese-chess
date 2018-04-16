$=jQuery;

var chess_player_obj = new chess_player();
make_train_item();


window.onload = function(){
  chess_player_obj.init();
    chess_player_obj.pack_chess();
}


window.onbeforeunload  = function(){
}

window.onunload  = function(){
}


function make_train_item(){
  // 获取url，确定展示哪一项
  var params_str=decodeURI(location.search.substring(1));//这个就是页面?后面的内容，自己处理一下
  var params=params_str.split("&");
  // 判断需要获取的train
  var level=params[0];
  var train=params[1];
  // 获取数据中数据
  $.post("/controller/get_train_item.php", {level:level,train:train}, function(ret_json){
      var arr = new Array();
      var arr_content = new Array();
      ret_json = eval('(' + ret_json + ')');
      for(var i =0; i < ret_json.length; ++i){
        items = ret_json[i].split("&");
        level = items[0];
        train = items[1];
        name  = items[2];
        content=items[3];
        arr[arr.length] = name;
        arr_content[arr_content.length] = content;
      }
      // 生成html
      html_str = "<table>"
      // 每行有两项
      var count = 1;
      for(var i = 0; i < arr.length; ++i){
        if(count == 1){
          html_str += "<tr>";
        }
        html_str += "<td style=\"border:2px solid; padding-top:5px; padding-bottom:5px;\"id='"+ i +"'><img src=\"images/icon/point.svg\" style=\"vertical-align:center; height:20px; width:20px;\"/> <font class='font_sty_2'>" + arr[i]+"</font></td>";
        if(count == 2){ 
          html_str += "</tr>";  
          count=0;
        }
        ++count;
      }
      html_str += "</table>";
      $("#train").html(html_str);
      func_practise =  function(id, content){
              $("#"+id).click(function(){
                       chess_player_obj.start(content);
              });
      }
      // 注册onclick事件
      for(var i = 0; i < arr.length; ++i){
        func_practise(i, arr_content[i]);
      }
      $("#next").click(function(){
          chess_player_obj.next_step();
      });
      $("#back").click(function(){
          chess_player_obj.back_step();
      });
  });
}

// 注册上一步、下一步是的事件

// 下棋类
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
  //
  this.init_con = [];
  this.steps    = [];
  this.back     = [];
  this.cur_step = 0;
  this.click_n  = 0;
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
}
//装棋
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
// 下一步
chess_player.prototype.next_step = function(){
  var self = this;
  //
  if(self.click_n>0){
   alert('点击过快，请放慢速度！');
   return false;
  }
  self.click_n = self.click_n + 1;
  setTimeout(function(){self.click_n=0},300);
  if(self.cur_step == self.steps.length){
    alert("结束！ 请重新开始。");
    return;
  }
  var click_point = self.steps[self.cur_step];
  var items       = click_point.split("_");
  var type        = items[0];
  var id          = items[1];
  if(type=="chess"){
    self.click_chess(id, true);
  }else{
    self.click_coord(id, true);
  }
  self.cur_step += 1;
}
// 上一步
chess_player.prototype.back_step = function(){

  var self = this;
  if(self.click_n>0){
   alert('点击过快，请放慢速度！');
   return false;
  }
  self.click_n = self.click_n + 1;
  setTimeout(function(){self.click_n=0},300);
  self.cur_step -= 1; 
  if(self.cur_step == -1){
    alert("当前为开始局面，无法后退！");
    self.cur_step += 1;
    return;
  }
  ele   = self.back.pop();
  items = ele.split("_"); 
  type  = items[0];
  if(type == "1"){
    self.click_chess(items[1], false);
  }else if(type == "2"){
    self.click_chess(items[1], false);
    self.click_coord(items[2], false);
    self.click_chess(items[3], false);
    self.click_coord(items[4], false);
    self.back.pop();
    self.cur_step -= 1;
  }else{
    self.click_chess(items[1], false);
    self.click_coord(items[2], false);
    self.back.pop();
    self.cur_step -= 1;
  }
   sleep(1000);
}
// 重新开始游戏
chess_player.prototype.start = function(content){
  var self = this;
  // 装棋
  self.pack_chess();
  // 设置初始界面
  var items = content.split("#")
  self.init_con  = items[0];
  arr_init       = self.init_con.split("@");
  for(var i = 0; i < arr_init.length - 1; ++i){
      chess_coorid = arr_init[i].split("-");
      chess  = chess_coorid[0];
      coorid = chess_coorid[1]; 
      self.cur_cp_coord_ids[chess] = coorid;
      document.getElementById(chess).style.top  = self.coord_pos_y[coorid]  + "px";
      document.getElementById(chess).style.left = self.coord_pos_x[coorid]  + "px";
  }
  // 装载每一步
  self.steps    = items.slice(2);
  self.cur_step = 0;
}

// 点击坐标
chess_player.prototype.click_coord = function(coordId, do_record){
  var self = this;
  // 当前棋子ID为空，不做任何动作
  if(self.cur_chess_id != ""){
    if(do_record){
    // 记录回退
      back_str = "3_" + self.cur_chess_id + "_" + self.cur_cp_coord_ids[self.cur_chess_id];
      self.back.push(back_str);
    }
    //
    self.cur_cp_coord_ids[self.cur_chess_id] = coordId;
    cur_chess = self.cur_chess_id;
    self.cur_chess_id = "";
    document.getElementById(cur_chess).style.backgroundImage = "";
    // 当前棋子不为空，把棋子移动到该坐标
    //alert("1");
    $("#" + cur_chess).animate(
      {top:self.coord_pos_y[coordId]  + "px", 
      left:self.coord_pos_x[coordId]  + "px"}
      )
    return cur_chess;

  }
}

// 点击棋子
chess_player.prototype.click_chess = function(chess_id, do_record){
  // 没有棋子被选中
  var self = this;
  if (self.cur_chess_id == ""){
    document.getElementById(chess_id).style.backgroundImage = "url('images/chess/r_box.png')";
    self.cur_chess_id  = chess_id;
    if(do_record){
      var back_str = "1_" + chess_id;
      self.back.push(back_str);
    }
  }// 如果已经有棋子被选中
  else{
    // 点击的棋子不是当前选中的棋子， 则吃子。
    if(self.cur_chess_id != chess_id) {
      // 获取被吃棋子的坐标ID
      coordId = self.cur_cp_coord_ids[chess_id];
      cur_chess = self.cur_chess_id;
      // 记录回退
      if(do_record){
        back_str = "2_" + cur_chess + "_" + self.cur_cp_coord_ids[cur_chess] + "_" + chess_id + "_" + coordId;
        self.back.push(back_str);
      }
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
              document.getElementById(cur_chess).style.backgroundImage = "";
            }
       );
    }else{
    // 点击的棋子是当前选中的棋子。则取消选中
      document.getElementById(self.cur_chess_id).style.backgroundImage = "";
      self.cur_chess_id = "";
      if(do_record){
        var back_str = "1_" + chess_id;
        self.back.push(back_str);
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
