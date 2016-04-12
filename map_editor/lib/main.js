"use strict";
const fs = require('fs');
function readFile() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
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
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
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
function onTileClick(tile) {
    if (mapData[tile.ownedRow][tile.ownedCol] == 1) {
        mapData[tile.ownedRow][tile.ownedCol] = 0;
    }
    else {
        mapData[tile.ownedRow][tile.ownedCol] = 1;
    }
    tile.setWalkable(mapData[tile.ownedRow][tile.ownedCol]);
    console.log(tile);
}
var mapData = readFile();
var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();
var editor = createMapEditor();
//renderCore.start(editor);
function saveFile() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    obj.map = mapData;
    obj = JSON.stringify(obj);
    console.log(mapData);
    fs.writeFileSync(map_path, obj, "utf-8");
    // var obj = JSON.parse(content);
    // var mapData = obj.map;
    // return mapData;
}
var buttonStart = new render.Rect();
buttonStart.x = 0;
buttonStart.y = 300;
buttonStart.width = 100;
buttonStart.height = 100;
buttonStart.color = '#FF0000';
eventCore.register(buttonStart, events.displayObjectRectHitTest, buttonOnClick);
function buttonOnClick() {
    saveFile();
    console.log('ok');
}
var globalmap = new render.DisplayObjectContainer();
renderCore.start(globalmap);
globalmap.addChild(editor);
globalmap.addChild(buttonStart);
/*function onTileClick(tile: editor.Tile) {
    if(mapData[tile.ownedRow][tile.ownedCol] == 1){
        mapData[tile.ownedRow][tile.ownedCol] = 0;
    }else{
        mapData[tile.ownedRow][tile.ownedCol] = 1;
    }
    tile.setWalkable(mapData[tile.ownedRow][tile.ownedCol]);
    
    console.log(tile);
}*/
