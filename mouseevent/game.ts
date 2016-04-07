
var humanContainer = new render.DisplayObjectContainer();
humanContainer.x = 0;
var head = new render.Bitmap();
head.source = "head.png";
head.y -= 160;
head.x -= 30;
var headwidth = 61;
var headheight = 61;
humanContainer.addChild(head);

var rotate = 1;

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png", "trunk.png", "left_arm.png", "right_arm.png", "left_leg.png", "right_leg.png"]);

class HumanBody extends Body {
    
    
    vx:number = 5;
    
    onTicker(duringTime: number) {
        this.x += duringTime*rotate*5;//100;//+= duringTime * this.vx;
        this.y = 170;
        this.rotation += rotate;//+= rotate;
    }
}

var ticker = new Ticker();

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

var legwidth = 18;
var legheight = 198;

humanContainer.addChild(trunk);
humanContainer.addChild(leftarm);
humanContainer.addChild(rightarm);
humanContainer.addChild(leftleg);
humanContainer.addChild(rightleg);

var body = new HumanBody(humanContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if(localPoint.x<=headwidth&&localPoint.x>=0&&localPoint.y<=headheight&&localPoint.y>=0){
        return true;
    }else{
        return false;
    }
}

var headOnClick = () => {
    //修改 HumanBody 的速度，使其反向移动
    rotate = -rotate;
    if(rotate == 0){
        rotate = 1;
    }
}

var legHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
   if(localPoint.y>=0&&localPoint.y<=legheight&&((localPoint.x>=0&&localPoint.x<=legwidth))){
        return true;
    }else {
        return false;
    }  
}

var legOnClick = () => {
    rotate = 0;
    body.rotation=0;
}

eventCore.register(head,headHitTest,headOnClick);
eventCore.register(rightleg,legHitTest,legOnClick);
eventCore.register(leftleg,legHitTest,legOnClick);










