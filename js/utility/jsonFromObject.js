function json_from_object(o) {
    if (o == null)
        return 'null';
    var s = '';
    switch (typeof (o)) {
        case 'object':

            if (o.constructor == Array)        // checks if it is an array [,,,]
            {

                for (var i = 0; i < o.length; ++i) {
                    s += json_from_object(o[i]);

                    if (i < o.length - 1)
                        s += ',';
                }

                return '[' + s + ']';
            }
            else {
                for (var p in o) {
                    if (typeof (o[p]) != "function") {
                        s += "'" + p + "':" + json_from_object(o[p]);
                        s += ',';
                    }
                }
                return '{' + s.substring(0, s.length - 1) + '}';
            }
            break;
        case 'string':
            return '\'' + o.replace(/(["\\])/g, '\\$1') + '\'';
        default:
            return String(o);
    }
}