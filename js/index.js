data.init();
data.ws.addEventListener("open",handleWebSocketOpen)

function handleWebSocketOpen(){
    data.startUpdates();
}
/*
FBInstant.initializeAsync()
    .then(function() {        
        // Start loading game assets here
        data.init();
        data.ws.addEventListener("open", function(){
            console.log("opened");
            FBInstant.setLoadingProgress(50);
            FBInstant.startGameAsync()
                .then(function() {
                    data.startUpdates();
                });
        })
  });
*/