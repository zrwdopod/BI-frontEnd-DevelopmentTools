var config = {
    /*是否使用服务器数据*/
    IsServerData: false,

    /*是否将本地数据写入服务器*/
    IsUpdateServer: false,

    /*AJAX是否异步*/
    AjaxAsync: true,

    /*队头数据立即执行*/
    IsImdtExcMsg: true,


    /*日志配置*/
    //7    硬件级别
    //6操作系统级别
    //5  浏览器级别
    //4  语言运行时
    //3    界面元素 
    //2      服务器
    //1        消息
    LogConfig: { 'level': 2, 'isLogErr': true, 'isLogInfo': true, 'isLogContent': false },

    /*请求超时*/
    RequestTimeOut: 36000 
}