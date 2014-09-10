
var pageConfig = {

    "DataSetManager": { "minWidth": "0%", "maxWidth": "15%", "minHeight": "86%", "maxHeight": "93%" },
    "SwingContain": {
        "minWidth": "85%", "maxWidth": "100%", "minHeight": "86%", "maxHeight": "93%",
        "MetroContain": { "width": "100%", "height": "100%" },
        "LayoutsContain": { "width": "100%", "height": "100%" }
    },
    "Bottombar": { "width": "100%", "minHeight": "7%", "maxHeight": "14%", "BottombarTabs": { "width": "85%", "height": "100%" }, "EditModeWrap": { "width": "10%" }, "BtbEtc": { "width": "5%" } }
}
//布局管理器
var LM = {
    getMessage: function (msg) {
        var zrw = '';
        var a_inList = LM.inList;
        var a_outList = LM.outList;
        //布局自己的逻辑配置
        for (var i in a_inList) {
            if (msg.cmd === a_inList[i].cmd) {
                switch (a_inList[i].Handler.Action) {
                    case 'sendMsg':
                        for (var j in a_outList) {
                            var a_content = a_inList[i].Handler.Content;
                            var zrw = '';
                            for (var m in a_content) {
                                if (a_content[m] === a_outList[j].cmd) {
                                    var paramjson = {};
                                    var objNeedResolve = a_outList[j];
                                    var returnObj = Diablo.parser.resolve.call(this, objNeedResolve, msg);
                                    var msgNeedSend = Diablo.cloneJSON(returnObj);
                                    MM.sendMsg.call(this, null, msgNeedSend);
                                }
                            }

                        }
                        break;
                    case 'initScenes':
                        var objNeedResolve = a_inList[i].Handler.Content;
                        var returnObj = Diablo.parser.resolve.call(this, objNeedResolve, msg);
                        LM.initScenes('MetroContain', returnObj);
                        break;
                    case 'loadLayout':
                        var objNeedResolve = a_inList[i].Handler.Content;
                        var returnObj = Diablo.parser.resolve.call(this, objNeedResolve, msg);
                        LM.loadLayout(returnObj);
                        break;
                    case 'loadLayoutModal':
                        var objNeedResolve = a_inList[i].Handler.Content;
                        var returnObj = Diablo.parser.resolve.call(this, objNeedResolve, msg);
                        LM.loadLayout(returnObj, 'MODAL');
                        break;

                    case 'initLayout':
                        var objNeedResolve = a_inList[i].Handler.Content;
                        var returnObj = Diablo.parser.resolve.call(this, objNeedResolve, msg);
                        LM.initLayout(returnObj);
                        break;
                    case 'initLayoutModal':
                        var objNeedResolve = a_inList[i].Handler.Content;
                        var returnObj = Diablo.parser.resolve.call(this, objNeedResolve, msg);
                        LM.initLayout(returnObj, 'MODAL');
                        break;
                    default:
                        if (config.LogConfig.level >= 1 && config.LogConfig.isLogErr) {
                            Diablo.printLog('消息', true, '布局管理器匹配命令', '无匹配命令', '当前命令内容', JSON.stringify(msg));
                        }
                        break;
                }

            }
        }
    },
    inList: [
                 { "cmd": "9001", "Handler": { "Action": "sendMsg", "Content": ["1000"] } },
                 { "cmd": "9002", "Handler": { "Action": "initScenes", "Content": "~msg.paramjson" } },
                 { "cmd": "9003", "Handler": { "Action": "initLayout", "Content": { "startMsg": "~msg", "layoutID": "~msg.param1" } } },
                 { "cmd": "9004", "Handler": { "Action": "loadLayout", "Content": "~msg.paramjson" } },
                 { "cmd": "9005", "Handler": { "Action": "initLayoutModal", "Content": { "startMsg": "~msg", "layoutID": "~msg.param1" } } },
                 { "cmd": "9006", "Handler": { "Action": "loadLayoutModal", "Content": "~msg.paramjson" } },
                 { "cmd": "9007", "Handler": { "Action": "sendMsg", "Content": ["1003"] } },
                 { "cmd": "9008", "Handler": { "Action": "initLayoutModal", "Content": { "startMsg": "~msg", "layoutID": "~msg.param1" } } },
                 { "cmd": "9009", "Handler": { "Action": "sendMsg", "Content": ["1006"] } },
                 { "cmd": "9000", "Handler": { "Action": "sendMsg", "Content": ["9001"] } },
    ],
    outList: [
                new Message("LM", "1000", "RM", "角色", "获取层级详情", "9002", "", "", { "配置ID": "~msg.param1", "层数": 3 }, ""),
                new Message("LM", "1001", "RM", "布局", "获取层级详情", "9004", "", "", { "配置ID": "*$(this).data('startMsg').param1", "层数": 2 }, ""),
                new Message("LM", "1002", "RM", "布局", "获取层级详情", "9006", "", "", { "配置ID": "*$(this).data('startMsg').param1", "层数": 2 }, ""),
                new Message("LM", "1003", "RM", "布局", "删除", "9000", "", "", { "配置ID": "~msg.param1" }, ""),
                new Message("LM", "9001", "LM", "*LM.roleID", "", "", "", "", "", ""),
                new Message("LM", "1004", "RM", "面板", "获取层级详情", "9004", "", "", { "配置ID": "*$(this).data('startMsg').param1", "层数": 2 }, ""),
                new Message("LM", "1005", "RM", "面板", "获取层级详情", "9006", "", "", { "配置ID": "*$(this).data('startMsg').param1", "层数": 2 }, ""),
                new Message("LM", "1006", "RM", "面板", "删除", "9000", "", "", { "配置ID": "~msg.param1" }, ""),
    ],

   
    createSwitchEdit: function () {
        var $btnEnabledEdit = $('<div style="position:fixed;top:1em;right:1em;"></div>');
        var $switchEdit = $('<div id="EditModeWrap"></div>');
        var $FlipEditMode = $('<div id="flip_appbar_editMode">' +
                      '<select name="select_appbar_editMode" id="select_appbar_editMode" data-role="slider" data-mini="true" class="ui-slider-switch">' +
                          '<option value="off" selected="selected">关</option>' +
                          '<option value="on">开</option>' +
                      '</select>' +
                      '<div role="application" class="ui-slider ui-slider-switch ui-btn-down-c ui-btn-corner-all ui-mini">' +
                          '<span class="ui-slider-label ui-slider-label-a ui-btn-active ui-btn-corner-all" role="img" style="width: 0%;">On</span>' +
                          '<span class="ui-slider-label ui-slider-label-b ui-btn-down-c ui-btn-corner-all" role="img" style="width: 100%;">Off</span>' +
                          '<div class="ui-slider-inneroffset">' +
                              '<a href="#" class="ui-slider-handle ui-slider-handle-snapping ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" role="slider" aria-valuemin="0" aria-valuemax="1" aria-valuenow="on" aria-valuetext="On" title="On" aria-labelledby="a_appbar_editMode" style="left: 0%;">' +
                                  '<span class="ui-btn-inner">' +
                                      '<span class="ui-btn-text"></span>' +
                                  '</span>' +
                              '</a>' +

                          '</div>' +
          '</div>' +
         '</div>');
        $FlipEditMode.bind('click', function (e) {
            var $this = $(this);
            var $select = $this.children('select');
            var $optionOff = $select.children('option[value=off]');
            var $optionOn = $select.children('option[value=on]');
            var $uiSlider = $this.children('div.ui-slider');
            var $spanOn = $uiSlider.children('span:eq(0)');
            var $spanOff = $uiSlider.children('span:eq(1)');
            var $inneroffset = $uiSlider.children('div.ui-slider-inneroffset');
            var $a = $inneroffset.children('a.ui-slider-handle');

            var f_a_left = $a.css('left');
            if (f_a_left === '0px' || f_a_left === '0%') {
                $optionOn.attr('selected', 'selected').siblings().removeAttr('selected');
                $spanOn.width('100%').siblings().width('0%');
                var f_uiSliderW = $uiSlider.width();
                var f_crowss = f_uiSliderW - $a.width() - 4;
                $a.css('left', f_crowss);
                LM.onSwitchEdit.call($this, e, { "switch": "on" });
                pageConfig.IsEditMode = true;
            }
            else {
                $optionOff.attr('selected', 'selected').siblings().removeAttr('selected');
                $spanOff.width('100%').siblings().width('0%');
                $a.css('left', '0%');
                LM.onSwitchEdit.call($this, e, { "switch": "off" });
                pageConfig.IsEditMode = false;
            }
        })

        $switchEdit.append($FlipEditMode);
        $btnEnabledEdit.append($switchEdit);
        return $btnEnabledEdit;
    },
    onSwitchEdit: function (e, switchArg) {
        switch (switchArg.switch) {
            case 'on':
                //LM.divToggle(LM.$DataSetManagerLayout, LM.$SwingContains, true, { "width": pageConfig.DataSetManager.maxWidth }, { "width": pageConfig.SwingContain.minWidth }, true, 300);
                //$('div.swingSceneEdit').removeClass('swingHide');
                //$('div.swingLayoutEdit').removeClass('swingHide');

                $('div.swingSceneEdit').fadeIn(666);
                $('div.swingLayoutEdit').fadeIn(666);
                $('.swingPanelEdit').fadeIn(666);
                LM.IsEditMode = true;
                break;
            case 'off':
                //LM.divToggle(LM.$DataSetManagerLayout, LM.$SwingContains, true, { "width": pageConfig.DataSetManager.minWidth }, { "width": pageConfig.SwingContain.maxWidth }, true, 300);
                //$('div.swingSceneEdit').addClass('swingHide');
                //$('div.swingLayoutEdit').addClass('swingHide');

                $('div.swingSceneEdit').stop().fadeOut(666);
                $('div.swingLayoutEdit').stop().fadeOut(666);
                $('.swingPanelEdit').stop().fadeOut(666);
                LM.IsEditMode = false;
                break;
            default:
                break;
        }
    },
    //初始化metro面板
    initScenes: function (s_metroID, scenes) {
        $('.tile-group').remove();
        $('#' + s_metroID).children('.mtAppTitle').empty();

        scenes = Diablo.cloneJSON(scenes[0].items);
        if (scenes) {
            var $divAppName = $('<div class="mtAppName">' + swingApp.TitleName + '</div>');
            $('#' + s_metroID).children('.mtAppTitle').append($divAppName);

            var o_sceneNew = { "配置ID": null, "父配置ID": scenes[0].父配置ID, "标签0": "", "标签1": "", "标签2": "", "标签3": "", "标签4": "", "标签5": "", "标签6": "", "标签7": "", "标签8": "", "标签9": "", "类别": "SC", "名称": "新建", "内容": "新建场景内容", "排序": null, "备注": "新建场景备注", "items": [] };
            scenes.push(o_sceneNew);
            var $btnEnabledEdit = LM.createSwitchEdit();

            //$('#' + s_metroID).children('.mtAppTitle').append($btnEnabledEdit);
            $(document.body).append($btnEnabledEdit);
            for (var i in scenes) {
                var zrw = JSON.stringify(scenes[i]);
                var thisScene = new Scene(scenes[i].父配置ID, scenes[i].配置ID, scenes[i].名称);
                var $scene = $('<div class="tile-group clear-fix"></div>');
                var $sceneTitle = $('<div class="sceneTitle clear-fix"><div class="sceneName"><span style="margin-left:15%;">' + thisScene.Name + '</span></div></div>');

                if (!thisScene.ID) {
                    $scene.attr('id', 'undefined');
                    $scene.css('border', 'dotted 1px #AAEE99');
                    $scene.addClass('swingHide');
                    $scene.addClass('swingSceneEdit');
                }
                else {
                    $scene.attr('id', thisScene.ID);
                    $tbSceneEdit = $('<div class="mtSceneToolBar swingSceneEdit swingHide clear-fix"></div>');
                    var $btnSceneMod = $('<div class="mtSceneToolBarItem edit"><a href="#"><img style="width:100%;height:100%;border:0;"  src="../images/Operate/edit_b.png" alt="1"></a></div>');
                    var $btnSceneDel = $('<div class="mtSceneToolBarItem del"><a href="#"><img style="width:100%;height:100%;border:0;"  src="../images/Operate/del_b.png" alt="1"></a></div>');

                    $tbSceneEdit.append($btnSceneMod).append($btnSceneDel);
                    $sceneTitle.append($tbSceneEdit);
                }


                $scene.append($sceneTitle);
                var $tiles = $('<div class="tiles cobalt clear-fix"></div>');

                //可能改为获取
                var o_layous = scenes[i].items;
                var o_layoutNew = { "配置ID": null, "父配置ID": scenes[i].配置ID, "标签0": "STANDARD01", "标签1": "true", "标签2": "{}", "标签3": "slide", "标签4": "", "标签5": "horizontal", "标签6": "0", "标签7": null, "标签8": "[{\"Event\":\"LayoutAddClick\",\"Index\":\"\",\"Cmds\":[{\"src\":\"*$(this).parents('.live-tile').attr('id')\",\"cmd\":\"9005\",\"dst\":\"LM\",\"param1\":\"83\",\"param2\":\"布局\",\"param3\":\"ADD\",\"param4\":\"*$(this).parents('.tile-group').attr('id')\",\"param5\":\"\",\"paramjson\":\"\",\"paramxml\":\"\"}]}]", "标签9": "", "类别": "LO", "名称": "新建", "内容": "新建布局内容", "排序": null, "备注": "新建布局备注" };
                o_layous.push(o_layoutNew);
                for (var j in o_layous) {
                    var zrw = '';

                    var o_thisLayout = new Layout(o_layous[j].父配置ID, o_layous[j].配置ID, o_layous[j].名称, o_layous[j].标签0, o_layous[j].标签1, eval('(' + o_layous[j].标签2 + ')'), o_layous[j].标签3, o_layous[j].标签4, o_layous[j].标签5, o_layous[j].标签6, o_layous[j].标签7, o_layous[j].标签8, o_layous[j].标签9);

                    $liveTile = $('<div id="' + o_thisLayout.ID + '" class="live-tile" data-mode="flip" data-initdelay="500"  style="position:relative;width:30%;height:48%;float:left;margin: 1% 1%;"></div>');
                    var options = $.extend({}, o_thisLayout, {
                        playOnHover: true,
                        repeatCount: 0,
                        delay: 0,
                        startNow: false
                    });
                    $liveTile.liveTile('init', options);
                    if (o_thisLayout.ID) {
                        var pItemsCmdEvents = eval('(' + o_thisLayout.BtnCmdEvents + ')');
                        for (var i in pItemsCmdEvents) {
                            switch (pItemsCmdEvents[i].Event) {
                                case 'click':
                                    var zrw = '';
                                    $liveTile.bind('click', { 'Cmds': pItemsCmdEvents[i].Cmds }, function (e) {
                                        var $this = $(this);
                                        var Cmds = e.data.Cmds;
                                        for (var j in Cmds) {
                                            var thisMsg = {};
                                            var paramsFml = Cmds[j];
                                            var thisMsg = Diablo.parser.resolve.call(this, paramsFml);
                                            MM.sendMsg.call(this, e, thisMsg);
                                        }
                                    })
                                    break;
                                case 'LayoutModClick':
                                    var zrw = '';
                                    var zrw = $liveTile.find('div.mtLayoutToolBarItem.edit');
                                    $liveTile.find('div.mtLayoutToolBarItem.edit').bind('click', { 'Cmds': pItemsCmdEvents[i].Cmds }, function (e) {
                                        e.stopPropagation();
                                        var $this = $(this);
                                        var Cmds = e.data.Cmds;
                                        for (var j in Cmds) {
                                            var thisMsg = {};
                                            var paramsFml = Cmds[j];

                                            var thisMsg = Diablo.parser.resolve.call(this, paramsFml);
                                            MM.sendMsg.call(this, e, thisMsg);
                                        }

                                    })
                                    break;
                                case 'LayoutDelClick':
                                    var zrw = '';
                                    $liveTile.find('div.mtLayoutToolBarItem.del').bind('click', { 'Cmds': pItemsCmdEvents[i].Cmds }, function (e) {
                                        e.stopPropagation();
                                        var $this = $(this);
                                        if (confirm('确定删除布局')) {
                                            var Cmds = e.data.Cmds;
                                            for (var j in Cmds) {
                                                var thisMsg = {};
                                                var paramsFml = Cmds[j];
                                                var thisMsg = Diablo.parser.resolve.call(this, paramsFml);
                                                MM.sendMsg.call(this, e, thisMsg);
                                            }
                                        }

                                    })
                                    break;

                                default:
                                    break;
                            }
                        }
                    }
                    else {
                        var pItemsCmdEvents = eval('(' + o_thisLayout.BtnCmdEvents + ')');
                        for (var i in pItemsCmdEvents) {
                            switch (pItemsCmdEvents[i].Event) {
                                case 'LayoutAddClick':
                                    var zrw = '';
                                    if ($liveTile.hasClass('swingLayoutAdd')) {
                                        var zrw = '';
                                        $liveTile.bind('click', { 'Cmds': pItemsCmdEvents[i].Cmds }, function (e) {
                                            e.stopPropagation();
                                            var $this = $(this);
                                            var Cmds = e.data.Cmds;
                                            for (var j in Cmds) {
                                                var thisMsg = {};
                                                var paramsFml = Cmds[j];
                                                var thisMsg = Diablo.parser.resolve.call(this, paramsFml);
                                                MM.sendMsg.call(this, e, thisMsg);
                                            }
                                        })
                                    }
                                    break;

                            }
                        }
                    }
                    $tiles.append($liveTile);
                    $scene.append($tiles);
                }
                $('#' + s_metroID).children('div').eq(1).children('div').eq(0).append($scene);
            }
            $('#tabHome').bind('click', function () {
                LM.tabSelect(this);
            })

            LM.liveMetro();
            LM.fitToBodySize();
            LM.createLoading();
            LM.createMaskLayer();

        }
        $(window).bind('resize', function () {
            var zrw = '';
            LM.fitToBodySize();
        })
    },
    createLoading: function () {
        LM.$divLoading = $('<div class="ui-loader ui-corner-all ui-body-d ui-loader-verbose swingLoading"><span class="ui-icon ui-icon-loading"></span>' +
                 '<h1>loading...</h1>' +
         '</div>');
        $('.page').append(LM.$divLoading);

    },
    createMaskLayer: function () {
        LM.$maskLayer = $('<div class="swingMaskLayer" style="position:fixed;left:0;top:0;margin-left: 0; margin-top: 0; z-index:10;width:100%;height:100%;opacity:0.6;background:#000;display:none;"></div>');
        $('.page').append(LM.$maskLayer);

        LM.$maskLayerModal = $('<div class="swingMaskLayerModal" style="position:fixed;left:0;top:0;margin-left: 0; margin-top: 0; z-index:10;width:100%;height:100%;opacity:0.5;background:#000;display:none;"></div>');
        $('.page').append(LM.$maskLayerModal);
    },
    fitToBodySize: function () {
        var pageWidth = $(document.body).children('div.page').innerWidth();
        var pageHeight = $(document.body).children('div.page').innerHeight();
        LM.setFont(pageWidth, pageHeight);
    },
    setFont: function (bodyWidth, bodyHeight) {
        var basicFS = (bodyWidth + bodyHeight) * 1 / 100;
        var basicHT = (bodyHeight) * 3 / 100;
        $('.mtAppName').css('font-size', basicFS * 1.5 + 'px');
        $('.sceneName').css('font-size', basicFS * 1.2 + 'px');
        $('.layoutName').css('font-size', basicFS * 0.6 + 'px');
        $('.layoutNameLarger').css('font-size', basicFS + 'px');


    },
    //布局标签切换
    tabSelect: function (selectedTab, windowMode) {

        var $selectedTab = $(selectedTab);
        $selectedTab.addClass('swingSelected').css('opacity', '1');
        $selectedTab.siblings().removeClass('swingSelected').css('opacity', '0.3');

        var $liTab = $selectedTab;
        if ($liTab.attr('id') === 'tabHome') {
            var $MetroContain = $('#MetroContain');
            $MetroContain.removeClass('swingHide');
            LM.$LayoutsContain.addClass('swingHide');
            LM.isDesktop = true;
        }
        else {
            var $MetroContain = $('#MetroContain');
            $MetroContain.addClass('swingHide');
            LM.$LayoutsContain.removeClass('swingHide');
            $('#layout_' + $selectedTab.attr('id').split('_')[1]).removeClass('swingHide');
            $('.swingLayout:not(#layout_' + $selectedTab.attr('id').split('_')[1] + ')').addClass('swingHide');
            LM.isDesktop = false;
        }

    },
    //Metro中初始化一个布局
    initLayout: function (layoutIDAndStartMsg, windowMode) {
        var o_params, lvs;

        if (!windowMode || (windowMode === '')) {
            if (!$('#layout_' + layoutIDAndStartMsg.layoutID).length > 0) {
                var o_openPara = {};
                if (!o_params) {
                    o_openPara.width = '150px';
                    o_openPara.height = '150px';
                    o_openPara.left = '0px';
                    o_openPara.top = '0px';

                }
                else {
                    o_openPara = o_params;
                }

                var $layoutTabNew = $('<a id="layoutTab_' + layoutIDAndStartMsg.layoutID + '" href="#" data-icon="plus" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="a" class="ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-btn-icon-left"><span class="ui-btn-inner"><span class="ui-btn-text">' + layoutIDAndStartMsg.layoutID + '</span><span class="ui-icon ui-icon-grid ui-icon-shadow">&nbsp;</span></span></a>');

                $layoutTabNew.bind('click', function (e) {
                    var $this = $(this);
                    LM.tabSelect(this);
                })
                $layoutTabNew.css("opacity", "0.3");


                var $layoutNew = $('<div id="layout_' + layoutIDAndStartMsg.layoutID + '" class="swingLayout" ></div>');
                $layoutNew.data('startMsg', layoutIDAndStartMsg.startMsg);


                $layoutNew.width(o_openPara.width);
                $layoutNew.height(o_openPara.height);
                $layoutNew.css('left', o_openPara.left);
                $layoutNew.css('top', o_openPara.top);
                $layoutNew.css('float', 'left');
                $layoutNew.css('opacity', '0.01');


                LM.$Bottombar.children('#BottombarTabs').append($layoutTabNew);


                LM.$LayoutsContain.append($layoutNew);


                LM.tabSelect($('#layoutTab_' + layoutIDAndStartMsg.layoutID));
                $layoutNew.animate({
                    left: '0px',
                    top: '0px',
                    opacity: '1',
                    height: '100%',
                    width: '100%'
                });

                var a_outList = LM.outList;
                for (var c in a_outList) {
                    var zrw = '';
                    if ('1001' === a_outList[c].cmd) {
                        var zrw = '';
                        var objNeedResolve = Diablo.cloneJSON(a_outList[c]);
                        var returnObj = Diablo.parser.resolve.call($layoutNew, objNeedResolve, null);
                        MM.sendMsg.call($layoutNew, null, returnObj);
                    }
                }
            }
            else {
                $('#layoutTab_' + layoutIDAndStartMsg.layoutID).trigger('click');
                if (config.LogConfig.level >= 1 && config.LogConfig.isLogInfo) {
                    Diablo.printLog("消息", false, '打开布局', '已经存在layout_' + layoutIDAndStartMsg.layoutID + '的布局');
                }
            }
        }
        else {
            var pageWidth = $(document.body).children('div.page').innerWidth();
            var pageHeight = $(document.body).children('div.page').innerHeight();


            var $layoutNew = $('<div id="" class="swingLayout layout_' + layoutIDAndStartMsg.layoutID + '" ></div>');
            $layoutNew.data('startMsg', layoutIDAndStartMsg.startMsg);

            LM.$Pages.append($layoutNew);


            $layoutNew.css('position', 'fixed');
            $layoutNew.width('66%');
            $layoutNew.height('66%');
            $layoutNew.css('top', '50%');
            $layoutNew.css('left', '50%');
            $layoutNew.css('background-color', '#ffffff');
            $layoutNew.css('z-index', '1100');
            var p_left = $layoutNew.width() * 50 / pageWidth;
            var p_top = $layoutNew.height() * 50 / pageWidth;
            p_left = '-' + p_left + '%';
            p_top = '-' + p_top + '%'
            $layoutNew.css('margin-left', p_left);
            $layoutNew.css('margin-top', p_top);


            LM.$maskLayerModal.show();


            var a_outList = LM.outList;
            for (var c in a_outList) {
                var zrw = '';
                if ('1002' === a_outList[c].cmd) {
                    var zrw = '';
                    var objNeedResolve = Diablo.cloneJSON(a_outList[c]);
                    var returnObj = Diablo.parser.resolve.call($layoutNew, objNeedResolve, null);
                    MM.sendMsg.call($layoutNew, null, returnObj);
                }
            }
        }
    },

    loadLayout: function (lData, windowMode) {
        var layoutData = lData[0], o_params, lvs;
        var a_panels = [];
        for (var i in layoutData.items) {

            //不用规范的JSON字符串
            var UI, InList, OutList, Load, Release, DefautData, Events, Timers, Fields;
            var o_UI = eval('(' + layoutData.items[i].标签0 + ')');

            var o_InList = eval('(' + layoutData.items[i].标签1 + ')');
            var o_OutList = eval('(' + layoutData.items[i].标签2 + ')');
            var o_Init = eval('(' + layoutData.items[i].标签3 + ')');
            var o_Release = eval('(' + layoutData.items[i].标签4 + ')');
            var o_DefautData = eval('(' + layoutData.items[i].标签5 + ')');
            var o_Events = eval('(' + layoutData.items[i].标签6 + ')');
            var o_Timers = eval('(' + layoutData.items[i].标签7 + ')');
            var o_Fields = eval('(' + layoutData.items[i].标签8 + ')');
            var o_panel = new Panel(layoutData.配置ID, layoutData.items[i].配置ID, layoutData.items[i].名称, o_UI, o_InList, o_OutList, o_Init, o_Release, o_DefautData, o_Events, o_Timers, o_Fields);

            a_panels.push(o_panel);
        }
        var o_layoutData = new Layout(layoutData.父配置ID, layoutData.配置ID, layoutData.名称, layoutData.标签0, layoutData.标签1, eval('(' + layoutData.标签2 + ')'), layoutData.标签3, layoutData.标签4, layoutData.标签5, layoutData.标签6, layoutData.标签7, layoutData.标签8, layoutData.标签9, a_panels);
        var $layoutNeedLoad = {};
        if (!windowMode || (windowMode === '')) {
            var $layoutNeedLoad = $('#layout_' + o_layoutData.ID);
            var zrw = $('#layoutTab_' + o_layoutData.ID).children('span.ui-btn-inner').children('span.ui-btn-text').html(o_layoutData.LayoutName);
            var zrw = '';
        }
        else {
            var $layoutNeedLoad = $('.layout_' + o_layoutData.ID);
        }
        //根据布局类型获取配置
        var zrw = '';
        var myLayoutPara = LM.getLTypePara(o_layoutData.LayoutType);
        LM.fillLayout($layoutNeedLoad, myLayoutPara, o_layoutData, windowMode);
    },
    //控制div显示\隐藏动画效果
    divToggle: function (div, nextDiv, isShow, divSize, nextDivSize, isAnimate, animateTime) {
        var $div = $(div);
        var $nextDiv = $(nextDiv);
        var b_divShow = false;
        var b_nextDivShow = false;
        if (divSize.width || divSize.height) {

            if (parseFloat(divSize.width) > 0) {
                b_divShow = true;
            }

            if (parseFloat(divSize.height) > 0) {
                b_divShow = true;
            }

            if (b_divShow) {
                $div.removeClass('swingHide');
                $div.stop().animate(divSize, animateTime);
            }
            else {
                $div.stop().animate(divSize, animateTime, function () {
                    var $this = $(this);
                    $this.addClass('swingHide');
                });
            }
        }
        $nextDiv.stop().animate(nextDivSize, animateTime);
    },
    dragHandle: function (handle, BS, color) {
        var $handle = $(handle);
        var isDrag = false;
        var startX = 0, startY = 0;
        var prevWidth = 0, prevHeight = 0;
        var nextWidth = 0, nextHeight = 0;
        var $prevOne = {};
        var $nextOne = {};
        var parentWidth = 0, parentHeight = 0;
        switch (BS) {
            case 'H':
                $handle.css('cursor', 'row-resize');
                $handle.css('float', 'left');

                $handle.css('background', color + ' url(../images/Layouts/handle-h.png) 50% 50% no-repeat');
                break;
            case 'V':
                $handle.css('cursor', 'col-resize');
                $handle.css('float', 'left');
                $handle.css('background', color + ' url(../images/Layouts/handle-v.png) 50% 50% no-repeat');
                break;
            default:
                break;
        }
        $handle.mousedown(function (e) {
            isDrag = true;
            startX = e.x ? e.x : e.pageX;
            startY = e.y ? e.y : e.pageY;
            //
            $prevOne = $handle.prev();
            if ($prevOne.is(':hidden')) {
                $prevOne = $prevOne.prev();
            }

            //$prevOne.bind('selectstart', function () {
            //    return false;
            //})
            //$prevOne.addClass('noSelect');
            prevWidth = $prevOne.width();
            prevHeight = $prevOne.height();
            //
            $nextOne = $handle.next();
            if ($nextOne.is(':hidden')) {
                $nextOne = $nextOne.next();
            }
            //$nextOne.bind('selectstart', function () {
            //    return false;
            //})
            //$nextOne.addClass('noSelect');

            nextWidth = $nextOne.width();
            nextHeight = $nextOne.height();
            //
            var $parent = {};
            if ($(this).parents('.swingContent').length > 0) {
                $parent = $(this).parents('.swingContent');
            }
            else if ($(this).parents('.swingMainContent').length > 0) {
                $parent = $(this).parents('.swingMainContent');
            }
            else {
                $parent = $(this).parents('.swingLayout')
            }
            parentWidth = $parent.width();
            parentHeight = $parent.height();
            //
            switch (BS) {
                case 'H':
                    var py = $prevOne.height() * 100 / parentHeight;
                    var pya = $nextOne.height() * 100 / parentHeight;
                    //console.log('开始offsetY：' + startY + '  前一个高：' + py + '%' + '后一个高：' + pya + '% 和：' + (py + pya) + '%');
                    break;
                case 'V':
                    var px = $prevOne.width() * 100 / parentWidth;
                    var pxa = $nextOne.width() * 100 / parentWidth;
                    //console.log('开始offsetX：' + startX + '  前一个宽：' + px + '%' + '后一个宽：' + pxa + '% 和:' + (px + pxa) + '%');
                    break;
                default:
                    break;
            }

        }).mouseup(function () {
            isDrag = false;
        })

        $(document).mousemove(function (e) {
            if (!isDrag)
                return;
            switch (BS) {
                case 'H':
                    var moveY = e.y ? e.y : e.pageY;
                    var changedY = moveY - startY;

                    var yp = ((parseFloat(prevHeight) + changedY) * 100 / parentHeight);
                    var ypa = ((parseFloat(nextHeight) - changedY) * 100 / parentHeight);

                    //console.log('移动中offsetY：' + moveY + ' 前一个:' + yp + '%' + '后一个：' + ypa + '%' + ' 和:' + (yp + ypa) + '%');

                    yp = yp + '%';
                    ypa = ypa + '%';
                    $prevOne.height(yp);
                    $nextOne.height(ypa);
                    break;
                case 'V':
                    var moveX = e.x ? e.x : e.pageX;
                    var changedX = moveX - startX;

                    var xp = ((parseFloat(prevWidth) + changedX) * 100 / parentWidth);
                    var xpa = ((parseFloat(nextWidth) - changedX) * 100 / parentWidth);

                    //console.log('移动中offsetX：' + moveX + ' 前一个:' + xp + '%' + '后一个：' + xpa + '%' + ' 和:' + (xp + xpa) + '%');

                    xp = xp + '%';
                    xpa = xpa + '%';
                    $prevOne.width(xp);
                    $nextOne.width(xpa);
                    break;
                default:
                    break;
            }


        })
    },

    editBarEventsBind:function (editBar,btnCmdEvents){
        var events = eval('(' + btnCmdEvents + ')');
        for (var i in events) {
            var zrw = events[i].Event;
            switch (events[i].Event) {
                case 'PanelAddClick':
                    var zrw = $(editBar).find('.add');
                    $(editBar).find('.add').bind('click', { 'Cmds': events[i].Cmds }, function (e) {
                        e.stopPropagation();
                        var $this = $(this);
                        var Cmds = e.data.Cmds;
                        for (var j in Cmds) {
                            var thisMsg = {};
                            var paramsFml = Cmds[j];

                            var thisMsg = Diablo.parser.resolve.call(this, paramsFml);
                            MM.sendMsg.call(this, e, thisMsg);
                        }
                    })
                    break;
                case 'PanelModClick':
                    var zrw = $(editBar).find('.edit');
                    $(editBar).find('.edit').bind('click', { 'Cmds': events[i].Cmds }, function (e) {
                        e.stopPropagation();
                        var $this = $(this);
                        var Cmds = e.data.Cmds;
                        for (var j in Cmds) {
                            var thisMsg = {};
                            var paramsFml = Cmds[j];
                            var thisMsg = Diablo.parser.resolve.call(this, paramsFml);
                            MM.sendMsg.call(this, e, thisMsg);
                        }
                    })
                    break;
                case 'PanelDelClick':
                    var zrw = $(editBar).find('.del');
                    $(editBar).find('.del').bind('click', { 'Cmds': events[i].Cmds }, function (e) {
                        e.stopPropagation();
                        var $this = $(this);
                        if (confirm('确定删除面板')) {
                            var Cmds = e.data.Cmds;
                            for (var j in Cmds) {
                                var thisMsg = {};
                                var paramsFml = Cmds[j];
                                var thisMsg = Diablo.parser.resolve.call(this, paramsFml);
                                MM.sendMsg.call(this, e, thisMsg);
                            }
                        }
                    })
                    break;
                default:
                    break;
            }
        }
    },
    //初始化布局
    fillLayout: function ($layoutNew, myLayoutPara, o_layout, windowMode) {
        //需要获取数据handle
        var a_panels = o_layout.items;
        var s_swingPanelEditItems = '<a href="#" data-role="button" data-icon="plus" data-iconpos="notext" data-theme="b" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" title="添加一个面板" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-icon-notext ui-btn-hover-b ui-btn-up-bt swingPanelEditItem add"><span class="ui-btn-inner"><span class="ui-btn-text">新增面板</span><span class="ui-icon ui-icon-plus ui-icon-shadow">&nbsp;</span></span></a>'
                            + '<a href="#" data-role="button" data-icon="delete" data-iconpos="notext" data-theme="b" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" title="删除一个面板" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-icon-notext ui-btn-hover-b ui-btn-up-b swingPanelEditItem del"><span class="ui-btn-inner"><span class="ui-btn-text">删除面板</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>'
                            + '<a href="#" data-role="button" data-icon="edit" data-iconpos="notext" data-theme="b" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" title="修改面板" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-icon-notext ui-btn-hover-b ui-btn-up-b swingPanelEditItem edit"><span class="ui-btn-inner"><span class="ui-btn-text">修改面板</span><span class="ui-icon ui-icon-edit ui-icon-shadow">&nbsp;</span></span></a>';
        switch (myLayoutPara.LCsfct) {
            case 'STANDARD':
                var zrw = '';
                var $headerWrap = $('<div></div>');

                var $header = $('<div class="ui-body-' + myLayoutPara.header.background + ' swingHeader swingPos" data-pos="0_header"></div>');
                var $headerEditBar = $('<div class="ui-controlgroup-controls swingPanelEdit swingBlockTopBar">'
				                            + s_swingPanelEditItems
				                        + '</div>');

                //绑定EditBar事件
                LM.editBarEventsBind($headerEditBar, o_layout.BtnCmdEvents);
         
                $header.append($headerEditBar);
                $header.height('100%');

                $headerWrap.width(myLayoutPara.header.width).height(myLayoutPara.header.height);
                $headerWrap.css('float', 'left');
                $headerWrap.append($header);
                if (!myLayoutPara.header.isShow) {
                    $headerWrap.hide();
                }

                var $headerHandle = $('<div class="swingHandle"></div>');
                $headerHandle.width(myLayoutPara.headerHandle.width).height(myLayoutPara.headerHandle.height);
                if (!myLayoutPara.headerHandle.isShow) {
                    $headerHandle.hide();
                }

                LM.dragHandle($headerHandle, 'H', Diablo.getJqmBgColor(myLayoutPara.headerHandle.background));



                var $menu = $('<div class="ui-body-' + myLayoutPara.menu.background + ' swingMenu swingPos" data-pos="01_menu"></div>');
                var $menuEditBar = $('<div class="ui-controlgroup-controls swingPanelEdit swingBlockTopBar">'
                                             + s_swingPanelEditItems
				                        + '</div>');

                //绑定EditBar事件
                LM.editBarEventsBind($menuEditBar, o_layout.BtnCmdEvents);
                $menu.append($menuEditBar);
                $menu.height('100%');

                var $menuWrap = $('<div></div>');
                $menuWrap.width(myLayoutPara.menu.width).height(myLayoutPara.menu.height);
                $menuWrap.css('float', 'left');
                $menuWrap.append($menu);
                if (!myLayoutPara.menu.isShow) {
                    $menuWrap.hide();
                }
                var $menuHandle = $('<div class="swingHandle"></div>');
                $menuHandle.width(myLayoutPara.menuHandle.width).height(myLayoutPara.menuHandle.height);
                if (!myLayoutPara.menuHandle.isShow) {
                    $menuHandle.hide();
                }
                LM.dragHandle($menuHandle, 'H', Diablo.getJqmBgColor(myLayoutPara.menuHandle.background));


                var $mainContent = $('<div class="swingMainContent"></div>');
                $mainContent.width(myLayoutPara.mainContent.width).height(myLayoutPara.mainContent.height);
                $mainContent.css('float', 'left');

                var $mainContentHandle = $('<div></div>');
                $mainContentHandle.width(myLayoutPara.mainContentHandle.width).height(myLayoutPara.mainContentHandle.height);
                if (!myLayoutPara.mainContentHandle.isShow) {
                    $mainContentHandle.hide();
                }
                LM.dragHandle($mainContentHandle, 'H', Diablo.getJqmBgColor(myLayoutPara.mainContentHandle.background));


                var $sidebarL = $('<div class="ui-body-' + myLayoutPara.mainContent.sidebarL.background + ' swingSidebarL  swingPos" data-pos="02_sidebarL"></div>');
                var $sidebarLEditBar = $('<div class="ui-controlgroup-controls swingPanelEdit swingBlockTopBar">'
                                             + s_swingPanelEditItems
				                        + '</div>');
                //绑定EditBar事件
                LM.editBarEventsBind($sidebarLEditBar, o_layout.BtnCmdEvents);
                $sidebarL.append($sidebarLEditBar);
                $sidebarL.height('100%');

                var $sidebarLWrap = $('<div></div>');
                $sidebarLWrap.width(myLayoutPara.mainContent.sidebarL.width).height(myLayoutPara.mainContent.sidebarL.height);
                $sidebarLWrap.css('float', 'left');
                $sidebarLWrap.append($sidebarL);

                if (!myLayoutPara.mainContent.sidebarL.isShow) {
                    $sidebarLWrap.hide();
                }

                var $sidebarLHandle = $('<div class="swingHandle"></div>');
                $sidebarLHandle.width(myLayoutPara.mainContent.sidebarLHandle.width).height(myLayoutPara.mainContent.sidebarLHandle.height);
                if (!myLayoutPara.mainContent.sidebarLHandle.isShow) {
                    $sidebarLHandle.hide();
                }
                LM.dragHandle($sidebarLHandle, 'V', Diablo.getJqmBgColor(myLayoutPara.mainContent.sidebarLHandle.background));

                var $content = $('<div class="swingContent"></div>');
                $content.width(myLayoutPara.mainContent.content.width).height(myLayoutPara.mainContent.content.height);
                $content.css('float', 'left');
                var $contentHandle = $('<div></div>');
                $contentHandle.width(myLayoutPara.mainContent.contentHandle.width).height(myLayoutPara.mainContent.contentHandle.height);
                if (!myLayoutPara.mainContent.contentHandle.isShow) {
                    $contentHandle.hide();
                }
                LM.dragHandle($contentHandle, 'V', Diablo.getJqmBgColor(myLayoutPara.mainContent.contentHandle.background));

                var $contentA = $('<div class="ui-body-' + myLayoutPara.mainContent.content.contentA.background + ' swingContentA swingPos" data-pos="03_contentA"></div>');
                var $contentAEditBar = $('<div class="ui-controlgroup-controls swingPanelEdit swingBlockTopBar">'
                                               + s_swingPanelEditItems
				                        + '</div>');
                //绑定EditBar事件
                LM.editBarEventsBind($contentAEditBar, o_layout.BtnCmdEvents);
                $contentA.append($contentAEditBar);
                $contentA.height('100%');

                var $contentAWrap = $('<div></div>');
                $contentAWrap.width(myLayoutPara.mainContent.content.contentA.width).height(myLayoutPara.mainContent.content.contentA.height);
                $contentAWrap.append($contentA);
                $contentAWrap.css('float', 'left');
                if (!myLayoutPara.mainContent.content.contentA.isShow) {
                    $contentAWrap.hide();
                }

                var $contentAHandle = $('<div class="swingHandle"></div>');
                $contentAHandle.width(myLayoutPara.mainContent.content.contentAHandle.width).height(myLayoutPara.mainContent.content.contentAHandle.height);
                if (!myLayoutPara.mainContent.content.contentAHandle.isShow) {
                    $contentAHandle.hide();
                }
                LM.dragHandle($contentAHandle, 'H', Diablo.getJqmBgColor(myLayoutPara.mainContent.content.contentAHandle.background));


                var $contentB = $('<div class="ui-body-' + myLayoutPara.mainContent.content.contentB.background + ' swingContentB swingPos" data-pos="04_contentB"></div>');
                var $contentBEditBar = $('<div class="ui-controlgroup-controls swingPanelEdit swingBlockTopBar">'
                                            + s_swingPanelEditItems
				                        + '</div>');
                //绑定EditBar事件
                LM.editBarEventsBind($contentBEditBar, o_layout.BtnCmdEvents);
                $contentB.append($contentBEditBar);
                $contentB.height('100%');
                var $contentBWrap = $('<div></div>');
                $contentBWrap.width(myLayoutPara.mainContent.content.contentB.width).height(myLayoutPara.mainContent.content.contentB.height);
                $contentBWrap.append($contentB);
                $contentBWrap.css('float', 'left');
                if (!myLayoutPara.mainContent.content.contentB.isShow) {
                    $contentBWrap.hide();
                }

                $content.append($contentAWrap).append($contentAHandle).append($contentBWrap);

                var $sidebarR = $('<div class="ui-body-' + myLayoutPara.mainContent.sidebarR.background + ' swingRidebarR swingPos" data-pos="05_sidebarR"></div>');
                var $sidebarREditBar = $('<div class="ui-controlgroup-controls swingPanelEdit swingBlockTopBar">'
                                          + s_swingPanelEditItems
				                        + '</div>');
                //绑定EditBar事件
                LM.editBarEventsBind($sidebarREditBar, o_layout.BtnCmdEvents);
                $sidebarR.append($sidebarREditBar)
                $sidebarR.height('100%');
                var $sidebarRWrap = $('<div></div>');
                $sidebarRWrap.width(myLayoutPara.mainContent.sidebarR.width).height(myLayoutPara.mainContent.sidebarR.height);
                $sidebarRWrap.append($sidebarR);
                $sidebarRWrap.css('float', 'left');
                if (!myLayoutPara.mainContent.sidebarR.isShow) {
                    $sidebarRWrap.hide();
                }

                $mainContent.append($sidebarLWrap).append($sidebarLHandle).append($content).append($contentHandle).append($sidebarRWrap);

                var $footer = $('<div class="ui-body-' + myLayoutPara.footer.background + ' swingFooter swingPos" data-pos="06_footer"></div>');
                var $footerEditBar = $('<div class="ui-controlgroup-controls swingPanelEdit swingBlockTopBar">'
                                         + s_swingPanelEditItems
				                        + '</div>');
                //绑定EditBar事件
                LM.editBarEventsBind($footerEditBar, o_layout.BtnCmdEvents);
                $footer.append($footerEditBar)
                $footer.height('100%');
                var $footerWrap = $('<div></div>');
                $footerWrap.width(myLayoutPara.footer.width).height(myLayoutPara.footer.height);
                $footerWrap.append($footer);
                $footerWrap.css('float', 'left');
                if (!myLayoutPara.footer.isShow) {
                    $footerWrap.hide();
                }

                for (var i in a_panels) {
                    switch (a_panels[i].UI.PanelLocation.split('_')[1]) {
                        case 'header':
                            if (myLayoutPara.header.isShow) {
                                var $thisPanel = LM.buildPanel(a_panels[i]);
                                $header.append($thisPanel);
                            }
                            else {
                                var zrw = '';
                            }
                            break;
                        case 'menu':
                            if (myLayoutPara.menu.isShow) {
                                var $thisPanel = LM.buildPanel(a_panels[i]);
                                $menu.append($thisPanel);
                            }
                            break;
                        case 'sidebarL':
                            if (myLayoutPara.mainContent.sidebarL.isShow) {
                                var $thisPanel = LM.buildPanel(a_panels[i]);
                                $sidebarL.append($thisPanel);
                            }
                            break;
                        case 'contentA':
                            if (myLayoutPara.mainContent.content.contentA.isShow) {
                                var $thisPanel = LM.buildPanel(a_panels[i]);
                                $contentA.append($thisPanel);
                            }
                            break;
                        case 'contentB':
                            if (myLayoutPara.mainContent.content.contentB.isShow) {
                                var $thisPanel = LM.buildPanel(a_panels[i]);
                                $contentB.append($thisPanel);
                            }
                            break;
                        case 'sidebarR':
                            if (myLayoutPara.mainContent.sidebarR.isShow) {
                                var $thisPanel = LM.buildPanel(a_panels[i]);
                                $sidebarR.append($thisPanel);
                            }
                            break;
                        case 'footer':
                            if (myLayoutPara.footer.isShow) {
                                var $thisPanel = LM.buildPanel(a_panels[i]);
                                $footer.append($thisPanel);
                            }
                            break;
                        default:
                            break;
                    }
                }

                $layoutNew.append($headerWrap).append($headerHandle).append($menuWrap).append($menuHandle).append($mainContent).append($mainContentHandle).append($footerWrap);
                $layoutNew.find('.swingPanel').each(function () {
                    LM.loadPanel(this);
                })
                break;
            case 'GRID':
                var blockWidth = '50%';
                var blockHeight = '50%';

                blockWidth = (100 / myLayoutPara.ColumnCount) + '%';
                blockHeight = (100 / myLayoutPara.RowCount) + '%';
                var blockCount = myLayoutPara.ColumnCount * myLayoutPara.RowCount;
                for (var i = 0; i < blockCount; i++) {
                    var s_theme = myLayoutPara.backgroundOdd;
                    if (i % 2 === 0) {
                        s_theme = myLayoutPara.backgroundEven;
                    }
                    var $div_blockWrap = $('<div"></div>');
                    var $div_block = $('<div class="ui-body-' + s_theme + ' swingBlock swingPos" data-pos="' + i + '_swingBlock"></div>');
                    var $div_blockEditBar = $('<div class="ui-controlgroup-controls swingPanelEdit swingBlockTopBar">'
                                                 + s_swingPanelEditItems
				                        + '</div>');
                    //绑定EditBar事件
                    LM.editBarEventsBind($div_blockEditBar, o_layout.BtnCmdEvents);
                    $div_block.append($div_blockEditBar)
                    $div_block.height('100%');
                    $div_blockWrap.append($div_block);
                    $div_blockWrap.width(blockWidth).height(blockHeight);
                    $div_blockWrap.css('float', 'left');

                    for (var k in a_panels) {
                        if (a_panels[k]) {
                            if (parseInt(a_panels[k].UI.PanelLocation.split('_')[0]) === i) {
                                var $thisPanel = LM.buildPanel(a_panels[k]);
                                $div_block.append($thisPanel);
                            }
                        }
                    }

                    $layoutNew.append($div_blockWrap);
                    LM.loadPanel($div_blockWrap.find('.swingPanel'));
                }

                break;
            default:
                break;
        }
        if (windowMode === 'MODAL') {
            var $modalBar = $('<div style="position:relative;float:right;width:20%;height:10%;"><a href="#"><img style="width:20%;height:80%;border:0;float:right;"  src="../images/Operate/Erase_b.png" alt="1"></a></div>');
            $modalBar.bind('click', function () {
                var $this = $(this);
                $this.parents('div.swingLayout').remove();
                LM.$maskLayerModal.hide();
            })
            $layoutNew.append($modalBar);

        }
        if (LM.IsEditMode) {
            $layoutNew.find('.swingPanelEdit').show();
        }
        else {
            $layoutNew.find('.swingPanelEdit').hide();
        }
    },
    //通过jQuery插件的方式为按钮增加Metro效果
    liveMetro: function () {
        $('.tiles').sortable();
        $('.tiles').disableSelection();
    },
    initEditBars: function () {
        var zrw = '';
        //LM.$DataSetManager.swingDataSetManager('init');
    },
    //初始化低工具栏
    initAppbar: function () {
        collapse(LM.$Bottombar);
        $('.btbetc').click(function () {
            var $this = $(this);
            var $appbar = $this.parent().parent();
            if ($appbar.hasClass('expanded')) {
                collapse($appbar);
            }
            else {
                expand($appbar);
            }
        })
        function collapse($appbar) {
            $appbar.stop().animate({ height: pageConfig.Bottombar.minHeight }, { duration: 300 });
            LM.$SwingContains.animate({ height: pageConfig.SwingContain.maxHeight }, { duration: 300 });
            LM.$DataSetManagerLayout.animate({ height: pageConfig.SwingContain.maxHeight }, { duration: 300 });
            $appbar.removeClass('expanded');

        }

        function expand($appbar) {
            $appbar.stop().animate({ height: pageConfig.Bottombar.maxHeight }, { duration: 300 });
            LM.$SwingContains.animate({ height: pageConfig.SwingContain.minHeight }, { duration: 300 });
            LM.$DataSetManagerLayout.animate({ height: pageConfig.SwingContain.minHeight }, { duration: 300 });
            $appbar.addClass('expanded');

        }

    },
    //实例化面板添加到所属布局
    buildPanel: function (a_panel) {
        var $panel = $('<div id="panel_'+a_panel.ID+'" data-swing-type="' + a_panel.UI.PanelTypeName + '"></div>');
        switch (a_panel.UI.PanelTypeName) {
            case 'swingDefaultHeader':
                $panel.swingDefaultHeader('init', {
                    UI: a_panel.UI,
                    InList: a_panel.InList,
                    OutList: a_panel.OutList,
                    Load: a_panel.Load,
                    Release: a_panel.Release,
                    Events: a_panel.Events,
                    Timers: a_panel.Timers,
                    LogConfig: config.LogConfig,
                    OnSendMsg: MM.sendMsg
                });
                break;
            case 'swingTitleMenu':
                $panel.swingTitleMenu('init', {
                    UI: a_panel.UI,
                    InList: a_panel.InList,
                    OutList: a_panel.OutList,
                    Load: a_panel.Load,
                    Release: a_panel.Release,
                    Events: a_panel.Events,
                    Timers: a_panel.Timers,
                    LogConfig: config.LogConfig,
                    OnSendMsg: MM.sendMsg
                });
                break;
            case 'swingGrid':
                var zrw = '';
                $panel.swingGrid('init', {
                    UI: a_panel.UI,
                    InList: a_panel.InList,
                    OutList: a_panel.OutList,
                    Load: a_panel.Load,
                    Release: a_panel.Release,
                    Events: a_panel.Events,
                    Timers: a_panel.Timers,
                    Fields: a_panel.Fields,
                    LogConfig: config.LogConfig,
                    OnSendMsg: MM.sendMsg
                }, a_panel.DefautData);
                break;
            case 'swingDefaultFooter':
                $panel.swingDefaultFooter('init', {
                    UI: a_panel.UI,
                    InList: a_panel.InList,
                    OutList: a_panel.OutList,
                    Load: a_panel.Load,
                    Release: a_panel.Release,
                    Events: a_panel.Events,
                    Timers: a_panel.Timers,
                    LogConfig: config.LogConfig,
                    OnSendMsg: MM.sendMsg
                });
                break;
            case 'swingDivMenu':
                $panel.swingDivMenu('init', {
                    UI: a_panel.UI,
                    InList: a_panel.InList,
                    OutList: a_panel.OutList,
                    Load: a_panel.Load,
                    Release: a_panel.Release,
                    Events: a_panel.Events,
                    Timers: a_panel.Timers,
                    LogConfig: config.LogConfig,
                    OnSendMsg: MM.sendMsg
                }, a_panel.DefautData);
                break;
            case 'swingInputs':
                $panel.swingInputs('init', {
                    UI: a_panel.UI,
                    InList: a_panel.InList,
                    OutList: a_panel.OutList,
                    Load: a_panel.Load,
                    Release: a_panel.Release,
                    Events: a_panel.Events,
                    Timers: a_panel.Timers,
                    LogConfig: config.LogConfig,
                    OnSendMsg: MM.sendMsg,
                    IsEditMode: LM.IsEditMode
                }, a_panel.DefautData);
                break;
            case 'swingLogin':
                $panel.swingLogin('init', {
                    UI: a_panel.UI,
                    InList: a_panel.InList,
                    OutList: a_panel.OutList,
                    Load: a_panel.Load,
                    Release: a_panel.Release,
                    Events: a_panel.Events,
                    Timers: a_panel.Timers,
                    LogConfig: config.LogConfig,
                    OnSendMsg: MM.sendMsg
                }, a_panel.DefautData);
                break;
            case 'swingDataSetManager':
                $panel.swingDataSetManager('init', {
                    UI: a_panel.UI,
                    InList: a_panel.InList,
                    OutList: a_panel.OutList,
                    Load: a_panel.Load,
                    Release: a_panel.Release,
                    Events: a_panel.Events,
                    Timers: a_panel.Timers,
                    LogConfig: config.LogConfig,
                    OnSendMsg: MM.sendMsg
                }, a_panel.DefautData);
                break;
            case 'swingAdviceEnticeMenu':
                var zrw = '';
                $panel.swingAdviceEnticeMenu('init', {
                    UI: a_panel.UI,
                    InList: a_panel.InList,
                    OutList: a_panel.OutList,
                    Load: a_panel.Load,
                    Release: a_panel.Release,
                    Events: a_panel.Events,
                    Timers: a_panel.Timers,
                    LogConfig: config.LogConfig,
                    OnSendMsg: MM.sendMsg
                }, a_panel.DefautData);
                break;
            case 'swingAdviceEnticeContentA':
                var zrw = '';
                $panel.swingAdviceEnticeContentA('init', {
                    UI: a_panel.UI,
                    InList: a_panel.InList,
                    OutList: a_panel.OutList,
                    Load: a_panel.Load,
                    Release: a_panel.Release,
                    Events: a_panel.Events,
                    Timers: a_panel.Timers,
                    LogConfig: config.LogConfig,
                    OnSendMsg: MM.sendMsg
                }, a_panel.DefautData);
                break;
            case 'swingConfiger':
                var zrw = '';
                $panel.swingConfiger('init', {
                    UI: a_panel.UI,
                    InList: a_panel.InList,
                    OutList: a_panel.OutList,
                    Load: a_panel.Load,
                    Release: a_panel.Release,
                    Events: a_panel.Events,
                    Timers: a_panel.Timers,
                    LogConfig: config.LogConfig,
                    OnSendMsg: MM.sendMsg
                }, a_panel.DefautData);
                break;

            default:
                if (config.LogConfig.level >= 2 && config.LogConfig.isLogErr) {
                    Diablo.printLog('界面元素', true, '调用jQuery插件', '未识别的插件');
                }
                break;
        }
        return $panel;
    },
    //被动的调用load方法
    loadPanel: function (a_panel) {
        var $panel = $(a_panel);
        switch ($panel.attr('data-swing-type')) {
            case 'swingDefaultHeader':
                $panel.swingDefaultHeader('load');
                break;
            case 'swingTitleMenu':
                $panel.swingTitleMenu('load');
                break;
            case 'swingGrid':
                $panel.swingGrid('load');
                break;
            case 'swingDefaultFooter':
                $panel.swingDefaultFooter('load');
                break;
            case 'swingDivMenu':
                $panel.swingDivMenu('load');
                break;
            case 'swingInputs':
                $panel.swingInputs('load');
                break;
            case 'swingLogin':
                $panel.swingLogin('load');
                break;
            case 'swingDataSetManager':
                $panel.swingDataSetManager('load');
                break;
            case 'swingAdviceEnticeMenu':
                var zrw = '';
                $panel.swingAdviceEnticeMenu('load');
                break;
            case 'swingAdviceEnticeContentA':
                var zrw = '';
                $panel.swingAdviceEnticeContentA('load');
                break;
            case 'swingConfiger':
                var zrw = '';
                $panel.swingConfiger('load');
                break;

            default:
                if (config.LogConfig.level >= 2 && config.LogConfig.isLogErr) {
                    Diablo.printLog('界面元素', true, '调用jQuery插件', '未识别的插件');
                }
                break;
        }
        return $panel;
    },
    //获取布局类型
    getLTypePara: function (lType) {
        switch (lType) {
            case 'STANDARD01':
                return STANDARD01;
                break;
            case 'STANDARD02':
                return STANDARD02;
                break;
            case 'STANDARD03':
                return STANDARD03;
                break;
            case 'STANDARD04':
                return STANDARD04;
                break;
            case 'STANDARD05':
                return STANDARD05;
                break;
            case 'STANDARD06':
                return STANDARD06;
                break;
            case 'GRID01':
                return GRID01;
                break;
            case 'GRID_LOGIN':
                return GRID_LOGIN;
                break;
            case 'GRID_SINGLEPANEL':
                return GRID_SINGLEPANEL;
                break;
            case 'GRID_MODALDIALOG':
                return GRID_MODALDIALOG;
                break;
            default:
                return STANDARD01;
                break;
        }
    },
    "IsEditMode": false,
    "isDesktop": true,
    "roleID": null,
    $SwingLabel: $('.swingLabel'),
    $SwingContains: $('.swingContain'),
    $DataSetManagerLayout: $('#DataSetManagerLayout'),
    $LayoutsContain: $('#LayoutsContain'),
    $Bottombar: $('#Bottombar'),
    $MetroContain: $('#MetroContain'),
    $DataSetManager: $('#DataSetManager'),
    $Pages: $('.page'),
    $divLoading: $('.swingLoading'),
    $maskLayer: $('.swingMaskLayer'),
    $maskLayerModal: $('.swingMaskLayerModal'),

};


