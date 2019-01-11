var gridSize = 100;

var drawingStage = function(){
    this.canvas = Snap("#canvas");
    this.wall = this.canvas.rect(0,0,0,0);
    this.rooms = [];
    
    // Positional variables

    // Canvas positions 
    console.log('test');
    console.log(this.canvas.node.clientHeight);
    this.canvasHeight = this.canvas.node.clientHeight;
    this.canvasX = 0;
    this.canvasY = this.canvasHeight;

    // Wall positons
    this.wallX = this.canvasX + 100;
    this.wallY = this.canvasY + 0;
    this.wallWidth = gridSize * data.house.Width;
    this.wallHeight = gridSize * data.house.Height;
}

drawingStage.prototype = {
    draw : function(){
        this.wallX = this.canvasX + 100;
        this.wallY = this.canvasY + 0;
        this.wallWidth = gridSize * data.house.Width;
        this.wallHeight = gridSize * data.house.Height;
        this._drawWall();
        this._drawRooms();
        this._drawTenants();
    },
    _drawWall : function(){
        console.log(this)
        this.wall.attr({
            x:this.wallX,
            y:this.wallY-this.wallHeight,
            width:this.wallWidth,
            height:this.wallHeight,
        });
    },
    _drawRooms : function(){
        // TODO: Implement

        //Undraw all the previously drawn rooms
        this.rooms.forEach(function(room){
            room.remove();
        })

        //Draw new rooms
        this.rooms = [];
        data.rooms.forEach(function(roomData){
            newRoom = this.canvas.rect(
                this.wallX + roomData.X*gridSize,
                this.wallY - roomData.Y*gridSize - gridSize,
                gridSize*roomData.Width,
                gridSize*roomData.Height
            );
            newRoom.attr({fill: "#fc0"});
            this.rooms.push(newRoom);

        }.bind(this));
    },
    _drawTenants : function(){
        // TODO: Implement

    }

}

var stage = new drawingStage();