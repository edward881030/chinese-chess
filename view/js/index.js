count_down_timer = setTimeout("count_down('2016/08/18 20:00:00')", 1000);

jQuery(function(){
    $ = jQuery ;
    //main menu
    banner_height = $(window).height() - $('#templatemo_banner_menu').outerHeight();
    $('#templatemo_about').height(banner_height);
    $('#templatemo_events').height(banner_height);
    $('#templatemo_timeline').height(banner_height);
    $('#templatemo_contact').height(banner_height);
    $('#templatemo_class').height(banner_height);
    $('.banner').height(banner_height);
    $("#templatemo_banner_menu ul").singlePageNav({offset:$('#templatemo_banner_menu').outerHeight()});
    //banner slide
    // $('.banner').unslider({fluid: true});
    // $(window).on("load scroll resize", function(){
    //     banner_height = $(window).height() - $('#templatemo_banner_menu').outerHeight();
    //     
    //     $('.banner ul li').height(banner_height);
    //     if(banner_height > 250){
    //         caption_margin_top = "50px";
    //         $('.banner .slide_caption:hidden').show();
    //         $('.banner .slide_caption').css({"margin-top":caption_margin_top});
    //     }else{
    //         $('.banner .slide_caption').hide();
    //     }
    //     $("#templatemo_banner_slide > div").css({"background-size":"100% 100%"});
    // });
   //about icon
    $(window).on("load scroll resize", function(){
        about_wap_width = $(".about_icon").width();
        about_icon_padding_left = (about_wap_width/100)*30;
        about_icon_width = (about_wap_width/100)*40;
        about_icon_size = (about_icon_width/100)*50;
        about_icon_padding_top = (about_icon_width/100)*25;
        $(".about_icon .imgwap").css({
                                                    'margin-left': about_icon_padding_left,
                                                    'width': about_icon_width,
                                                    'height': about_icon_width
                                                    });
    });
    $(window).on("load resize", function(){
        $.timeline_right_position_top = 0 ;
        $.timeline_old_right_position_top = 0 ;
        $.timeline_left_position_top = 0 ;
        $.timeline_old_left_position_top = 0 ;
        w_width = ($(window).width()>1600) ? 1600 : $(window).width() ;
        $.timeline_item_width = ( w_width - 50) / 2;
        $(".time_line_wap").each(function(){
            //if class name already exit remove
            $(this).children("a.left_timer").remove();
            $(this).children("a.right_timer").remove();
            $(this).removeClass("left_timeline");
            $(this).removeClass("right_timeline");
            if($(window).width()<970){
                $("#templatemo_timeline .container-fluid").css({"position":"absolute"});
                positon_left = $("#templatemo_timeline .container-fluid").position().left +100;
                //put on right
                $(this).css({   
                                    'left': 70,
                                    'top':$.timeline_right_position_top,
                                    'width': $(window).width() - positon_left
                                 });
                $(this).addClass("right_timeline");
                $.timeline_old_right_position_top = $.timeline_right_position_top;
                $.timeline_right_position_top = $.timeline_right_position_top + $(this).outerHeight() + 40 ;
                $(this).prepend("<a href=\"#\" class=\"right_timer\"><span class=\"glyphicon glyphicon-time\"></span></a>");
                $(this).children("a.right_timer").css({left:-86, width: 60});
            }else if($.timeline_left_position_top == 0){
                $("#templatemo_timeline .container-fluid").css({"position":"relative"});
                //put on left
                $(this).css({   
                                    'left':0,
                                    'top':0,
                                    'width': $.timeline_item_width - 50
                                 });
                $(this).addClass("left_timeline");
                $.timeline_old_left_position_top = $.timeline_left_position_top;
                $.timeline_left_position_top = $.timeline_left_position_top + $(this).outerHeight() + 40 ;
                $(this).prepend("<a href=\"#\" class=\"left_timer\"><span class=\"glyphicon glyphicon-time\"></span></a>");
                $(this).children("a.left_timer").css({left:$.timeline_item_width-50});
            }else if( $.timeline_right_position_top < $.timeline_left_position_top ){
                $("#templatemo_timeline .container-fluid").css({"position":"relative"});
                $.timeline_right_position_top = ($.timeline_old_left_position_top + 40) < $.timeline_right_position_top  ? $.timeline_right_position_top : $.timeline_right_position_top + 40;
                //put on right
                $(this).css({   
                                    'left': $.timeline_item_width + 79,
                                    'top':$.timeline_right_position_top,
                                    'width': $.timeline_item_width - 50
                                 });
                $(this).addClass("right_timeline");
                $.timeline_old_right_position_top = $.timeline_right_position_top;
                $.timeline_right_position_top = $.timeline_right_position_top + $(this).outerHeight() + 40 ;
                $(this).prepend("<a href=\"#\" class=\"right_timer\"><span class=\"glyphicon glyphicon-time\"></span></a>");
                $(this).children("a.right_timer").css({left:-99});
            }else{
                $("#templatemo_timeline .container-fluid").css({"position":"relative"});
                $.timeline_left_position_top = ($.timeline_old_right_position_top + 40) < $.timeline_left_position_top ? $.timeline_left_position_top : $.timeline_left_position_top + 40;
                //put on left
                $(this).css({
                                    'left':0,
                                    'top':$.timeline_left_position_top,
                                    'width': $.timeline_item_width - 50
                                 });
                $(this).addClass("left_timeline");
                $.timeline_old_left_position_top = $.timeline_left_position_top;
                $.timeline_left_position_top = $.timeline_left_position_top + $(this).outerHeight() + 40 ;
                $(this).prepend("<a href=\"#\" class=\"left_timer\"><span class=\"glyphicon glyphicon-time\"></span></a>");
                $(this).children("a.left_timer").css({left:$.timeline_item_width-50});
            }
            //calculate and define container height
            if($.timeline_left_position_top > $.timeline_right_position_top ){
                $("#templatemo_timeline .container-fluid").height($.timeline_left_position_top-40);
                $("#templatemo_timeline").height($.timeline_left_position_top+200);
            }else{
                $("#templatemo_timeline .container-fluid").height($.timeline_right_position_top-40);
                $("#templatemo_timeline").height($.timeline_right_position_top+200);
            }
            $(this).fadeIn();
        });
    });
});

