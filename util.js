/**
* @static
* @description ODK工具类
* @author http://jslover.com
* @version 1.0  20120928
*/
(function (ODK, $) {
    ODK.Util = {
        //对象转字符串
        jsonToStr: function (obj) {
            try {
                if (typeof JSON != "undefined" && JSON.stringify) {
                    return JSON.stringify(obj);
                }
                var _this = this;
                switch (typeof (obj)) {
                    case 'string':
                        return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
                    case 'object':
                        if (obj instanceof Array) {
                            var strArr = [];
                            var len = obj.length;
                            for (var i = 0; i < len; i++) {
                                strArr.push(_this.jsonToStr(obj[i]));
                            }
                            return '[' + strArr.join(',') + ']';
                        } else if (obj == null) {
                            return 'null';
                        } else {
                            var string = [];
                            for (var property in obj) {
                                string.push(property + ':' + _this.jsonToStr(obj[property]))
                            };
                            return '{' + string.join(',') + '}';
                        }
                    case 'number':
                        return obj;
                }
                return obj;
            } catch (ee) {
                return '{}';
            }
        }
        //字符串转对象
        , strToJson: function (str) {
            try {
                if (typeof JSON != "undefined" && JSON.parse) {
                    return JSON.parse(str);
                }
                return eval('(' + str + ')');
            } catch (ee) {
                return {};
            }
        }
        //添加cookie
        , setCookie: function (name, value) {
            var days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
        }
        //获取cookie
        , getCookie: function (name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) return unescape(arr[2]); return null;
        }
        //删除cookie
        , delCookie: function (name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getCookie(name);
            if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
        //用于处理包含中文的字符串的截取
        , subString: function (str, n) {
            var r = /[^\x00-\xff]/g;
            if (str.replace(r, "mm").length <= n) {
                return str;
            }
            var m = Math.floor(n / 2);
            for (var i = m; i < str.length; i++) {
                if (str.substr(0, i).replace(r, "mm").length >= n) {
                    return str.substr(0, i);
                }
            }
            return str;
        }
        //用于处理包含中文的字符串的截取
        , cutString: function (str, n) {
            var _this = this;
            var length = str.replace(/[^\x00-\xff]/g, "rr").length;
            if (length <= n) {
                return str;
            } else {
                return _this.subString(str, n) + '...';
            }
        }
    };

    /**   
    * 对Date的扩展，将 Date 转化为指定格式的String   
    * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符   
    * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
    * eg:   
    * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
    * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04   
    * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04   
    * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04   
    * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18   
    */
    Date.prototype.pattern = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份     
            "d+": this.getDate(), //日     
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时     
            "H+": this.getHours(), //小时     
            "m+": this.getMinutes(), //分     
            "s+": this.getSeconds(), //秒     
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度     
            "S": this.getMilliseconds() //毫秒     
        };
        var week = {
            "0": "\u65e5",
            "1": "\u4e00",
            "2": "\u4e8c",
            "3": "\u4e09",
            "4": "\u56db",
            "5": "\u4e94",
            "6": "\u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };

})(ODK, jQuery);
