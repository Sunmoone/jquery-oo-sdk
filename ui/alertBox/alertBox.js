/**
* @class
* @description 确认框 仅作为测试DEMO
* @author http://jslover.com
* @version 1.0  20120928
* @param {Object} JSON格式参数
*/
(function (ODK, $, win) {
    //确认框-继承至ODK.UI.Box
    var AlertBox = function (opts) {
        //参数合并
        this.opts = $.extend({}, defaults, opts);
        //初始化父类
        AlertBox.superClass.call(this, this.opts);
        //当前初始化
        this.initAlertBox();
    }
    //继承
    AlertBox.extend(ODK.UI.Box);
    //默认参数
    var defaults = {
        //确认
        onOK: function () { }
        //取消
        , onCancel: function () { }
    };
    //扩展方法
    var fn = {
        //注册事件
        initAlertBox: function () {
            var _this = this;
            _this.$this.css({ height: 'auto', left: 200 });
            _this.$this.append('<div class="odk-ui-alertbox-action"><input type="button" value="确认" class="odk-ui-alertbox-ok"/><input type="button" value="取消" class="odk-ui-alertbox-cancel" /></div>');
            _this.bindAlertBoxEvent();
        }
        //
        , bindAlertBoxEvent: function () {
            var _this = this;
            _this.$this.find('.odk-ui-alertbox-ok').click(function () {
                _this.opts.onOK();

            });
            _this.$this.find('.odk-ui-alertbox-cancel').click(function () {
                _this.opts.onCancel();
                _this.hide();
            });
        }

    };
    //模板
    var templete = {};
    //合并扩展方法
    $.extend(AlertBox.prototype, fn);
    //注册组件 ODK.UI.AlertBox
    ODK.regUI("AlertBox", AlertBox);
})(ODK, jQuery, window);