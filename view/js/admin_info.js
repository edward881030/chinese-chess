$ = jQuery ;

//  生成聘请老师信息
window.onload = function(){
	make_pqls_html();
}

// Ajax相关
var xmlhttp;
// Ajax同步处理
function ajaxProcess_sync(url, str, cfunc){
	$.ajax({url:url, type:"post", success:cfunc, data:str, async:false});
}

// Ajax异步处理
function ajaxProcess_async(url, str, cfunc){
	//$.post(url,  str, cfunc);
	$.ajax({url:url, type:"post", success:cfunc, data:str, async:false, timeout:5000});
}

function make_pqls_html(){
	url = "/controller/get_teacher_info.php";
	ajaxProcess_async(url, 
					 {}, 
					 function(ret_json){
					 	html="<table  class='gridtable'>" +
     						 "<thead>" +
     						 "<tr><th>棋院账号</th><th>教师姓名</th><th>电话</th><th>QQ</th></tr></thead>" +
     						 "<tbody>";
     					ret_json = eval('(' + ret_json + ')');
     					for(var i =0; i < ret_json.length; ++i){
     						items = ret_json[i].split("#");
     						 html += "<tr>"+
     						 		 "<td>"+ items[0]+"</td><td>"+ items[1]+"</td><td>"+ items[2]+"</td><td>"+ items[3]+"</td>" +
      						 		 "</tr>";
      					}
      					html += "</tbody></table>";
						$("#pqls_li").html (html);
					 }
					);
}

function make_zcxs_html(){
	url = "/controller/get_student_info.php";
	ajaxProcess_async(url, 
					 {}, 
					 function(ret_json){
					 	html="<table  class='gridtable'>" +
     						 "<thead>" +
     						 "<tr><th>棋院账号</th><th>学生姓名</th><th>电话</th><th>QQ</th></tr></thead>" +
     						 "<tbody>";
     					ret_json = eval('(' + ret_json + ')');
     					for(var i =0; i < ret_json.length; ++i){
     						items = ret_json[i].split("#");
     						 html += "<tr>"+
     						 		 "<td>"+ items[0]+"</td><td>"+ items[1]+"</td><td>"+ items[2]+"</td><td>"+ items[3]+"</td>" +
      						 		 "</tr>";
      					}
      					html += "</tbody></table>";
						$("#zcxs_li").html (html);
					 }
					);
}

function make_jfpk_html(){
	url = "/controller/get_student_pay_info.php";
	ajaxProcess_async(url, 
					 {}, 
					 function(ret_json){
					 	html="<table  class='gridtable'>" +
     						 "<thead>"                    +
     						 "<tr><th>棋院账号</th>"      +
     						 "<th>学生姓名</th>"          + 
     						 "<th>教师账号</th>"      	  +   
                 "<th>课程</th>"              +
                 "<th>总需课时</th>"          +
                 "<th>已上课时</th>"      	  +               
     						 "<th>总需费用</th>"      	  +
                 "<th>已付金额</th>"      	  +               
     						 "<th>可退金额</th>"      	  +
                 "<th>上课时间</th></tr>"     +               
                 "</thead>"                   +
     						 "<tbody>";
     					ret_json = eval('(' + ret_json + ')');
     					for(var i =0; i < ret_json.length; ++i){
     						items = ret_json[i].split("#");
                tea_html = "";
                if(items[9] == "待定"){
                  tea_html = "<span style='color:red'>" + items[9]+"</span>";
                }else{
                  tea_html = items[9];
                }
     						 html += "<tr>"+
         						 		 "<td>"+ items[0] + "</td><td>" + items[1]+ "</td>"+
                         "<td id='"+ items[0] + items[2] + "tea'>"  + tea_html      +" <a onclick='make_xg_html(\"" + items[0]  +"\" , \"" + items[2] + "\"" + ")'>(修改)</a></td>" +
         						 		 "<td>"+ items[2] + "</td><td>" + items[3]+ "</td>" +
                         "<td id='"+ items[0] + items[2] + "has_attend'>"+ items[4] +" <a onclick='make_xg_has_attend_html(\"" + items[0]  +"\" , \"" + items[2] + "\" , " + items[4] + ")'>(修改)</a></td>" +
         						 		 "<td>"+ items[5] + "</td><td>" + items[6]+ "</td><td>"  + items[7] +"</td>" +
         						 		 "<td>"+ "<a id='ck' title='上课时间' data-container='tbody' data-toggle='popover' data-placement='bottom' data-content='" + items[8] + "'>查看</a></td>" +
          						 	 "</tr>";
      					}
      					html += "</tbody></table>";
              //alert(html);
						  $("#jfpk_li").html (html);
              $(function () { $("[data-toggle='popover']").popover();});
              //document.getElementById("jfpk_li").innerHTML = html;
					 }
					);
}

function make_xg_html(stu_id, course_name){
	var url = "/controller/get_teacher_info.php";
	ajaxProcess_async(url, 
					 {}, 
					 function(ret_json){
					 	html  =  "<input style='display:none' type='text' name='stu_id'       value='"+ stu_id      +"'/>";
					 	html +=  "<input style='display:none' type='text' name='course_name'  value='"+ course_name +"'/>";
					 	html += "<select id='tea_id'>";
					 	ret_json = eval('(' + ret_json + ')');
     					for(var i =0; i < ret_json.length; ++i){
     						  items = ret_json[i].split("#");
      					  html +=   "<option value='" + items[0] + "'>" + items[0] +"</option>";
      					}
      					html += "</select>";
      					html += "<input  type='submit'  onclick='update_teacher(\""+ stu_id +"\",\"" + course_name + "\")' value='确认'' />";
					 	   $("#" + stu_id + course_name + "tea").html(html);
					 }
					);
}


function update_teacher(stu_id, course_name){
  var url = "/controller/update_teacher.php";
  tea_id = $("#tea_id option:selected").val();
  $.post(url,
         {stu_id: stu_id, course_name:course_name, tea_id:tea_id},
          function(result){
                          result = result.replace(/\s/g,'');
                          if(result == "ok"){
                             td_html =  tea_id +"  <a onclick='make_xg_html(\"" + stu_id  +"\" , \"" + course_name + "\")'>(修改)</a>";
                             $("#" + stu_id + course_name + "tea").html(td_html);
                          }else{
                              alert("修改失败，请联系开发人员！");
                          }

                        }
        );
}


function make_xg_has_attend_html(stu_id, course_name, has_attend_num){
  html =  "<input  id='has_attend_num' type='text'  value='"+ has_attend_num +"'/>";
  html += "<input  type='submit'  onclick='update_has_attend(\""+ stu_id +"\",\"" + course_name + "\")' value='确认'' />";
  $("#" + stu_id + course_name + "has_attend").html(html);
}


function update_has_attend(stu_id, course_name){
  url = "/controller/update_has_attend.php";
  var has_attend_num = $("#has_attend_num").val();
  $.post(url,
         {stu_id: stu_id, course_name:course_name, has_attend_num:has_attend_num},
          function(result){
                          result = result.replace(/\s/g,'');
                          if(result == "ok"){
                             has_attend_html =  has_attend_num +"  <a onclick='make_xg_has_attend_html(\"" + stu_id  +"\" , \"" + course_name + "\" , "  + has_attend_num +")'>(修改)</a>";
                             $("#" + stu_id + course_name + "has_attend").html(has_attend_html);
                          }else{
                              alert("修改失败，请联系开发人员！");
                          }

                        }
        );
}