//倒计时
function count_down(dd){
    //取得指定时间的总毫秒数
    var t = new Date(dd).getTime();
    //取得当前毫秒数
    n = new Date().getTime();
    // alert(n);
    //得到时间差
    c = t - n;
    // alert(c);
    if(c<=0){
        //如果差小于等于0  也就是过期或者正好过期，则推出程序
        $('#count_down').text('0天0时0秒0秒');
        // //清除计时器
        // clearInterval(count_down_timer);
        //结束执行
        return;
    }
    //一天共多少毫秒
    var ds = 60*60*24*1000,
    //总毫秒除以一天的毫秒 得到相差的天数
    d = parseInt(c/ds),
    //然后取完天数之后的余下的毫秒数再除以每小时的毫秒数得到小时
    h = parseInt((c-d*ds)/(3600*1000)),
    //减去天数和小时数的毫秒数剩下的毫秒，再除以每分钟的毫秒数，得到分钟数
    m = parseInt((c - d*ds - h*3600*1000)/(60*1000)),
    //得到最后剩下的毫秒数除以1000 就是秒数，再剩下的毫秒自动忽略即可
    s = parseInt((c-d*ds-h*3600*1000-m*60*1000)/1000);
    $('#count_down').text(d + '天' + h + '时' + m + '分' + s + '秒');
    // alert(d + '天' + h + '时' + m + '秒');
    setTimeout("count_down('2016/08/18 20:00:00')", 1000);
}