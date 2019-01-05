var gameData = function(){
    this.test = "bandersnatch"
    this.house = {}; 
    this.tenants = [];
    this.actions = [];
    this.rooms = [];
    this.interval = -1;
    this.cycle = -1;
    this.ws = null;
}

gameData.prototype.init = function(){
    console.log(this.test);
    this.ws = new WebSocket("ws://localhost:8000/ws/connect");
    this.ws.addEventListener("message",function(e){
        var data = JSON.parse(e.data);
        console.log(data)
    });
    console.log("Websocket initialized.");
}
gameData.prototype.startUpdates = function(){
    var tempData = {
        username: "thomasarmena",
        houseID: 1,
    }
    this.ws.send(JSON.stringify(tempData));
    console.log("Updates started");
}


var data = new gameData()