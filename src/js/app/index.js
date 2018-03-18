require('less/index.less')
var $ = require('jquery')
var Toast = require('mod/toast.js').Toast;
var Event = require('mod/event.js');
var WaterFall = require('mod/waterfall.js');
var login = require('mod/login.js');

WaterFall.init($('.container'))
login.init();

Event.on('waterfall', function () {
    WaterFall.init($('.container'));
})