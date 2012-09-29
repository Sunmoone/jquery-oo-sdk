/**
* @static
* @description 基于jQuery的OO框架
* @author http://jslover.com
* @version 1.0  20120928
*/
var ODK = (function (win, doc, $) {
    //所有组件的基类
    var BaseClass = function () {
    };
    BaseClass.prototype = {
        init: function () {
            //接口，基类无实现
        }
        , render: function () {
            //接口，基类无实现
        }
        , unrender: function () {
            //接口，基类无实现
        }
    };
    //构造器
    var _ODK = function () {
        //UI控件
        this.UI = {};
        //全局缓存变量
        this.Cache = {};
        //延时变量
        this.Timer = {};
        //api队列
        this.ajaxQueue = [];
        this.ajaxReady = true;
        this.IE6 = !!window.ActiveXObject && !window.XMLHttpRequest;
    };
    _ODK.prototype = {
        init: function () {
            this.regClassExtend();
        }
        //所有组件的基类
        , BaseClass: BaseClass
        //注册类的继承方法
        , regClassExtend: function () {
            if (Function.prototype.extend) { return; }
            Function.prototype.extend = function (superClass) {
                if (typeof superClass === 'function') {
                    //类式继承  
                    var F = function () { };
                    F.prototype = superClass.prototype;
                    this.prototype = new F();
                    //设置构造函数指向自己 
                    this.prototype.constructor = this;
                    //同时，添加一个指向父类构造函数的引用
                    this.superClass = superClass;
                }
                return this;
            };
        }
        //注册组件
        , regUI: function (uiName, ui) {
            if (uiName.indexOf('.') < 0) {
                this.UI[uiName] = ui;
            } else {
                ui_parent = uiName.split('.')[0];
                ui_child = uiName.split('.')[1];
                if (!this.UI[ui_parent]) {
                    this.UI[ui_parent] = {};
                }
                this.UI[ui_parent][ui_child] = ui;
            }
        }
        //获取自增ID
        , getAutoIncrementID: function () {
            if (!ODK.Cache.autoIncrementID) {
                ODK.Cache.autoIncrementID = 99;
            }
            return ++ODK.Cache.autoIncrementID;
        }
        //排队执行AJAX，确保每次只有一个请求
		, singleAjax: function (url, param, callBack, type, cache, onerror) {
		    return;
		    if (typeof type == "undefined") {
		        type = 'GET'
		    }
		    //加入队列
		    ODK.ajaxQueue.push({
		        apiUrl: url
                , param: param
                , callBack: callBack
                , type: type
                , cache: cache
                , onerror: onerror
		    });
		    runAjax();
		}
    };
    //执行AJAX
    function runAjax() {
        if (ODK.ajaxQueue.length == 0 || !!ODK.ajaxBusy) {
            return;
        }
        //状态锁
        ODK.ajaxBusy = true;
        var p = $.extend({}, ODK.ajaxQueue[0]);
        try {
            $.ajax({
                url: p.apiUrl
            , type: p.type
            , cache: p.cache || false
            , complete: function () {
                ODK.ajaxBusy = false;
                //递归，继续调用
                runAPI();
            }
            , data: p.param
            , success: function (data) {
                try {
                    if (p.callBack && data) {
                        p.callBack(data);
                    }
                } catch (ee) {
                    onError(e, onerror);
                }
            }
            , error: function (e) {
                onError(e, onerror);
            }
            , dataType: 'json'
            });
        } catch (ee) {
            onError(ee, onerror);
        }

        //删除数组第一项
        ODK.ajaxQueue.shift();
    }
    //全局错误处理
    function onError(e, fn) {
        //console.log(e);
        if (fn) {
            fn(e);
        }
    }
    //确保单例
    if (!win.___ODK) {
        win.___ODK = new _ODK();
    }
    return win.___ODK;
})(window, document, jQuery);

/*默认初始化*/
ODK.init();