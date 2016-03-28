var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = "wander-icon.jpg";
head.y -= 100;
humanContainer.addChild(head);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["wander-icon.jpg"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x = 400;
        this.y = 300;
        this.rotation += 1;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var rect = new render.Rect();
rect.x -= 50;
rect.y -= 50;
var trunk = new render.Bitmap();
trunk.source = "wander-icon.jpg";
trunk.y -= 100;
var down = new render.Bitmap();
down.source = "wander-icon.jpg";
down.y += 200;
var right = new render.Bitmap();
down.source = "wander-icon.jpg";
down.y += 200;
humanContainer.addChild(rect);
//humanContainer.addChild(trunk);
//humanContainer.addChild(down);
var body = new HumanBody(humanContainer);
ticker.start([body]);
//# sourceMappingURL=game.js.map