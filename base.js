
var ko = {};


ko.Point = function (x, y) {
    this.x = x;
    this.y = y;
}

ko.Point.prototype = {
    name: "Point类",
    //加法&减法
    plus: function (p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    },
    help:"Point类(x, y)---------------------\n"+
         ""
}
//普通线段
Line = function (p1, p2) {
    this.pa = p1;
    this.pb = p2;
}



//获取滚动条偏移
ko.getScrollOffsets = function (w) {
    //使用指定窗口，默认当前窗口
    w = w || window;
    //>IE8
    if (null != w.pageXOffset)
        return { x: w.pageXOffset, y: pageYOffset };
    //standard
    var d = w.document;
    if ("CSS1Compat" == document.compatMode)
        return {
            x: d.documentElement.scrollLeft,
            y: d.documentElement.scrollTop
        };
    //strange
    return { x: d.body.scrollLeft, y: d.body.scrollTop };
};

//获取元素的视口坐标 < IE8 低效 在不支持getBoundClientRect情况下使用
ko.getElementPos = function (elt) {
    var x = 0, y = 0;
    //循环累加偏移量
    for (var e = elt; null != e; e = e.offsetParent) {
        x += e.offsetLeft;
        y += e.offsetTop;
    }
    //循环减去滚动偏移量
    for (var e = elt.parentNode; null != e && 1 == e.nodeType; e = e.parentNode) {
        x -= e.scrollLeft;
        x -= e.scrollTop;
    }
    return { top: x, left: y };
};

//查询窗口的视口尺寸
ko.getViewportSize = function (w) {
    //使用指定窗口，默认当前窗口
    w = w || window;
    //>IE8
    if (null != w.innerWidth)
        return { w: w.innerWidth, h: w.innerHeight };
    //standard
    var d = w.document;
    if ("CSS1Compat" == document.compatMode)
        return {
            w: d.documentElement.clientWidth,
            h: d.documentElement.clientHeight
        };
    //strange
    return { w: d.body.clientWidth, h: d.body.clientHeight };
};

//获取元素的文档坐标
ko.getDocPos = function (elt) {

    var scroll = ko.getScrollOffsets();
    var eleViewPos = elt.getBoundingClientRect() || ko.getElementPos(elt);
    return {
        x: (eleViewPos.left + scroll.x - 6) ,//+ 'px'
        y: (eleViewPos.top + scroll.y - 8)// + 'px'
    }
};


//继承函数
ko.extend = function (childClass, baseClass) {
    var F = function () { };//牺牲一个空对象的空间来避免new整个baseClass
    F.prototype = baseClass.prototype;//原型链继承
    childClass.prototype = new F();//构造一个继承对象来避免子类修改原型链
    childClass.prototype.constructor = childClass;//不改变子类的构造函数
    childClass.baseClass = baseClass.prototype;//保证子类能操作基类的功能
    baseClass.prototype.constructor = baseClass;//保证基类的构造函数不变
}
