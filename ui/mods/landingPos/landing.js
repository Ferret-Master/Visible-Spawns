var client_state = handlers.client_state; handlers.client_state = function (client) {
            
            client_state(client);


            var color = [0,0,0];
            var playerCom = "/pa/units/commanders/imperial_able/imperial_able.json"
            if (client.landing_position) {
                var players = model.players()
                for(var i = 0; i<players.length;i++){
                    
                    if(players[i].stateToPlayer == "self"){
                        color = players[i].primary_color
                     
                        playerCom = players[i].commanders[0]
                    }

                }
                
                //dulling color
                color[0] = color[0]/4
                color[1] = color[1]/4
                color[2] = color[2]/4
                //trimming commander to just name for puppet spawning
                playerCom = playerCom.substring(playerCom.lastIndexOf('/') + 1).replace(".json",""); 
                
                client.landing_position.color = color;
                var puppetObject ={
                
                    "planet": client.landing_position.planet_index,
                    "pos":[
                        client.landing_position.location.x,
                        client.landing_position.location.y,
                        client.landing_position.location.z
                    ],
                    
                    "scale":1,
                    "snap":50,
                    "color":color,
                    "playerCom": playerCom
                }

                model.send_message("team_chat_message", {message: ("landingPosMod:"+JSON.stringify(puppetObject))})
                model.send_message("team_chat_message", {message: " "})
               
            }
     
};



var server_state = handlers.server_state; handlers.server_state = function(msg) { 
    
    server_state(msg);
    var color = [0,0,0];
    if (msg.data) {
        var players = model.players()
                for(var i = 0; i<players.length;i++){
                    
                    if(players[i].stateToPlayer == "self"){
                        color = players[i].primary_color
                        
                    }
        }
        switch (msg.state) {
            case 'landing':
       
                if (msg.data.client && msg.data.client.zones) {
                    var zones = msg.data.client.zones;
                    
                    
                    zones[0].color = color;
                    api.Panel.message(api.Panel.pageId, 'playerSpawn',zones)
                    model.send_message("team_chat_message", {message: ("landingZoneMod:"+JSON.stringify(zones))})
                    model.send_message("team_chat_message", {message: " "})
                }

                
                break;



    }

}



}
