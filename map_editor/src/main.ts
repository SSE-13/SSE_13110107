
import * as fs from 'fs';



function readFile() {
    var map_path = __dirname + "/map.json"
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    
    stack.push(mapData);
 
    //console.log(stack.pop());
       step++;
    
    return mapData;
}


function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;

    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);


            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    
    
    return world;

}



function onTileClick(tile: editor.Tile) {
    stack.push(mapData);
            step ++;
     
    if(mapData[tile.ownedRow][tile.ownedCol] == 1){
        mapData[tile.ownedRow][tile.ownedCol] = 0;
    }else{
        mapData[tile.ownedRow][tile.ownedCol] = 1;
    }
    tile.setWalkable(mapData[tile.ownedRow][tile.ownedCol]);
    //console.log(tile);
    
 
    //if(step>0){
        //if(stack[step]!=stack[step-1]){
            
        //}
    //}//else if(step == 0){
      //  stack.push(mapData);
      //  console.log(mapData);
      //      step ++;
        
    //}
}

function Redo() {
//     if (step > 0) {
//         mapData = stack.pop;
//         step--;
//     }
//     for (var i = 0; i < mapData.length; i++) {
//         for (var n = 0; n < mapData[0].length; i++) {
//             tileCopy.setWalkable(mapData[i][n]);
//         }
//     }
     step--;
     console.log(stack[step]);
     console.log(step);
//     //if()
}

var step = 0;
var stack = [];
//var tileCopy;// = new editor.Tile();
var mapData = readFile();


var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();


var editor = createMapEditor();
//renderCore.start(editor);


function SaveFile() {
    var map_path = __dirname + "/map.json"
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    
    
    obj.map = mapData;
    
     obj = JSON.stringify(obj);
    //console.log(mapData);
    fs.writeFileSync(map_path,obj,"utf-8");
    
}

var buttonSave = new render.Rect();
buttonSave.x = 0;
buttonSave.y = 300;
buttonSave.width = 100;
buttonSave.height = 100;
buttonSave.color = '#FFF000';

var buttonRedo = new render.Rect();
buttonRedo.x = 150;
buttonRedo.y = 300;
buttonRedo.width = 100;
buttonRedo.height = 100;
buttonRedo.color = '#FFFFF0';




eventCore.register(buttonSave,events.displayObjectRectHitTest,SaveOnClick);

eventCore.register(buttonRedo,events.displayObjectRectHitTest,RedoOnClick);

function SaveOnClick() {
    SaveFile();
   // console.log('ok');
    
}

function RedoOnClick() {
    Redo();
    //console.log('ok');
    
}

var globalmap = new render.DisplayObjectContainer();
renderCore.start(globalmap);
globalmap.addChild(editor);
globalmap.addChild(buttonSave);


globalmap.addChild(buttonRedo);


