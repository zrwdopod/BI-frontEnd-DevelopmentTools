var Diablo = {
    /*
    * @brief: 定义队列类
    * @remark:实现队列基本功能
    */
    Queue: function () {
        //存储元素数组
        var aElement = new Array();
        /*
        * @brief: 元素入队
        * @param: vElement元素列表
        * @return: 返回当前队列元素个数
        * @remark: 1.EnQueue方法参数可以多个
        *    2.参数为空时返回-1
        */
        Diablo.Queue.prototype.EnQueue = function (vElement) {
            if (arguments.length == 0)
                return -1;
            //元素入队
            for (var i = 0; i < arguments.length; i++) {
                aElement.push(arguments[i]);
            }
            return aElement.length;
        }
        /*
        * @brief: 元素出队
        * @return: vElement
        * @remark: 当队列元素为空时,返回null
        */
        Diablo.Queue.prototype.DeQueue = function () {
            if (aElement.length == 0)
                return null;
            else
                return aElement.shift();

        }
        /*
        * @brief: 获取队列元素个数
        * @return: 元素个数
        */
        Diablo.Queue.prototype.GetSize = function () {
            return aElement.length;
        }
        /*
        * @brief: 返回队头素值
        * @return: vElement
        * @remark: 若队列为空则返回null
        */
        Diablo.Queue.prototype.GetHead = function () {
            if (aElement.length == 0)
                return null;
            else
                return aElement[0];
        }
        /*
        * @brief: 返回指定索引素值
        * @return: vElement
        * @remark: 若队列为空则返回null
        */
        Diablo.Queue.prototype.GetValue = function (vElement) {
            if (aElement.length == 0)
                return null;
            else
                return aElement[vElement];
        }
        /*
        * @brief: 返回队尾素值
        * @return: vElement
        * @remark: 若队列为空则返回null
        */
        Diablo.Queue.prototype.GetEnd = function () {
            if (aElement.length == 0)
                return null;
            else
                return aElement[aElement.length - 1];
        }
        /*
        * @brief: 将队列置空
        */
        Diablo.Queue.prototype.MakeEmpty = function () {
            aElement.length = 0;
        }
        /*
        * @brief: 判断队列是否为空
        * @return: 队列为空返回true,否则返回false
        */
        Diablo.Queue.prototype.IsEmpty = function () {
            if (aElement.length == 0)
                return true;
            else
                return false;
        }
        /*
        * @brief: 将队列元素转化为字符串
        * @return: 队列元素字符串
        */
        Diablo.Queue.prototype.toString = function () {
            var sResult = (aElement.reverse()).toString();
            aElement.reverse()
            return sResult;
        }
    },
    //百分比转换像素值
    getPixelValue: function (orgValue, parentValue) {
        orgValue = $.trim(orgValue);
        var pxIndex = orgValue.indexOf('px');
        var percentIndex = orgValue.indexOf('%');
        var objReturn = {};

        if (percentIndex > 0) {
            objReturn.value = parseFloat(orgValue.substring(0, percentIndex) * parentValue / 100);
            objReturn.type = '%';
        }
        else {
            if (pxIndex > 0) {
                objReturn.value = parseFloat(orgValue.substring(0, pxIndex));
                objReturn.type = 'px';
            }
            else {
                objReturn.value = parseFloat(orgValue);
                objReturn.type = 'px'
            }
        }
        return objReturn;
    },
    //获取当前GET方式的QueryString
    getQueryString: function (queryStrName) {
        QueryString = {
            data: {},
            Initial: function () {
                var aPairs, aTmp;
                var queryString = new String(window.location.search);
                queryString = queryString.substr(1, queryString.length); //remove   "?"     
                aPairs = queryString.split("&");
                for (var i = 0; i < aPairs.length; i++) {
                    aTmp = aPairs[i].split("=");
                    this.data[aTmp[0]] = aTmp[1];
                }
            },
            GetValue: function (key) {
                return this.data[key];
            }
        }

        //先初始化  
        QueryString.Initial();

        //例:获得名为deliverQty的参数值  
        var deliverQty = QueryString.GetValue(queryStrName);
        return deliverQty;
    },
    //取得当前完整日期时间
    CurentTime: function () {
        var now = new Date();

        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分

        var clock = year + "-";

        if (month < 10)
            clock += "0";

        clock += month + "-";

        if (day < 10)
            clock += "0";

        clock += day + " ";

        if (hh < 10)
            clock += "0";

        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm;
        return (clock);
    },
    //日志打印
    printLog: function (logLevelStr, isErr, title, content, detailTitle, detailContent, serverTitle, serverContent) {
        if (!serverTitle) {
            serverTitle = '';
        }
        if (!serverContent) {
            serverContent = '';
        }

        var lengthLL = (logLevelStr.length * 2);
        if (lengthLL < 12) {
            var addSpace = '';
            for (var i = 0; i < ((12 - lengthLL) / 2) ; i++) {
                addSpace += '。';
            }
            logLevelStr = addSpace + logLevelStr;
        }
        if (isErr) {
            if (detailTitle) {
                console.error('【' + logLevelStr + '】 ' + Diablo.CurentTime() + ' 【' + title + ':' + content + '】' + ' , ' + ' 【' + detailTitle + '】：' + JSON.stringify(detailContent) + ', ' + ' 【' + serverTitle + '】：' + serverContent);
            }
            else {

                console.error('【' + logLevelStr + '】 ' + Diablo.CurentTime() + ' 【' + title + ':' + content + '】' + ' , ' + ' 【' + serverTitle + '】：' + serverContent);
            }
        }
        else {
            if (detailTitle) {

                console.log('【' + logLevelStr + '】 ' + Diablo.CurentTime() + ' 【' + title + ':' + content + '】' + ' , ' + ' 【' + detailTitle + '】：' + JSON.stringify(detailContent) + ', ' + ' 【' + serverTitle + '】：' + serverContent);
            }
            else {

                console.log('【' + logLevelStr + '】 ' + Diablo.CurentTime() + ' 【' + title + ':' + content + '】' + ' , ' + ' 【' + serverTitle + '】：' + serverContent);
            }
        }
    },
    //保留两位小数   
    //功能：将浮点数四舍五入，取小数点后2位  
    toDecimal: function (x, TailCount) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        var mi = Math.pow(10, TailCount);
        f = Math.round(x * mi) / mi;
        return f;
    },
    //默认值处理
    setDefault: function (field, nullValue, defautValue) {
        var returnValue = {};
        if (typeof (field) == 'undefined') {
            returnValue = nullValue;
        }
        else {
            if (field === null) {
                returnValue = null;
            }
            else {
                if (field !== '') {
                    returnValue = field;
                }
                else {
                    returnValue = defautValue;
                }
            }
        }
        return returnValue;
    },
    //检测对象类型
    testObj: function (obj) {
        var objType = typeof (obj);
        if (typeof (obj) === 'undefined') {
            return 'undefined';
        }
        else {
            if (typeof (obj) === 'object') {
                if (obj === null) {
                    return 'null';
                }
                else {
                    var debugDiablo = '';
                    if (obj instanceof Array) {
                        if (obj.length < 1) {
                            return 'objectEmptyArray';
                        }
                        else {
                            return 'objectArray';
                        }
                    }
                    else {
                        var isEmptyObj = true;
                        for (var prpty in obj) {
                            isEmptyObj = false;
                        }
                        if (isEmptyObj) {
                            return 'objectEmpty';
                        }
                        else {
                            return 'object';
                        }
                    }

                }
            }
            else if (typeof (obj) === 'string') {

                return 'string';
            }
            else if (typeof (obj) === 'boolean') {

                return 'boolean';
            }
            else if (typeof (obj) === 'number') {

                return 'number';
            }
            else if (typeof (obj) === 'function') {

                return 'function';
            }
            else {

                return 'I do not known the type!';
            }

        }
    },
    //克隆JSON
    cloneJSON: function (obj) {
        var str, newObj;
        str = JSON.stringify(obj, function (key, value) {
            return (typeof value == 'function' ? value.toString().replace(/^function(.*)/g, "jsonFunction$1") : value);
        });
        if (str) {
            newObj = JSON.parse(str, function (key, value) {
                if (/^jsonFunction(.*)/.test(value)) {
                    var strFun = '(' + value.replace(/^jsonFunction(.*)/, "function$1") + ')';
                    value = eval(strFun);
                }
                return value;
            });
        }
        return newObj;
    },
    //检测设备类型
    detectDevice: function () {
        var info = navigator.userAgent;
        if (info.indexOf("iPod") != -1 || info.indexOf("iPad") != -1 || info.indexOf("iPhone") != -1 || info.indexOf("Android") != -1) {
            return true;
        } else {
            return false;
        }
    },
    //福思维公式解析器
    parser: {
        resolve: function (fmlObj, msg) {
            var zrw = this;
            var newObj = Diablo.cloneJSON(fmlObj);
            if (typeof newObj === 'string') {
                newObj = Diablo.parser.parserDeal.call(this, newObj, msg);
            }
            else {
                //递归的时候newObj可以ref，不知道为什么
                Diablo.parser.nestedObj.call(this, newObj, msg);
            }

            return newObj;
            var zrw = '';
        },
        parserDeal: function (newObj, msg) {
            var zrw = $(this);
            if (newObj.indexOf('~') > -1) {
                var fml = newObj.split('~')[1].split('.')[1];
                if (newObj === '~msg') {
                    newObj = msg;
                }
                else {
                    for (var j in msg) {
                        if (j === fml) {
                            newObj = msg[j];
                        }
                    }
                }



            }
            else if (newObj.indexOf('*') > -1 && newObj.length > 1) {
                var zrw = this;
                var fml = newObj.split('*')[1];
                var zrw = '';

                newObj = eval('(' + fml + ')');
                if (typeof newObj === 'undefined') {
                    return undefined;
                }
                else if (newObj == null) {
                    return null;
                }
                var zrw = '';//此处以后要删除
                if (newObj.toString().split('_')[1] === '010101') {
                    newObj = '16';
                }
            }
            return newObj;
        },
        nestedObj: function (newObj, msg) {
            var zrw = this;
            for (var i in newObj) {
                switch (typeof (newObj[i])) {
                    case 'object':
                        arguments.callee.call(this, newObj[i], msg);
                        break;
                    case 'string':
                        newObj[i] = Diablo.parser.parserDeal.call(this, newObj[i], msg);
                        break;
                    default:
                        break;
                }
            }

        }
    },
    //jQueryMobile主题对应背景颜色
    getJqmBgColor: function (theme) {
        var returnColor = '';
        switch (theme) {
            case 'a':
                returnColor = '#222 ';
                break;
            case 'b':
                returnColor = '#f3f3f3 ';
                break;
            case 'c':
                returnColor = '#f9f9f9 ';
                break;
            case 'd':
                returnColor = '#fff ';
                break;
            case 'e':
                returnColor = '#fff9df ';
                break;
            default:
                returnColor = '#fffadf';
                break;
        }
        return returnColor;
    },
    //jQueryMobile主题对应边框颜色
    getJqmBorderColor: function (theme) {
        var returnColor = '';
        switch (theme) {
            case 'a':
                returnColor = '#444 ';
                break;
            case 'b':
                returnColor = '#999';
                break;
            case 'c':
                returnColor = '#d7d7d7 ';
                break;
            case 'd':
                returnColor = '#bbb';
                break;
            case 'e':
                returnColor = '#f7c942';
                break;
            default:
                returnColor = '#fffadf';
                break;
        }
        return returnColor;
    },
    //metro界面对应背景颜色
    getMetrolColor: function (colorName) {
        var returnColor = '';
        switch (colorName) {
            case 'orange':
                returnColor = '#fa6801';
                break;
            case 'green':
                returnColor = '#393';
                break;
            case 'teal':
                returnColor = '#00aba9';
                break;
            case 'red':
                returnColor = '#e51400';
                break;
            case 'yellow':
                returnColor = '#d8c101';
                break;
            case 'steel':
                returnColor = '#657688';
                break;
            case 'pink':
                returnColor = '#e671b8';
                break;
            case 'purple':
                returnColor = '#a200ff';
                break;
            default:
                returnColor = '#393';
                break;
        }
        return returnColor;
    },
    //常量
    Constant: {
        CST16P9: 1.77777778,
        CST9P16: 0.5625,
        CST4P3: 1.33333333,
        CST3P4: 0.75
    },
    //数学计算
    Math: {
        Farther: function (s_NeedCut) {
            var f_needCut = parseFloat(s_NeedCut.split('%')[0]);
            var f_return = 100 - f_needCut;
            var s_return = f_needCut + '%';
            return s_return;
        }
    }
}


