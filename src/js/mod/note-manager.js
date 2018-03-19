var Note = require('./note.js').Note;
var Toast = require('./toast.js').Toast;
var Event = require('mod/event.js');

var NoteManager = (function () {
    function load() {
        console.log('load')
        $.get('/api/notes')             //发送请求获取note
            .done(function (ret) {
                if(ret.status == 0){
                    $.each(ret.data, function (idx, article) {
                        new Note({
                            id: article.id,
                            context: article.text,
                            username: article.username
                        });
                    });
                    Event.fire('waterfall')
                }else {
                    Toast(ret.errorMsg,2000);
                }
            })
            .fail(function () {
                Toast('您的网络出现异常',2000)
            })
    }

    function add() {
        console.log('add')
        new Note();
    }
    return {
        load: load,
        add: add
    }
})();

module.exports.NoteManager = NoteManager