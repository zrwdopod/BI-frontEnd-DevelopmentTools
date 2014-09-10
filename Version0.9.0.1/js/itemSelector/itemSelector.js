/*!
 * 福思维itemSelector插件
 * version: 1.0.0 
 * Need jQuery1.9.1
 * Copyright 2005, 2012 北京福思维科技发展有限公司
 * http://www.fullswing.com.cn/
 * Author RuiWen Zeng
 * Copyright 2012, 2013 RuiWen Zeng [zrwnokias60[at]126.com ] 
 * Date: 2013-12-02
 */
(function ($) {
    //实例化入口
    $.fn.itemSelector = function () {
        var method = arguments[0];

        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('jQuery.itemSelector中不存在方法' + method);
            return this;
        }
        return method.apply(this, arguments);
    }

    //private方法
    function _bind(inputTarget) {
        var $inputTarget = $(inputTarget);
        $inputTarget.empty();
        _createContent($inputTarget);
    }
    function _createContent(inputTarget) {
        var $inputTarget = $(inputTarget);
        var mySettings = $inputTarget.data('settings');
        var bindData = $inputTarget.data('bindData');
        var $itemSelector = $('<div class="itemSelector ui-body-c"></div>');
        $itemSelector.css('position', 'absolute').css('z-index', '10');
        $itemSelector.css('left', $inputTarget.css('left'));
        $itemSelector.css('top', $inputTarget.css('top'));
        $itemSelector.css('width', mySettings.width).css('height', mySettings.height);

        for (var i in bindData) {
            var $block = $('<a href="#"><div style="position:relative;display:block;float:left;width:24%;height:24%;margin:1% 0 0 1%;background:#03b95c;opacity:1;"><div style="display:block;position:absolute;top:3%;left:3%;font-size:1.5em;color:#ffffff;">' + bindData[i][mySettings.displayField] + '</div></div></a>');
            $block.data('bindData', bindData[i]);
            $block.bind('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                
                var $this = $(this);
                var bindData = $this.data('bindData');
                $inputTarget.html(bindData[mySettings.returnField]);
                $this.parents('.itemSelector').remove();
                mySettings.onItemSelect.call(this,e,bindData);
            })
            $itemSelector.append($block);
        }

        $inputTarget.parent().append($itemSelector);


        var zrw = '';
    }
    //public方法
    var methods = {
        init: function (options) {
            // 在每个元素上执行方法
            return this.each(function () {
                var $this = $(this);
                // 尝试去获取settings，如果不存在，则返回“undefined”
                var settings = $this.data('settings');
                // 如果获取settings失败，则根据options和default创建它
                if (typeof (settings) == 'undefined') {
                    var defaultSettings = {
                        "width": "200px",
                        "height": "200px",
                        "displayField":"name",
                        "returnField":"value",
                        "onItemSelect": function itemClick(e) {

                        },
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

            });
        },
        bind: function (data) {
            return $(this).each(function () {
                var $this = $(this);
                var mySettings = $this.data('settings');
                var myBindData = $this.data('bindData');

                $this.data('bindData', data);

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