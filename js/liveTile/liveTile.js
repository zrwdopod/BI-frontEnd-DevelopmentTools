/*!
 * 福思维liveTile插件
 * version: 1.0.0 
 * Need jQuery1.9.1
 * Copyright 2005, 2012 北京福思维科技发展有限公司
 * http://www.fullswing.com.cn/
 * Author RuiWen Zeng
 * Copyright 2012, 2013 RuiWen Zeng [zrwnokias60[at]126.com ] 
 * Date: 2013-09-25
 */
(function ($) {
    //实例化入口
    $.fn.liveTile = function () {
        var method = arguments[0];

        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('jQuery.liveTile中不存在方法' + method);
            return this;
        }
        return method.apply(this, arguments);
    }

    //private方法
    function _bind(liveTile, gridData, mySettings) {
        _createContent(liveTile, gridData, mySettings);
    }
    function _createContent(liveTile, gridData, mySettings) {
        var $liveTile = $(liveTile);
        $liveTile.attr('data-mode', mySettings.BtnMode);
        if (mySettings.BtnColor !== '') {
            $liveTile.addClass(mySettings.BtnColor);
        }
        $liveTile.css('cursor', 'pointer');
        $liveTile.attr('data-initdelay', mySettings.BtnDelay)

        var bgColor = Diablo.getMetrolColor(mySettings.BtnColor);
        var strImg='';
        if (mySettings.ID) {
            $liveTile.attr('id', mySettings.ID);
            strImg = '<img style="width:100%;height:100%;" class="full" src="' + mySettings.BtnIcon + '" alt="1" />';
            $tbLayoutEdit = $('<div class="mtLayoutToolBar swingLayoutEdit swingHide clear-fix"></div>');
            var $btnLayoutMod = $('<div class="mtLayoutToolBarItem edit"><a href="#"><img style="width:100%;height:100%;border:0;"  src="../images/Operate/edit_a_mini.png" alt="1"></a></div>');
            var $btnLayoutDel = $('<div class="mtLayoutToolBarItem del"><a href="#"><img style="width:100%;height:100%;border:0;"  src="../images/Operate/del_a_mini.png" alt="1"></a></div>');
            $tbLayoutEdit.append($btnLayoutDel).append($btnLayoutMod);
            $liveTile.append($tbLayoutEdit);

        }
        else {
            $liveTile.attr('id', 'undefined');
            $liveTile.css('border', 'dotted 1px #FFFFFF');
            $liveTile.addClass('swingHide');
            $liveTile.addClass('swingLayoutEdit');
            $liveTile.addClass('swingLayoutAdd');
        }
        

        var $divFront = $('<div class="ltFront" style="position:absolute;width:100%;height:100%;"></div>').append('<div style="height:100%;width:100%;position:relative;">' + strImg + '<div class="swingHide" style="position:absolute;left:5%;top:5%;"><a class="metroLarger" href="#">' + mySettings.ID + '</a></div><div style="position:absolute;bottom:5%;left:5%;" class="tile-title layoutName">' + mySettings.LayoutName + '</div></div>');
        var $divBack = $('<div class="swingHide ltBack" style="position:absolute;width:100%;height:100%;background:' + bgColor + ';"></div>').append('<div class="layoutNameLarger">' + mySettings.LayoutName + '</div>');


        $liveTile.append($divFront).append($divBack);

        if (mySettings.ID) {

            $liveTile.bind('mouseenter', function () {
                var zrw = '';
                var $this = $(this);
                var $front = $this.find('div.ltFront');
                var $back = $this.find('div.ltBack');

                $front.animate({ height: '0%' }, 300, function () {
                    $front.hide();
                });
                $back.height('0%');
                $back.show();
                $back.animate({ height: '100%' }, 300);

                setTimeout(function () {
                    var zrw = '';
                    var $front = $this.find('div.ltFront');
                    var $back = $this.find('div.ltBack');
                    $front.height('0%');
                    $front.show();
                    $front.animate({ height: '100%' }, 300);
                    $back.animate({ height: '0%' }, 300, function () {
                        $back.hide();
                    })
                }, 2000);
            })
        }
    }
    //public方法
    var methods = {
        init: function (options, data) {
            // 在每个元素上执行方法
            return this.each(function () {
                var $this = $(this);
                // 尝试去获取settings，如果不存在，则返回“undefined”
                var settings = $this.data('settings');
                // 如果获取settings失败，则根据options和default创建它
                if (typeof (settings) == 'undefined') {
                    var defaultSettings = {
                        playOnHover: true,
                        repeatCount: 0,
                        delay: 0,
                        startNow: false
                    }
                    settings = $.extend({}, defaultSettings, options);
                    // 保存我们新创建的settings
                    $this.data('settings', settings);
                }
                else {
                    // 如果我们获取了settings，则将它和options进行合并（这不是必须的，你可以选择不这样做）
                    settings = $.extend({}, settings, options);
                    // 如果你想每次都保存options，可以添加下面代码：
                    $this.data('settings', settings);
                }


                var bindData = $this.data('bindData');
                if (typeof (bindData) == 'undefined') {
                    var defaultData = [];
                    bindData = $.extend({}, defaultData, data);
                    $this.data('bindData', bindData);
                }
                else {
                    bindData = $.extend({}, bindData, data);
                    $this.data('bindData', bindData);
                }

                // 执行代码
                $this.empty();
                _bind(this, bindData, settings);
            });
        },
        bind: function (data) {
            return $(this).each(function () {
                var $this = $(this);
                var mySettings = $this.data('settings');
                var myBindData = $this.data('bindData');

                $this.data('bindData', data);
                $this.append('<h4>bind数据</h4>');
                _bind(this);
            });
        },
        destroy: function (options) {
            return $(this).each(function () {
                var $this = $(this);
                var mySettings = $this.data('settings');
                var myBindData = $this.data('bindData');
                // 执行代码
                $this.removeData('settings');
                $this.removeData('bindData');
            });
        },
        val: function (options) {
            var someValue = this.eq(0).html();
            return someValue;
        }
    };
})(jQuery);