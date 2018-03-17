var $ = require('jquery')
var Event = require('mod/event.js')
var Toast = require('mod/toast.js').Toast
var login = {
    init: function () {
        Event.on('LoginCenter', function () {
            $('.sign').toggleClass('active')
        })
        this.bind();
    },
    bind: function () {
        //header部分
        $('.header .right i').on('click', function (e) {
            e.stopPropagation();
            Event.fire('LoginCenter');
            // console.log(e);
        })
        //login部件部分
        $('.sign').on('click', function (e) {
            e.stopPropagation();
            if (e.target.classList.contains('login')) {
                $('.modal').addClass('login');
                $('.modal').removeClass('register');
            }
            if (e.target.classList.contains('register')) {
                $('.modal').addClass('register');
                $('.modal').removeClass('login');
            }
            if (e.target.className === 'iconfont icon-close') {
                $('.sign').removeClass('active');
            }
        })
        $('#login-form form').on('submit', function (e) {
            $('#login-form #errormsg').text('')
            e.preventDefault();
            var _this = this;
            var nameReg = /^\w{3,8}$/;
            var passwordReg = /^\w{6,10}$/;
            if (!nameReg.test($('#login-form input[name=username]').val())) {
                $('#login-form #errormsg').text('用户名需要输入3-8个字符，包括字母数字下划线');
                Toast('用户名错误',1000);
                return false;
            }
            if (!passwordReg.test($('#login-form input[name=password]').val())) {
                $('#login-form #errormsg').text('密码为6-10个字符，包括字母数字下划线');
                Toast('密码错误', 1000);
                return false;
            }
            _this.submit();
        })
        $('#register-form form').on('submit', function (e) {
            $('#login-form #errormsg').text('')
            e.preventDefault();
            var _this = this;
            var nameReg = /^\w{3,8}$/;
            var passwordReg = /^\w{6,10}$/;
            if (!nameReg.test($('#register-form input[name=username]').val())) {
                $('#register-form #errormsg').text('用户名需要输入3-8个字符，包括字母数字下划线');
                Toast('用户名错误', 1000);
                return false;
            }
            if (!passwordReg.test($('#register-form input[name=password]').val())) {
                $('#register-form #errormsg').text('密码为6-10个字符，包括字母数字下划线');
                Toast('密码错误', 1000);
                return false;
            }
            if ($('#register-form input[name=password]').val() != $('#register-form input[name=password2]')) {
                $('#register-form #errormsg').text('两次密码不相同，请重新确认');
                Toast('密码错误', 1000);
                return false;
            }
            _this.submit();
        })
    }
}

module.exports = login;
