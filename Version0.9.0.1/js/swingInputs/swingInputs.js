/*!
 * 福思维swingInputs面板
 * version: 1.0.0 
 * Need jQuery1.9.1
 * Need jquery.mobile-1.3.1.min.css 只用css不用js
 * Copyright 2005, 2012 北京福思维科技发展有限公司
 * http://www.fullswing.com.cn/
 * Author RuiWen Zeng
 * Copyright 2012, 2013 RuiWen Zeng [zrwnokias60[at]126.com ] 
 * Date: 2013-09-04
 */
(function ($) {
    //实例化入口
    $.fn.swingInputs = function () {
        var method = arguments[0];

        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('jQuery.swingInputs中不存在方法' + method);
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
                    var defaultSettings = swingInputsDefault;
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


                var simpleData = { "ID": 16, "姓": "上官", "名": "二货", "性别": "G001", "年龄": 36, "证件类型": "ZJ001", "证件号": "152527197703060098", "户口所在地": "太阳系火星", "出生日期": "1977-03-06", "接待员": "霹雳五号", "备注": "备注" };
                var complexData = [{ "ID": "01", "name": "默认车系", "items": [{ "ID": "0101", "name": "默认车型", "swingInputs": [{ "ID": "010101", "name": "默认数据表名称", "inputs": { "ID": 16, "姓": "上官", "名": "二货", "性别": "G001", "年龄": 36, "证件类型": "ZJ001", "证件号": "152527197703060098", "户口所在地": "太阳系火星", "出生日期": "1977-03-06", "接待员": "霹雳五号", "备注": "备注" } }] }] }];

                if (data) {
                    $this.data('bindData', data);
                }
                else {
                    $this.data('bindData', simpleData);
                }



                // 执行代码
                $this.empty();
                if (!$this.hasClass('swingInputs')) {
                    $this.addClass('swingInputs');
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
                    Diablo.printLog('界面元素', false, '实例化', '实例化swingInputs');
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
                var zrw = '';
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
        var isGroup = _getIsGroup(myBindData);
        if (isGroup) {
            var $grouper = $('<div class="swingGrouper"></div>')
            _getGroupDiv($grouper, myBindData, mySettings);
            $panel.append($grouper);
        }
        else {
            $panel.append(_createContent(myBindData, mySettings));
        }
       // var $bottomBarWrap = $('<div class="swingBottomBarWrap"></div>');
       // var $bottomBar = $('<div data-role="controlgroup" data-type="horizontal" data-mini="true" class="ui-corner-all ui-controlgroup ui-controlgroup-horizontal ui-mini swingBottomBar swingPanelEdit" aria-disabled="false" data-disabled="false" data-shadow="false" data-corners="true" data-exclude-invisible="true"><div class="ui-controlgroup-controls"></div></div>');
       //var $switchDS = $('<a href="#" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="'+mySettings.UI.PanelStyle.innerTheme+'" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-hover-'+mySettings.UI.PanelStyle.innerTheme+' ui-btn-up-'+mySettings.UI.PanelStyle.innerTheme+' swingSwitch switchOff"><span class="ui-btn-inner"><span class="ui-btn-text">编辑面板</span></span></a>');

       //$bottomBar.find('.ui-controlgroup-controls').append($switchDS);

       // $switchDS.bind('click', function () {
       //     var $this = $(this);
       //     var $thisLayout = $this.parents('.swingLayout');
       //     var $thisPanel = $this.parents('.swingPanel');
       //     if ($this.hasClass('switchOff')) {
                
       //         var $divDSManager = _createDSManager(myBindData, mySettings);

       //         $this.parents('.swingBottomBarWrap').siblings('.swingInputsWrap').width('60%');
       //         $divDSManager.width('40%');

               

       //         $thisPanel.find('.swingInputsWrap').after($divDSManager);
       //         $this.find('span.ui-btn-text').html('完成编辑');

       //         var $tempPosDiv = $('<div class="ui-body-' + 'b'+ ' swingTempPos"></div>');
       //         $thisPanel.data('orgParent', $thisPanel.parent().attr('data-pos'));
       //         $thisLayout.children('*').hide();
       //         $tempPosDiv.append($thisPanel);
       //         $tempPosDiv.appendTo($thisLayout);
       //         $this.removeClass('switchOff').addClass('switchOn');

       //         //json编辑器
       //         app.load(mySettings);
       //         app.resize();
       //     }
       //     else {
       //         $thisPanel.find(".swingDataSetManagerWrap").remove();
       //         $this.parents('.swingBottomBarWrap').siblings('.swingInputsWrap').width('100%');

       //         $this.find('span.ui-btn-text').html('编辑面板');
       //         var zrw = $thisPanel.data('orgParent');
               
       //         var zrw1= $thisLayout.find('[data-pos=' + $thisPanel.data('orgParent') + ']');
       //         $thisPanel.appendTo($thisLayout.find('[data-pos=' + $thisPanel.data('orgParent') + ']'));
       //         $thisLayout.find('.swingTempPos').remove();
       //         $thisLayout.children('*').show();
       //         $this.removeClass('switchOn').addClass('switchOff');
       //     }

           
       // })
       // $bottomBarWrap.append($bottomBar);

       // $panel.append($bottomBarWrap);
       // if (mySettings.IsEditMode) {
       //     var zrw = $panel.find('.swingPanelEdit');
       //     $panel.find('.swingPanelEdit').show();
       // }
       // else {
       //     var zrw = $panel.find('.swingPanelEdit');
       //     $panel.find('.swingPanelEdit').hide();
            
       // }
        
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
            else if (myBindData[i].swingInputs) {
                if (myBindData[i].swingInputs.length > 0) {
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

                    $content.append(_createContent(myBindData[i].swingInputs[0].inputs, mySettings));
                }
            }
            else {
                $spanIcon.removeClass('ui-icon-plus').addClass('ui-icon-arrow-r');
            }
        }
    }
    function _createInputDiv(label,text,mySettings,isClose) {
        var $div = $('<div class="ui-body-' + mySettings.UI.PanelStyle.outerTheme + ' swingInputDiv" style="width:' + '15%' + ';"></div>');
        var $label = $('<label class="ui-input-text">' + label + '</label>');
       

        var $x = $('<a href="#" data-role="button" data-icon="delete" data-iconpos="notext" data-theme="' + mySettings.UI.PanelStyle.innerTheme + '" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" title="Delete" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-icon-notext ui-btn-up-' + mySettings.UI.PanelStyle.innerTheme + '"><span class="ui-btn-inner"><span class="ui-btn-text">Delete</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>')
        $x.bind('click', function () {
            var $this = $(this);
            var $pDiv = $this.parents('.swingInputDiv');
            $pDiv.remove();
        })

        $x.bind('mouseover', function () {
            var $this = $(this);
            $this.removeClass('ui-btn-up-' + mySettings.UI.PanelStyle.innerTheme + '');
            $this.addClass('ui-btn-hover-' + mySettings.UI.PanelStyle.innerTheme + '');
        })
        $x.bind('mouseout', function () {
            var $this = $(this);

            $this.removeClass('ui-btn-hover-' + mySettings.UI.PanelStyle.innerTheme + '');
            $this.addClass('ui-btn-up-' + mySettings.UI.PanelStyle.innerTheme + '');
        })
        
        var $input = $('<div class="ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-' + mySettings.UI.PanelStyle.outerTheme + '"><input type="text" name="text-basic" value="' + text + '" class="ui-input-text ui-body-' + mySettings.UI.PanelStyle.outerTheme + '"></div>');
        $input[0].ondrop = function (ev) {
            ev.preventDefault();
            return true;
        }

        var $gear = $('<a href="#" data-role="button" data-icon="gear" data-iconpos="notext" data-theme="' + mySettings.UI.PanelStyle.innerTheme + '" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" title="Gear" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-icon-notext ui-btn-up-' + mySettings.UI.PanelStyle.innerTheme + '"><span class="ui-btn-inner"><span class="ui-btn-text">Gear</span><span class="ui-icon ui-icon-gear ui-icon-shadow">&nbsp;</span></span></a>');
        $gear.bind('mouseover', function () {
            var $this = $(this);
            $this.removeClass('ui-btn-up-' + mySettings.UI.PanelStyle.innerTheme + '');
            $this.addClass('ui-btn-hover-' + mySettings.UI.PanelStyle.innerTheme + '');
        })
        $gear.bind('mouseout', function () {
            var $this = $(this);
         
            $this.removeClass('ui-btn-hover-' + mySettings.UI.PanelStyle.innerTheme + '');
            $this.addClass('ui-btn-up-' + mySettings.UI.PanelStyle.innerTheme + '');
        })

        $div.css('float', 'left');
        $div.append($gear);
        $div.append($x);
        $div.append($label).append($input);
        return $div;
    }


    function _createContent(inputsData, mySettings) {
        var inputsDataCopy = Diablo.cloneJSON(inputsData);

        var inputWidth = 168;


        var $swingInputsWrap = $('<div class="swingPanelWrap"></div>');

        $swingInputsWrap[0].ondragover = function (ev) {
            ev.preventDefault();
            return true;
        }
        $swingInputsWrap[0].ondragenter = function (ev) {
            return true;
        }
        $swingInputsWrap[0].ondrop = function (ev) {
            var labelText = ev.dataTransfer.getData("text");
            var $div = _createInputDiv(labelText,'', mySettings,true);
            $(this).append($div);
            return true;
        }


        for (var i in inputsDataCopy) {
            var $div = _createInputDiv(i, inputsDataCopy[i], mySettings,false);
            $swingInputsWrap.append($div);
        }
        return $swingInputsWrap;
    }


    function _createDSManager(demoData, mySettings) {
        var demoDataCopy = Diablo.cloneJSON(demoData);


        var $Wrap = $('<div class="swingDataSetManagerWrap"></div>');
        var $dsmTitle = $('<div class="dsmTitle"></div>');
        var $dsmTitleLabel = $('<div class="dsmTitleLabel">数据来源</div>');
        $dsmTitle.append($dsmTitleLabel);


        var $dsmContent = $('<div class="dsmContent"></div>');


        var $jsonEditor = _createJsonEditor();



        var $table = $('<table style="width:100%;"></table>');
        for (var i in demoDataCopy) {
            var $tr = $('<tr style="width:100%;"></tr>');
            var $td = $('<td style="width:100%;"></td>');
            var $divField = $('<div class="swingLabel"  draggable="true"><label class="ui-input-text">' + i + '</label></div>');


            $divField[0].onselectstart = function (ev) {
                return false;
            };
            $divField[0].ondragstart = function (ev) {
                ev.dataTransfer.effectAllowed = "move";
                ev.dataTransfer.setData("text", ev.target.innerHTML);
                if (ev.dataTransfer.setDragImage) {
                    ev.dataTransfer.setDragImage(ev.target, 0, 0);
                }
                return true;
            };
            $divField[0].ondragend = function (ev) {
                ev.dataTransfer.clearData("text");
                return false
            };

            $td.append($divField);
            $tr.append($td);
            $table.append($tr);
        }

        $dsmContent.append($table);
        $Wrap.append($jsonEditor).append($dsmTitle).append($dsmContent);
        return $Wrap;
    }

    function _createJsonEditor() {
        /*显示json编辑器*/
        //编辑器头部
        var $jsonEditor = $('<div class="swingJsonEditor"></div>');
        var $divheader = $('<div id="header"></div>');
        var $divmenu = $('<div id="menu"><ul><li><a id="clear" title="Clear contents">清空</a></li><li><a id="open" title="Open file from disk">打开<span id="openMenuButton" title="Open file from disk or url">&#x25BC;</span></a><ul id="openMenu"><li><a id="menuOpenFile" title="Open file from disk">打开文件</a></li><li><a id="menuOpenUrl" title="Open file from url">加载URL</a></li></ul></li><li><a id="save" title="Save file to disk">保存</a> </li></ul></div></div>');
        $divheader.append($divmenu);

        //编辑器编辑json部分
        var $divauto = $('<div id="auto"></div>');
        var $divcontengs = $('<div id="contents"><div id="codeEditor"></div><div id="splitter"><div id="buttons"><div><button id="toTree" class="convert" title="Copy code to tree editor"><div class="convert-right"></div></button></div><div><button id="toCode" class="convert" title="Copy tree to code editor"><div class="convert-left"></div></button></div></div><div id="drag"></div></div><div id="treeEditor"></div></div>');
        $divauto.append($divcontengs);
        //$dsmContent.find('div[id=header]').after($divauto);//添加到header  div后面 
        $jsonEditor.append($divheader).append($divauto);
        return $jsonEditor;
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