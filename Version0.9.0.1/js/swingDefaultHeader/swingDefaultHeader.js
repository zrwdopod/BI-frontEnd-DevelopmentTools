/*!
 * 福思维XXX面板
 * version: 1.0.0 
 * Need jQuery1.9.1
 * Need jquery.mobile-1.3.1.min.css 只用css不用js
 * Copyright 2005, 2012 北京福思维科技发展有限公司
 * http://www.fullswing.com.cn/
 * Author RuiWen Zeng
 * Copyright 2012, 2013 RuiWen Zeng [zrwnokias60[at]126.com ] 
 * Date: 2013-08-22
 */
(function ($) {
    //实例化入口
    $.fn.swingDefaultHeader = function () {
        var method = arguments[0];

        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('jQuery.swingDefaultHeader中不存在方法' + method);
            return this;
        }
        return method.apply(this, arguments);
    }

    //private方法
    function _bind() {
        var $this = $(this);
        var mySettings = $this.data('settings');
        var myBindData = $this.data('bindData');
    }
    function _judgeHandler(Handlers, msg, mySettings) {
        var zrw = '';
        for (var h in Handlers) {
            var isPremiseMeet = true;
            var premise = Handlers[h].premise;
            for (var i in premise) {
                var zrw = Diablo.parser.resolve.call(this, premise[i].condition, msg);
                if (Diablo.parser.resolve.call(this, premise[i].condition, msg) === premise[i].satisfy) {
                    isPremiseMeet = isPremiseMeet && true;
                }
                else {
                    isPremiseMeet = isPremiseMeet && false;
                }
            }
            if (isPremiseMeet) {
                _dealHandler.call(this, null, Handlers[h], mySettings, msg);
            }
        }
    }
    function _dealHandler(e, Handler, mySettings, msg) {
        var $this = $(this);
        var a_inList = mySettings.InList;
        var a_outList = mySettings.OutList;
        var f_onSendMsg = mySettings.OnSendMsg;


            var zrw = '';
            var a_content = Handler.Content;
            switch (Handler.Action) {
                case 'sendMsg':
                    for (var ct in a_content) {
                        var zrw = '';
                        for (var c in a_outList) {
                            var zrw = '';
                            if (a_content[ct] === a_outList[c].cmd) {
                                var zrw = '';
                                var objNeedResolve = Diablo.cloneJSON(a_outList[c]);
                                var returnObj = Diablo.parser.resolve.call(this, objNeedResolve, msg);
                                f_onSendMsg.call(this, e, returnObj);
                            }
                        }
                    }
                    var zrw = '';
                    break;
                case 'fillData':
                    var zrw = '';
                    var returnObj = {};

                    var objNeedResolve = Diablo.cloneJSON(a_content);
                    returnObj = Diablo.parser.resolve.call(this, objNeedResolve, msg);

                    if (returnObj.username && returnObj.password) {
                        $this.find('input[name=user]').val(returnObj.username);
                        $this.find('input[name=pass]').val(returnObj.password);

                        var $ckbLabelOff = $this.find('div.ui-popup-container label.ui-checkbox-off');
                        $ckbLabelOff.removeClass('ui-checkbox-off').addClass('ui-checkbox-on');
                        $ckbLabelOff.find('span.ui-icon-checkbox-off').removeClass('ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
                    }
                    var zrw = this;
                    break;
                case 'bindMsgData':
                    var zrw = '';
                    //var b= [{ "Event": "click", "Index": "", "Cmds": [{ "src": "*$(this).attr('id')", "cmd": "9003", "dst": "LM", "param1": "*$(this).attr('id')", "param2": "", "param3": "", "param4": "", "param5": "", "paramjson": "", "paramxml": "","paramRelay":{} }] }, { "Event": "LayoutModClick", "Index": "", "Cmds": [{ "src": "*$(this).parents('.live-tile').attr('id')", "cmd": "9005", "dst": "LM", "param1": "83", "param2": "MODAL", "param3": "", "param4": "", "param5": "", "paramjson": "", "paramxml": "","paramRelay":{} }] }];
                    //var a= { "变量0": "", "变量1": "", "变量2": "", "变量3": "", "变量4": "", "变量5": "" };
                    //var layoutData = eval('(' + msg.paramjson + ')');
                    var layoutData = msg.paramjson;
                    var o_layoutData = new Layout(layoutData.父配置ID, layoutData.配置ID, layoutData.名称, layoutData.标签0, layoutData.标签1, layoutData.标签2, layoutData.标签3, layoutData.标签4, layoutData.标签5, layoutData.标签6, layoutData.标签7, eval('(' + layoutData.标签8 + ')'), eval('(' + layoutData.标签9 + ')'));
                    _bind(this, o_layoutData, $(this).data('settings'));
                    break;
                case 'pageRedirect':
                    var zrw = '';
                    window.location.href = a_content.page;
                    break;

                case 'saveLocalStorage':
                    var zrw = '';
                    var $ckbLabelOn = $this.parents('.swingPanel').find('div.ui-popup-container label.ui-checkbox-on');
                    if ($ckbLabelOn[0]) {
                        var a_content = Handler[h].Content;
                        var objNeedResolve = Diablo.cloneJSON(a_content);
                        var returnObj = Diablo.parser.resolve.call(this, objNeedResolve, msg);
                        localStorage.setItem('username', returnObj.username);
                        localStorage.setItem('password', returnObj.password);
                    }
                    else {
                        localStorage.removeItem('username');
                        localStorage.removeItem('password');;
                    }
                default:
                    break;
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
                    var defaultSettings = swingDefaultHeaderDefault;
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
                    var defaultData = [
                                        { "Name": "默认名称", "ID": "默认ID" }
                    ]
                    bindData = $.extend({}, defaultData, data);
                    $this.data('bindData', bindData);
                }
                else {
                    bindData = $.extend({}, bindData, data);
                    $this.data('bindData', bindData);
                }

                // 执行代码
                $this.empty();

                $this.addClass('swingDefaultHeader');
                if (!$this.hasClass('swingPanel')) {
                    $this.addClass('swingPanel');
                }
                for (var i in settings.InList) {
                    if (settings.InList[i]) {
                        if (!$this.hasClass(settings.InList[i].cmd)) {
                            $this.addClass(settings.InList[i].cmd);
                        }
                    }
                }
                _bind.call(this);
            });
        },
        bind: function (data) {
            return $(this).each(function () {
                var $this = $(this);
                var mySettings = $this.data('settings');
                var myBindData = $this.data('bindData');

                $this.data('bindData', data);
                $this.append('<h4>bind数据</h4>');
                _bind.call(this);
                // 执行代码
                var runningCode = '';
            });
        },
        getMessage: function (msg) {
            return $(this).each(function () {
                var $this = $(this);

            });
        },
        load: function () {
            return $(this).each(function () {
                var $this = $(this);
                var mySettings = $this.data('settings');
                var myBindData = $this.data('bindData');

                var a_inList = mySettings.Load;

                for (var i in a_inList) {
                    var zrw = '';
                    var Handler = {};
                    Handler = a_inList[i];
                    _judgeHandler.call(this, Handler, null, mySettings);
                }
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