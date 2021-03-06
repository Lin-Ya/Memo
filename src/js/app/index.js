require('less/index.less')
var $ = require('jquery')
var Toast = require('mod/toast.js').Toast;
var Event = require('mod/event.js');
var WaterFall = require('mod/waterfall.js');
var Note = require('mod/note.js').Note;
var NoteManager = require('mod/note-manager.js').NoteManager
WaterFall.init($('.container'))


NoteManager.load()

$('.right .add').on('click', function () {
    NoteManager.add()
})
$('.left .remove').on('click', function () {
    $('.container .note').remove();
})
Event.on('waterfall', function () {
    WaterFall.init($('.container'));
})
