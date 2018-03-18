var $ = require('jquery')

var WaterFall = (function () {
    var $ct;
    var $items;

    function render($c) {
        $ct = $c;
        $items = $ct.children();

        var nodeWidth = $items.outerWidth(true),
            colNum = parseInt($(window).width() / nodeWidth),
            colSumHeight = [];
        for (var i = 0; i < colNum; i++) {
            colSumHeight.push(0);
        }

        $items.each(function (index) {
            var $cur = $(this);

            //colSumHeight = [100, 250, 80, 200]
            var index = index;
            var miniIdx = 0 ,
                minSumHeight = colSumHeight[0];

            for (var i = 0; i < colSumHeight.length; i++) {
                if (colSumHeight[i] < minSumHeight) {
                    miniIdx = i;
                    minSumHeight = colSumHeight[i];
                }
            }
            if(index < colNum) {
                $cur.css({
                    left: nodeWidth * index,
                    top: minSumHeight
                })
            }else {
                $cur.css({
                    left: nodeWidth * miniIdx,
                    top: minSumHeight
                });
            }
            colSumHeight[miniIdx] = $cur.outerHeight(true) + colSumHeight[miniIdx];
        });
    }


    $(window).on('resize', function () {
        render($ct);
    });


    return {
        init: render
    }
})();

module.exports = WaterFall