//请求管理器
var RM = {
    getMessage: function (msg) {
        if (config.IsServerData) {
            RM.postData(new ServerCmd(msg.param1, msg.param2, JSON.stringify(msg.paramjson), msg.param3));
        }
        else {
            //本地数据
            var zrw = '';
            switch (msg.cmd) {
                case '1000':
                    RM.getSecensDemo(new ServerCmd(msg.param1, msg.param2, JSON.stringify(msg.paramjson), msg.param3));
                    break;
                case '1001':
                    RM.getLayoutDemo(new ServerCmd(msg.param1, msg.param2, JSON.stringify(msg.paramjson), msg.param3));
                    break;
                case '2922':
                    RM.getLoginDemo(new ServerCmd(msg.param1, msg.param2, JSON.stringify(msg.paramjson), msg.param3));
                    break;
                default:
                    RM.getNotMatchedDemo(new ServerCmd(msg.param1, msg.param2, JSON.stringify(msg.paramjson), msg.param3));
                    break;
            }
        }
    },
    getNotMatchedDemo: function (serverCmd) {
        var resultData = [];

        var standardDemo = [{ "name": "Demo数据1", "ID": "1", "items": [{ "name": "Demo数据1-1", "ID": "1-1" }, { "name": "Demo数据1-2", "ID": "1-2", "swingGrid": [{ "ID": "010101", "name": "默认数据表名称", "swingRows": [{ "swingRowHeader": "第1行", "FirstName": "名字", "Surname": "姓", "Gender": "G001", "Age": 26, "DateOfBirth": "1988-04-18" }, { "swingRowHeader": "第2行", "FirstName": "达华", "Surname": "任", "Gender": "G001", "Age": 56, "DateOfBirth": "1957-03-27" }, { "swingRowHeader": "第3行", "FirstName": "卡丘", "Surname": "皮", "Gender": "G006", "Age": 13, "DateOfBirth": "2000-11-06" }] }], "swingInputs": [{ "ID": "010101", "name": "默认数据表名称", "inputs": { "ID": 16, "姓": "上官", "名": "二货", "性别": "G001", "年龄": 36, "证件类型": "ZJ001", "证件号": "152527197703060098", "户口所在地": "太阳系火星", "出生日期": "1977-03-06", "接待员": "霹雳五号", "备注": "备注" } }] }] }];

        var gridDemo = [{ "ID": "01", "name": "默认车系", "items": [{ "ID": "0101", "name": "默认车型", "swingGrid": [{ "ID": "010101", "name": "默认数据表名称", "swingRows": [{ "swingRowHeader": "第1行", "FirstName": "名字", "Surname": "姓", "Gender": "G001", "Age": 26, "DateOfBirth": "1988-04-18" }, { "swingRowHeader": "第2行", "FirstName": "达华", "Surname": "任", "Gender": "G001", "Age": 56, "DateOfBirth": "1957-03-27" }, { "swingRowHeader": "第3行", "FirstName": "卡丘", "Surname": "皮", "Gender": "G006", "Age": 13, "DateOfBirth": "2000-11-06" }] }] }] }];
        var inputsDemo = [{ "ID": "01", "name": "默认车系", "items": [{ "ID": "0101", "name": "默认车型", "swingInputs": [{ "ID": "010101", "name": "默认数据表名称", "inputs": { "ID": 16, "姓": "上官", "名": "二货", "性别": "G001", "年龄": 36, "证件类型": "ZJ001", "证件号": "152527197703060098", "户口所在地": "太阳系火星", "出生日期": "1977-03-06", "接待员": "霹雳五号", "备注": "备注" } }] }] }];
        resultData = { "Result": standardDemo };
        var zrw = '';
        RM.dealResponse(serverCmd, resultData);
    },
    getLoginDemo: function (serverCmd) {
        var resultData = [];
        resultData = { "Result": [{ "items": "It's login demo data." }] };
        var zrw = '';
        RM.dealResponse(serverCmd, resultData);
    },
    getSecensDemo: function (serverCmd) {
        var resultData = [];
        resultData = { "Result": [{ "items": role2Demo }] };

        var debuggerSuccess = '';
        RM.dealResponse(serverCmd, resultData);
    },
    getLayoutDemo: function (serverCmd) {
        var resultData = {};
        var PZID = JSON.parse(serverCmd.param);
        for (var j in swingApp.Scenes) {
            var zrw = '';
            for (var k in swingApp.Scenes[j].items) {
                var zrw = '';
                if (swingApp.Scenes[j].items[k].配置ID.toString() === PZID.配置ID) {
                    resultData.Result = [swingApp.Scenes[j].items[k]];
                }
            }
        }

        var debuggerSuccess = '';
        RM.dealResponse(serverCmd, resultData);

    },
    getPanelDemo: function (serverCmd) {
        var resultData = {};
        resultData = defautPanelData;
        var zrw = '';
        RM.dealResponse(resultData, serverCmd);
    },
    //Post数据
    postData: function (serverCmd) {
        var zrw = '';

        $.ajax({
            async: config.AjaxAsync,
            url: '../Datahandle.ashx',
            type: 'POST',
            data: serverCmd,
            dataType: 'json',
            timeout: config.RequestTimeOut,
            beforeSend: function () {
                var zrw = LM.$divLoading;
                LM.$divLoading.show();
                LM.$maskLayer.show();
                var zrw = '';
            },
            error: function (errStr) {
                var debuggerErr = '';
                if (config.LogConfig.level >= 2 && config.LogConfig.isLogErr) {
                    Diablo.printLog('服务器', true, 'POST请求', JSON.stringify(serverCmd) + '请求失败或超时', '错误信息', JSON.stringify(errStr));
                }
                LM.$divLoading.hide();
                LM.$maskLayer.hide();
            },
            success: function (response) {
                RM.dealResponse(serverCmd, response);
                LM.$divLoading.hide();
                LM.$maskLayer.hide();
            }
        });


    },
    isNeedLogin: function (response) {
        if (response.Message === '请先登录系统') {
            if (confirm('确定重新登录?')) {
                window.location.href = '../index.html';
                return true;
            }
            else {
                var zrw = '';
                return false;
            }
        }
    },
    dealResponse: function (serverCmd, response) {
        if (RM.isNeedLogin(response)) {
            return;
        }
        var resultData = response.Result;

        var s_dataType = Diablo.testObj(resultData);
        var serverMessage = '';
        if (config.IsServerData) {
            serverMessage = response.Message;
        }
        else {
            serverMessage = '本地数据无返回消息';
        }
        if (s_dataType === 'object' || s_dataType === 'objectArray' || s_dataType === 'string') {
            if (config.LogConfig.level >= 2 && config.LogConfig.isLogErr) {
                if (config.LogConfig.isLogContent) {
                    Diablo.printLog("服务器", false, 'SM', JSON.stringify(serverCmd), 'Response数据', '数据类型:' + s_dataType + ' 数据内容:' + JSON.stringify(resultData), '服务器信息', serverMessage);
                }
                else {
                    Diablo.printLog("服务器", false, 'SM', JSON.stringify(serverCmd), 'Response数据', '数据类型:' + s_dataType + ' 数据内容:设置未显示', '服务器信息', serverMessage);
                }
            }
            if (serverCmd.resultCmd) {
                var dst = '*';
                if (serverCmd.resultCmd.indexOf('9') === 0) {
                    dst = 'LM';
                }
                MM.sendMsg.call(this, null, new Message('RM', serverCmd.resultCmd, dst, '', '', '', '', '', resultData, ''));
            }
            else {

            }
        }
        else if (s_dataType === 'undefined') {
            if (serverCmd.resultCmd) {
                if (serverCmd.resultCmd.indexOf('9') === 0) {
                    dst = 'LM';
                }
                MM.sendMsg.call(this, null, new Message('RM', serverCmd.resultCmd, dst, '', '', '', '', '', '', ''));
                if (config.LogConfig.level >= 2 && config.LogConfig.isLogErr) {
                    Diablo.printLog("服务器", false, 'SM', JSON.stringify(serverCmd), '返回数据', 'undefined', '服务器信息', serverMessage);
                }
            }
            else {
                if (config.LogConfig.level >= 2 && config.LogConfig.isLogErr) {
                    Diablo.printLog("服务器", false, 'SM', JSON.stringify(serverCmd), '返回数据', 'undefined', '服务器信息', serverMessage);
                }
            }

        }
        else if (s_dataType === 'objectEmpty') {
            //var zrw = '';
            //MM.sendMsg.call(this, null, new Message('RM', serverCmd.resultCmd, dst, '', '', '', '', '', '', ''));
            //if (config.LogConfig.level >= 3 && config.LogConfig.isLogErr) {
            //    Diablo.printLog("服务器", true, 'SM', JSON.stringify(serverCmd), '返回数据', 'objectEmpty', '服务器信息', serverMessage);
            //}

            if (serverCmd.resultCmd) {
                if (serverCmd.resultCmd.indexOf('9') === 0) {
                    dst = 'LM';
                }
                MM.sendMsg.call(this, null, new Message('RM', serverCmd.resultCmd, dst, '', '', '', '', '', '', ''));
                if (config.LogConfig.level >= 2 && config.LogConfig.isLogErr) {
                    Diablo.printLog("服务器", false, 'SM', JSON.stringify(serverCmd), '返回数据', 'objectEmpty', '服务器信息', serverMessage);
                }
            }
            else {
                if (config.LogConfig.level >= 2 && config.LogConfig.isLogErr) {
                    Diablo.printLog("服务器", false, 'SM', JSON.stringify(serverCmd), '返回数据', 'objectEmpty', '服务器信息', serverMessage);
                }
            }
        }
        else {
            if (config.LogConfig.level >= 3 && config.LogConfig.isLogErr) {
                Diablo.printLog("服务器", true, 'SM', JSON.stringify(serverCmd), '返回数据', '未获取到数据,数据格式不符需要object或objectArray,现得到' + s_dataType, '服务器信息', serverMessage);
            }
        }
    }
}



