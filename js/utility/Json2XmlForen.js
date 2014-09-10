/**
 * Change JSON object to XML string.
 * The JSON object value must be a string,an array or object.
 * If the value is an integer or a float value,you must add " or ' to the value.
 * @author bitjjj
 * @param isPretty If format xml
 * @param separator Set line separator
 * @example var util = new JsonToXml(true); var result = util.toXml(JSONObject);
 * @return
 */
function JsonToXml(isPretty,separator){
    this.result=[];
    this.isPretty = !!isPretty;
    this.separator = separator || "/r/n";
    
    this.result.push("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
    if(this.isPretty){
        //this.result.push(this.separator);
    }
}

JsonToXml.prototype.spacialChars=["&","<",">","\"","'"];
JsonToXml.prototype.validChars=["&amp;","&lt;","&gt;","&quot;","&apos;"],

JsonToXml.prototype.toString = function(){
    return this.result.join("");
};

JsonToXml.prototype.replaceSpecialChar = function(s){
  
    for(var i=0;i<this.spacialChars.length;i++){
        s=s.replace(new RegExp(this.spacialChars[i],"g"),this.validChars[i]);
    }
    return s;
};

JsonToXml.prototype.appendText = function(s){
    s = this.replaceSpecialChar(s);
    this.result.push(s);
};


JsonToXml.prototype.appendFlagBegin = function(s){

    this.result.push("<"+s+">");
};

JsonToXml.prototype.appendFlagEnd = function(s){
    this.result.push("</"+s+">");
    if(this.isPretty){
        //this.result.push(this.separator);
    }
};

JsonToXml.prototype.each = function(arr,cb){
    for(var i=0;i<arr.length;i++){
        cb(i,arr[i]);
    }
};

/**
 * format xml string to pretty string
 * @param xml string
 * @return pretty xml string
 * @reference http://stackoverflow.com/questions/376373/pretty-printing-xml-with-javascript
 */
JsonToXml.prototype.formatXml = function (xml) {     
    var formatted = [];     
    var reg = /(>)(<)(//*)/g;     
    xml = xml.replace(reg, '$1'+this.separator+'$2$3');     
    var pad = 0,self = this;     
    this.each(xml.split(this.separator), function(index, node) {         
        var indent = 0;         
        if (node.match( /.+<///w[^>]*>$/ )) {             
            indent = 0;         
    } 
    else if (node.match( /^<///w/ )) {             
                if (pad != 0) {                 
                    pad -= 1;             
                }         
} 
else if (node.match( /^</w[^>]*[^//]>.*$/ )) {             
    indent = 1;         
} 
else {             
    indent = 0;         
}          
var padding = '';         
for (var i = 0; i < pad; i++) {             
    padding += '  ';         
}          
formatted.push(padding + node + self.separator);         
pad += indent;     
});    
return formatted.join(""); 
}; 

JsonToXml.prototype.toXml = function(json){
    this._toXml(json);
    
    if(this.isPretty){
        return this.formatXml(this.toString());
    }
    return this.toString();
};

JsonToXml.prototype._toXml = function(json){
   
    for(var tag in json){    
        //need to handle Array object specially
        if(json[tag].constructor==Array){
            for(var i=0;i<json[tag].length;i++){
                this.appendFlagBegin(tag);
                var item = json[tag][i];
                if(item.constructor == Object){
                    this._toXml(item);
                }
                else if(item.constructor == Array){
                    var obj={};
                    obj[tag]=item;
                    this._toXml(obj);
                }
                else if(item.constructor == String){
                    this.appendText(item);
                }
                this.appendFlagEnd(tag);
            }
        }
        else{
            this.appendFlagBegin(tag);
            if(json[tag].constructor==Object){
                this._toXml(json[tag]);
            }
            else if(json[tag].constructor==String){
                this.appendText(json[tag]);
            }
            this.appendFlagEnd(tag);
        }
    }
};