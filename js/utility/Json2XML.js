var resultJSON = {
    "channel":{
        "title":"news&\"<welcome>",
        "image":{
            "title":"news1",
            "link":"http://news.sina.com.cn",
            "url":"http://www.sinaimg.cn/dy/sina_news626.gif"
        },
         
        "description":"description",
        "link":"http://news.sina.com.cn/news1000/index.shtml",
        "language":"zh-cn",
        "generator":"WWW.SINA.COM.CN",
        "ttl":"5",
        "copyright":"Copyright 1996 - 2009 SINA Inc. All Rights Reserved",
        "pubDate":"Tue, 10 Feb 2009 06:20:02 GMT",
        "category":"",
        "item":[
            {
                "title":"title1(02/10 14:14)",
                "link":"http://go.rss.sina.com.cn/redirect.php?url=http://news.sina.com.cn/w/p/2009-02-10/141417185252.shtml",
                "author":"WWW.SINA.COM.CN",
                "guid":"http://go.rss.sina.com.cn/redirect.php?url=http://news.sina.com.cn/w/p/2009-02-10/141417185252.shtml",
                "category":"",
                "pubDate":"",
                "comments":"Tue, 10 Feb 2009 06:14:31 GMT",
                "description":"description1...."
            },
            {
                "title":"title2(02/10 14:13)",
                "link":"http://go.rss.sina.com.cn/redirect.php?url=http://finance.sina.com.cn/stock/stockaritcle/20090210/14135837973.shtml",
                "author":"WWW.SINA.COM.CN",
                "guid":"http://go.rss.sina.com.cn/redirect.php?url=http://finance.sina.com.cn/stock/stockaritcle/20090210/14135837973.shtml",
                "category":"",
                "pubDate":"",
                "comments":"Tue, 10 Feb 2009 06:13:17 GMT",
                "description":"description2...."
            }
        ]
    }
};
 
 
function String.prototype.regulStr()
{
    if(this=="")return "";
    var s=this;
    var spacial = ["<",">","\"","'","&"];
    var forma = ["&lt;","&gt;","&quot;","&apos;","&amp;"]
    for(var i=0;i<spacial.length;i++)
    {
        s=s.replace(new RegExp(spacial[i],"g"),forma[i]);
    }
    return s;
}
 
function String.prototype.appendText(s)
{
    s = s.regulStr();
    return s==""?this:this+s+"\n";;
}
 
 
function String.prototype.appendFlagBegin(s)
{
    return this+"<"+s+">\n";
}
 
function String.prototype.appendFlagEnd(s)
{
    return this+"</"+s+">\n";
}
 
 
function iterateJson(json)
{
    var strXml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
    if(arguments.length==2)
    { 
        strXml= arguments[1];
    }
     
    for(var tag in json)
    {
        strXml = strXml.appendFlagBegin(tag);
        if(json[tag].constructor==Object||json[tag].constructor==Array)
        {
            strXml = iterateJson(json[tag],strXml);
             
        }else if(json[tag].constructor==String)
        {
            strXml = strXml.appendText(json[tag]);
        }
        strXml = strXml.appendFlagEnd(tag);
    }
    return strXml;
}
