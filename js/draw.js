var gridSize = 200;

var bitpartmentCanvas = function(){
    this.canvas = Snap("#canvas");
    this.wall = this.canvas.rect(0,0,0,0);
}

bitpartmentCanvas.prototype = {
    draw : function(){
        var canvasHeight = this.canvas.node.clientHeight
        var startY = canvasHeight;
        var startX = 100;
        var wallWidth = gridSize * data.house.Width;
        var wallHeight = gridSize * data.house.Height;
        console.log(wallHeight)
        this.wall.attr({
            x:startX,
            y:startY-wallHeight,
            width:wallWidth,
            height:wallHeight,
        });
    }
}

var bitpartment = new bitpartmentCanvas();