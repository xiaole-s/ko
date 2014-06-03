//视口操作
ko.Viewport = (function(){
    function Viewport(w, h, mw, mh, sx, sy) {
        this.w = w;//视口的宽和高
        this.h = h;
        this.mW = mw;//地图的宽和高
        this.mh = mh;
        this.sx = sx;//视口左上角坐标
        this.sy = sy;
    }

    Viewport.prototype = {
        //初始化
        w:  0, h:  0, 
        mW: 0, mh: 0, 
        sx: 0, sy: 0, 
        moveTo: function (px, py) {
            //使用指定窗口，默认当前窗口
            w = w || window;
            var d = w.document;

            if (w.scrollTo) {
                w.scrollTo(px, py);
            }
            else if (d.body.scrollLeft) {
                d.body.scrollLeft = px;
                d.body.scrollTop = py;
            }
            else {//IE
                d.documentElement.scrollLeft = px;
                d.documentElement.scrollTop = py;
            }
        },
        moveBy: function (dx, dy) {
            w = w || window;
            //standard
            var d = w.document;
            if (w.scrollBy) {
                w.scrollBy(dx, dy);
            }
            else if (d.body.scrollLeft) {
                d.body.scrollLeft += px;
                d.body.scrollTop += py;
            }
            else {//IE
                d.documentElement.scrollLeft += px;
                d.documentElement.scrollTop += py;
            }
        },
        setView: function (w, h) {
            this.w = w;
            this.h = h;
        },
        getView: function () {
            var view = ko.getViewportSize();
            this.w = view.w;
            this.h = view.h;
            return view;
        }
    }

    return Viewport;
}) 
