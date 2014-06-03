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
