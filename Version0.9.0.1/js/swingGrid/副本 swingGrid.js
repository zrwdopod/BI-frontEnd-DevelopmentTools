/*!
 * 艺龙elongGrid插件
 * version: 1.0.0 
 * Need jQuery1.9.1
 * 1999 - 2014 eLong, Inc or its affiliates. All Rights Reserved
 * http://hotel.elong.com/
 * Author RuiWen Zeng
 * Copyright 2012, 2013 RuiWen Zeng [zrwnokias60[at]126.com ] 
 * Date: 2014-01-22
 */
(function ($) {
    //实例化入口
    $.fn.elongGrid = function () {
        var method = arguments[0];
        
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('jQuery.elongGrid中不存在方法' + method);
            return this;
        }
        return method.apply(this, arguments);
    }


    //public方法
    var methods = {
        init: function (options, data) {

            var debuggerInit = '';
            // 在每个元素上执行方法
            return this.each(function () {
                var $this = $(this);
                // 尝试去获取settings，如果不存在，则返回“undefined”
                var settings = $this.data('settings');
                // 如果获取settings失败，则根据options和default创建它
                if (typeof (settings) == 'undefined') {
                    var defaultSettings = elongGridDefault;
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

                var simpleData = [{ "elongRowHeader": "第1行", "FirstName": "", "Surname": "", "Gender": "", "Age": 0, "DateOfBirth": "2000-01-01" }, { "elongRowHeader": "第2行", "FirstName": "达华", "Surname": "任", "Gender": "G001", "Age": 56, "DateOfBirth": "1957-03-27" }, { "elongRowHeader": "第3行", "FirstName": "卡丘", "Surname": "皮", "Gender": "G006", "Age": 13, "DateOfBirth": "2000-11-06" }];

                if (data) {
                    $this.data('bindData', data);
                }
                else {
                    $this.data('bindData', simpleData);
                }
                // 执行代码
               

            });
        },
        load: function () {
            return $(this).each(function () {
                var $this = $(this);
                var mySettings = $this.data('settings');
                var myBindData = $this.data('bindData');
                var Handler = mySettings.Load;

                // 执行代码
            
            });
        },
        bind: function (data) {
            return $(this).each(function () {
                var $this = $(this);
                var mySettings = $this.data('settings');
                var myBindData = $this.data('bindData');

                $this.data('bindData', data);
                myBindData = $this.data('bindData');

                // 执行代码
               
            });
        },
        destroy: function (options) {
            return $(this).each(function () {
                var $this = $(this);
                var mySettings = $this.data('settings');
                var myBindData = $this.data('bindData');

                $this.removeData('settings');
                $this.removeData('bindData');
                // 执行代码
            });
        },
        val: function (options) {
            var someValue = this.eq(0).html();
            return someValue;
        }
    };



    //private方法
    function _bind(panel, myBindData, mySettings) {
        
    }
    
})(jQuery);