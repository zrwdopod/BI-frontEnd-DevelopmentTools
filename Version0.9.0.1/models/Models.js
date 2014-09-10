function Message(src, cmd, dst, param1, param2, param3, param4, param5, paramjson, paramxml) {
    this.cmd = cmd;
    this.src = src;
    this.dst = dst;
    this.param1 = param1;
    this.param2 = param2;
    this.param3 = param3;
    this.param4 = param4;
    this.param5 = param5;
    this.paramjson = paramjson;
    this.paramxml = paramxml;
}

function ServerCmd(target, action, param, resultCmd)
{
    this.target = target;
    this.action = action;
    this.param = param;
    this.resultCmd = resultCmd;
}


function App(APPID, TitleName, ServerURL, SubmitType, Encoding, Timeout, WebType, ResultType, IsImdtExcMsg, Scenes) {
    this.APPID = APPID;
    this.TitleName = TitleName;
    this.ServerURL = ServerURL;
    this.SubmitType = SubmitType;
    this.Encoding = Encoding;
    this.Timeout = Timeout;
    this.WebType = WebType;
    this.ResultType = ResultType;
    this.IsImdtExcMsg = IsImdtExcMsg;
    this.Scenes = Scenes;
}


function Layout(pID, ID, LayoutName, LayoutType, IsShow, Config, BtnMode, BtnColor, BtnDirection, BtnDelay, BtnIcon, BtnCmdEvents, LocalVariables, items) {
    this.pID = pID;
    this.ID = ID;
    this.LayoutName = Diablo.setDefault(LayoutName, '未定义', '布局名称');
    this.LayoutType = LayoutType;
    this.IsShow = IsShow;
    this.Config = Config;
    this.BtnMode = Diablo.setDefault(BtnMode, '未定义', 'slide');
    this.BtnColor = Diablo.setDefault(BtnColor, '未定义', '');
    this.BtnDirection = Diablo.setDefault(BtnDirection, '未定义', 'horizontal');
    this.BtnDelay = Diablo.setDefault(BtnDelay, '未定义', 500);
    this.BtnIcon = Diablo.setDefault(BtnIcon, '未定义', '../images/Google/Google alt.png');
    this.BtnCmdEvents = BtnCmdEvents;
    this.LocalVariables = LocalVariables;
    this.items = items;
}

function LayoutS(父配置ID, 配置ID, 名称, 标签0, 标签1, 标签2, 标签3, 标签4, 标签5, 标签6, 标签7, 标签8, 标签9, items) {
    this.父配置ID = 父配置ID;
    this.配置ID = 配置ID;
    this.名称 = Diablo.setDefault(名称, '未定义', '布局名称');
    this.标签0 = 标签0;
    this.标签1 = 标签1;
    this.标签2 = 标签2;
    this.标签3 = Diablo.setDefault(标签3, '未定义', 'slide');
    this.标签4 = Diablo.setDefault(标签4, '未定义', '');
    this.标签5 = Diablo.setDefault(标签5, '未定义', 'horizontal');
    this.标签6 = Diablo.setDefault(标签6, '未定义', 500);
    this.标签7 = Diablo.setDefault(标签7, '未定义', '../images/Google/Google alt.png');
    this.标签8 = 标签8;
    this.标签9 = 标签9;
    this.items = items;
}


function Panel(pID, ID, Name, UI, InList, OutList, Load, Release, DefautData, Events, Timers, Fields) {
    this.pID = pID;
    this.ID = ID;
    this.Name = Name;
    this.UI = UI;
    this.InList = InList;
    this.OutList = OutList;
    this.Load = Load;
    this.Release = Release;
    this.DefautData = DefautData;
    this.Events = Events;
    this.Timers = Timers;
    this.Fields = Fields;
}

function PanelS(父配置ID, 配置ID, 名称, 标签0, 标签1, 标签2, 标签3, 标签4, 标签5, 标签6, 标签7,标签8) {
    this.父配置ID = 父配置ID;
    this.配置ID = 配置ID;
    this.名称 = 名称;
    this.标签0 = 标签0;
    this.标签1 = 标签1;
    this.标签2 = 标签2;
    this.标签3 = 标签3;
    this.标签4 = 标签4;
    this.标签5 = 标签5;
    this.标签6 = 标签6;
    this.标签7 = 标签7;
    this.标签8 = 标签8;
}

function Scene(RoleID, ID, Name,Type, items) {
    this.RoleID = RoleID;
    this.ID = ID;
    this.Name = Name;
    this.Type = Type;
    this.items = items;
}

function SceneS(父配置ID, 配置ID, 名称, 标签0, items) {
    this.父配置ID = 父配置ID;
    this.配置ID = 配置ID;
    this.名称 = 名称;
    this.标签0 = 标签0;
    this.items = items;
}


function toPanel(data) {
    var panel = new Panel(data.父配置ID, data.配置ID, data.名称, eval('(' + data.标签0 + ')'), eval('(' + data.标签1 + ')'), eval('(' + data.标签2 + ')'), eval('(' + data.标签3 + ')'), eval('(' + data.标签4 + ')'), eval('(' + data.标签5 + ')'), eval('(' + data.标签6 + ')'), eval('(' + data.标签7 + ')'), eval('(' + data.标签8 + ')'));
    return panel;
}

function toPanelS(data) {
    var panelS = new PanelS(data.pID, data.ID, data.Name, JSON.stringify(data.UI), JSON.stringify(data.InList), JSON.stringify(data.OutList), JSON.stringify(data.Load), JSON.stringify(data.Release), JSON.stringify(data.DefautData), JSON.stringify(data.Events), JSON.stringify(data.Timers), JSON.stringify(data.Fields));
    return panelS;
}



function toLayout(data) {
    var layout = new Layout(data.父配置ID, data.配置ID, data.名称, data.标签0, data.标签1, eval('(' + data.标签2 + ')'), data.标签3, data.标签4, data.标签5, data.标签6, data.标签7, eval('(' + data.标签8 + ')'), data.标签9);
    return layout;
}

function toLayoutS(data) {
    var layoutS = new LayoutS(data.pID, data.ID, data.LayoutName, data.LayoutType, data.IsShow, JSON.stringify(data.Config), data.BtnMode, data.BtnColor, data.BtnDirection, data.BtnDelay, data.BtnIcon, JSON.stringify(data.BtnCmdEvents), data.LocalVariables);
    return layoutS;
}