/*!
 * 福思维swingGrid面板
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
    $.fn.swingGrid = function () {
        var method = arguments[0];
        
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('jQuery.swingGrid中不存在方法' + method);
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
                    var defaultSettings = swingGridDefault;
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


                var simpleData = [{ "swingRowHeader": "第1行", "FirstName": "", "Surname": "", "Gender": "", "Age": 0, "DateOfBirth": "2000-01-01" }, { "swingRowHeader": "第2行", "FirstName": "达华", "Surname": "任", "Gender": "G001", "Age": 56, "DateOfBirth": "1957-03-27" }, { "swingRowHeader": "第3行", "FirstName": "卡丘", "Surname": "皮", "Gender": "G006", "Age": 13, "DateOfBirth": "2000-11-06" }];
                var complexData = [{ "ID": "01", "name": "默认车系", "items": [{ "ID": "0101", "name": "默认车型", "swingGrid": [{ "ID": "010101", "name": "默认数据表名称", "swingRows": [{ "swingRowHeader": "第1行", "FirstName": "名字", "Surname": "姓", "Gender": "G001", "Age": 26, "DateOfBirth": "1988-04-18" }, { "swingRowHeader": "第2行", "FirstName": "达华", "Surname": "任", "Gender": "G001", "Age": 56, "DateOfBirth": "1957-03-27" }, { "swingRowHeader": "第3行", "FirstName": "卡丘", "Surname": "皮", "Gender": "G006", "Age": 13, "DateOfBirth": "2000-11-06" }] }] }] }];

                if (data) {
                    $this.data('bindData', data);
                }
                else {
                    $this.data('bindData', simpleData);
                }



                // 执行代码
                $this.empty();
                if (!$this.hasClass('swingGrid')) {
                    $this.addClass('swingGrid');
                }
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
                if (settings.LogConfig.level >= 3 && settings.LogConfig.isLogInfo) {
                    Diablo.printLog('界面元素', false, '实例化', '实例化swingGrid');
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
                var zrw = '';
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
        var zrw = this;
        var a_inList = mySettings.InList;
        var a_outList = mySettings.OutList;
        var f_onSendMsg = mySettings.OnSendMsg;

      
            switch (Handler.Action) {
                case 'sendMsg':
                    var a_content = Handler.Content;
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
                case 'bindMsgData':
                    var zrw = '';
                    _bind(this, msg.paramjson, $(this).data('settings'));
                    break;
                case 'bindBindData':
                    var zrw = '';
                    _bind(this, $(this).data('bindData'), $(this).data('settings'));
                    break;
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
            else if (myBindData[i].swingGrid) {
                if (myBindData[i].swingGrid.length > 0) {
                    //var $spanCount = $('<span style="float:right;" class="ui-li-count ui-btn-up-c ui-btn-corner-all">&nbsp&nbsp' + myBindData[i].swingGrid.length + '&nbsp&nbsp</span>')
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

                    $content.append(_createContent(myBindData[i].swingGrid[0].swingRows, mySettings));
                }
            }
            else {
                $spanIcon.removeClass('ui-icon-plus').addClass('ui-icon-arrow-r');
            }
        }
    }

    function _createContent(gridData, mySettings) {
        var gridDataCopy = Diablo.cloneJSON(gridData);
        if (Diablo.testObj(gridDataCopy) === 'objectArray') {
            var tdBorderColor = Diablo.getJqmBorderColor(mySettings.UI.PanelStyle.outerTheme);
            var inputBG = Diablo.getJqmBgColor(mySettings.UI.PanelStyle.innerTheme);
            var columnHeader = {};
            for (var i in gridDataCopy[0]) {
                columnHeader[i] = i.toString();
            }
            gridDataCopy.unshift(columnHeader);

            var $table = $('<table class="swingGridTable"></table>');

            var $colgroup = $('<colgroup></colgroup>');
            var $colgroup_rowheader = $('<col class="rowHeader">');
            $colgroup.append($colgroup_rowheader);

            var $thead = $('<thead></thead>');
            var $thead_tr = $('<tr class="swingGridTableRow"></tr>');
            var $thead_tr_rowheader = $('<th></th>');
            $thead_tr.append($thead_tr_rowheader);
            $thead.append($thead_tr);
            var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ'];
            var cindex = 0;
            for (var c in columnHeader) {
                //var zrw = mySettings.Fields[c];
                //width = "'+mySettings.Fields[c]+'"
                var $col = $('<col data-columnname="' + columnHeader[c] + '" >');
                $colgroup.append($col);
                var $th = $('<th><div class="relative"><span class="colHeader">' + letters[cindex] + '</span></div></th>');
                $thead_tr.append($th);
                cindex++;
            }
            var buttons = mySettings.UI.Buttons;

            for (var i in buttons) {
                var $col = $('<col data-columnname="' + buttons[i].content + '">');

                $colgroup.append($col);
                var $th = $('<th><div class="relative"><span class="colHeader">' + letters[cindex] + '</span></div></th>');
                $thead_tr.append($th);
                cindex++;
            }

            var $tbody = $('<tbody></tbody>');
            var rindex = 0;
            for (var r in gridDataCopy) {
                var $tr = $('<tr></tr>');
                var $tr_th = $('<th>' + (rindex + 1) + '</th>');
                $tr.append($tr_th);
                $tr_th.hide();
                var r_cindex = 0;
                for (var c in gridDataCopy[r]) {
                    //var columnWidth = 0;
                    //if (mySettings.Fields) {
                    //    var field = mySettings.Fields[c];
                    //    columnWidth = field.width;
                    //}
                    //width:' + field.width+ ';
                    var $td = $('<td style="border:1px solid ' + tdBorderColor + ';"></td>');
                    var $swingInput = {};
                    if (rindex === 0) {
                        $swingInput = $('<label class="ui-input-text">' + gridDataCopy[r][c] + '</label>');
                    }
                    else {
                        var textValue = gridDataCopy[r][c];
                        var zrw = '';
                        //$swingInput = $('<div class="ui-block-a"><input  type="text" name="text-basic" id="text-basic" value="' + textValue + '" class="ui-input-text ui-body-' + mySettings.UI.PanelStyle.innerTheme + '"></div>');
                        //$swingInput = $('<input type="text" name="text-basic" value="' + textValue + '" class="ui-input-text ui-body-e">');
                        $swingInput = $('<input type="text" style="width:100%;border:none;height:35px;font-size:16px;background:' + inputBG + ';"  value="' + textValue + '">');
                        if (mySettings.Fields) {
                            if (mySettings.Fields[c]) {
                                if (mySettings.Fields[c].isReadOnly) {
                                    $swingInput.attr('disabled', 'disabled');
                                }
                            }
                        }
                        //$swingInput.val(textValue);
                    }
                    $td.append($swingInput);
                    $tr.append($td);
                    r_cindex++;
                }

                for (var i in buttons) {
                    var $td = $('<td style="border:1px solid ' + tdBorderColor + ';"></td>');
                    var $swingInput = {};
                    if (rindex === 0) {
                        $swingInput = $('<label class="ui-input-text">' + buttons[i].content + '</label>');
                    }
                    else {
                        var textValue = gridDataCopy[r][c];
                        //$swingInput = $('<div class="ui-block-a"><input  type="text" name="text-basic" id="text-basic" value="' + textValue + '" class="ui-input-text ui-body-' + mySettings.UI.PanelStyle.innerTheme + '"></div>');
                        //$swingInput = $('<input type="text" name="text-basic" value="' + textValue + '" class="ui-input-text ui-body-e">');
                        $swingInput = $('<a href="#" data-role="button" data-icon="arrow-r" data-iconpos="notext" data-theme="c" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" title="' + buttons[i].content + '" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-icon-notext ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text">Arrow right</span><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></span></a>');
                        $swingInput.css('margin', '0');
                        //{"type":"click","deals": ["btnUpdateClick", "btnInfoClick"] };

                        var myEvents = buttons[i].events;
                        for (var j in myEvents) {
                            var zrw = '';
                            $swingInput.bind(myEvents[j].type, { "deals": myEvents[j].deals }, function (e) {
                                var $this = $(this);
                                var deals = e.data.deals;
                                for (var k in deals) {
                                    var zrw = '';
                                    for (var l in mySettings.Events) {
                                        var zrw = '';
                                        if (mySettings.Events[l].type === deals[k]) {
                                            var zrw = '';
                                            _judgeHandler.call(this, mySettings.Events[l].Handler, null, mySettings);
                                        }
                                    }
                                }
                                var zrw = '';
                            })
                        }
                    }
                    $td.append($swingInput);
                    $tr.append($td);
                    r_cindex++;
                }
                $tbody.append($tr);
                rindex++;
            }
            $thead.hide();
            $table.append($colgroup).append($thead).append($tbody);
            return $table;
        }
        else {
            if (mySettings.LogConfig.level >= 3 && mySettings.LogConfig.isLogInfo) {
                Diablo.printLog('界面元素', true, '创建表格', '失败,提供数据不是objectArray');
            }
            return $('<div>我是真实的表格</div>');
        }
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
})(jQuery);