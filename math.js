ko.Math = {
    degToRed: function (deg) {
        return deg * Math.PI / 180;
    },
    redTodeg:function(red){
        return red * 180 / Math.PI;
    },
    //欧几里德二维 点距
    distanceE: function (p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    },
    //值1到值2间过度 过度权值w
    lerp: function (v1, v2, w) {
        return v1 + (v2 - v1) * w;
    },
    randomOfArray: function (a) {
        return a[Math.floor(array.length * Math.random())];
    },
    randomInt: function (f, t) {
        return f + Math.floor((1 + t - f) * Math.random());
    },
    inRange: function () {
        return (value >= min && value <= max);
    }
};
