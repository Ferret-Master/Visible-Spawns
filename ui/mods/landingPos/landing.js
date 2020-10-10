handlers.client_state = function (client) {

            var color = [0,0,0];
            if (client.landing_position) {
                var players = model.players()
                for(var i = 0; i<players.length;i++){
                    
                    if(players[i].stateToPlayer == "self"){color = players[i].primary_color}
                }
                client.landing_position.color = color;
                var puppetObject ={
                
                    "planet": client.landing_position.planet_index,
                    "pos":[
                        client.landing_position.location.x,
                        client.landing_position.location.y,
                        client.landing_position.location.z
                    ],
                    
                    "scale":0.3,
                    "snap":50
                 ,"color":color}

                model.send_message("team_chat_message", {message: ("landingPosMod:"+JSON.stringify(puppetObject))})
                model.send_message("team_chat_message", {message: " "})
               
            }
     
};


