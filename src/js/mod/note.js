

var Toast = require('./toast.js').Toast;
var Event = require('mod/event.js');

function Note(opts) {
    this.initOpts(opts);
    this.createNote();
    this.setStyle();
    this.bindEvent();
}

Note.prototype = {
    colors: [
        '#efb04e', // headColor, containerColor
        '#e672a2',
        '#f2eb67',
        '#d15a39',
        '#d0d25c',
        '#5591d2'
    ],
    defaultOpts: {
        id: '',   //Note的 id
        $ct: $('.container'),  //默认存放 Note 的容器
        context: 'input here'  //Note 的内容
    },
    initOpts: function (opts) {
        this.opts = $.extend({}, this.defaultOpts, opts || {});
        if (this.opts.id) {
            this.id = this.opts.id;
        }
    },
    createNote: function () {
        var tpl = '<div class="note">'+
                    '<span class="delete">'+
                        '<i class="iconfont icon-delete"></i>'+
                    '</span>'+
                    '<div class="sticky"></div>'+
                    '<div class="note-content" contenteditable=true ></div>'+
                    '<div class="note-date"></div>'+
                    '<span class="username"></span>'
                '</div>';
        this.$note = $(tpl);
        this.$note.find('.note-content').text(this.opts.context);
        this.$note.find('.username').text(this.opts.username);
        this.opts.$ct.append(this.$note);
        Event.fire('waterfall');
    },
    setStyle: function () {
        var index = Math.floor(Math.random() * 6);
        this.$note[0].style.background = 'linear-gradient(35deg,transparent 1.5em,'+this.colors[index]+' 0)'
    },
    setLayout: function () {
        var self = this;
        if (self.clk) {
            clearTimeout(self.clk);
        }
        self.clk = setTimeout(function () {
            Event.fire('waterfall');
        }, 50);
    },
    bindEvent: function () {
        var self = this,
            $note = this.$note,
            $noteHead = $note.find('.sticky'),
            $noteCt = $note.find('.note-content'),
            $delete = $note.find('.icon-delete');

        $delete.on('click', function () {
            self.delete();
        })

        //contenteditable没有 change 事件，所有这里做了模拟通过判断元素内容变动，执行 save
        $noteCt.on('focus', function () {
            if ($noteCt.html() == 'input here') $noteCt.html('');
            $noteCt.data('before', $noteCt.html());
        }).on('blur paste', function () {
            if ($noteCt.data('before') != $noteCt.html()) {
                $noteCt.data('before', $noteCt.html());
                self.setLayout();
                if (self.id) {
                    self.edit($noteCt.html())
                } else {
                    self.add($noteCt.html())
                }
            }
        });

        //设置笔记的移动
        $noteHead.on('mousedown', function (e) {
            var evtX = e.pageX - $note.offset().left,   //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
                evtY = e.pageY - $note.offset().top;
            $note.addClass('draggable').data('evtPos', { x: evtX, y: evtY }); //把事件到 dialog 边缘的距离保存下来
        }).on('mouseup', function () {
            $note.removeClass('draggable').removeData('pos');
        });

        $('body').on('mousemove', function (e) {
            $('.draggable').length && $('.draggable').offset({
                top: e.pageY - $('.draggable').data('evtPos').y,    // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
                left: e.pageX - $('.draggable').data('evtPos').x
            });
        });
    },
    delete: function () {
        var self = this;
        $.post('/api/notes/delete', { id: this.id })
        .done(function (ret) {
            if (ret.status === 0) {
                Toast('delete success');
                self.$note.remove();
                Event.fire('waterfall')
            } else {
                Toast(ret.errorMsg);
            }
        });
    },
    edit: function (msg) {
        var self = this;
        $.post('/api/notes/edit', {
            id: this.id,
            note: msg
        }).done(function (ret) {
            if (ret.status === 0) {
                Toast('update success');
            } else {
                Toast(ret.errorMsg);
            }
        })
    },
    add: function (msg) {
        console.log('addd...');
        var self = this;
        $.post('/api/notes/add', { note: msg })
        .done(function (ret) {
            if (ret.status === 0) {
                Toast('add success');
            } else {
                self.$note.remove();
                Event.fire('waterfall')
                Toast(ret.errorMsg);
            }
        });
    },
    delete: function () {
        var self = this;
        $.post('/api/notes/delete', { id: this.id })
        .done(function (ret) {
            if (ret.status === 0) {
                Toast('delete success');
                self.$note.remove();
                Event.fire('waterfall')
            } else {
                Toast(ret.errorMsg);
            }
        });
    }
}

module.exports.Note = Note;