//消息管理器
var MM = {
    msgQueue: new Diablo.Queue(),
    //消息入队
    enMsgQueue: function (message) {
        this.msgQueue.EnQueue(message);
        if (config.IsImdtExcMsg) {
            this.excuteMsgHead(true, false);
        }
    },
    //执行消息
    excuteMsgHead: function (isDequeue, isPrintQHead) {
        var thisMsg = this.msgQueue.GetHead();
        if (isDequeue) {
            this.msgQueue.DeQueue();
        }

        try {

            if (config.LogConfig.level >= 1 && config.LogConfig.isLogInfo) {
                var msgNeedPrint = Diablo.cloneJSON(thisMsg);

                if (!config.LogConfig.isLogContent) {
                    var delParamjson = msgNeedPrint.paramjson;
                    msgNeedPrint.paramjson = { '提示': '设置未显示' };
                    Diablo.printLog('消息', false, 'CM', JSON.stringify(msgNeedPrint));
                }
                else {
                    var delParamjson = msgNeedPrint.paramjson;
                    msgNeedPrint.paramjson = { '提示': '在Post数据中显示' };
                    Diablo.printLog('消息', false, 'CM', JSON.stringify(msgNeedPrint), 'Post数据', JSON.stringify(delParamjson));
                }

            }
        }
        catch (err) {
            if (config.LogConfig.level >= 4 && config.LogConfig.isLogInfo) {
                Diablo.printLog('语言级别', true, '转换JSON到字符串', '失败');
            }
        }

        var zrw = '';
        if (thisMsg.cmd) {
            if (thisMsg.dst === 'LM') {
                LM.getMessage(thisMsg);
            }
            else if (thisMsg.dst === 'RM') {
                RM.getMessage(thisMsg);
            }
            else {
                var zrw = '';
                $('.' + thisMsg.cmd).each(function (e) {
                    var $this = $(this);
                    switch ($this.attr('data-swing-type')) {
                        case 'swingGrid':
                            $this.swingGrid('getMessage', thisMsg);
                            break;
                        case 'swingInputs':
                            $this.swingInputs('getMessage', thisMsg);
                            break;
                        case 'swingDivMenu':
                            var zrw = '';
                            $this.swingDivMenu('getMessage', thisMsg);
                            break;
                        case 'swingLogin':
                            var zrw = '';
                            $this.swingLogin('getMessage', thisMsg);

                            break;

                        case 'swingScrollSelector':
                            var zrw = '';
                            $this.swingScrollSelector('getMessage', thisMsg);
                            break;
                        case 'swingBlockSelector':
                            var zrw = '';
                            $this.swingBlockSelector('getMessage', thisMsg);
                            break;
                        case 'swingAdviceEnticeMenu':
                            var zrw = '';
                            $this.swingAdviceEnticeMenu('getMessage', thisMsg);
                            break;
                        case 'swingAdviceEnticeContentA':
                            var zrw = '';
                            $this.swingAdviceEnticeContentA('getMessage', thisMsg);
                            break;

                        case 'swingDataSetManager':
                            var zrw = '';
                            $this.swingDataSetManager('getMessage', thisMsg);
                            break;
                        case 'swingDefaultFooter':
                            var zrw = '';
                            $this.swingDefaultFooter('getMessage', thisMsg);
                            break;
                        case 'swingDefaultHeader':
                            var zrw = '';
                            $this.swingDefaultHeader('getMessage', thisMsg);
                            break;
                        case 'swingTitleMenu':
                            var zrw = '';
                            $this.swingTitleMenu('getMessage', thisMsg);
                            break;
                        case 'swingConfiger':
                            var zrw = '';
                            $this.swingConfiger('getMessage', thisMsg);
                            break;
                        default:
                            break;

                    }
                })
            }
        }
    },
    //发送命令
    sendMsg: function (e, msg) {
        $this = $(this);
        if (msg) {
            MM.enMsgQueue(msg);
        }
        else {
            if (config.LogConfig.level >= 1 && config.LogConfig.isLogErr) {
                var msgObjDetail = Diablo.testObj(msg);
                Diablo.printLog('消息', true, '发送命令', '错误', '错误详情', '命令为' + msgObjDetail);
            }
        }
    }
}