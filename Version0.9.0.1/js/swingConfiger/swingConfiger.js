/*!
 * 福思维swingConfiger面板
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
    $.fn.swingConfiger = function () {
        var method = arguments[0];

        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('jQuery.swingConfiger中不存在方法' + method);
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
                var $panel = $(this);
                // 尝试去获取settings，如果不存在，则返回“undefined”
                var settings = $panel.data('settings');

                // 如果获取settings失败，则根据options和default创建它
                if (typeof (settings) == 'undefined') {
                    var defaultSettings = swingConfigerDefault;
                    settings = $.extend({}, defaultSettings, options);
                    // 保存我们新创建的settings
                    $panel.data('settings', settings);
                }
                else {
                    // 如果我们获取了settings，则将它和options进行合并（这不是必须的，你可以选择不这样做）
                    settings = $.extend({}, settings, options);
                    // 如果你想每次都保存options，可以添加下面代码：
                    $panel.data('settings', settings);
                }


                var simpleData = [];
                var complexData = [];

                if (data) {
                    $panel.data('bindData', data);
                }
                else {
                    $panel.data('bindData', simpleData);
                }

                // 执行代码
                $panel.empty();
                if (!$panel.hasClass('swingConfiger')) {
                    $panel.addClass('swingConfiger');
                }
                if (!$panel.hasClass('swingPanel')) {
                    $panel.addClass('swingPanel');
                }
                var zrw = '';
                for (var i in settings.InList) {
                    if (settings.InList[i]) {
                        if (!$panel.hasClass(settings.InList[i].cmd)) {
                            $panel.addClass(settings.InList[i].cmd);
                        }
                    }
                }

                if (settings.LogConfig.level >= 3 && settings.LogConfig.isLogInfo) {
                    Diablo.printLog('界面元素', false, '实例化', '实例化swingConfiger');
                }


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
                var $panel = $(this);
                var mySettings = $panel.data('settings');
                var myBindData = $panel.data('bindData');

                var Handler = mySettings.Load;

                _judgeHandler.call(this, Handler, null, mySettings);

                var startMsg = $panel.parents('.swingLayout').data('startMsg');

                switch (startMsg.param2) {
                    case '面板':
                        var $table = $('<table><tr><td><label class="ui-input-text">面板类型:</label></td><td><label class="ui-input-text panelType">swingGrid</label></td><td></td><td></td></tr></table>')
                        var $panelTypeText = $table.find('.panelType');
                        $panelTypeText.bind('click', function () {
                            var $this = $(this);
                            $this.itemSelector('init', {
                                "width": "500px",
                                "height": "500px",
                                "onItemSelect": itemClick,
                            });
                            $this.itemSelector('bind', panelType);
                        });

                        function itemClick(e, itemData) {
                            var $this = $(this);
                            var defaultConfigClone = Diablo.cloneJSON(itemData.defaultConfig);
                            switch (startMsg.param3)
                            {
                                case 'MODIFY':
                                    defaultConfigClone.ID = startMsg.param4;
                                    defaultConfigClone.UI.PanelLocation = startMsg.param5;
                                    break;
                                case 'ADD':
                                    defaultConfigClone.pID = startMsg.param4;
                                    defaultConfigClone.UI.PanelLocation = startMsg.param5;
                                    defaultConfigClone.ID = '';
                                    defaultConfigClone.Name = '新建面板';
                                    break;

                            }
                            _bind($panel, defaultConfigClone, mySettings)
                        }

                        var $panelType = $('<div class="swingPanelType"></div>');
                        $panelType.append($table);
                        $panel.append($panelType);
                        break;

                    case '布局':

                        break;

                }
                var $toolBar = $('<div style="width:10%;height:10%;border:0;float:right;" data-role="controlgroup" data-type="horizontal" data-mini="true" class="swingToolBar ui-corner-all ui-controlgroup ui-controlgroup-horizontal ui-mini" aria-disabled="false" data-disabled="false" data-shadow="false" data-corners="true" data-exclude-invisible="true" data-init-selector=""><div class="ui-controlgroup-controls">'
+ '<a href="#" data-role="button" data-icon="arrow-r" data-iconpos="left" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="SAVEBT ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text">保存</span><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></span></a>'
+ '</div></div>');

                $panel.append($toolBar);
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



    function _adapteData(startMsg, data) {
        if (data) {
            var zrw = '';
            if (startMsg.param2 === '布局') {
                if (data.标签0) {
                    data = toLayout(data);
                }
            }
            else if (startMsg.param2 === '面板') {
                if (data.标签0) {
                    data = toPanel(data);
                }
            }
        }
        else {
            var zrw = '';
            if (startMsg.param2 === '布局') {
                data = new LayoutS(startMsg.param4, "", "新建布局", "STANDARD02", "true", "{}", "slide", "", "", "0", "../images/Google/Doc - Google Docs.png", "[{ \"Event\":\"click\",\"Index\": \"\",\"Cmds\":[{\"src\":\"*$(this).attr('id')\",\"cmd\":\"9003\",\"dst\":\"LM\",\"param1\":\"*$(this).attr('id')\",\"param2\":\"\",\"param3\":\"\",\"param4\":\"\",\"param5\":\"\",\"paramjson\":\"\",\"paramxml\":\"\"}]},{\"Event\":\"LayoutModClick\",\"Index\":\"\",\"Cmds\":[{\"src\":\"*$(this).parents('.live-tile').attr('id')\",\"cmd\":\"9005\",\"dst\":\"LM\",\"param1\":\"83\",\"param2\":\"布局\",\"param3\":\"MODIFY\",\"param4\":\"*$(this).parents('.live-tile').attr('id')\",\"param5\":\"\",\"paramjson\":\"\",\"paramxml\":\"\"}]},{\"Event\":\"LayoutAddClick\",\"Index\":\"\",\"Cmds\":[{\"src\":\"*$(this).parents('.live-tile').attr('id')\",\"cmd\":\"9005\",\"dst\":\"LM\",\"param1\":\"83\",\"param2\":\"*$(this).parents('.live-tile').attr('id')\",\"param3\":\"ADD\",\"param4\":\"\",\"param5\":\"\",\"paramjson\":\"\",\"paramxml\":\"\"}]},{\"Event\":\"LayoutDelClick\",\"Index\":\"\",\"Cmds\":[{\"src\":\"*$(this).parents('.live-tile').attr('id')\",\"cmd\":\"9007\",\"dst\":\"LM\",\"param1\":\"*$(this).parents('.live-tile').attr('id')\",\"param2\":\"\",\"param3\":\"\",\"param4\":\"\",\"param5\":\"\",\"paramjson\":\"\",\"paramxml\":\"\"}]},{\"Event\":\"PanelAddClick\",\"Index\":\"\",\"Cmds\":[{\"src\":\"*$(this).parents('.live-tile').attr('id')\",\"cmd\":\"9008\",\"dst\":\"LM\",\"param1\":\"83\",\"param2\":\"面板\",\"param3\":\"ADD\",\"param4\":\"*$(this).parents('.swingLayout').attr('id').split('_')[1]\",\"param5\":\"*$(this).parents('.swingPos').attr('data-pos')\",\"paramjson\":\"\",\"paramxml\":\"\"}]},{\"Event\":\"PanelModClick\",\"Index\":\"\",\"Cmds\":[{\"src\":\"*$(this).parents('.live-tile').attr('id')\",\"cmd\":\"9008\",\"dst\":\"LM\",\"param1\":\"83\",\"param2\":\"面板\",\"param3\":\"MODIFY\",\"param4\":\"*$(this).parents('.swingPos').find('.swingPanel').attr('id').split('_')[1]\",\"param5\":\"*$(this).parents('.swingPos').attr('data-pos')\",\"paramjson\":\"\",\"paramxml\":\"\"}]},{\"Event\":\"PanelDelClick\",\"Index\":\"\",\"Cmds\":[{\"src\":\"*$(this).parents('.live-tile').attr('id')\",\"cmd\":\"9009\",\"dst\":\"LM\",\"param1\":\"*$(this).parents('.swingPos').find('.swingPanel').attr('id').split('_')[1]\",\"param2\":\"\",\"param3\":\"\",\"param4\":\"\",\"param5\":\"\",\"paramjson\":\"\",\"paramxml\":\"\"}]}]", "");
                data = toLayout(data);
            }
            else if (startMsg.param2 === '面板') {
                data = new PanelS(startMsg.param4, "", "新建面板", "{\"PanelTypeName\":\"swingGrid\",\"PanelLocation\":\"" + startMsg.param5 + "\",\"PanelStyle\":{\"outerTheme\":\"b\",\"innerTheme\":\"e\"},\"Buttons\":[{\"type\":\"ROWBT\",\"content\":\"查看\",\"events\":[{\"type\":\"click\",\"deals\":[\"btnInfoClick\"]}],\"display\":\"block\"}]}",
            "[{\"cmd\":\"20201\",\"Handler\":[{\"Action\":\"sendMsg\",\"Content\":[\"2001\"]}]},{\"cmd\":\"20202\",\"Handler\":[{\"Action\":\"bindMsgData\",\"Content\":\"~msg.paramjson\"}]}]",
            "[{\"cmd\":\"2001\",\"src\":\"*$(this).attr('id')\",\"dst\":\"RM\",\"param1\":\"面板\",\"param2\":\"获取列表\",\"param3\":\"20202\",\"param4\":\"\",\"param5\":\"\",\"paramjson\":{\"父配置ID\":\"~msg.param1\"},\"paramxml\":\"\"},{\"cmd\":\"20301\",\"src\":\"*$(this).attr('id')\",\"dst\":\"*\",\"param1\":\"39\",\"param2\":\"\",\"param3\":\"\",\"param4\":\"\",\"param5\":\"\",\"paramjson\":{},\"paramxml\":\"\"}]",
            "[{\"Action\":\"bindBindData\",\"Content\":[\"\"]}]",
            "[{\"Action\":\"sendMsg\",\"Content\":[\"20301\"]}]",
            "[{\"swingRowHeader\":\"第1行\",\"FirstName\":\"名字\",\"Surname\":\"姓\",\"Gender\":\"G001\",\"Age\":26,\"DateOfBirth\":\"1988-04-18\"},{\"swingRowHeader\":\"第2行\",\"FirstName\":\"达华\",\"Surname\":\"任\",\"Gender\":\"G001\",\"Age\":56,\"DateOfBirth\":\"1957-03-27\"},{\"swingRowHeader\":\"第3行\",\"FirstName\":\"卡丘\",\"Surname\":\"皮\",\"Gender\":\"G006\",\"Age\":13,\"DateOfBirth\":\"2000-11-06\"}]",
            "[{\"type\":\"btnInfoClick\",\"Index\":\"\",\"Handler\":[{\"Action\":\"sendMsg\",\"Content\":[\"20301\"]}]}]",
            "[{\"Interval\":3,\"Handler\":[{\"Action\":\"sendMsg\",\"Content\":[\"2001\"]}]}]",
            "{\"swingRowHeader\":{\"Index\":\"0\",\"width\":\"10%\"},\"FirstName\":{\"Index\":\"1\",\"width\":\"10%\"},\"Surname\":{\"Index\":\"2\",\"width\":\"15%\"},\"Gender\":{\"Index\":\"3\",\"width\":\"5%\"},\"Age\":{\"Index\":\"4\",\"width\":\"5%\"},\"DateOfBirth\":{\"Index\":\"5\",\"width\":\"10%\"}}");
                data = toPanel(data);
            }
            var zrw = '';
        }
        return data;
    }
    //private方法
    function _bind(panel, data, mySettings) {
        var $panel = $(panel);
        var startMsg = $panel.parents('.swingLayout').data('startMsg');
        //
        if (!data) {
            data = _adapteData(startMsg, data);
        }
        else {
            data = _adapteData(startMsg, data);
        }
        $panel.find('.swingJsonEditor').remove();
        $panel.data('bindData', data);

        var isGroup = _getIsGroup(data);
        if (isGroup) {
            var $grouper = $('<div class="swingGrouper"></div>')
            _getGroupDiv($grouper, data, mySettings);
            $panel.append($grouper);
        }
        else {
            $panel.append(_createContent(data, mySettings));
        }
        var $jsonEditor = _createJsonEditor(mySettings);


        app.load($jsonEditor.find('.jsonEditorheader'), $jsonEditor.find('.jsonEditorauto'), data);


        $panel.find('.swingToolBar').before($jsonEditor);
        _eventsBind($panel, mySettings);

    }
    function _eventsBind(panel, mySettings) {
        var $panel = $(panel);
        var zButtons = mySettings.UI.Buttons;
        var zEvents = mySettings.Events;
        for (var btn in zButtons) {
            var $obj = $panel.find('.' + zButtons[btn].type);
            var $pp = $obj.parents('.swingPanel');
            var zrw = $pp.data('bindData');
            var zrw = '';
            var zBtnEvents = zButtons[btn].events;
            for (var btnEvt in zBtnEvents) {
                var zrw = '';
                var deals = zBtnEvents[btnEvt].deals;
                for (var deal in deals) {
                    var zrw = '';
                    for (var evt in zEvents) {
                        var zrw = '';
                        if (deals[deal] === zEvents[evt].type) {
                            var zrw = '';
                            $obj.unbind(zBtnEvents[btnEvt].type);

                            $obj.bind(zBtnEvents[btnEvt].type, { 'evt': zEvents[evt] }, function (e) {
                                var Handler = e.data.evt.Handler;
                                var zrw = '';
                                _judgeHandler.call(this, Handler, null, mySettings);
                            })
                        }
                    }
                }
            }
        }
    }

    function _createJsonEditor(mySettings) {
        //编辑器头部
        var $jsonEditor = $('<div class="swingJsonEditor" style="width:100%;height:90%;position:relative;"></div>');

        var $divheader = $('<div class="jsonEditorheader" style="display:none;">'
                              + '<div class="jsonEditormenu">'
                                  + '<ul>'
                                      + '<li>'
                                          + '<a class="jsonEditorclear" title="Clear contents">Clear</a>'
                                      + '</li>'
                                      + '<li>'
                                          + '<a class="jsonEditoropen" title="Open file from disk">Open'
                                          + '<span class="jsonEditoropenMenuButton" title="Open file from disk or url">&#x25BC;'
                             + '</span>'
                             + '</a>'
                             + '<ul class="jsonEditoropenMenu">'
                                 + '<li>'
                                     + '<a class="jsonEditormenuOpenFile" title="Open file from disk">Open&nbsp;file</a>'
                                 + '</li>'
                                 + '<li>'
                                     + '<a class="jsonEditormenuOpenUrl" title="Open file from url">Open&nbsp;url</a>'
                                 + '</li>'
                             + '</ul>'
                             + '</li>'
                             + '<li>'
                                 + '<a class="jsonEditorsave" title="Save file to disk">Save</a>'
                             + '</li>'
                             + '<li>'
                                 + '<a class="jsonEditorhelp" title="Open documentation (opens in a new window)" href="doc/index.html" target="_blank">Help</a>'
                             + '</li>'
                         + '</ul>'
                         + '</div>'
                         + '</div>');

        var $divauto = $('<div class="jsonEditorauto">'
                        + '<div class="jsonEditorcontents">'
                            + '<div class="jsonEditorcodeEditor"></div>'

                            + '<div class="jsonEditorsplitter">'
                                + '<div class="jsonEditorbuttons">'
                                    + '<div>'
                                        + '<button class="jsonEditortoTree" class="convert" title="Copy code to tree editor">'
                                            + '<div class="convert-right"></div>'
                                        + '</button>'
                                    + '</div>'
                                    + '<div>'
                                        + '<button class="jsonEditortoCode" class="convert" title="Copy tree to code editor">'
                                            + '<div class="convert-left"></div>'
                                        + '</button>'
                                    + '</div>'
                                + '</div>'
                                + '<div class="jsonEditordrag">'
                                + '</div>'
                                + '</div>'
                                + '<div class="jsonEditortreeEditor"></div>'
                            + '</div>'
                        + '</div>');

        if (mySettings.Fields.codeEditor) {
            $divauto.find('.jsonEditorsplitter').css('display', mySettings.Fields.codeEditor.display).width(mySettings.Fields.codeEditor.width);
        }

        if (mySettings.Fields.splitter) {
            $divauto.find('.jsonEditorcodeEditor').css('display', mySettings.Fields.splitter.display).width(mySettings.Fields.splitter.width);
        }

        if (mySettings.Fields.treeEditor) {
            $divauto.find('.jsonEditortreeEditor').css('display', mySettings.Fields.treeEditor.display).width(mySettings.Fields.treeEditor.width).css('padding', '15px');
        }


        $jsonEditor.append($divheader).append($divauto);
        return $jsonEditor;
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
                var zrw = '';
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
                var layoutData = msg.paramjson;
                var o_layoutData = layoutData;
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
            else if (myBindData[i].swingConfiger) {
                if (myBindData[i].swingConfiger.length > 0) {
                    //var $spanCount = $('<span style="float:right;" class="ui-li-count ui-btn-up-c ui-btn-corner-all">&nbsp&nbsp' + myBindData[i].swingConfiger.length + '&nbsp&nbsp</span>')
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

                    $content.append(_createContent(myBindData[i].swingConfiger[0].swingRows, mySettings));
                }
            }
            else {
                $spanIcon.removeClass('ui-icon-plus').addClass('ui-icon-arrow-r');
            }
        }
    }

    function _createContent(data, mySettings) {
        //var $ModalDialog = $('<div>模态对话框</div>');


        //return $ModalDialog;
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