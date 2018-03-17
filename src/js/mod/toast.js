require('less/toast.less')
var $ = require('jquery')

function toast(msg,time) {
    this.msg = msg;                     //传入消息
    this.dismissTime = time||1000;     //延迟时间
    this.createToast();                 //创建toast模板
    this.showToast();                   //展示和移除toast
}

toast.prototype = {
    createToast: function () {
        var temp = '<div class="toast">'+this.msg+'</div>';     //创建模板
        this.$toast = $(temp);                                  //转为jQuery对象
        $('body').append(this.$toast);                          //插入到html中
    },
    showToast: function () {
        var _this = this;
        this.$toast.fadeIn(300, function () {
            setTimeout(function () {
                _this.$toast.fadeOut(300,function () {
                    _this.$toast.remove();
                });
            },_this.dismissTime);
        })
    }
};

function Toast(msg,time) {
    return new toast(msg, time); 
}


module.exports.Toast = Toast;       //暴露exports的Toast。