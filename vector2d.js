//二维向量
ko.Vector2D = (function () {
    Vector2D = function (x, y) {
        //this.constructor.baseClass.call(this, x, y);
        //重载Vector2D(Vector2D)
        if (x instanceof Vector2D) {
            this.x = x.x;
            this.y = x.y;
        }

        this.x = x;
        this.y = y;
    }
    //ko.extend(ko.Vector2D, ko.Point);
    //http://geomalgorithms.com/vector_products.html
    Vector2D.prototype = {
        name: "Vector2D类",
        plus: function (p) {
            this.x += p.x;
            this.y += p.y;
            return this;
        },
        equals: function (vec) {
            return (vec instanceof Vector2D) && (this.x == vec.x
                                             && this.y == vec.y);
        },
        //平移
        translate: function (tx, ty) {
            if (undefined === ty) ty = tx;
            this.x += tx;
            this.y += ty;
            return this;
        },
        //放缩
        scale: function (sx, sy) {
            if (undefined === sy) sy = sx;
            this.x *= sx;
            this.y *= sy;
            return this;
        },
        //向量大小
        magnitude: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        //标准化
        normalize: function () {
            var lng = this.magnitude();
            if (lng === 0) {
                this.x = 1;
                this.y = 0;
            } else {
                this.x /= lng;
                this.y /= lng;
            }
            return this;
        },
        //法线或垂向量
        normal: function (vec) {
            if (vec === undefined)
                return new Vector2D(-this.y, this.x);
            return new Vector2D(vec.y - this.y, this.x - vec.x).normalize();
        },
        //向量夹角
        angleInclude: function (vec) {
            return Math.atan2(this.x * vex.y - this.y * vec.x,
                                this.x * vec.x + this.y * vec.y);
        },
        //到角
        angleTo: function (vec) {
            return Math.atan2(vec.y - this.y, vec.x - this.x);
        },
        //向量间欧几里德距离
        distanceE: function (vec) {
            return Math.sqrt((vec.x - this.x) * (vec.x - this.x) +
                             (vec.y - this.y) * (vec.y - this.y));
        },
        dotProduct: function (vec) {
            return this.x * vec.x + this.y * vec.y;
        },
        crossProduct: function (vec) {
            return new Vector2D(this.x * vec.y - this.y * vec.x);
        },
        //零向量
        isZero: function () {
            return (0 === this.x && 0 == this.y);
        },
        help: "Vector2D类(ps:起点，pe终点)---------------------" +
             "构造函数： Vector2D(Vector2D)--------------------" +
             "构造函数： Vector2D(ps:起点，pe终点)--------------"
    }
    return Vector2D;
})();
