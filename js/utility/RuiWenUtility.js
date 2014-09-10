function getHack(attr,value){
    return attr + ":" + value + "; -moz-" + attr + ":" + value + "; -webkit-" + attr + ":" + value + ";";
}

function getQueryString(queryStrName) {
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
}


function CurentTime() {
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
}

//保留两位小数   
//功能：将浮点数四舍五入，取小数点后2位  
function toDecimal(x, TailCount) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    var mi=  Math.pow(10, TailCount);
    f = Math.round(x * mi) / mi;
    return f;
}