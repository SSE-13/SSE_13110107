/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {

    render(context: CanvasRenderingContext2D) {
        context.font = "11px Arial";
        context.fillStyle = '#FFFFFF';
        context.fillText('osu!droid by Pesets&neico', 0, 230);
        context.fillText('osu! is @ peppy 2007-2015', 0, 243);
         context.fillText('Performance Ranking', 290, 230);
         context.fillText('Provided by iBancho', 292, 243);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;

        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");


var rect = new Rect();
rect.width = 410;
rect.height = 250;
rect.color = '#0000FF'//1C86EE'


var rect2 = new Rect();
rect2.width = 100;
rect2.height = 20;
rect2.x = 0;
rect2.y = 120;
rect2.rotation = Math.PI / 10;
rect2.color = '#FFFF00'

var rect3 = new Rect();
rect3.width = 100;
rect3.height =20;

//rect3.rotation = Math.PI / 8;
rect3.x = 385;
rect3.y = 130;
rect3.color = '#FFFF00'

var text = new TextField();
text.x = 5;


var bitmap1 = new Bitmap();
bitmap1.source = '1.png';
bitmap1.x = 40;
bitmap1.y = 20;

var bitmap2 = new Bitmap();
bitmap2.source = '2.png';
bitmap2.x = 212;
bitmap2.y = 50;

var bitmap3 = new Bitmap();
bitmap3.source = '3.png';
bitmap3.x = 239;
bitmap3.y = 100;

var bitmap4 = new Bitmap();
bitmap4.source = '4.png';
bitmap4.x = 215;
bitmap4.y = 150;

//渲染队列
var renderQueue = [rect, rect2,rect3,text,bitmap1,bitmap2,bitmap3,bitmap4];
//资源加载列表
var imageList = ['1.png','2.png','3.png','4.png'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


