/**
* @class
* @description 所有弹出框的基类 仅作为测试DEMO
* @author http://jslover.com
* @version 1.0  20120928
* @param {Object} JSON格式参数
*/
(function (ODK, $, win) {
    //所有弹出框的基类-继承至BaseClass
    var Box = function (opts) {
        //初始化父类
        Box.superClass.call(this);
        //参数合并
        this.opts = $.extend({}, defaults, opts);
        //缓存当前实例
        this.$this = null;
        this.init();

    }
    //继承
    Box.extend(ODK.BaseClass);
    //默认参数
    var defaults = {
        //是否自动生成
        autoRender: true
        , title: '这是一个窗体'
        , content: '这是内容'
    };
    //扩展方法
    var fn = {
        //重写父类的init方法
        init: function () {
            var _this = this;
            if (_this.opts.autoRender) {
                //生成界面
                _this.render();
                //事件绑定
                _this.bindEvent();
            }
        }
        //生成界面
        , render: function () {
            var _this = this;
            var h = templete.getBox(_this.opts);
            _this.$this = $(h).appendTo(document.body);
            //....
        }
        //注册事件
        , bindEvent: function () {
            var _this = this;
            _this.$this.find('.odk-ui-box-close').click(function () {
                _this.hide();
            });
        }
        , show: function () {
            this.$this.show();
        }
        , hide: function () {
            this.$this.hide();
        }
        , setContent: function (content) {
            this.$this.find('.odk-ui-box-content').html(content);
        }
        , setTitle: function (title) {
            this.$this.find('.odk-ui-box-title').html(title);
        }
    };
    //模板
    var templete = {
        getBox: function (opts) {
            var h = '';
            h += '<div class="odk-ui-box">';
            h += '<h1><a href="#" class="odk-ui-box-close">关闭</a><span class="odk-ui-box-title">' + opts.title + '</span></h1>';
            h += '<p class="odk-ui-box-content">' + opts.content + '</p>'
            h += '</div>';
            return h;
        }
    };
    //合并扩展方法
    $.extend(Box.prototype, fn);
    //注册组件 ODK.UI.Box
    ODK.regUI("Box", Box);
})(ODK, jQuery, window);