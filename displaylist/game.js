var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
humanContainer.x = 0;
var head = new render.Bitmap();
head.source = "head.png";
head.y -= 160;
head.x -= 30;
humanContainer.addChild(head);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png", "trunk.png", "left_arm.png", "right_arm.png", "left_leg.png", "right_leg.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += 1;
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
trunk.source = "trunk.png";
trunk.x -= 20;
trunk.y -= 100;
var leftarm = new render.Bitmap();
leftarm.source = "left_arm.png";
leftarm.y -= 210;
leftarm.x -= 240;
var rightarm = new render.Bitmap();
rightarm.source = "right_arm.png";
rightarm.y -= 90;
rightarm.x += 20;
var leftleg = new render.Bitmap();
leftleg.source = "left_leg.png";
leftleg.y += 45;
leftleg.x += 10;
var rightleg = new render.Bitmap();
rightleg.source = "right_leg.png";
rightleg.y += 45;
rightleg.x -= 30;
humanContainer.addChild(rect);
humanContainer.addChild(trunk);
humanContainer.addChild(leftarm);
humanContainer.addChild(rightarm);
humanContainer.addChild(leftleg);
humanContainer.addChild(rightleg);
var body = new HumanBody(humanContainer);
ticker.start([body]);
//# sourceMappingURL=game.js.map