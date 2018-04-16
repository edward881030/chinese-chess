var glume = function(banners_id, focus_id){
        this.$ctn = $('#' + banners_id);
        this.$focus = $('#' + focus_id);
        this.$adLis = null;
        this.$btns = null;
        this.switchSpeed = 3;//自动播放间隔(s)
        this.defOpacity = 1;
        this.crtIndex = 0;  
        this.adLength = 0;
        this.timerSwitch = null;
        this.init();
    };
    glume.prototype = {
        fnNextIndex:function(){
            return (this.crtIndex >= this.adLength-1)?0:this.crtIndex+1;
        },
        //动画切换
        fnSwitch:function(toIndex){
            if(this.crtIndex==toIndex){return;}
            var me = this;
            me.$adLis.filter(':eq('+toIndex+')').fadeIn("slow");
            this.$adLis.filter(':eq('+this.crtIndex+')').fadeOut("slow")
            this.crtIndex = toIndex;
            this.$btns.removeClass('on');
            this.$btns.filter(':eq('+toIndex+')').addClass('on');
        },
        fnAutoPlay:function(){
            this.fnSwitch(this.fnNextIndex());
        },
        fnPlay:function(){
            var me = this;
            me.timerSwitch = window.setInterval(function() {
                me.fnAutoPlay();
            },me.switchSpeed*1000);
        },
        fnStopPlay:function(){
            window.clearTimeout(this.timerSwitch);
            this.timerSwitch = null;
        },

        init:function(){
            this.$adLis = this.$ctn.children();
            this.$btns = this.$focus.children();
            this.adLength = this.$adLis.length;

            var me = this;
            //点击切换
            this.$focus.on('click', 'a', function(e) {
                e.preventDefault();
                var index = parseInt($(this).attr('data-index'), 10)
                me.fnSwitch(index);
            });
            // this.$adLis.filter(':eq('+ this.crtIndex +')').css('zIndex', 2);
            this.fnPlay();

            //hover时暂停动画
            this.$focus.hover(function() {
                me.fnStopPlay();
            }, function() {
                me.fnPlay();
            });
        }
    };
    var player1 = new glume('_banners', '_focus');    
    var player1 = new glume('_banners_title', '_focus_title'); 