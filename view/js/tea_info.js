$ = jQuery ;

//  生成聘请老师信息
window.onload = function(){
	make_sklb_html();
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

function make_sklb_html(){
	url = "/controller/get_teacher_student.php";
	ajaxProcess_async(url, 
					 {}, 
					 function(ret_json){
					 	html="<table  class='gridtable'>" +
     						 "<thead>"                    +
     						 "<tr><th>棋院账号</th>"      +
     						 "<th>学生姓名</th>"          + 
                 "<th>课程</th>"              +
                 "<th>QQ</th>"                +
                 "<th>电话</th>"              +
                 "<th>总需课时</th>"          +
                 "<th>已上课时</th>"      	  +   
                 "<th>上课时间</th>"          +              
                 "<th>点击上课</th>"          +
                 "</thead>"                   +
     						 "<tbody>";
       					ret_json = eval('(' + ret_json + ')');
       					for(var i =0; i < ret_json.length; ++i){
       						items = ret_json[i].split("#");
                  has_class_html = "<a onclick='sk(\"" + items[0] + "\")'><span style='color:red'>点击上课</span></a>"
       						html += "<tr>"+
           						 		"<td>"+ items[0] + "</td><td>" + items[1]+ "</td>" +
           						 		"<td>"+ items[2] + "</td><td>" + items[3]+ "</td><td>"  + items[4] +"</td>" +
           						 		"<td>"+ items[5] + "</td><td>" + items[6] + "</td>" + 
                          "<td>"+ items[7] + "</td><td>" + has_class_html + "</td>"
           						 		// "<td>"+ "<a id='ck' title='上课时间' data-container='tbody' data-toggle='popover' data-placement='bottom' data-content='" + items[8] + "'>查看</a></td>" +
            						 	"</tr>";
        					}
      					html += "</tbody></table>";
						  $("#sklb_li").html (html);
              $(function () { $("[data-toggle='popover']").popover();});
					 }
					);
}


function sk(stu_id){
  url="/controller/chose_stu.php";
  $.post(url, {stu_id:stu_id}, function(ret){ ret = ret.replace(/\s/g,'');if(ret == "ok"){window.location.href="classroom.html";}else{alert("系统错误，请联系管理员！")}});
}

