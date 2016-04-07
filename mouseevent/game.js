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
var headcli = false;
//humanContainer.rotation = 90;
humanContainer.addChild(head);
var rotate = 1;
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png", "trunk.png", "left_arm.png", "right_arm.png", "left_leg.png", "right_leg.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.vx = 5;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += rotate; //100;//+= duringTime * this.vx;
        this.y = 170;
        this.rotation += rotate; //+= rotate;
        //console.log(humanContainer.rotation);
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
//var rect = new render.Rect();
//rect.x -= 50;
//rect.y -= 50;
var trunk = new render.Bitmap();
trunk.source = "trunk.png";
trunk.x -= 20;
trunk.y -= 100;
var leftarm = new render.Bitmap();
leftarm.source = "left_arm.png";
leftarm.y -= 210;
leftarm.x -= 240;
//leftarm.rotation = 90;
var rightarm = new render.Bitmap();
rightarm.source = "right_arm.png";
rightarm.y -= 90;
rightarm.x += 20;
var leftleg = new render.Bitmap();
leftleg.source = "left_leg.png";
leftleg.y += 45;
leftleg.x += 10;
//leftleg.rotation = 10;
var rightleg = new render.Bitmap();
rightleg.source = "right_leg.png";
rightleg.y += 45;
rightleg.x -= 30;
//humanContainer.addChild(rect);
humanContainer.addChild(trunk);
humanContainer.addChild(leftarm);
humanContainer.addChild(rightarm);
humanContainer.addChild(leftleg);
humanContainer.addChild(rightleg);
var body = new HumanBody(humanContainer);
ticker.start([body]);
var eventCore = new events.EventCore();
eventCore.init();
var headHitTest = function (localPoint, displayObject) {
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    //var invertGlobalMatrix = math.invertMatrix(displayObject.parent.globalMatrix);
    //var point = math.pointAppendMatrix(displayObject, invertGlobalMatrix);
    //console.log(point.x,point.y);
    if (localPoint.x <= 61 && localPoint.x >= 0 && localPoint.y <= 61 && localPoint.y >= 0) {
        //alert (humanContainer.rotation);
        // headcli = true;
        //headOnClick();
        alert('head');
        return true;
    }
    else {
        return false;
    }
};
var headOnClick = function () {
    //alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
    //rotate = -rotate;
    //if(headcli){
    rotate = -rotate;
    if (rotate == 0) {
        rotate = 1;
    }
    //}
    headcli = false;
};
var legHitTest = function (localPoint, displayObject) {
    if (localPoint.y >= 0 && localPoint.y <= 198 && ((localPoint.x >= 0 && localPoint.x <= 18))) {
        console.log('ok');
        return true;
    }
    else {
        return false;
    }
};
var legOnClick = function () {
    rotate = 0;
    body.rotation = 0;
    alert('leg');
};
eventCore.register(head, headHitTest, headOnClick);
eventCore.register(rightleg, legHitTest, legOnClick);
eventCore.register(leftleg, legHitTest, legOnClick);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxJQUFJLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ3pELGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO0FBQ3pCLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO0FBQ2QsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDYixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDcEIsK0JBQStCO0FBQy9CLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFOUIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBR2YsSUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDekMsVUFBVSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFFOUg7SUFBd0IsNkJBQUk7SUFBNUI7UUFBd0IsOEJBQUk7UUFHeEIsT0FBRSxHQUFVLENBQUMsQ0FBQztJQVNsQixDQUFDO0lBTkcsNEJBQVEsR0FBUixVQUFTLFVBQWtCO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUEsZ0NBQWdDO1FBQ2pELElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2IsSUFBSSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsQ0FBQSxZQUFZO1FBQ3BDLHVDQUF1QztJQUMzQyxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBWkQsQ0FB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