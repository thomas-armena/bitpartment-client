var gameData = function(){
    this.house = {}; 
    this.tenants = [];
    this.actions = [];
    this.rooms = [];
    this.interval = -1;
    this.cycle = -1;
    this.ws = null;
}

gameData.prototype = {
    init : function(){
        this.ws = new WebSocket("ws://localhost:8000/ws/connect");
        this.ws.addEventListener("message",this.updateData.bind(this));
        console.log("Websocket initialized.");
    },
    updateData : function(e){
        var data = JSON.parse(e.data);
        this.house = data.House;
        this.tenants = data.Tenants;
        this.actions = data.Actions;
        this.rooms = data.Rooms;
        this.interval = data.Interval;
        this.cycle = data.Cycle;
        console.log(this)
        stage.draw();

    },
    startUpdates : function(){
        var tempData = {
            username: "thomasarmena",
            houseID: 1,
        }
        this.ws.send(JSON.stringify(tempData));
        console.log("Updates started");

    },
}

var data = new gameData()