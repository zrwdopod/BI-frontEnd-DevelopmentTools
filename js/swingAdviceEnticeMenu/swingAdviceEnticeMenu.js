/*!
 * 福思维swingAdviceEnticeMenu面板
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
    $.fn.swingAdviceEnticeMenu = function () {
        var method = arguments[0];

        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('jQuery.swingAdviceEnticeMenu中不存在方法' + method);
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
                    var defaultSettings = swingAdviceEnticeMenuDefault;
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


                var simpleData = [{ "name": "张三", "poData": { "性别": "男", "年龄": "28", "行业": "制造业" }, "license": "京E-888888", "ID": "1", "isExpedited": "false", "aeData": [{ "延时时间": "2013-10-16", "导引级别": "A", "最近通话时间": "2013-10-06", "购买意向": "交强险" }, { "延时时间": "2013-10-16", "导引级别": "A", "最近通话时间": "2013-10-06", "购买意向": "车损险" }, { "延时时间": "2013-10-16", "导引级别": "B", "最近通话时间": "2013-10-06", "购买意向": "车损险+盗抢险+划痕险+自燃险" }] }, { "name": "李四", "poData": { "性别": "女", "年龄": "55", "行业": "医疗业" }, "license": "京H-XB6908", "ID": "2", "isExpedited": "false", "aeData": [{ "延时时间": "2013-10-16", "导引级别": "A", "最近通话时间": "2013-10-06", "购买意向": "交强险" }, { "延时时间": "2013-10-16", "导引级别": "A", "最近通话时间": "2013-10-06", "购买意向": "交强险" }, { "延时时间": "2013-10-16", "导引级别": "B", "最近通话时间": "2013-10-06", "购买意向": "交强险" }] }, { "name": "王二麻子", "poData": { "性别": "男", "年龄": "29", "行业": "影视业" }, "license": "ACG-6354", "ID": "3", "isExpedited": "true", "aeData": [{ "延时时间": "2013-10-16", "导引级别": "E", "最近通话时间": "2013-10-06", "购买意向": "盗抢险+划痕险+自燃险" }, { "延时时间": "2013-10-16", "导引级别": "A", "最近通话时间": "2013-10-06", "购买意向": "交强险" }, { "延时时间": "2013-10-16", "导引级别": "B", "最近通话时间": "2013-10-06", "购买意向": "交强险" }] }];
                var complexData = [{ "ID": "01", "name": "默认车系", "items": [{ "ID": "0101", "name": "默认车型", "swingScrollSelector": [{ "name": "张三", "license": "京E▪888888", "ID": "1", "isExpedited": "false" }, { "name": "李四", "license": "京H-XB6908", "ID": "2", "isExpedited": "false" }, { "name": "王二麻子", "license": "ACG▪6354", "ID": "3", "isExpedited": "true" }] }] }];

                if (data) {
                    $this.data('bindData', data);
                }
                else {
                    $this.data('bindData', simpleData);
                }

                // 执行代码
                $this.empty();
                if (!$this.hasClass('swingAdviceEnticeMenu')) {
                    $this.addClass('swingAdviceEnticeMenu');
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
                    Diablo.printLog('界面元素', false, '实例化', '实例化swingAdviceEnticeMenu');
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

                var a_inList = mySettings.Load;

                for (var i in a_inList) {
                    var zrw = '';
                    var Handler = {};
                    Handler = a_inList[i];
                    _judgeHandler.call(this, Handler, null, mySettings);
                }
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
                case 'loadData':
                    var zrw = '';

                    var objNeedResolve = Diablo.cloneJSON(a_content);
                    var returnObj = Diablo.parser.resolve.call(this, objNeedResolve, msg);

                    var AEFlowData = [
                    { "id": "step0", "state": "", "src": [], "dst": ["step1"], "items": [{ "type": "title", "innderText": "未劝诱" }, { "type": "ellipse", "cx": "40", "cy": "20", "rx": "30", "ry": "15" }, { "type": "text", "innerText": "未劝诱" }] },
                    { "id": "step1", "state": "", "src": ["step0"], "dst": ["step1", "step2", "step3"], "items": [{ "type": "title", "innderText": "正在劝诱" }, { "type": "ellipse", "cx": "160", "cy": "20", "rx": "30", "ry": "15" }, { "type": "text", "innerText": "正在劝诱" }] },
                    { "id": "step2", "state": "", "src": ["step1"], "dst": [""], "items": [{ "type": "title", "innderText": "劝诱失败" }, { "type": "ellipse", "cx": "60", "cy": "80", "rx": "30", "ry": "15" }, { "type": "text", "innerText": "劝诱失败" }] },
                    { "id": "step3", "state": "", "src": ["step1"], "dst": [""], "items": [{ "type": "title", "innderText": "劝诱成功" }, { "type": "ellipse", "cx": "220", "cy": "80", "rx": "30", "ry": "15" }, { "type": "text", "innerText": "劝诱成功" }] }
                    ];

                    for (var i in AEFlowData)
                    {
                        var $g = $('<g id="' + AEFlowData[i].id + '" class="step"></g>');
                        var $ellipse = $('<ellipse style="fill: #FFE6BA; stroke: #000000;" cx="'+AEFlowData[i].cx+'" cy="20" rx="30" ry="15" />');

                    }
                    var $svgAEflow = $('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="320pt" height="240pt" viewBox="0.00 0.00 320 240">' +
                '<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(0 0)">' +
                    '<title>G</title>' +
                    '<!-- 未劝诱 -->' +
                    '<g id="step0" class="step">' +
                    '<title>未劝诱</title>' +
                    '<ellipse style="fill: #FFE6BA; stroke: #000000;" cx="40" cy="20" rx="30" ry="15" />' +
                    '<text text-anchor="middle" x="40" y="25" style=" font-size:12px;">未劝诱</text>' +
                    '</g>' +
                    '<!-- 劝诱中 -->' +
                    '<g id="step1" class="step">' +
                    '<title>正在劝诱</title>' +
                    '<ellipse style="fill: #FF6600; stroke: #000000;" cx="160" cy="20" rx="30" ry="15" />' +
                    '<text text-anchor="middle" x="160" y="25" style=" font-size:12px;">劝诱中</text>' +
                    '</g>' +
                    '<!-- 未劝诱-&gt;劝诱中 -->' +
                    '<g id="edge0" class="edge">' +
                    '<title>未劝诱-&gt;劝诱中</title>' +
                    '<path style="fill: none; stroke: black;" d="M70,20 118,20 Z" />' +
                    '<polygon style="fill: black; stroke: black;" points="118,18 130,20 118,22" />' +
                    '</g>' +


                    '<!-- 劝诱失败 -->' +
                    '<g id="step2" class="step">' +
                    '<title>劝诱失败</title>' +
                    '<ellipse style="fill: #DCDCDC; stroke: #000000;" cx="60" cy="80" rx="30" ry="15" />' +
                    '<text text-anchor="middle" x="60" y="85" style=" font-size:12px;">劝诱失败</text>' +
                    '</g>' +
                    '<!-- 劝诱中-&gt;劝诱失败 -->' +
                    '<g id="edge1" class="edge">' +
                    '<title>劝诱中-&gt;劝诱失败</title>' +
                    '<path style="fill: none; stroke: black;" d="M160,35 C160,35 155,60 98,70" />' +
                    '<polygon style="fill: black; stroke: black;" points="96,68 98,72 88,75" />' +
                    '</g>' +



                    '<!-- 劝诱成功 -->' +
                    '<g id="step3" class="step">' +
                    '<title>劝诱成功</title>' +
                    '<ellipse style="fill: #DCDCDC; stroke: #000000;" cx="220" cy="80" rx="30" ry="15" />' +
                        '<text text-anchor="middle" x="220" y="85" style=" font-size:12px;">劝诱成功</text>' +
                        '</g>' +
                        '<!-- 劝诱中-&gt;劝诱失败 -->' +
                    '<g id="edge2" class="edge">' +
                        '<title>劝诱中-&gt;劝诱成功</title>' +
                        '<path style="fill: none; stroke: black;" d="M160,35 C160,35 155,60 180,70" />' +
                        '<polygon style="fill: black; stroke: black;" points="181,68 191,74 179,72" />' +
                    '</g>' +


                    '<!-- 劝诱中-&gt;劝诱中 -->' +
                    '<g id="edge3" class="edge">' +
                    '<title>劝诱中-&gt;劝诱中</title>' +
                    '<!--C220,35 230,20 220,10--> ' +
                    '<path style="fill: none; stroke: black;" d="M160,35 ' +
                    'C160,35 200,60 220,35 ' +
                    'C220,35 230,20 215,10' +
                    'C215,10 200,0 190,5' +
                    '"/>' +
                    '<polygon style="fill: black; stroke: black;" points="187,3 191,7 185,9" />' +
                    '</g>' +
                '</g>' +
    '</svg>');
                    //当前FF6600 ,已通过FFE6BA,未到达DCDCDC

                    $this.parents('.swingPanel').find('.AEContentA').empty().append(_createInputs(returnObj.poData, mySettings)).append(_createGrid(returnObj.aeData, mySettings)).append($svgAEflow);
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

    function _AEFlowStateChange(svg, step, state) {
        var $svg = $(svg);


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
            var $item = $('<div data-role="collapsible"></div>');
            $item.attr('data-content-theme', mySettings.UI.PanelStyle.outerTheme);
            $item.addClass('ui-collapsible');
            $item.addClass('ui-collapsible-inset');
            $item.addClass('ui-corner-all');
            $item.addClass('ui-collapsible-themed-content');
            $item.addClass('ui-collapsible-collapsed');

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
            else if (myBindData[i].swingAdviceEnticeMenu) {
                if (myBindData[i].swingAdviceEnticeMenu.length > 0) {
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

                    $content.append(_createContent(myBindData[i].swingAdviceEnticeMenu[0].swingRows, mySettings));
                }
            }
            else {
                $spanIcon.removeClass('ui-icon-plus').addClass('ui-icon-arrow-r');
            }
        }
    }

    function _createContent(zData, mySettings) {
        var zDataCopy = Diablo.cloneJSON(zData);
        var $Content = $('<div class="swingAdviceEnticeMenuWrap swingPanelWrap"></div>');


        var $AELeft = $('<div class="AELeft" style="float:left;width:99%;height:100%;"></div>');

        if (zData instanceof Array) {
            for (var i in zData) {
                var $block = $('<div class="swingAEMItem" data-id="' + zData[i].ID + '" style="width: 100%;height:10%; float: left;cursor:pointer;"><div style="position:absolute;top:20%;left:3%;font-size:36px;">' + zData[i].license + '</div><div style="position:absolute;bottom:3%;right:3%;">' + zData[i].name + '</div></div>');
                $block.data('bindData', zData[i]);
                $AELeft.append($block);
            }
        }

        var a_list = mySettings.Events;
        for (var j in a_list) {
            var zrw = '';
            if (a_list[j].type === 'itemClick') {
                var zrw = '';
                $AELeft.find('div.swingAEMItem').bind('click', function () {
                    var Handler = {};
                    var zrw = '';
                    Handler = a_list[j].Handler;
                    
                    _judgeHandler.call(this, Handler, null, mySettings);
                })


            }
        }
        var zrw = '';
        $Content.append($AELeft);
        return $Content;
    }

    function _createGrid(gridData, mySettings) {
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
                var $col = $('<col data-columnname="' + columnHeader[c] + '">');
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
                    var $td = $('<td style="border:1px solid ' + tdBorderColor + ';"></td>');
                    var $swingInput = {};
                    if (rindex === 0) {
                        $swingInput = $('<label class="ui-input-text">' + gridDataCopy[r][c] + '</label>');
                    }
                    else {
                        var textValue = gridDataCopy[r][c]
                        //$swingInput = $('<div class="ui-block-a"><input  type="text" name="text-basic" id="text-basic" value="' + textValue + '" class="ui-input-text ui-body-' + mySettings.UI.PanelStyle.innerTheme + '"></div>');
                        //$swingInput = $('<input type="text" name="text-basic" value="' + textValue + '" class="ui-input-text ui-body-e">');
                        $swingInput = $('<input type="text" style="width:100%;border:none;height:35px;font-size:16px;background:' + inputBG + ';" value="' + textValue + '">');
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
    function _createInputDiv(label, text, mySettings, isClose) {
        var $div = $('<div class="ui-body-' + mySettings.UI.PanelStyle.outerTheme + ' swingInputDiv" style="width:' + '15%' + ';"></div>');
        var $label = $('<label class="ui-input-text">' + label + '</label>');


        var $x = $('<a href="#" data-role="button" data-icon="delete" data-iconpos="notext" data-theme="' + mySettings.UI.PanelStyle.innerTheme + '" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" title="Delete" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-icon-notext ui-btn-up-' + mySettings.UI.PanelStyle.innerTheme + '"><span class="ui-btn-inner"><span class="ui-btn-text">Delete</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>')
        $x.bind('click', function () {
            var $this = $(this);
            var $pDiv = $this.parents('.swingInputDiv');
            $pDiv.remove();
        })

        var $input = $('<div class="ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-' + mySettings.UI.PanelStyle.outerTheme + '"><input type="text" name="text-basic" value="' + text + '" class="ui-input-text ui-body-' + mySettings.UI.PanelStyle.outerTheme + '"></div>');
        $input[0].ondrop = function (ev) {
            ev.preventDefault();
            return true;
        }


        $div.css('float', 'left');

        $div.append($label).append($input);
        return $div;
    }


    function _createInputs(inputsData, mySettings) {
        var inputsDataCopy = Diablo.cloneJSON(inputsData);

        var inputWidth = 168;


        var $swingInputsWrap = $('<div class="swingInputsWrap"></div>');

        $swingInputsWrap[0].ondragover = function (ev) {
            ev.preventDefault();
            return true;
        }
        $swingInputsWrap[0].ondragenter = function (ev) {
            return true;
        }
        $swingInputsWrap[0].ondrop = function (ev) {
            var labelText = ev.dataTransfer.getData("text");
            var $div = _createInputDiv(labelText, '', mySettings, true);
            $(this).append($div);
            return true;
        }


        for (var i in inputsDataCopy) {
            var $div = _createInputDiv(i, inputsDataCopy[i], mySettings, false);
            $swingInputsWrap.append($div);
        }
        return $swingInputsWrap;
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