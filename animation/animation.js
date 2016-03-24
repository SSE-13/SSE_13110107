/**
 * 重力加速度
 */
var GRAVITY = 9.8;
var FA = -0.1;
var BOUNDS_BOTTOM = 400;
var BOUNDS_LEFT = 0;
var BOUNDS_RIGHT = 400;
var BOUNCE = 0.95;
/**
 * 计时器系统
 */
var Ticker = (function () {
    function Ticker() {
        this.bodyQueue = [];
    }
    /**
     * 启动计时器
     * @param bodyList 物理队列
     */
    Ticker.prototype.start = function (bodyQueue) {
        this.bodyQueue = bodyQueue;
        this.lastTime = Date.now();
        var self = this;
        setInterval(this.onTicker.bind(this), 1000 / 60);
    };
    Ticker.prototype.onTicker = function () {
        var currentTime = Date.now();
        var duringTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.bodyQueue.map(function (body) {
            body.onTicker(duringTime / 100);
        });
    };
    return Ticker;
}());
var Body = (function () {
    function Body(displayObject) {
        this.vx = 0;
        this.vy = 0;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.currentY = 0;
        this.lastY = 0;
        this.fa = FA;
        this.stop = false;
        this.displayObject = displayObject;
    }
    Body.prototype.onTicker = function (duringTime) {
        //console.log(duringTime);
        this.lastY = this.currentY;
        this.vy += duringTime * GRAVITY;
        this.x += duringTime * this.vx;
        this.y += duringTime * this.vy;
        //上下反弹
        if (this.y + this.height > BOUNDS_BOTTOM) {
            this.vy = -BOUNCE * this.vy;
            this.y = BOUNDS_BOTTOM - this.height;
        }
        if (this.y < 0 && this.vy < 0) {
            this.vy = -BOUNCE * this.vy;
        }
        this.currentY = this.y;
        //f = ma = umg
        //vt = vx + at
        //x = v0t + 1/2at^2
        //TODO： 左右越界反弹
        if ((this.x + this.width > BOUNDS_RIGHT && this.vx > 0) || (this.x < 0 && this.vx < 0)) {
            this.vx = -BOUNCE * this.vx;
            this.fa = -this.fa;
        }
        //当连续两次取值低于边界且vx!=0时视为有水平位移，故摩擦力生效
        if ((this.lastY >= BOUNDS_BOTTOM - this.height) && (this.currentY >= BOUNDS_BOTTOM - this.height) && this.vx != 0) {
            if (((this.fa <= 0 && this.vx <= 0) || (this.fa >= 0 && this.vx >= 0))) {
                this.vx = 0;
                this.fa = 0;
            }
            else {
                this.vx += this.fa * duringTime;
            }
        }
        //根据物体位置更新显示对象属性
        var displayObject = this.displayObject;
        displayObject.x = this.x;
        displayObject.y = this.y;
    };
    return Body;
}());
var rect = new Rect();
rect.width = 150;
rect.height = 100;
rect.color = '#FF0000';
/**
 * 创建一个物体，其显示内容为一个长方形，受重力做平抛运动
 */
var body = new Body(rect);
body.width = rect.width;
body.height = rect.height;
body.vx = 10; //需要保证 vx 在 0-50的范围内行为正常
body.vy = 0; //需要保证 vy 在 0-50的范围内行为正常
var renderCore = new RenderCore();
var ticker = new Ticker();
renderCore.start([rect]);
ticker.start([body]);