// 构造函数
function BasicItem(Name, ID, CmdSend) {
    this.Name = Diablo.setDefault(Name, '未定义', '默认名称');
    this.ID = Diablo.setDefault(ID, '未定义', '0');
    this.CmdSend = Diablo.setDefault(CmdSend, '未定义', ['100000','0']);
}
// 定义BasicItem的原型，原型中的属性可以被自定义对象引用
BasicItem.prototype = {
    getName: function () {
        return this.Name;
    },
    getID: function () {
        return this.ID;
    },
    getCmdSend: function () {
        return this.CmdSend;
    }
}