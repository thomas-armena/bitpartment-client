var gridSize = 100;

var drawingStage = function(){

    
    this.canvas = Snap("#canvas");
    this.allItems = this.canvas.group();
    this.viewMatrix = new Snap.Matrix();

    this.wall = this.canvas.rect(0,0,0,0);
    this.rooms = [];
    this.actions = [];

    this.canvasElement = document.getElementById('canvas');
    this.canvasElement.addEventListener("touchmove", this._handleTouchMove.bind(this))
    this.canvasElement.addEventListener("touchstart", this._handleTouchStart.bind(this))
    this.canvasElement.addEventListener("touchend", this._handleTouchEnd.bind(this))
    this.canvasElement.addEventListener("touchcancel", this._handleTouchCancel.bind(this))

    this.touchState = 'idle';
    this.touchX = 0;
    this.touchY = 0;
    this.touchDX = 0;
    this.touchDY = 0;


    requestAnimationFrame(this._update.bind(this))
    

    console.log('grid size: '+gridSize);



}

drawingStage.prototype = {
    draw : function(){
        // Update Canvas positions 
        this.canvasHeight = this.canvas.node.clientHeight;
        this.canvasWidth = this.canvas.node.clientWidth;
        this.canvasX = 0;
        this.canvasY = this.canvasHeight;

        // Update Wall positions
        this.wallX = this.canvasX + 200;
        this.wallY = this.canvasY - 200;
        this.wallWidth = gridSize * data.house.Width;
        this.wallHeight = gridSize * data.house.Height;

        this.allItems.remove()
        this.allItems = this.canvas.group();
        this._drawWall();
        this._drawRooms();
        this._drawActions();
        this._drawTenants();
    },
    _drawWall : function(){
        this.wall.attr({
            x:this.wallX,
            y:this.wallY-this.wallHeight,
            width:this.wallWidth,
            height:this.wallHeight,
        });
        this.allItems.add(this.wall)
    },
    _drawActions : function(){
        this.actions.forEach(function(action){
            action.remove();
        })

        this.actions = [];
        data.actions.forEach(function(actionData){
            tempRoom = data.getRoomById(actionData.RoomID);
            newAction = this.canvas.rect(
                this.wallX + tempRoom.X*gridSize + actionData.X,
                this.wallY - tempRoom.Y*gridSize - actionData.Y-20,
                20,
                20,
            )
            newAction.attr({fill: "#ac0"});
            this.actions.push(newAction);
            this.allItems.add(newAction)
        }.bind(this))

    },
    _drawRooms : function(){

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
            this.allItems.add(newRoom)

        }.bind(this));
    },
    _drawTenants : function(){
        // TODO: Implement

    },
    _update : function(){
        if (this.touchState == 'moving'){
            this.touchDX = this.touchX - this.touchPrevX
            this.touchDY = this.touchY - this.touchPrevY
            console.log(this.touchDX,this.touchDY)
            this.viewMatrix.translate(this.touchDX, this.touchDY)
            this.touchPrevX = this.touchX;
            this.touchPrevY = this.touchY;

        } else if (this.touchState == 'idle') {
            if (Math.abs(this.touchDX) > 0.1 && Math.abs(this.touchDY) > 0.1){
                this.touchDX = this.touchDX / 1.2;
                this.touchDY = this.touchDY / 1.2;
                this.viewMatrix.translate(this.touchDX, this.touchDY)
            }
        }
        this.allItems.transform(this.viewMatrix);
        requestAnimationFrame(this._update.bind(this))
    },
    _handleTouchStart : function(ev){
        console.log('start',ev.touches[0])
        this.touchState = 'moving'
        this.touchX = ev.touches[0].clientX;
        this.touchY = ev.touches[0].clientY;
        this.touchPrevX = ev.touches[0].clientX;
        this.touchPrevY = ev.touches[0].clientY;
    },
    _handleTouchMove : function(ev){
        this.touchX = ev.touches[0].clientX;
        this.touchY = ev.touches[0].clientY;
        
    },
    _handleTouchEnd : function(ev){
        console.log('end',ev.touches[0])
        this.touchState = 'idle'
        this.touchX = 0;
        this.touchY = 0;
    },
    _handleTouchCancel : function(ev){
        console.log('cancel',ev.touches[0])
        this.touchState = 'idle'
        this.touchX = 0;
        this.touchY = 0;
    }



}

var stage = new drawingStage();