var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var GRID_PIXEL_WIDTH = 50;
    var GRID_PIXEL_HEIGHT = 50;
    var NUM_ROWS = 12;
    var NUM_COLS = 12;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);
        }
        WorldMap.prototype.render = function (context) {
            //context.fillStyle = '#000000';//'#0000FF';
            context.strokeStyle = '#426F42'; //'#FF0000';
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    if (i == 5 && j <= 5) {
                        context.fillStyle = '#000000';
                        context.fillRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                    }
                    else {
                        context.fillStyle = '#00FF7F';
                        context.rect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        context.fill();
                        context.stroke();
                    }
                }
            }
            context.closePath();
        };
        return WorldMap;
    }(DisplayObject));
    game.WorldMap = WorldMap;
    var BoyShape = (function (_super) {
        __extends(BoyShape, _super);
        function BoyShape() {
            _super.apply(this, arguments);
        }
        BoyShape.prototype.render = function (context) {
            context.beginPath();
            context.fillStyle = '#00FFFF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        };
        return BoyShape;
    }(DisplayObject));
    game.BoyShape = BoyShape;
    var BoyBody = (function (_super) {
        __extends(BoyBody, _super);
        function BoyBody() {
            _super.apply(this, arguments);
            this.no = 0;
            this.deltax = 0;
            this.deltay = 0;
            this.mark = false;
        }
        BoyBody.prototype.run = function (grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal); //寻路算法
            //f=g+h,寻路算法确定h
            //传入寻路方法后
            var result = findpath.findPath(grid); //开始寻路
            this.path = findpath._path;
            console.log(this.path);
            console.log(grid.toString());
        };
        BoyBody.prototype.onTicker = function (duringTime) {
            var deltatime = duringTime * 20;
            if (this.no < this.path.length) {
                if (this.no != this.path.length - 1) {
                    this.deltax = (this.path[this.no + 1].x - this.path[this.no].x) * GRID_PIXEL_WIDTH;
                    this.deltay = (this.path[this.no + 1].y - this.path[this.no].y) * GRID_PIXEL_HEIGHT;
                    this.x += this.deltax / deltatime;
                    this.y += this.deltay / deltatime;
                    if ((this.x >= this.path[this.no + 1].x * GRID_PIXEL_WIDTH || this.y >= this.path[this.no + 1].y * GRID_PIXEL_HEIGHT)) {
                        if (this.path[this.no + 1].x == this.path[this.no].x) {
                            if (this.y >= this.path[this.no + 1].y * GRID_PIXEL_HEIGHT) {
                                this.no++;
                            }
                        }
                        else if (this.path[this.no + 1].y == this.path[this.no].y) {
                            if (this.x >= this.path[this.no + 1].x * GRID_PIXEL_HEIGHT) {
                                this.no++;
                            }
                        }
                        else {
                            this.no++;
                        }
                        //this.mark = true;
                        // }
                        console.log(this.path[this.no].x + ',' + this.path[this.no].y);
                    }
                }
            }
            console.log(this.no);
        };
        return BoyBody;
    }(Body));
    game.BoyBody = BoyBody;
})(game || (game = {}));
var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);
//body.vx = 10;
//body.vy = 10;
var renderCore = new RenderCore();
renderCore.start([world, boyShape]);
var ticker = new Ticker();
ticker.start([body]);
