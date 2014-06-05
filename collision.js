//碰撞检测
ko.collision = {
    //圆形与原型碰撞
    circleToCircle: function (rp1, rp2, r1, r2) {
        return Math.pow(r1 + r2, 2) > (Math.pow(rp1.x - rp2.x, 2) +
                                             Math.pow(rp1.y - rp2.y, 2));
    },
    //点在面中pps poly:[p1, p2, ... pn]， pn = p1闭合
    pointInPolyCN: function (p, pps) {
        var cn = 0; //引线与面的交叉点个数
        for (var i = 0, len = poly.length; i < len; i++) {
            if (((pps[i].y <= p.y) && (pps[i + 1].y > p.y)) ||
                ((pps[i].y > p.y) && (pps[i + 1].y <= p.y))) {
                var pt = (p.y - pps[i].y) / (pps[i + 1].y - pps[i].y);
                if (p.x < pps[i].x + pt * (pps[i + 1].x - pps[i].x)) {
                    cn++;//交叉的点数
                }
            }
        }
        return cn & 1;
    },
    //http://geomalgorithms.com/a03-_inclusion.html
    //return 0 1 2   0:点在多边形外 1：点在多边形内 2：点在多边形重叠部分
    pointInPolyWN: function (p, pps) {
        var isLeft = function (p0, p1, p2) {
            return ((p1.x - p0.x) * (p2.y - p0.y) -
                                   (p2.x - p0.x) * (p1.y - p0.y));
        };
        var wn = 0;
        for (var i = 0, len = pps.length; i < len; i++) {
            if (pps[i].y > p.y && pps[i + 1].y > p.y &&
                            isLeft(pps[i], pps[i + 1]) > 0)
                wn++;
            else {
                if (pps[i + 1].y <= p.y &&
                            isLeft(pps[i], pps[i + 1]) < 0)
                    wn--;
            }
        }
        return wn;
    },
    lineOnLine: function (l1, l2) {
        var ua_t = (l2.pb.x - l2.pa.x) * (l1.pa.y - l2.pa.y) -
                   (l2.pb.y - l2.pa.y) * (l1.pa.x - l2.pa.x);
        var ub_t = (l1.pb.x - l1.pa.x) * (l1.pa.y - l2.pa.y) -
                   (l2.pb.y - l2.pa.y) * (l1.pb.x - l1.pa.x);
        var u_b = (l2.pb.y - l2.pa.y) * (l1.pb.x - l1.pa.x) -
                   (l2.pb.x - l2.pa.x) * (l1.pb.y - l1.pa.y);
        if (u_b) {
            var ua = ua_t / u_b;
            var ub = ub_t / u_b;
            if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
                return [l1.pa.x + ua * (l1.pb.x - l1.pa.x),
                l1.pa.y + ua * (l1.pb.y - l1.pa.y)];
            }
            else {
                return [];
            }
        }
        else {
            if (0 == ua_t || 0 == ub_t) {
                return [(l1.pb.x + l1.pa.x) / 2, (l1.pb.y + l1.pa.y) / 2];
            }
            else {
                return [];
            }
        }
    },
    //面与面P1=:[p1, p2, ... pn] p1...pn Point
    polyToPoly: function (P1, P2) {
        for (var i = 0, len=P1.length; i < len; i++) {
            if (pointInPolyCN(P1[i], P2))
                return ture;
        }
    }
}

//碰撞体
ko.Collider = function(obj, pos, oper, dm, dmParam) {
    this.pos = pos;
    this.operation = oper;//碰撞后的操作回调函数
    this.detectionMethod = dm || 'c2c';//默认检测圆形碰撞
    this.detectionParam = dmParam;
}

ko.collisionManager = (function (mH, mW, cH, cW, d) {
    var colliderMap = [];
    var MAP_WIDTH = mH,//1366
        MAP_HEIGHT = mW,//768,
        WIDTH = cH,//96,
        HEIGHT = cW,//96,
        h = Math.floor(MAP_HEIGHT / HEIGHT) + 1,
        w = Math.floor(MAP_WIDTH / WIDTH) + 1,
        divisor = d || 5;
    function _init() {
        for (var i = 0; i <= w ; i++) {
            colliderMap.push(new Array());
            for (var j = 0; j <= h; j++) {
                colliderMap[i].push(new Array());
            }
        }
    }
    return function () {
        _init();
        this.add = function (collider) {
                colliderMap[Math.floor(collider.pos.x / WIDTH)][Math.floor(collider.pos.y / HEIGHT)].push(collider);
        }

        this.detection = function (center) {
            var cX = (Math.floor(center.pos.x / WIDTH) - divisor),
                cY = (Math.floor(center.pos.y / HEIGHT) - divisor);
            cX = cX > 0 ? cX : 0;
            cY = cY > 0 ? cY : 0;
            for (var i = cX, lenX = cX + 2 * divisor; i < lenX; i++) {
                for (var j = cY, lenY = cY + 2 * divisor; j < lenY; j++) {
                    var len = colliderMap[i][j].length;
                    if (len) {
                        for (var k = 0; k < len; k++) {
                            var o = colliderMap[i][j][k];//需要检测的碰撞体
                            switch (o.dm) {
                                case 'c2c':
                                    if (ko.collision.circleToCircle(center.pos, o.pos, o.dmParam, center.dmParam)) {   //音量控制
                                        var vol = 1 - Math.sqrt(Math.pow(center.pos.x - o.pos.x, 2) + Math.pow(center.pos.y - o.pos.y, 2)) / (o.dmParam + center.dmParam)
                                        o.operation(vol);
                                    }
                                    break;
                                case 'P2P':
                                    ko.collision.polyToPoly(center.dmParam, o.dmParam);
                                    break;
                                case 'pInP':
                                    ko.collision.pointInPolyCN(center.pos, o.dm);
                                    break;
                                case 'lOl':
                                    ko.collision.lineOnLine(center.dmParam, o.dmParam);
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }
    
})();
