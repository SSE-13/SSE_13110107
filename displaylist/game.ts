module game {


}

var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = "wander-icon.jpg";
head.y -=100;
humanContainer.addChild(head);

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["wander-icon.jpg"]);


class HumanBody extends Body {


    onTicker(duringTime: number) {

         this.x = 400 ;
         this.y = 300;
         this.rotation += 1;

    }
}

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











