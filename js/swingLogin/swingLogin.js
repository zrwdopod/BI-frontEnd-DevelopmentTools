/*!
 * 福思维swingLogin面板
 * version: 1.0.0 
 * Need jQuery1.9.1
 * Need jquery.mobile-1.3.1.min.css 只用css不用js
 * Copyright 2005, 2012 北京福思维科技发展有限公司
 * http://www.fullswing.com.cn/
 * Author RuiWen Zeng
 * Copyright 2012, 2013 RuiWen Zeng [zrwnokias60[at]126.com ] 
 * Date: 2013-09-11
 */
(function ($) {
    //实例化入口
    $.fn.swingLogin = function () {
        var method = arguments[0];

        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('jQuery.swingLogin中不存在方法' + method);
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
                    var defaultSettings = swingLoginDefault;
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


                var simpleData = [];
                var complexData = [];

                if (data) {
                    $this.data('bindData', data);
                }
                else {
                    $this.data('bindData', simpleData);
                }

                // 执行代码
                $this.empty();
                if (!$this.hasClass('swingLogin')) {
                    $this.addClass('swingLogin');
                }
                if (!$this.hasClass('swingPanel')) {
                    $this.addClass('swingPanel');
                }
                var zrw = '';
                for (var i in settings.InList) {
                    if (settings.InList[i]) {
                        if (!$this.hasClass(settings.InList[i].cmd)) {
                            $this.addClass(settings.InList[i].cmd);
                        }
                    }
                }
                if (settings.LogConfig.level >= 3 && settings.LogConfig.isLogInfo) {
                    Diablo.printLog('界面元素', false, '实例化', '实例化swingLogin');
                }

                _bind(this, $this.data('bindData'), $this.data('settings'));


            });
        },
        getMessage: function (msg) {
            return $(this).each(function () {
                var $this = $(this);
                var mySettings = $this.data('settings');
                var myBindData = $this.data('bindData');

                var a_inList = mySettings.InList;
                var Handler = {};

                for (var i in a_inList) {
                    var zrw = '';
                    if (msg.cmd === a_inList[i].cmd) {
                        var zrw = '';
                        Handler = a_inList[i].Handler;
                    }

                }
                _judgeHandler.call(this, Handler, msg, mySettings);
            });
        },
        load: function () {
            return $(this).each(function () {
                var $this = $(this);
                var mySettings = $this.data('settings');
                var myBindData = $this.data('bindData');

                var Handler = mySettings.Load;
                _judgeHandler.call(this, Handler, null, mySettings);
               
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
                var runningCode = '';
                $this.append('<h4>bind数据</h4>');
                _bind(this, myBindData, mySettings);
            });
        },
        destroy: function (options) {
            return $(this).each(function () {
                var $this = $(this);
                var mySettings = $this.data('settings');
                var myBindData = $this.data('bindData');
                // 执行代码
                var runningCode = '';
                $this.removeData('settings');
                $this.removeData('bindData');
            });
        },
        val: function (options) {
            var someValue = this.eq(0).html();
            return someValue;
        }
    };



    //private方法
    function _bind(panel, myBindData, mySettings) {
        var $panel = $(panel);
        $panel.empty();
        $panel.css('text-align', 'center');

        var isGroup = _getIsGroup(myBindData);
        if (isGroup) {
            var $grouper = $('<div class="swingGrouper"></div>')
            _getGroupDiv($grouper, myBindData, mySettings);
            $panel.append($grouper);
        }
        else {
            $panel.append(_createContent(myBindData, mySettings));
        }
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
                    _bind(this, msg.paramjson, $(this).data('settings'));
                    break;
                case 'pageRedirect':
                    var zrw = '';
                    window.location.href = a_content.page;
                    break;

                case 'saveLocalStorage':
                    var zrw = '';
                    var $ckbLabelOn = $this.parents('.swingPanel').find('div.ui-popup-container label.ui-checkbox-on');
                    if ($ckbLabelOn[0]) {
                        var a_content = Handler.Content;
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


    function _getIsGroup(myBindData) {
        var isGroup = false;
        for (var i in myBindData) {
            if (myBindData[i]) {
                if (myBindData[i].items) {
                    isGroup = true;
                }
                if (myBindData[i].swingInputs) {
                    isGroup = true;
                }
            }
        }
        return isGroup;
    }

    function _getGroupDiv(parent, myBindData, mySettings) {
        var $parent = $(parent);
        for (var i in myBindData) {
            //var $item = $('<div data-role="collapsible" data-content-theme="c" class="ui-collapsible ui-collapsible-inset ui-corner-all ui-collapsible-themed-content ui-collapsible-collapsed"></div>');
            var $item = $('<div data-role="collapsible"></div>');
            //$item.attr('id',data[i].ID)
            $item.attr('data-content-theme', mySettings.UI.PanelStyle.outerTheme);
            $item.addClass('ui-collapsible');
            $item.addClass('ui-collapsible-inset');
            $item.addClass('ui-corner-all');
            $item.addClass('ui-collapsible-themed-content');
            $item.addClass('ui-collapsible-collapsed');

            //var $h3 = $('<h3 class="ui-collapsible-heading ui-collapsible-heading-collapsed"><a href="#" class="ui-collapsible-heading-toggle ui-btn ui-fullsize ui-btn-icon-left ui-btn-up-c" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="span" data-icon="plus" data-iconpos="left" data-theme="c" data-mini="false"><span class="ui-btn-inner"><span class="ui-btn-text">' + data[i].ID + '<span class="ui-collapsible-heading-status"> click to expand contents</span></span><span class="ui-icon ui-icon-shadow ui-icon-plus">&nbsp;</span></span></a></h3>')
            var $h3 = $('<h3></h3>');
            if (myBindData[i].ID) {
                $h3.attr('id', myBindData[i].ID);
            }
            else {
                $h3.attr('id', myBindData[i].name);
            }

            $h3.addClass('ui-collapsible-heading');
            $h3.addClass('ui-collapsible-heading-collapsed');
            var $a = $('<a></a>');
            $a.attr('href', '#');
            $a.addClass('ui-collapsible-heading-toggle');
            $a.addClass('ui-btn');
            $a.addClass('ui-fullsize');
            $a.addClass('ui-btn-icon-left');
            $a.addClass('ui-btn-up-' + mySettings.UI.PanelStyle.outerTheme);
            $a.attr('data-corners', 'false');
            $a.attr('data-shadow', 'false');
            $a.attr('data-iconshadow', 'true');
            $a.attr('data-wrapperels', 'span');
            $a.attr('data-icon', 'plus');
            $a.attr('data-iconpos', 'left');
            $a.attr('data-theme', mySettings.UI.PanelStyle.outerTheme);
            $a.attr('data-mini', 'false');
            var $spanInner = $('<span class="ui-btn-inner"></span>')
            var $spanBtn = $('<span class="ui-btn-text">' + myBindData[i].name + '<span>')
            var $spanStatus = $('<span class="ui-collapsible-heading-status"> click to expand contents</span>')
            var $spanIcon = $('<span class="ui-icon ui-icon-shadow ui-icon-plus">&nbsp;</span>');
            $spanBtn.append($spanStatus);
            $spanInner.append($spanBtn).append($spanIcon);
            $a.append($spanInner);
            $h3.append($a);
            $parent.append($item.append($h3));
            //如果是根节点
            if ($item.parent().hasClass('swingDivMenu')) {
                $item.css('margin', '0em 0em');
                $a.removeClass('ui-btn-up-' + mySettings.UI.PanelStyle.outerTheme).addClass('ui-btn-up-' + mySettings.UI.PanelStyle.outerTheme);
            }

            $h3.hover(function () {
                $this = $(this);
                var toggleClasses = $this.children('a.ui-collapsible-heading-toggle').attr('class');
                if (toggleClasses.indexOf('ui-btn-down-') !== -1 || toggleClasses.indexOf('ui-btn-up-') !== -1) {
                    if (toggleClasses.indexOf('ui-btn-down-') !== -1) {
                        var iStart = toggleClasses.indexOf('ui-btn-down-');
                        var theme = toggleClasses.substr(iStart + 12, 1);
                        $this.children('a.ui-collapsible-heading-toggle').addClass('ui-btn-hover-' + theme);
                    }

                    if (toggleClasses.indexOf('ui-btn-up-') !== -1) {
                        var iStart = toggleClasses.indexOf('ui-btn-up-');
                        var theme = toggleClasses.substr(iStart + 10, 1);
                        $this.children('a.ui-collapsible-heading-toggle').addClass('ui-btn-hover-' + theme);
                    }
                }
            })
            $h3.mouseleave(function () {
                $this = $(this);
                var toggleClasses = $this.children('a.ui-collapsible-heading-toggle').attr('class');
                if (toggleClasses.indexOf('ui-btn-hover-') !== -1) {
                    var iStart = toggleClasses.indexOf('ui-btn-hover-');
                    var theme = toggleClasses.substr(iStart + 13, 1);
                    $this.children('a.ui-collapsible-heading-toggle').removeClass('ui-btn-hover-' + theme);
                }
            })


            if (myBindData[i].items) {
                if (myBindData[i].items.length > 0) {
                    //var $spanCount = $('<span style="float:right;" class="ui-li-count ui-btn-up-c ui-btn-corner-all">&nbsp&nbsp' + myBindData[i].items.length + '&nbsp&nbsp</span>')
                    //$spanBtn.append($spanCount);
                    $h3.click(function () {
                        $this = $(this);
                        if ($this.parent().hasClass('ui-collapsible-collapsed')) {
                            _explandNode(this);
                        }
                        else {
                            _collapseNode(this);
                        }
                    })
                    var $content = $('<div class="ui-collapsible-content ui-body-' + mySettings.UI.PanelStyle.outerTheme + ' ui-collapsible-content-collapsed" aria-hidden="false"></div>');
                    $item.append($content)
                    arguments.callee($content, myBindData[i].items, mySettings);
                }
            }
            else if (myBindData[i].swingLogin) {
                if (myBindData[i].swingLogin.length > 0) {
                    //var $spanCount = $('<span style="float:right;" class="ui-li-count ui-btn-up-c ui-btn-corner-all">&nbsp&nbsp' + myBindData[i].swingLogin.length + '&nbsp&nbsp</span>')
                    //$spanBtn.append($spanCount);
                    $h3.click(function () {
                        $this = $(this);
                        if ($this.parent().hasClass('ui-collapsible-collapsed')) {
                            _explandNode(this);
                        }
                        else {
                            _collapseNode(this);
                        }
                    })
                    var $content = $('<div class="ui-collapsible-content ui-body-' + mySettings.UI.PanelStyle.outerTheme + ' ui-collapsible-content-collapsed" aria-hidden="false"></div>');
                    $item.append($content)

                    $content.append(_createContent(myBindData[i].swingLogin[0].swingRows, mySettings));
                }
            }
            else {
                $spanIcon.removeClass('ui-icon-plus').addClass('ui-icon-arrow-r');
            }
        }
    }

    function _createContent(data, mySettings) {


        var LOGIN = '<div class="ui-popup-container fade in ui-popup-active" style="display: inline-block;position: relative;margin-top:10%; margin-left:auto;margin-right:auto;">'
                    + '<div data-role="popup" id="popupLogin" data-theme="a" class="ui-corner-all ui-popup ui-body-a ui-overlay-shadow">'
                    + '<div style="padding: 10px 20px;">'
                    + '</div>'
                    + '</div>';

        var H3 = '<h3>用户登录</h3>';


        var LBUSERNAME = '<label for="un" class="ui-hidden-accessible ui-input-text">用户名:</label>';
        var DIVUSERNAME = '<div class="ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-a"></div>';
        var INPUTUSERNAME = '<input type="text" name="user" id="un" value="" placeholder="用户名" data-theme="a" class="ui-input-text ui-body-a">';


        var LBPASSWORD = '<label for="pw" class="ui-hidden-accessible ui-input-text">密码:</label>';
        var DIVPASSWORD = '<div class="ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-a"></div>';
        var INPUTPASSWORD = '<input type="password" name="pass" id="pw" value="" placeholder="密码" data-theme="a" class="ui-input-text ui-body-a">';
        var DIVSUBMIT = '<div data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="check" data-theme="' + mySettings.UI.PanelStyle.innerTheme + '" data-disabled="false" class="ui-submit ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-' + mySettings.UI.PanelStyle.innerTheme + '" aria-disabled="false"></div>';
        //var DIVSUBMIT = '<div data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="arrow-r" data-theme="'+mySettings.UI.PanelStyle.innerTheme+'" data-disabled="false" class="ui-submit ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-'+mySettings.UI.PanelStyle.innerTheme+'" aria-disabled="false"></div>';
        var SPANBTN = '<span class="ui-btn-inner">'
                   + '<span class="ui-btn-text">登录</span>'
                   + '<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>'
               + '</span>';
        var BTNSUBMIT = '<button type="submit" data-theme="' + mySettings.UI.PanelStyle.innerTheme + '" data-icon="check" class="ui-btn-hidden" data-disabled="false">go</button>';
        var CKBREMEMBERME = '<div class="ui-checkbox"><input type="checkbox" name="checkbox-mini-0" id="checkbox-mini-0" class="custom" data-mini="true"><label for="checkbox-mini-0" data-corners="true" data-shadow="false" data-iconshadow="true" data-wrapperels="span" data-icon="checkbox-off" data-theme="' + mySettings.UI.PanelStyle.innerTheme + '" data-mini="true" class="ui-checkbox-off ui-btn ui-btn-corner-all ui-btn-icon-left ui-btn-up-' + mySettings.UI.PanelStyle.innerTheme + '"><span class="ui-btn-inner"><span class="ui-btn-text">记住密码</span><span class="ui-icon ui-icon-checkbox-off ui-icon-shadow">&nbsp;</span></span></label></div>';
        var $login = $(LOGIN);

        var $h3 = $(H3);

        var $lbUserName = $(LBUSERNAME);
        var $divUserName = $(DIVUSERNAME);
        var $inputUserName = $(INPUTUSERNAME);
        $divUserName.append($inputUserName);

        var $lbPassword = $(LBPASSWORD);
        var $divPassword = $(DIVPASSWORD);
        var $inputPassword = $(INPUTPASSWORD);
        $divPassword.append($inputPassword);

        var $divSubmit = $(DIVSUBMIT);
        var $spanBtn = $(SPANBTN);
        var $btnSubmit = $(BTNSUBMIT);
        var $ckbRememberMe = $(CKBREMEMBERME);
        var a_events = mySettings.Events;

        $ckbRememberMe.find('label').bind('click', function (e) {
            var $this = $(this);
            if ($this.hasClass('ui-checkbox-off')) {
                $this.removeClass('ui-checkbox-off').addClass('ui-checkbox-on');
                $this.children('span.ui-btn-inner').children('span.ui-icon').removeClass('ui-icon-checkbox-off').addClass('ui-icon-checkbox-on');
            }
            else {
                $this.removeClass('ui-checkbox-on').addClass('ui-checkbox-off');
                $this.children('span.ui-btn-inner').children('span.ui-icon').removeClass('ui-icon-checkbox-on').addClass('ui-icon-checkbox-off');
            }
        });


        _jqmBtnEventsBind($ckbRememberMe.find('label'), mySettings.UI.PanelStyle.innerTheme);
        _jqmBtnEventsBind($divSubmit, mySettings.UI.PanelStyle.innerTheme);


        for (var i in a_events) {
            var thisEvent = a_events[i];
            switch (thisEvent.type) {
                case 'btnLoginClick':
                    $btnSubmit.bind('click', { 'myEvent': thisEvent }, function (e) {
                        var zrw = '';
                        var $this = $(this);
                        var Handler = e.data.myEvent.Handler;
                       
                        _judgeHandler.call(this, Handler, null, mySettings);
                    })
                    break;
                case 'btnLoginKeydown':
                    $btnSubmit.bind('keydown', { 'myEvent': thisEvent }, function (e) {
                        var zrw = '';
                        var $this = $(this);
                        if (e.data.myEvent.Index === e.key) {
                            var Handler = e.data.myEvent.Handler;
                            _judgeHandler.call(this, Handler, null, mySettings);

                        }
                    })
                    break;
                default:
                    break;
            }
            var zrw = '';
        }

        $divSubmit.append($spanBtn).append($btnSubmit);
        $login.children('div').children('div').append($h3).append($lbUserName).append($divUserName).append($lbPassword).append($divPassword).append($ckbRememberMe).append($divSubmit);
        return $login;
    }

    function _explandNode(heading) {
        var $heading = $(heading);
        var $thisItem = $heading.parent();
        var $headingToggle = $heading.children('a.ui-collapsible-heading-toggle');
        var $icon = $headingToggle.children('.ui-btn-inner').children('.ui-icon');
        var $content = $thisItem.children('div.ui-collapsible-content');

        $thisItem.removeClass('ui-collapsible-collapsed');
        $heading.removeClass('ui-collapsible-heading-collapsed');
        var toggleClasses = $headingToggle.attr('class');
        if (toggleClasses.indexOf('ui-btn-up-') !== -1) {
            var iStart = toggleClasses.indexOf('ui-btn-up-');
            var theme = toggleClasses.substr(iStart + 10, 1);
            $headingToggle.removeClass('ui-btn-up-' + theme).addClass('ui-btn-down-' + theme);
        }
        $icon.addClass('ui-icon-minus').removeClass('ui-icon-plus');
        $content.removeClass('ui-collapsible-content-collapsed');
    }

    function _collapseNode(heading) {
        var $heading = $(heading);
        var $thisItem = $heading.parent();
        var $headingToggle = $heading.children('a.ui-collapsible-heading-toggle');
        var $icon = $headingToggle.children('.ui-btn-inner').children('.ui-icon');
        var $content = $thisItem.children('div.ui-collapsible-content');

        $thisItem.addClass('ui-collapsible-collapsed');
        $heading.addClass('ui-collapsible-heading-collapsed');
        var toggleClasses = $headingToggle.attr('class');
        if (toggleClasses.indexOf('ui-btn-down-') !== -1) {
            var iStart = toggleClasses.indexOf('ui-btn-down-');
            var theme = toggleClasses.substr(iStart + 12, 1);
            $headingToggle.addClass('ui-btn-up-' + theme).removeClass('ui-btn-down-' + theme);
        }
        $icon.removeClass('ui-icon-minus').addClass('ui-icon-plus');
        $content.addClass('ui-collapsible-content-collapsed');
    }
    function _jqmBtnEventsBind(domObj, theme) {
        var $domObj = $(domObj);
        $domObj.bind('mousedown', function () {
            var $this = $(this);
            _jqmMousedown($this, theme);
        });

        $domObj.bind('mouseup', function () {
            var $this = $(this);
            _jqmMouseup($this, theme);
        });
        $domObj.bind('mouseover', function () {
            var $this = $(this);
            _jqmMouseover($this, theme);
        });

        $domObj.bind('mouseout', function () {
            var $this = $(this);
            _jqmMouseout($this, theme);
        });

    }


    function _jqmMouseover(domObj, theme) {
        var $domObj = $(domObj);
        if ($domObj.hasClass('ui-btn-up-' + theme)) {
            $domObj.removeClass('ui-btn-up-' + theme).addClass('ui-btn-hover-' + theme);
        }
    }
    function _jqmMouseout(domObj, theme) {
        var $domObj = $(domObj);
        if ($domObj.hasClass('ui-btn-hover-' + theme)) {
            $domObj.removeClass('ui-btn-hover-' + theme).addClass('ui-btn-up-' + theme);
        }
    }

    function _jqmMousedown(domObj, theme) {
        var $domObj = $(domObj);
        if ($domObj.hasClass('ui-btn-hover-' + theme)) {
            $domObj.removeClass('ui-btn-hover-' + theme).addClass('ui-btn-down-' + theme);
        }
    }

    function _jqmMouseup(domObj, theme) {
        var $domObj = $(domObj);
        if ($domObj.hasClass('ui-btn-down-' + theme)) {
            $domObj.removeClass('ui-btn-down-' + theme).addClass('ui-btn-up-' + theme);
        }
    }
})(jQuery);